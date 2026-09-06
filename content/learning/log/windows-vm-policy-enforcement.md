---
title: "Windows VM policies: audit to apply"
description: "Four password rules, VM tag opt-in, and the difference between applying and monitoring."
date: 2026-09-06
track: azure-platform
provider: Azure Machine Configuration lab
tags:
  - azure-policy
  - windows
  - machine-configuration
draft: false
---

> **Prod test VM: 4/4 rules compliant.** Verified on 6 September 2026. Tag opt-in is configured; new-VM and offboarding tests are pending.

[ASC Default](/learning/asc-default-policy-guide/) audits Microsoft's baseline. Our **custom initiative** changes four local Windows settings.

## The four rules

| Rule | Verified value | What it does |
|---|---:|---|
| [Maximum password age](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-10/security/threat-protection/security-policy-settings/maximum-password-age) | 60 days | Expires local passwords unless the account is exempt. |
| [Minimum password length](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-10/security/threat-protection/security-policy-settings/minimum-password-length) | 14 characters | Requires at least 14 characters when setting a password. |
| [Password history](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-10/security/threat-protection/security-policy-settings/enforce-password-history) | 24 passwords | Prevents reuse of remembered passwords. |
| [Minimum password age](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-10/security/threat-protection/security-policy-settings/minimum-password-age) | 1 day | Stops ordinary users quickly cycling through password history. |

These are lab values. Existing passwords are not replaced. Domain controllers are excluded; domain policy can override local settings.

| Test VM | Extension | Custom rules |
|---|---|---|
| Prod | Installed | Tagged; 4/4 compliant |
| Platform | Absent | Not assigned |

## Application teams choose by tag

The initiative stays assigned to **Prod subscription**. To opt in, put `ApplyWindowsPasswordBaseline` on the **VM itself**.

| VM tag | Custom password policies |
|---|---|
| Present, with any value | Eligible to apply all four rules |
| Missing | Outside these policies |

Use `ApplyWindowsPasswordBaseline = true` for clarity. **Even `false` counts as present**: only existence matters. [Policy conditions](https://learn.microsoft.com/en-us/azure/governance/policy/concepts/definition-structure-policy-rule)

Resource group/subscription tags do not count; resources [do not inherit tags automatically](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/tag-resources#inherit-tags). The Prod test VM is opted in. Platform remains outside this initiative.

**Removing the tag is not a rollback.** Windows values stay as configured. For full opt-out, verify and remove this initiative's existing guest assignments; do not rely on tag removal to clean them up. [Assignment lifecycle](https://learn.microsoft.com/en-us/azure/governance/machine-configuration/concepts/assignments)

## How settings reach Windows

**Prod + VM tag → prepare → download → apply → report**

1. **Prepare:** Microsoft's [Deploy prerequisites to enable Guest Configuration policies on virtual machines](https://learn.microsoft.com/en-us/azure/governance/machine-configuration/concepts/remediation-options) installs the extension and enables the VM's system identity. This remains subscription-wide.
2. **Select:** the VM tag gates **four rule policies + one package-access policy**. ASC Default's audits remain unchanged.
3. **Download:** our helper attaches a shared user-assigned identity with [read access to the private package container](https://learn.microsoft.com/en-us/azure/governance/machine-configuration/how-to/develop-custom-package/5-access-package).
4. **Apply:** four `DeployIfNotExists` policies deliver guest assignments. The extension downloads packages, changes settings, and reports compliance.

A **package** is a ZIP: desired setting + code to check/change it. Each rule has its own custom package. Microsoft's `AzureWindowsBaseline` remains an audit package in this lab. [Package documentation](https://learn.microsoft.com/en-us/azure/governance/machine-configuration/how-to/develop-custom-package/2-create-package)

## Apply once or keep correcting?

`DeployIfNotExists` delivers configuration. **Machine Configuration mode** controls Windows behavior. [Microsoft's modes](https://learn.microsoft.com/en-us/azure/governance/machine-configuration/concepts/remediation-options)

| Mode | Behavior | This lab |
|---|---|---|
| Audit | Check and report. | Original ASC baseline |
| ApplyAndMonitor | Apply, then report later drift. | **Four custom rules** |
| ApplyAndAutoCorrect | Apply and correct later drift. | Not enabled |

**`EnableAutoRemediation`:** an automatic-application switch from [Microsoft's policy generator](https://www.powershellgallery.com/packages/GuestConfiguration/4.12.0). First test: `false`, audit first. Now: **`true`**, apply automatically. Explicit remediation can apply changes with either value.

Continuous correction is separate. In ApplyAndMonitor, remediation or an Azure VM resource update can reapply settings.

## What the test proved

- First test: maximum age **42 → 60**. Expanded initiative: length **0 → 14**, history **0 → 24**, minimum age **0 → 1**.
- **4/4 compliant reports**, confirmed with `net accounts`. Lockout settings unchanged.
- Preparation remediation fixed package access; rule remediation applied settings. Azure Policy's summary lagged behind VM reports.

## Next tests

1. Compare new tagged and untagged Windows VMs in Prod.
2. Add the tag to an existing VM; check delivery and remediation timing.
3. Remove the tag; verify offboarding and retained Windows values.
4. Change a setting; compare monitoring with automatic correction.

**One existing VM is verified.** Target: supported individual Windows VMs with the opt-in tag in Prod. Linux, Arc, uniform scale sets, tagged AKS nodes and excluded legacy images are outside scope.
