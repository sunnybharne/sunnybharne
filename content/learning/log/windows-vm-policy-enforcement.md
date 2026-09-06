---
title: "Windows VM policies: audit to apply"
description: "Four local password settings, one VM tag, no automatic drift correction."
date: 2026-09-06
track: azure-platform
provider: Azure Machine Configuration lab
tags:
  - azure-policy
  - windows
  - machine-configuration
draft: false
---

[ASC Default](/articles/asc-default-policy-guide/) audits the baseline. This custom initiative **changes four local Windows password settings**.

## Settings

| Setting | Value | Effect |
|---|---|---|
| Maximum password age | 60 days | Expires passwords unless the account is exempt. |
| Minimum password length | 14 characters | Applies when setting a password. |
| Password history | 24 passwords | Blocks reuse of remembered passwords. |
| Minimum password age | 1 day | Stops users quickly cycling through password history. |

These are lab values, not a general recommendation. Existing passwords are not replaced. Domain policy can override local settings.

## Opt in

The initiative is assigned to **Prod**. Add this tag to a supported Windows **VM**:

```text
vmsecurityBenchmarks = true
```

`false` or missing means the VM is not selected. Resource group and subscription tags do not inherit automatically.

`BenchmarkTagName` sets the shared tag name; it does not tag VMs.

**Removing the tag does not undo settings or remove existing guest assignments.** Offboarding needs assignment cleanup and separate restoration of Windows values.

## How it applies

1. Subscription-wide prerequisites install the extension and enable the VM's system identity.
2. For tagged VMs, a helper adds the package-download identity without replacing existing identities.
3. Four `DeployIfNotExists` policies create guest assignments. The extension downloads private ZIP packages, applies their settings, and reports compliance. Existing VMs may need remediation.

The ZIP contains the desired value and check/change code. The policy delivers it.

**Mode: `ApplyAndMonitor`.** Apply settings, then report drift—not continuous correction. Remediation or an Azure VM resource update can reapply settings.

`EnableAutoRemediation=true` enables automatic application. It does **not** mean `ApplyAndAutoCorrect`.

## Verified and pending

One existing Prod VM passed **4/4 rules**, confirmed with `net accounts` on **6 September 2026**. Lockout settings stayed unchanged.

That test preceded the version 1.3.0 policy simplification. Fresh validation, new-VM, tag-change, offboarding and drift tests remain pending.

Scope: supported individual Windows VMs. Domain controllers, Linux, Arc, uniform scale sets, tagged AKS nodes and excluded legacy images are outside this lab.

## Code and references

- [60-day policy](/learning-assets/windows-vm-policy-enforcement/windows-local-password-age-60.json)
- [Identity helper](/learning-assets/windows-vm-policy-enforcement/windows-policy-package-identity.json)
- [Shared initiative](/learning-assets/windows-vm-policy-enforcement/initiative.json)
- [Microsoft: application modes](https://learn.microsoft.com/en-us/azure/governance/machine-configuration/concepts/remediation-options)
- [Microsoft: assignment lifecycle](https://learn.microsoft.com/en-us/azure/governance/machine-configuration/concepts/assignments)

JSON files contain deployment placeholders. Replace them before use.
