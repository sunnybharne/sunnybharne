---
title: "Azure naming conventions, simply"
description: "Choose a readable naming pattern, handle Azure's exceptions, and record the decision."
date: 2026-09-07
track: azure-platform
provider: Microsoft Learn
tags:
  - azure
  - governance
  - architecture
draft: false
---

**A naming convention makes a resource's purpose easy to recognise.** Microsoft provides guidance and abbreviations; your organisation chooses the pattern. Azure's service-specific naming rules still apply. [Microsoft naming guidance](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ready/azure-best-practices/resource-naming).

## Start with one pattern

Use Papliba as an example organisation:

```text
<type>-<workload>-<environment>-<region>-<instance>

id-policy-gha-prod-swc-001
```

| Part | Meaning |
|---|---|
| `id` | User-assigned managed identity. |
| `policy-gha` | Policy deployment through GitHub Actions. |
| `prod` | An operational production service. |
| `swc` | Our chosen code for Sweden Central (`swedencentral`). |
| `001` | First instance; keep this value stable. |

The resource group can be **`rg-policy-prod-swc-001`**. It groups the policy service's resources; the identity name adds its specific role.

A subscription called **Platform** describes its function. Resources inside it can still have an environment such as `prod`. The region in an identity's name describes its location, not where it is allowed to access resources.

## Choose a small vocabulary

Use `dev`, `test`, and `prod` for environments. Agree on region codes, such as `swc` for Sweden Central and `weu` for West Europe. These short codes are team choices.

Reuse Microsoft's resource abbreviations:

| Resource | Prefix |
|---|---|
| Resource group | `rg` |
| Managed identity | `id` |
| Virtual network / subnet | `vnet` / `snet` |
| Network security group | `nsg` |
| Virtual machine | `vm` |
| Storage account | `st` |
| Key Vault | `kv` |
| Function App | `func` |
| Log Analytics workspace | `log` |

[Microsoft abbreviation reference](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ready/azure-best-practices/resource-abbreviations).

## Handle the exceptions

| Resource | What changes |
|---|---|
| Storage account | Only lowercase letters and numbers; 3–24 characters and globally unique. Example: `stplbpolprodswca1b2`. |
| Key Vault | Globally unique; 3–24 characters. Use shorter tokens: `kv-plb-pol-prod-swc-a1b2`. |
| Windows hostname | Separate from the Azure resource name; keep at most 15 characters. Example: `ppolprswc001`. |
| Policy assignment | Use a short purpose key such as `pa-winpwd-prod`. Management-group assignments allow at most 24 characters for the resource name. |
| Reserved subnet | Keep required service names such as `AzureFirewallSubnet`. |

Here, `plb` means Papliba and `pol` means policy. The suffix is allocated once and checked for availability; it is not regenerated on each deployment. Examples do not reserve globally unique names. [Azure naming restrictions](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/resource-name-rules).

## Put changing details in tags

Keep the name focused on stable purpose. Use tags for ownership and management details:

```text
organization = papliba
workload     = policy
environment  = prod
owner        = platform
managedBy    = terraform
```

Use `managedBy=terraform` only when Terraform actually manages the resource. Apply tags explicitly: resources do not inherit their resource group's tags automatically. [Azure tags](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/tag-resources).

## Record it as an ADR

An **Architecture Decision Record** is a short Markdown file in the infrastructure repository. Record:

1. **Context:** why the team needs a convention.
2. **Decision:** component order, allowed values, and examples.
3. **Exceptions:** service limits, reserved names, and existing resources.
4. **Consequences:** how code generates names and how changes are reviewed.

Apply the decision to new resources. Most Azure resource names cannot be changed in place, so do not recreate working resources just for cosmetic consistency. An ADR documents the rule; infrastructure code and any separately configured Azure Policies enforce it.

For a deployment identity, the next steps are GitHub federation and Azure permissions. A well-named identity alone cannot deploy resources.
