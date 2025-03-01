---
title: "Creating an ADR for Naming Azure Landing Zones & Resources"
description: "A structured guide on writing an ADR for naming conventions in large enterprise Azure environments."
---

# Creating an ADR for Naming Azure Landing Zones & Resources in a Large Enterprise 🚀

## Why Naming Matters in Large Enterprises
Naming conventions play a crucial role in managing Azure resources efficiently. In large enterprises, consistent naming helps with:
- **Governance & Compliance** – Easier tracking and auditing.
- **Automation & Infrastructure as Code** – Simplifies scripts and deployments.
- **Cost Management & Billing** – Enables accurate chargeback and budgeting.

## What is an ADR (Architecture Decision Record)?
An **Architecture Decision Record (ADR)** documents the reasoning behind architectural decisions. It provides context, captures alternatives, and ensures future teams understand why choices were made.

### ADR Structure (Following Michael Nygard’s Template)

```md
# ADR 001: Naming Conventions for Azure Landing Zones & Resources

## Status
Accepted / Proposed / Deprecated

## Context
Our enterprise has multiple teams deploying Azure resources. We need a clear naming convention to:
- Ensure consistency across subscriptions.
- Simplify automation & monitoring.
- Align with Microsoft’s best practices.

## Decision
We will use the following naming convention:

**Landing Zones:** `lz-<environment>-<business_unit>`  
**Resources:** `<resource_type>-<business_unit>-<environment>-<region>`  

**Examples:**
- `lz-prod-finance`
- `vm-finance-prod-eastus`
- `aks-marketing-dev-westeurope`

## Consequences
✅ **Pros**
- Standardized and scalable.
- Easier to manage across teams.
  
❌ **Cons**
- Requires upfront documentation & training.
```

## Azure Landing Zone Naming Best Practices
To align with **Microsoft’s Cloud Adoption Framework (CAF)**, follow these best practices:
- Use **clear prefixes** (`lz-`, `vm-`, `aks-`) for readability.
- Include **environment** (`prod`, `dev`, `staging`) and **business unit**.
- Keep names **short & meaningful** to avoid hitting Azure's character limits.

📌 **Reference**: [Microsoft Naming Guidelines](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ready/azure-best-practices/resource-naming)

## Implementing This in an Enterprise
- **Enforce Naming with Azure Policy** – Automate compliance checks.
- **Integrate with CI/CD Pipelines** – Validate naming conventions in PRs.
- **Centralize ADRs in a GitHub Repo or Azure DevOps Wiki** – Ensure visibility across teams.

## Final Thoughts: ADRs as a Living Document
- Keep ADRs **focused and concise**.
- Update ADRs as architecture evolves.
- Combine ADRs with **C4 Diagrams** to visualize resource structures.

---
