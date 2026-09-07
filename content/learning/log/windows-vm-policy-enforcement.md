---
title: "ASC Default Policies: Audit to Apply"
description: "Apply selected security controls identified by ASC Default, with VM guest configuration as one example."
date: 2026-09-06
track: azure-platform
provider: Azure Machine Configuration lab
tags:
  - azure-policy
  - windows
  - machine-configuration
draft: false
---

[ASC Default](/articles/asc-default-policy-guide/) helps identify security gaps. **Fixing a gap needs a separate action.** Choose how to apply each selected control based on what it needs to change. There is no single switch that makes every audit policy apply a fix.

Guest configuration policies are one example: they can apply selected settings inside a virtual machine (VM).

This feature is called **Azure Machine Configuration**. It can check and configure settings inside the operating system. It does not cover every ASC Default control, and an audit policy cannot always be switched to enforcement. [Microsoft overview](https://learn.microsoft.com/en-us/azure/governance/machine-configuration/overview/01-overview-concepts)

## From finding to configured setting

1. **Choose the control.** Read the finding, agree on the required setting, and select the machines it should apply to.
2. **Choose how to apply it.** Use a suitable configuration policy, or create and test a custom package that can check and change the setting. An audit-only package cannot apply a fix.
3. **Assign it to the selected VMs.** Azure Policy delivers a configuration assignment; the Machine Configuration extension inside each VM runs the package. The extension and required identities must be ready.
4. **Apply and verify.** Existing VMs may need a remediation task to start the change. Check the actual setting and compliance results, then review the original security finding after it is assessed again.

For this approach, `DeployIfNotExists` policies deliver the configuration. The package contains the instructions that change Windows. [Microsoft: custom packages](https://learn.microsoft.com/en-us/azure/governance/machine-configuration/how-to/develop-custom-package/overview)

## Does it keep correcting changes?

| Mode | What happens |
|---|---|
| `Audit` | Checks settings and reports gaps. |
| `ApplyAndMonitor` | Applies settings once, then reports later changes away from them. |
| `ApplyAndAutoCorrect` | Applies settings and corrects later drift at the next evaluation. |

This lab uses **ApplyAndMonitor**. Later drift needs another remediation trigger; it is not continuously corrected. With policy enforcement enabled, an Azure VM resource update can also trigger reapplication. [Microsoft: application and remediation modes](https://learn.microsoft.com/en-us/azure/governance/machine-configuration/concepts/remediation-options)

## A small Windows example

The lab groups four custom policies into one initiative. They set local password age to 60 days, minimum length to 14 characters, history to 24 passwords, and minimum age to 1 day.

These are lab values, not a general recommendation. They do not replace existing passwords, and domain policy can override local settings.

The lab selects supported individual Windows VMs using the VM tag `vmsecurityBenchmarks=true`. Removing the tag does not undo settings or remove existing guest assignments; cleanup and restoration are separate steps.

**Validation is partial.** One existing VM passed all four checks on 6 September 2026, before the version 1.3.0 policy simplification. The current version, new VMs, tag changes, offboarding and drift still need testing.

## Lab code and references

The example uses private configuration ZIPs and a package-download identity. These JSON files contain deployment placeholders and are not a complete deployment guide.

- [Example password-age policy](/learning-assets/windows-vm-policy-enforcement/windows-local-password-age-60.json)
- [Package identity helper](/learning-assets/windows-vm-policy-enforcement/windows-policy-package-identity.json)
- [Four-policy initiative](/learning-assets/windows-vm-policy-enforcement/initiative.json)
- [Microsoft: configuration assignment lifecycle](https://learn.microsoft.com/en-us/azure/governance/machine-configuration/concepts/assignments)
- [Microsoft: Defender for Cloud policy reference](https://learn.microsoft.com/en-us/azure/defender-for-cloud/policy-reference)
