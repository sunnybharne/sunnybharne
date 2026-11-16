---
title: "Azure Policy assignments at management-group scope"
description: "I tested which subscriptions inherited an assignment and what operators could see in the portal."
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
draft: false
---

I created a low-impact policy assignment at the parent management group, checked it in the child subscriptions, and removed it. The scope determined which subscriptions inherited the assignment. Exclusions narrowed its reach, and the enforcement setting controlled how Azure applied the effect.

The portal showed the assignment description but had little space for ownership or change history. I’ll put a short description on the assignment, keep ownership in the infrastructure repository, and use the deployment history to track changes.

My next test is to deploy and remove the same assignment through infrastructure as code.
