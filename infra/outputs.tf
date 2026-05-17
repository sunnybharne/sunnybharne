output "storage_account_name" {
  description = "Storage account hosting the static site."
  value       = data.azurerm_storage_account.site.name
}

output "primary_web_endpoint" {
  description = "Public URL of the static website (e.g. https://<account>.z6.web.core.windows.net/)."
  value       = data.azurerm_storage_account.site.primary_web_endpoint
}

output "primary_web_host" {
  description = "Host portion of primary_web_endpoint — useful for CNAME-ing a custom domain."
  value       = data.azurerm_storage_account.site.primary_web_host
}

output "uploaded_blob_count" {
  description = "Number of files terraform is managing in the $web container."
  value       = length(azurerm_storage_blob.site)
}
