---
title: "Azure Policy assignments at management-group scope"
description: "A hands-on exploration of assignment scope, visible metadata, RBAC, and cleanup in the Azure portal."
date: 2026-08-27
track: azure-platform
provider: Azure portal and Microsoft Learn
resourceTitle: "Azure Policy assignment structure"
resourceUrl: https://learn.microsoft.com/azure/governance/policy/concepts/assignment-structure
minutes: 60
tags:
  - azure
  - governance
  - policy
evidence:
  - title: "Azure Policy assignment structure"
    provider: Microsoft Learn
    url: https://learn.microsoft.com/azure/governance/policy/concepts/assignment-structure
draft: false
---

## What I learned

I explored how an Azure Policy assignment behaves when it is created at the
parent management-group scope. The scope determines which child subscriptions
are covered, while exclusions and enforcement settings refine how the
assignment is applied.

The Azure portal's assignment page provides limited room for operator-facing
context. A concise description is useful there, but richer ownership and
change information belongs in the infrastructure source and deployment
history, with links added where the portal makes them visible.

## What I tried

I created a low-impact policy assignment, reviewed how it appeared across the
selected subscriptions, tested the visible description, and then removed the
assignment after the experiment.

## Next step

Express the same assignment through infrastructure as code with a consistent
description format, source-controlled ownership information, and a testable
cleanup path.
