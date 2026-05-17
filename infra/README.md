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
`terraform init/plan/apply` from the **repo root** with `-chdir=infra`.
The job binds to the `prod` GitHub Actions environment — that's what
makes the Azure OIDC handshake succeed (see auth section below).

### What the `prod` environment holds

| Item                                      | Type    | Value                                                                                                                           |
| ----------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `AZURE_CLIENT_ID`                         | var     | Client ID of the user-assigned MI `managed-identity`.                                                                           |
| `AZURE_TENANT_ID`                         | var     | Azure AD tenant.                                                                                                                |
| `AZURE_SUBSCRIPTION_ID`                   | var     | Subscription that owns `stjsdownloads`.                                                                                         |
| `TF_API_TOKEN`                            | secret  | HCP Terraform user/team token with access to the `papliba-org/sunny-portfolio` workspace. Surfaces as `TF_TOKEN_app_terraform_io`. |

## How auth works

Two independent handshakes:

1. **GitHub Actions runner → Azure (OIDC, no secret).**
   The `id-token: write` permission lets the runner mint a GitHub OIDC
   token. The azurerm provider exchanges it for an Azure AAD token via
   the federated credential on the user-assigned MI `managed-identity`
   in rg. The federated-credential subject is
   `repo:sunnybharne/sunnybharne:environment:prod`, which is why the job
   must declare `environment: prod`. The MI already has the roles it
   needs: `Contributor` on rg and `Storage Blob Data Contributor` on
   `stjsdownloads` (granted by `stjs/infra`).

2. **Runner → HCP Terraform (API token).**
   The `TF_API_TOKEN` secret authenticates the terraform CLI to the TFC
   backend so it can read and write workspace state. TFC is in **Local**
   execution mode — it stores state, but the apply runs on the GH
   Actions runner (or your laptop), which is what holds the Azure
   credentials. TFC never talks to Azure here.

## Custom domain (optional)

1. Add a CNAME at your DNS provider pointing your hostname (e.g.
   `sunnybharne.dev`) at the `primary_web_host` output value.
2. Add the custom domain on the storage account (one-time, in the Azure
   portal or via `az storage account update --custom-domain`).
3. For HTTPS on a custom domain, front the storage account with **Azure
   Front Door** or **Azure CDN** — storage's static-website endpoint
   doesn't support custom-domain TLS on its own.
