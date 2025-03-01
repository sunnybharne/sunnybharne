# ADR 005: Defining Platform Landing Zones

## Status
Accepted / Proposed / Deprecated

## Context
Platform Landing Zones serve as the foundational layer for governance, security, and operational controls. These environments host critical services such as security monitoring, logging, and compliance enforcement, ensuring a well-managed cloud ecosystem.

## Decision
We will define the following environments for Platform Landing Zones:

| Environment Type | Purpose | Example Naming |
|-----------------|------------------------------------------------|------------------|
| **Development (Dev)** | Platform service development & configuration. | `lz-platform-dev` |
| **Testing (Test)** | Pre-production validation of platform controls. | `lz-platform-test` |
| **Pre-Production (PreProd)** | Final validation before production deployment. | `lz-platform-preprod` |
| **Production (Prod)** | Live environment enforcing governance and security. | `lz-platform-prod` |

## Implementation
1. **Azure Policy & Security Controls**:
   - Enforce governance through **Azure Policy** and **Management Groups**.
   - Apply **security baselines** to protect platform resources.
2. **Integration with ServiceNow CMDB**:
   - All platform services are registered for tracking.
   - Automated updates for configuration changes.
3. **Monitoring & Compliance**:
   - Centralized logging and monitoring.
   - Continuous compliance checks against regulatory standards.
4. **Access & Role-Based Controls (RBAC)**:
   - Restricted access to platform administrators.
   - Business units consume platform services via defined interfaces.

## Consequences
✅ **Pros**
- Provides a **secure and controlled** cloud foundation.
- Ensures **consistency in governance** across all landing zones.
- Enables **centralized compliance tracking** and enforcement.
  
❌ **Cons**
- Requires **continuous monitoring and maintenance**.
- Needs **coordination between security and platform teams**.

## ADRs as a Living Document
- Keep ADRs **updated as platform services evolve**.
- Integrate ADRs with **C4 Diagrams** for architecture visualization.

