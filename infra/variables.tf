variable "subscription_id" {
  description = "Azure subscription ID that owns the storage account."
  type        = string
}

variable "resource_group_name" {
  description = "Name of the EXISTING resource group that holds the storage account."
  type        = string
}

variable "storage_account_name" {
  description = <<-EOT
    Name of the EXISTING storage account that will host the static site.
    The static-website feature must be enabled on it (see infra/README.md
    for the one-time `az` command).
  EOT
  type        = string

  validation {
    condition     = can(regex("^[a-z0-9]{3,24}$", var.storage_account_name))
    error_message = "Storage account names are 3-24 lowercase alphanumeric chars."
  }
}

variable "site_source_path" {
  description = <<-EOT
    Path to the Next.js static-export output directory, relative to this
    Terraform module. Default points to `../out` which is what
    `npm run build` produces (output: 'export' in next.config.mjs).
  EOT
  type        = string
  default     = "../out"
}
