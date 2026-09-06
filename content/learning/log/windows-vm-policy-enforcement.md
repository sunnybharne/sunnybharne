---
title: "Windows VM policies: audit to apply"
description: "Four password rules. One subscription initiative. Verified inside Windows."
date: 2026-09-06
track: azure-platform
provider: Azure Machine Configuration lab
tags:
  - azure-policy
  - windows
  - machine-configuration
draft: false
---

> **Prod test VM: 4/4 rules compliant.** Settings verified on 6 September 2026. Applies once; later drift is reported.

[ASC Default](/learning/asc-default-policy-guide/) still audits Microsoft's security baseline. This lab adds a **custom initiative** to change four local Windows settings.

## The four rules

| Rule | Verified value | What it does |
|---|---:|---|
| [Maximum password age](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-10/security/threat-protection/security-policy-settings/maximum-password-age) | 60 days | Expires local passwords unless the account is exempt. |
| [Minimum password length](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-10/security/threat-protection/security-policy-settings/minimum-password-length) | 14 characters | Requires at least 14 characters when setting a password. |
| [Password history](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-10/security/threat-protection/security-policy-settings/enforce-password-history) | 24 passwords | Prevents reuse of remembered passwords. |
| [Minimum password age](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-10/security/threat-protection/security-policy-settings/minimum-password-age) | 1 day | Stops ordinary users quickly cycling through password history. |

These are this lab's chosen values. Existing passwords are not replaced. Domain controllers are excluded; domain policy can override local settings.

## What runs where

| Lab setup | Prod | Platform |
|---|---|---|
| ASC Default assignment | Present | Present |
| Machine Configuration extension | Installed | Absent |
| New custom initiative | Assigned | Not assigned |
| Four custom rule results | Compliant | Not evaluated |

Checking **inside** an Azure VM needs the extension and identity. An assignment alone cannot run those checks.

## How settings reach Windows

**Subscription → prepare VM → deliver package → apply → report**

1. **Scope:** Prod subscription. **Four rule policies + one package-access policy** in a custom initiative.
2. **Prepare:** Microsoft's [Deploy prerequisites to enable Guest Configuration policies on virtual machines](https://learn.microsoft.com/en-us/azure/governance/machine-configuration/concepts/remediation-options) installs the extension and enables the VM's system identity.
3. **Download:** our helper attaches a specified shared user-assigned identity with [read access to the private package container](https://learn.microsoft.com/en-us/azure/governance/machine-configuration/how-to/develop-custom-package/5-access-package).
4. **Apply:** four `DeployIfNotExists` policies deliver guest assignments. The extension downloads packages, changes settings, and reports compliance.

A **package** is a ZIP: desired setting + code to read, check, and change it. We built one per rule, separate from Microsoft's `AzureWindowsBaseline` audit package. [Package documentation](https://learn.microsoft.com/en-us/azure/governance/machine-configuration/how-to/develop-custom-package/2-create-package)

## Apply once or keep correcting?

`DeployIfNotExists` delivers the configuration. The **Machine Configuration mode** controls what happens inside Windows. [Microsoft's modes](https://learn.microsoft.com/en-us/azure/governance/machine-configuration/concepts/remediation-options)

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
- Missing package identity caused download failures. Preparation remediation fixed access; rule remediation applied settings.
- Azure Policy's summary lagged behind the VM reports.

## Next tests

1. Create another Windows VM in Prod; verify automatic preparation and all four rules.
2. Change a setting; compare drift reporting with automatic correction on the lab VM.

Scope includes future supported individual Windows VMs in Prod; **one existing VM is verified**. Linux, Arc, uniform scale sets, tagged AKS nodes and excluded legacy images are outside this custom policy's scope.
