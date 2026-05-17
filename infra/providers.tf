terraform {
  required_version = ">= 1.5.0"

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 4.0"
    }
  }

  # State lives in HCP Terraform (Terraform Cloud), org "papliba-org",
  # workspace "sunny-portfolio" (created out-of-band in the TFC UI).
  #
  # Auth:
  #   Local: run `terraform login` once; token cached in ~/.terraform.d/.
  #   CI:    set TF_TOKEN_app_terraform_io as a GitHub Actions secret.
  #
  # Execution mode: set the workspace to "Local" in the TFC UI for the first
  # runs so Azure auth uses your `az login` session. Flip to "Remote" later
  # if you want TFC to run apply, which needs dynamic Azure credentials
  # configured on the workspace.
  cloud {
    organization = "papliba-org"

    workspaces {
      name = "sunny-portfolio"
    }
  }
}

provider "azurerm" {
  features {}
  subscription_id = var.subscription_id
  # Auth: run `az login` locally. In CI, set ARM_USE_OIDC=true + ARM_CLIENT_ID,
  # ARM_TENANT_ID, ARM_SUBSCRIPTION_ID.

  # The storage account already exists and is read via a data source — we
  # don't manage data-plane authentication, just blob uploads via the
  # provider's RBAC + key fallback.
  storage_use_azuread = true
}
