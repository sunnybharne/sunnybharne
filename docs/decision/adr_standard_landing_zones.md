# ADR 003: Defining Standard Landing Zones

## Status
Accepted / Proposed / Deprecated

## Context
Standard Landing Zones are dedicated to business unit-specific applications. These environments are designed to host workloads with appropriate security, compliance, and governance policies while allowing teams the flexibility to manage their own resources.

## Decision
We will define the following environments for Standard Landing Zones:

| Environment Type | Purpose | Example Naming |
|-----------------|------------------------------------------------|------------------|
| **Development (Dev)** | Active feature development; limited security policies. | `lz-dev-finance` |
| **Testing (Test)** | Pre-production validation; security policies enforced. | `lz-test-marketing` |
| **Pre-Production (PreProd)** | Near-production environment for final validation. | `lz-preprod-sales` |
| **Production (Prod)** | Live production workloads; highest security & compliance. | `lz-prod-hr` |

## Implementation
1. **Azure Policy Enforcement**: Naming rules and security policies enforced via Azure Policy.
2. **Integration with ServiceNow CMDB**:
   - Each standard landing zone is registered in CMDB.
   - Automated tracking of environment lifecycle in ServiceNow.
3. **Management Groups & Tagging**: Standardized grouping for governance and cost management.

## Consequences
✅ **Pros**
- Ensures business unit **autonomy** while maintaining governance.
- Provides **clear workload isolation** for application teams.
- Allows easy **cost tracking and billing segregation**.
  
❌ **Cons**
- Requires **governance policies** to prevent security misconfigurations.
- Needs **periodic auditing** to ensure compliance.

## ADRs as a Living Document
- Keep ADRs **updated as requirements evolve**.
- Integrate ADRs with **C4 Diagrams** for architecture visualization.

