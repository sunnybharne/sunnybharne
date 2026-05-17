# infra — deploy the portfolio to an Azure Storage Account

Terraform that uploads the Next.js static export (`../out/`) into the `$web`
container of an **existing** storage account.

The storage account itself is **not** managed here — only the blob contents.
Static-website hosting must be enabled on the account before the first
`terraform apply` (see one-time setup below).

## Prerequisites

- An existing storage account in your subscription (any region, Standard tier, StorageV2 kind).
- Static-website hosting enabled on that account (one-time `az` command below).
- `az login` against the subscription that owns it.
- Terraform >= 1.5.
- HCP Terraform (Terraform Cloud) workspace `sunny-portfolio` in the
  `papliba-org` org (already created). Run `terraform login` once locally
  so the CLI has a TFC token.

## One-time setup

```bash
# Replace <account> with your actual storage account name.
az storage blob service-properties update \
  --account-name <account> \
  --auth-mode login \
  --static-website \
  --index-document index.html \
  --404-document 404.html
```

This is run once per storage account and persists. It also auto-creates the
`$web` container Azure will serve from.

## Fill in `terraform.tfvars`

```hcl
subscription_id      = "e0f7f90b-..."
resource_group_name  = "rg"
storage_account_name = "<your-account-name>"
```

## Deploy

```bash
# From the repo root: produce the static export Terraform will upload.
npm run build

# Then from this directory: apply the upload.
cd infra
terraform init
terraform apply
```

The site URL is in `terraform output primary_web_endpoint`.

## How updates work

`azurerm_storage_blob.site.content_md5` is set to `filemd5(...)`, so terraform
sees per-file content changes between applies and only replaces blobs whose
contents actually changed. New files are added; removed files are deleted by
terraform on the next apply (because `fileset` no longer lists them).

## Custom domain (optional)

1. Add a CNAME at your DNS provider pointing your hostname (e.g.
   `sunnybharne.dev`) at the `primary_web_host` output value.
2. Add the custom domain on the storage account (one-time, in the Azure
   portal or via `az storage account update --custom-domain`).
3. For HTTPS on a custom domain, front the storage account with **Azure
   Front Door** or **Azure CDN** — storage's static-website endpoint
   doesn't support custom-domain TLS on its own.
