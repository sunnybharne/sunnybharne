# ADR 004: Defining Shared Landing Zones

## Status
Accepted / Proposed / Deprecated

## Context
Shared Landing Zones provide a centralized space for hosting shared services such as networking, identity, and monitoring. These environments serve multiple business units, ensuring consistency, security, and cost efficiency.

## Decision
We will define the following environments for Shared Landing Zones:

| Environment Type | Purpose | Example Naming |
|-----------------|------------------------------------------------|------------------|
| **Development (Dev)** | Shared service development & configuration. | `lz-shared-dev` |
| **Testing (Test)** | Pre-production validation; security policies enforced. | `lz-shared-test` |
| **Pre-Production (PreProd)** | Near-production environment for final validation. | `lz-shared-preprod` |
| **Production (Prod)** | Hosting shared services for all business units. | `lz-shared-prod` |

## Implementation
1. **Azure Policy Enforcement**: Naming rules and security policies enforced via Azure Policy.
2. **Integration with ServiceNow CMDB**:
   - Each shared landing zone is registered in CMDB.
   - Automated tracking of shared resource lifecycle in ServiceNow.
3. **Role-Based Access Control (RBAC)**:
   - Restricted access with least privilege.
   - Business units consume shared services via defined interfaces.
4. **Management Groups & Tagging**: Standardized grouping for governance and cost management.

## Consequences
✅ **Pros**
- Reduces **duplication of shared resources** across business units.
- Improves **security and governance** consistency.
- Enables **cost optimization** by consolidating services.
  
❌ **Cons**
- Requires **strict governance** to prevent unauthorized changes.
- Needs **effective service level agreements (SLAs)** between teams.

## ADRs as a Living Document
- Keep ADRs **updated as shared services evolve**.
- Integrate ADRs with **C4 Diagrams** for architecture visualization.
