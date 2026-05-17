data "azurerm_resource_group" "site" {
  name = var.resource_group_name
}

data "azurerm_storage_account" "site" {
  name                = var.storage_account_name
  resource_group_name = data.azurerm_resource_group.site.name
}

# Azure's static-website feature serves content from a special container
# called `$web`. The container itself is created automatically by Azure when
# static-website hosting is enabled on the storage account — we only need
# to read it.
data "azurerm_storage_container" "web" {
  name               = "$web"
  storage_account_id = data.azurerm_storage_account.site.id
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
  storage_container_name = data.azurerm_storage_container.web.name
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
}
