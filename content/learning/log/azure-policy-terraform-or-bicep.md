---
title: "Azure Policy as code: Terraform or Bicep?"
description: "How Terraform and Bicep handle assignment removal, state, and remediation on an existing Azure platform."
date: 2026-09-07
track: azure-platform
provider: Microsoft Learn
tags:
  - azure
  - governance
  - terraform
  - bicep
  - architecture
draft: false
---

I use Terraform because this platform already deploys infrastructure through Terraform and GitHub Actions. Reviewers see additions and removals in one plan. Microsoft documents policy assignments with both [Terraform](https://learn.microsoft.com/en-us/azure/governance/policy/assign-policy-terraform) and [Bicep](https://learn.microsoft.com/en-us/azure/governance/policy/assign-policy-bicep).

## What are we choosing?

A **policy definition** describes a rule. An **initiative** groups definitions. An **assignment** applies a definition or initiative to a scope, with parameters and any exclusions.

Both tools deploy these resources. Azure Policy evaluates the assignments and applies their configured effects.

## Compare the choices

| Decision point | Terraform | Bicep |
|---|---|---|
| Policy deployment | Can manage definitions, initiatives and assignments. | Can manage the same Azure resource types. |
| State | Maintains a state file linking code to managed resources. | No separate client-managed state file. |
| Preview | `terraform plan`. | Azure deployment `what-if`. |
| Existing platform | Fits a team already using Terraform modules and pipelines. | Fits a team already using Azure Resource Manager and Bicep. |
| Azure API coverage | AzureRM provides typed resources; AzAPI covers API needs beyond AzureRM. | Uses Azure resource API versions directly. |
| Operational cost | Secure and maintain the state backend and provider versions. | Maintain deployment scopes, modules and a deliberate removal process. |

[Microsoft's Terraform and Bicep comparison](https://learn.microsoft.com/en-us/azure/developer/terraform/comparing-terraform-and-bicep).

## Removing a policy

With Terraform, a plan normally proposes deleting it if Terraform still tracks it in that state. Review that deletion before applying.

With a normal incremental Bicep deployment, omitting a resource leaves it in Azure. Define how retired assignments will be removed. Azure deployment stacks are an option to evaluate, subject to their supported scopes and resource types; ordinary incremental deployments do not provide that cleanup automatically. [Azure deployment modes](https://learn.microsoft.com/en-us/azure/azure-resource-manager/templates/deployment-modes).

Whichever tool we choose, one tool should own each assignment. Avoid having Terraform and Bicep both update the same policy resources.

## Deployment checks

- Keep policy rules in JSON and scopes and parameters explicit in code.
- Review a plan before applying changes, especially removals and scope changes.
- Protect state and import existing resources before taking ownership of them.
- Test policy behavior in a limited scope before broader assignment.

The state backend can use HCP Terraform or Azure Blob Storage with locking. [Store Terraform state in Azure Storage](https://learn.microsoft.com/en-us/azure/developer/terraform/get-started/store-state-in-azure-storage).

## Remediation still needs its own configuration

For `deployIfNotExists` and `modify`, include the assignment's managed identity and the permissions it needs. The identity deploying the policy and the identity performing remediation have different jobs.

Listing `roleDefinitionIds` inside a policy does not, by itself, create the required role assignments in an IaC deployment. Configure those grants explicitly, using the minimum access needed. Existing non-compliant resources may also need a remediation task. [Microsoft remediation guidance](https://learn.microsoft.com/en-us/azure/governance/policy/how-to/remediate-resources).

For settings inside a VM, there is another layer: Machine Configuration and a configuration that can apply the settings. See [Azure Windows baseline checks](/articles/azure-windows-baseline/).

## When I would choose differently

**Choose Bicep** when starting an Azure-only platform whose team prefers Azure-native deployments and wants to avoid maintaining a separate state backend. Agree on the removal process at the start.

**Evaluate Enterprise Policy as Code (EPAC)** when policy management becomes a dedicated enterprise workflow across many scopes, assignments and exemptions. EPAC is a policy-focused solution with its own deployment approach. It can coexist with infrastructure managed by Terraform, but ownership of policy resources must be clear. [EPAC documentation](https://azure.github.io/enterprise-azure-policy-as-code/).
