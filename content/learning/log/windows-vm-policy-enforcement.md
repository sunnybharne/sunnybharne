---
title: "Windows VM policies: audit to apply"
description: "Four Windows password rules: shared VM tag, simplified policy code, and what each section does."
date: 2026-09-06
track: azure-platform
provider: Azure Machine Configuration lab
tags:
  - azure-policy
  - windows
  - machine-configuration
draft: false
---

> **Prod test VM: 4/4 rules compliant**, verified on 6 September 2026 before this code simplification. Version 1.3.0 keeps the same packages and settings. A fresh scan, new-VM and offboarding tests are pending.

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

The initiative stays assigned to **Prod subscription**. The new opt-in tag is **`vmsecurityBenchmarks = true`**, on the **VM itself**.

| VM tag | Custom password policies |
|---|---|
| `vmsecurityBenchmarks = true` | Eligible to apply all four rules |
| `false` or missing | Outside these policies |

**One shared parameter:** `BenchmarkTagName` defaults to `vmsecurityBenchmarks`. The initiative passes it to all four rule policies and the package-access helper. It chooses the tag name; **it does not add tags to VMs**. [Initiative parameters](https://learn.microsoft.com/en-us/azure/governance/policy/concepts/initiative-definition-structure#parameters)

Every policy checks the same shared tag parameter.

Use VM tags: resource group/subscription tags [do not inherit automatically](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/tag-resources#inherit-tags).

**Removing the tag or setting `false` is not a rollback.** Windows values remain. For full opt-out, verify and remove this initiative's existing guest assignments. [Assignment lifecycle](https://learn.microsoft.com/en-us/azure/governance/machine-configuration/concepts/assignments)

## How settings reach Windows

**Prod + tag=true → prepare → download → apply → report**

1. **Prepare:** Microsoft's [Deploy prerequisites to enable Guest Configuration policies on virtual machines](https://learn.microsoft.com/en-us/azure/governance/machine-configuration/concepts/remediation-options) installs the extension and enables the VM's system identity. This remains subscription-wide.
2. **Select:** the VM tag must equal `true` for **four rule policies + one package-access policy**. ASC Default's audits remain unchanged.
3. **Download:** our helper attaches a shared user-assigned identity with [read access to the private package container](https://learn.microsoft.com/en-us/azure/governance/machine-configuration/how-to/develop-custom-package/5-access-package).
4. **Apply:** four `DeployIfNotExists` policies deliver guest assignments. The extension downloads packages, changes settings, and reports compliance.

A **package** is a ZIP: desired setting + code to check/change it. Each rule has its own custom package. Microsoft's `AzureWindowsBaseline` remains an audit package in this lab. [Package documentation](https://learn.microsoft.com/en-us/azure/governance/machine-configuration/how-to/develop-custom-package/2-create-package)

## Read the policy code

**Select VM → check guest assignment → deploy configuration → extension changes Windows.**

The four rules use the same structure, with different package names, URLs and hashes. Removed: repeated VM checks, the unreachable scale-set deployment, the publisher list and descriptive metadata. Required service metadata, exclusions and deployment details remain.

This is **only the selection excerpt**, not a deployable policy. The full file also excludes tagged AKS nodes and legacy image patterns.

```json
{
  "allOf": [
    { "field": "type", "equals": "Microsoft.Compute/virtualMachines" },
    { "field": "Microsoft.Compute/virtualMachines/storageProfile.osDisk.osType", "equals": "Windows" },
    { "field": "[concat('tags[', parameters('BenchmarkTagName'), ']')]", "equals": "true" }
  ]
}
```

| Code section | What it does |
|---|---|
| `mode: Indexed` | Evaluates resources that support tags and location. |
| `parameters` | Accepts the shared tag name and automatic-application switch. |
| `metadata.guestConfiguration` | Gives Machine Configuration the package details and application mode. |
| `policyRule.if` | Selects opted-in Windows VMs; retains AKS and legacy-image exclusions. |
| `then.effect: deployIfNotExists` | Delivers the configuration when the required compliant assignment is missing. Existing VMs can need remediation. |
| `details.name` + `existenceCondition` | Finds this rule's unique guest assignment and checks compliance. The parameter check keeps `EnableAutoRemediation` referenced in the rule. |
| `roleDefinitionIds` | Lists permissions needed by the **policy assignment identity** to deploy. |
| `deployment` / `template` | Creates the guest assignment under the selected VM. |
| Template `guestConfiguration` | Supplies the ZIP URL, integrity hash, download identity and `ApplyAndMonitor` mode. |

[Policy structure](https://learn.microsoft.com/en-us/azure/governance/policy/concepts/definition-structure-basics) · [DeployIfNotExists fields](https://learn.microsoft.com/en-us/azure/governance/policy/concepts/effect-deploy-if-not-exists)

**Package details appear twice:** the service reads metadata; the deployment template creates the Azure resource. Both are [required for this policy type](https://learn.microsoft.com/en-us/azure/governance/machine-configuration/how-to/create-policy-definition#policy-requirements-for-machine-configuration).

**The `60`-day setting lives inside the ZIP**, in its desired configuration and check/change code. The policy delivers the package; the extension changes Windows.

**The helper preserves existing identities:** read → merge the package-download identity → save. These steps protect identities other applications already use.

Reference JSON: [60-day rule](/learning-assets/windows-vm-policy-enforcement/windows-local-password-age-60.json) · [Identity helper](/learning-assets/windows-vm-policy-enforcement/windows-policy-package-identity.json) · [Shared initiative](/learning-assets/windows-vm-policy-enforcement/initiative.json). **Deployment-specific values are placeholders; replace them before use.**

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

1. Compare new Prod Windows VMs with tag `true`, `false`, and missing.
2. Set the tag to `true` on an existing VM; check delivery and remediation timing.
3. Remove the tag or set `false`; verify offboarding and retained Windows values.
4. Change a setting; compare monitoring with automatic correction.

**One existing VM is verified.** Target: supported individual Windows VMs with `vmsecurityBenchmarks=true` in Prod. Linux, Arc, uniform scale sets, tagged AKS nodes and excluded legacy images are outside scope.
