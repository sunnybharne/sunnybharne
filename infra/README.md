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
# All commands from the repo root.
npm run build                                # produces ./out

terraform -chdir=infra init
terraform -chdir=infra apply
```

The site URL is in `terraform -chdir=infra output primary_web_endpoint`.

**Run from the repo root, not from `infra/`.** TFC's working-directory is
set to `infra`, so a `terraform` invocation from the repo root uploads the
whole repo (including `out/`) to TFC, then executes inside `infra/`. If
you `cd infra` and run terraform there, TFC will only receive the `infra/`
directory and the blob uploads will plan as zero files because `../out`
won't be in the upload.

## How updates work

`azurerm_storage_blob.site.content_md5` is set to `filemd5(...)`, so terraform
sees per-file content changes between applies and only replaces blobs whose
contents actually changed. New files are added; removed files are deleted by
terraform on the next apply (because `fileset` no longer lists them).

## CI deploy (GitHub Actions)

`.github/workflows/deploy.yml` runs on every push to `main` that touches
`app/`, `data/`, `infra/`, or related build files, and on manual dispatch.

It does `npm ci && npm run build` to produce `out/`, then runs
`terraform init/plan/apply` from the **repo root** with `-chdir=infra` so
that TFC's remote run receives the whole repo (including `out/`) rather
than just the `infra/` directory.

Required repo secret:

| Secret         | What it is                                                                                            |
| -------------- | ----------------------------------------------------------------------------------------------------- |
| `TF_API_TOKEN` | HCP Terraform team/user API token with access to the `papliba-org/sunny-portfolio` workspace. Surfaces as `TF_TOKEN_app_terraform_io` to the terraform CLI. |

That's the only one — Azure auth happens *inside* TFC via Dynamic
Provider Credentials, not on the GitHub runner. See the next section.

## How Azure auth works (TFC ↔ Azure OIDC federation)

The `sunny-portfolio` TFC workspace runs in **Remote** execution mode.
TFC's run environment authenticates to Azure by exchanging a workspace-
bound OIDC token for an Azure access token via the **user-assigned
managed identity** `managed-identity` in rg. Setup is one-time:

1. **Federated credentials on the MI** — two entries, one per run phase:

   ```bash
   az identity federated-credential create \
     --identity-name managed-identity --resource-group rg \
     --name tfc-sunny-portfolio-plan \
     --issuer https://app.terraform.io \
     --subject "organization:papliba-org:project:Default Project:workspace:sunny-portfolio:run_phase:plan" \
     --audiences api://AzureADTokenExchange

   az identity federated-credential create \
     --identity-name managed-identity --resource-group rg \
     --name tfc-sunny-portfolio-apply \
     --issuer https://app.terraform.io \
     --subject "organization:papliba-org:project:Default Project:workspace:sunny-portfolio:run_phase:apply" \
     --audiences api://AzureADTokenExchange
   ```

2. **TFC workspace env vars** — set on `papliba-org/sunny-portfolio`:

   | Key                       | Value                                  |
   | ------------------------- | -------------------------------------- |
   | `TFC_AZURE_PROVIDER_AUTH` | `true`                                 |
   | `TFC_AZURE_RUN_CLIENT_ID` | `09bc3a6a-8adc-45fc-8558-c428f9faefe4` (MI client ID) |
   | `ARM_TENANT_ID`           | `c0f414ff-9e2d-4011-929c-fe21ed71b218` |
   | `ARM_SUBSCRIPTION_ID`     | `e0f7f90b-e7e5-48d7-b3c7-7b313b0c595b` |

3. **TFC workspace working directory** = `infra` (so terraform commands
   executed in remote runs use the `infra/` subtree, while the upload
   tarball is the whole repo).

The MI already has `Contributor` on rg and `Storage Blob Data Contributor`
on `stjsdownloads` (granted by `stjs/infra`), which covers everything
this module touches — no extra role assignments required.

## Custom domain (optional)

1. Add a CNAME at your DNS provider pointing your hostname (e.g.
   `sunnybharne.dev`) at the `primary_web_host` output value.
2. Add the custom domain on the storage account (one-time, in the Azure
   portal or via `az storage account update --custom-domain`).
3. For HTTPS on a custom domain, front the storage account with **Azure
   Front Door** or **Azure CDN** — storage's static-website endpoint
   doesn't support custom-domain TLS on its own.
