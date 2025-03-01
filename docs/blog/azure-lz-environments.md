---
title: "ADR: Defining Environments for Azure Landing Zones"
description: "A structured ADR for defining environments in Azure Landing Zones within an enterprise setup."
---

# ADR: Defining Environments for Azure Landing Zones 🌍

## Why Define Environments in Landing Zones?
Defining **environments** in Azure Landing Zones is crucial for **scalability, security, and governance**. A well-structured environment setup ensures:
- **Clear separation between workloads** (Development, Testing, Production).
- **Compliance with security policies** at different stages.
- **Streamlined cost allocation & monitoring**.

## What is an ADR (Architecture Decision Record)?
An **Architecture Decision Record (ADR)** captures key architectural decisions, providing transparency on why choices were made.

### ADR Structure (Following Michael Nygard’s Template)

```md
# ADR 002: Defining Environments for Azure Landing Zones

## Status
Accepted / Proposed / Deprecated

## Context
Our enterprise requires a clear definition of environments within Azure Landing Zones to:
- Ensure workload isolation for different stages of development.
- Maintain compliance, security, and cost tracking.
- Standardize deployment pipelines and governance.

## Decision
We will define the following standard environments:

| Environment | Purpose |
|------------|------------------------------------------------|
| **Sandbox**  | Personal experimentation; no governance enforcement. |
| **Development (Dev)** | Active feature development; minimal restrictions. |
| **Testing (Test)** | Pre-production validation; security policies applied. |
| **Staging (Stage)** | Near-production environment for final validation. |
| **Production (Prod)** | Live environment; highest security & compliance. |

Naming convention for landing zones:
**`lz-<environment>-<business_unit>`**

Examples:
- `lz-dev-finance`
- `lz-stage-marketing`
- `lz-prod-sales`

## Consequences
✅ **Pros**
- Ensures **consistent environment separation**.
- Reduces security risks by applying **tiered policies**.
- Simplifies **CI/CD workflows** across teams.
  
❌ **Cons**
- Requires **documentation & team training**.
- Some overhead in maintaining **multiple environments**.
```

## Best Practices for Environment Structuring
- Align with **Microsoft’s Enterprise-Scale Landing Zone** framework.
- Apply **Azure Policy** to enforce security compliance per environment.
- Use **Management Groups** for cost tracking and access control.

📌 **Reference**: [Microsoft Cloud Adoption Framework (CAF)](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ready/enterprise-scale/)

## Implementing This in an Enterprise
- Define **subscription & resource group structure** for each environment.
- Automate environment setup using **Terraform / Bicep**.
- Store ADRs in a **GitHub repo / Azure DevOps Wiki** for visibility.

## ADRs as a Living Document
- ADRs should evolve **with business needs**.
- Keep documentation **concise & relevant**.
- Integrate ADRs with **C4 Diagrams** for architecture visualization.

---
