---
title: "Machine Configuration, simply"
description: "Understand the Azure Policy view that reports settings inside your machines."
date: 2026-09-09
track: azure-platform
provider: Microsoft Learn
tags:
  - azure-policy
  - machine-configuration
  - virtual-machines
draft: false
---

**Machine Configuration checks settings inside a machine, and can apply settings when configured to do so.** It supports compatible Windows and Linux machines in Azure and through Azure Arc. You will still see the name **Guest Configuration** in extensions, policy categories and resource names. [Microsoft overview](https://learn.microsoft.com/en-us/azure/governance/machine-configuration/overview/01-overview-concepts).

## What is this page in Azure Policy?

In the portal view checked on **9 September 2026**, **Policy → Machine Configuration** has three tabs: **Overview**, **Definitions** and **Assignments**. This describes the view we inspected; it does not establish when Microsoft introduced it.

Overview shows subscription onboarding status and counts such as **Machines missing prerequisite**, **Machines with prerequisite** and **Eligible machines**. Its Enable action says it onboards eligible VMs and activates baseline auditing. It is a configuration action, not just a display filter.

The **Assignments** tab in this view describes itself as a list of **baseline policy assignments**. During this walkthrough it showed no baseline settings assignments, even though the VM already had guest assignments and compliance reports. An empty list here is therefore not proof that no configuration is running. Use the VM assignment details or Policy Compliance to verify.

**Enabled does not mean compliant.** In our walkthrough, one machine had its prerequisites, but its Windows baseline still reported non-compliance. Check the assignment report to understand the actual settings.

## Policy, assignment, package, agent

![Azure Policy targets machines. A machine assignment identifies a configuration package. The agent downloads the package, checks or applies settings inside the VM, and reports compliance to Azure.](/learning-assets/machine-configuration/flow.svg)

| Part | What it does |
|---|---|
| Azure Policy assignment | Applies a policy or initiative at a scope, such as a management group. |
| Machine configuration assignment | Connects one machine to a particular configuration and mode. |
| Configuration package | Contains the instructions and dependencies for checking or applying settings. |
| Agent inside the machine | Runs those checks or changes and reports results. |

A machine assignment is a separate Azure resource: `Microsoft.GuestConfiguration/guestConfigurationAssignments`. Azure Policy can orchestrate these assignments; they can also be deployed directly. A policy assignment is therefore not the same object as a machine assignment. Custom assignments identify their ZIP package using an HTTPS content URI and a hash. [Assignment resources](https://learn.microsoft.com/en-us/azure/governance/machine-configuration/concepts/assignments).

## Does it fix the VM automatically?

| Machine assignment mode | Behaviour |
|---|---|
| Audit | Reports settings without changing them. |
| ApplyAndMonitor | Applies the configuration, then reports later drift. |
| ApplyAndAutoCorrect | Applies the configuration and corrects later drift. |

Applying settings requires a package that supports changing them. Turning on policy enforcement does not turn an audit-only baseline into a repair package. [Configuration modes](https://learn.microsoft.com/en-us/azure/governance/machine-configuration/overview/01-overview-concepts).

## What did our Windows example show?

The VM had a system-assigned managed identity and the **AzurePolicyforWindows** extension installed successfully. Its prerequisite policy was compliant. The **AzureWindowsBaseline** machine assignment was in **Audit** mode and reported:

| Setting | Reported value | Expected | Result |
|---|---:|---:|---|
| Minimum password length | 0 | At least 14 | Non-compliant |

This is the Windows password-policy setting. It does **not** mean the user's actual password has zero characters. The report proved the audit was working; it did not prove the setting had been fixed.

## How to read a failure

Open the relevant configuration assignment and inspect the individual setting, reason and evaluation time. From **Policy → Compliance**, the policy's compliance details can also link to **Last evaluated resource**, which opens the guest assignment details.

Do not stop at the overall red status: one failed setting can make the configuration non-compliant. Also check report timestamps before treating an older result as the current machine state. [Reading compliance details](https://learn.microsoft.com/en-us/azure/governance/policy/how-to/determine-non-compliance#compliance-details-for-guest-configuration).

## What should be managed in code?

Keep the prerequisite policies, baseline assignments and any custom enforcement packages in source control. Review existing assignments before using portal onboarding so you understand whether it will overlap your current setup.

Installing an extension prepares the machine to run configurations. Deploying a repair configuration is another step. For the Windows example and the code behind these packages, read [Azure Windows baseline, simply](/articles/azure-windows-baseline/) and [DSC, simply](/articles/dsc/).
