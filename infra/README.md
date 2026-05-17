# infra — deploy the portfolio to an Azure Storage Account

Terraform that:

1. Enables static-website hosting on an existing storage account (creates
   the `$web` container as a side effect — that's the container Azure
   serves the site from).
2. Uploads the Next.js static export (`../out/`) into that container.

A single `terraform apply` does both, in that order — the blob uploads
`depends_on` the static-website resource, so Terraform won't try to push
files before the container exists.

On the **very first apply** an `import` block adopts the existing
static-website configuration on the account into state (the feature was
toggled on out-of-band before this module existed). Subsequent applies
are no-ops for the import block. You can delete the block once you've
seen one clean apply, or leave it — it's idempotent.

The storage account itself is **not** managed here — only the static-website
configuration on it and the blob contents inside it. That keeps this module
safe to run alongside other Terraform that owns the account.

## Prerequisites

- An existing storage account in your subscription (any region, Standard tier, StorageV2 kind).
- `az login` against the subscription that owns it.
- Terraform >= 1.6 (the `import` block in `main.tf` uses variable
  interpolation, which requires 1.6+).
- HCP Terraform (Terraform Cloud) workspace `sunny-portfolio` in the
  `papliba-org` org (already created). Run `terraform login` once locally
  so the CLI has a TFC token. The workspace's Terraform version must also
  be set to 1.6+ in the TFC UI.

## Fill in `terraform.tfvars`

```hcl
subscription_id      = "e0f7f90b-..."
resource_group_name  = "rg"
storage_account_name = "stjsdownloads"
```

## Deploy

```bash
# From the repo root: produce the static export Terraform will upload.
npm run build

# Then from this directory: one apply does both — infra config (static-website)
# and the app deploy (blob uploads), in the correct order.
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
