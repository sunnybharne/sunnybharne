---
title: "Azure Machine Configuration"
description: "Find the guest assignment, read a failed Windows baseline check, and identify which settings the agent can fix."
date: 2026-09-09
track: azure-platform
provider: Microsoft Learn
tags:
  - azure-policy
  - machine-configuration
  - virtual-machines
draft: false
---

Our Windows VM had the Machine Configuration extension and a system-assigned identity. Its baseline still failed. **Minimum password length was 0. The baseline required at least 14.** The assignment ran in `Audit` mode and left the local policy unchanged.

## Find the failed setting

In **Policy → Compliance**, open the MCSB initiative, the Windows baseline policy, then the VM. Select **Last evaluated resource** to see the setting, actual value, expected value, and evaluation time. The lab’s **Machine Configuration → Assignments** tab was empty even though this report existed. [Compliance details](https://learn.microsoft.com/en-us/azure/governance/policy/how-to/determine-non-compliance#compliance-details-for-guest-configuration)

Under **Machine Configuration → Overview**, our subscription showed **Enabled**, one machine with prerequisites, zero missing, and zero eligible. The reporting VM was already onboarded. Under **Definitions → Azure Security Baseline for Windows → Modify settings**, the editor showed 298 expected settings in version 1.0.0 on 9 September 2026. Exporting that JSON prepares a baseline assignment. [Baseline assignment workflow](https://learn.microsoft.com/en-us/azure/governance/machine-configuration/how-to/assign-security-baselines/deploy-a-baseline-policy-assignment)

To inspect local password rules, open `secpol.msc` on the VM and go to **Account Policies → Password Policy**. Minimum length and maximum age are separate rules. An age of 42 expires a local password 42 days after it was set. Zero disables expiry under that rule. Account exemptions and domain policies can affect the result. [Maximum password age example](/articles/windows-password-age-policy/)

## What runs on the VM

![Azure Policy deploys a guest assignment. The agent downloads its package, checks or applies settings, and reports compliance.](/learning-assets/machine-configuration/flow.svg)

1. **Onboard the VM.** The prerequisite initiative adds a system-assigned identity where needed, preserves user-assigned identities, and installs the Windows or Linux extension. Our VM inherited the initiative from its management group, so we left the portal’s **Enable** wizard without submitting it. [Prerequisite policy](https://learn.microsoft.com/en-us/azure/governance/machine-configuration/how-to/create-policy-definition)
2. **Deliver the assignment.** Azure Policy can deploy a `Microsoft.GuestConfiguration/guestConfigurationAssignments` resource for each eligible machine. The policy assignment identity needs deployment permissions. Existing VMs may need a remediation task. [Assignments](https://learn.microsoft.com/en-us/azure/governance/machine-configuration/concepts/assignments)
3. **Run the package.** For a custom Windows configuration, the agent downloads a ZIP over HTTPS, verifies its hash, and runs the compiled configuration and PowerShell DSC resources. Private storage needs a working network path and a package-read identity. [DSC package contents](/articles/dsc/) · [Private package delivery](/articles/private-packages-through-hub/)

## Choose the assignment mode

| Mode | Agent behaviour |
| --- | --- |
| `Audit` | Check and report. |
| `ApplyAndMonitor` | Apply once, then report drift. |
| `ApplyAndAutoCorrect` | Apply and correct drift on later evaluations. |

To enforce 14 characters, build an `AuditAndSet` package that can change minimum length. Reference its URI and hash in the assignment, choose the mode, and remediate existing VMs. Verify the local value and the next report. Our lab verified the audit only. [Remediation modes](https://learn.microsoft.com/en-us/azure/governance/machine-configuration/concepts/remediation-options) · [Windows baseline checks](/articles/azure-windows-baseline/)
