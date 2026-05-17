data "azurerm_resource_group" "site" {
  name = var.resource_group_name
}

data "azurerm_storage_account" "site" {
  name                = var.storage_account_name
  resource_group_name = data.azurerm_resource_group.site.name
}

# Enable static-website hosting on the existing storage account. This is
# the data-plane property that turns on the `$web` container + the
# *.z*.web.core.windows.net endpoint. We use the standalone resource
# (rather than the `static_website {}` block on azurerm_storage_account)
# because the storage account itself is NOT managed here — it's read via
# a data source so we don't fight with whoever manages it elsewhere.
#
# Side effect: Azure auto-creates the `$web` container when this resource
# is created. We don't need a separate azurerm_storage_container resource
# for it (and creating one would conflict with the auto-created one).
resource "azurerm_storage_account_static_website" "web" {
  storage_account_id = data.azurerm_storage_account.site.id
  index_document     = "index.html"
  error_404_document = "404.html"
}

# Static-website was first enabled on stjsdownloads imperatively (one-time
# `az` command) before this module existed. The `import` block lets the
# very first `terraform apply` adopt that existing configuration into state
# without re-creating anything. After the first successful apply, this
# block becomes a no-op and can be deleted — Terraform supports keeping it
# either way.
import {
  to = azurerm_storage_account_static_website.web
  # Terraform requires the import ID to be known at plan time, so we build
  # it from the input vars rather than referencing the data source.
  id = "/subscriptions/${var.subscription_id}/resourceGroups/${var.resource_group_name}/providers/Microsoft.Storage/storageAccounts/${var.storage_account_name}"
}

locals {
  # Walk every file under the Next.js export output and upload it to $web.
  # `fileset` is path-relative to the module root.
  site_files = fileset(var.site_source_path, "**/*")

  # MIME types Azure won't infer correctly from file extension when serving
  # via the static-website endpoint. Anything not in this map falls back to
  # application/octet-stream — which the browser would download instead of
  # render, so keep this list aligned with what `out/` actually produces.
  mime_types = {
    ".html"  = "text/html; charset=utf-8"
    ".htm"   = "text/html; charset=utf-8"
    ".css"   = "text/css; charset=utf-8"
    ".js"    = "application/javascript; charset=utf-8"
    ".mjs"   = "application/javascript; charset=utf-8"
    ".json"  = "application/json; charset=utf-8"
    ".map"   = "application/json; charset=utf-8"
    ".txt"   = "text/plain; charset=utf-8"
    ".xml"   = "application/xml; charset=utf-8"
    ".svg"   = "image/svg+xml"
    ".png"   = "image/png"
    ".jpg"   = "image/jpeg"
    ".jpeg"  = "image/jpeg"
    ".gif"   = "image/gif"
    ".webp"  = "image/webp"
    ".ico"   = "image/x-icon"
    ".woff"  = "font/woff"
    ".woff2" = "font/woff2"
    ".ttf"   = "font/ttf"
    ".otf"   = "font/otf"
    ".eot"   = "application/vnd.ms-fontobject"
  }
}

resource "azurerm_storage_blob" "site" {
  for_each = local.site_files

  name                   = each.value
  storage_account_name   = data.azurerm_storage_account.site.name
  storage_container_name = "$web"
  type                   = "Block"

  source = "${var.site_source_path}/${each.value}"

  # `content_md5` is what triggers terraform to re-upload changed files. If
  # the local file's md5 differs from the value tracked in state, the blob
  # gets replaced. Without this, terraform would only see new/removed files.
  content_md5 = filemd5("${var.site_source_path}/${each.value}")

  content_type = lookup(
    local.mime_types,
    lower(regex("\\.[^.]*$", each.value)),
    "application/octet-stream",
  )

  # Ordering: don't try to upload blobs until static-website is enabled,
  # because enabling it is what auto-provisions the $web container.
  depends_on = [azurerm_storage_account_static_website.web]
}
