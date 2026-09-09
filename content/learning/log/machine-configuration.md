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

## Where can I browse the security baseline settings?

Open **Policy → Machine Configuration → Definitions**, select **Azure Security Baseline for Windows**, then choose **Modify settings**.

The Definitions tab is a catalogue of baseline templates. In the view inspected, it offered Azure Windows/Linux baselines and CIS Windows/Linux benchmarks, with the Windows CIS entry marked Preview. Seeing a definition here does not mean it is assigned to any machine.

The Windows editor showed **Basics**, **Modify settings** and **Review + download**. Its settings grid contained **Machine Setting**, **Severity** and **Value**, plus search, severity filters and selection checkboxes. On 9 September 2026 it displayed version **1.0.0** with **298 settings**; that count can change.

**These values describe the baseline being prepared, not the current values read from your VM.** Opening the editor does not deploy settings or change an existing MCSB assignment. The documented workflow exports settings as JSON, then passes them to a baseline policy assignment. Its audit assignment uses `AuditIfNotExists`; editing a value does not automatically repair Windows. [Baseline assignment workflow](https://learn.microsoft.com/en-us/azure/governance/machine-configuration/how-to/assign-security-baselines/deploy-a-baseline-policy-assignment).

## What is Maximum password age, and where is it in Windows?

**Maximum password age** is how many days a Windows password can be used before it expires and must be changed. For example, **42 days** means expiration 42 days after the password was last set. **0** means passwords never expire under this policy.

Inside the Windows VM desktop, including a Bastion session:

1. Open **Start**, search for `secpol.msc`, and open **Local Security Policy**.
2. Open **Account Policies → Password Policy**.
3. Double-click **Maximum password age** to inspect its value.

The Azure baseline editor shows the **expected value**. This Windows dialog shows the machine's local policy setting; we did not verify that they match in this example. An individual account with **Password never expires** enabled is exempt from expiration. Domain accounts follow the applicable domain password policy; this setting does not control Microsoft Entra account password expiration. [Maximum password age](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-10/security/threat-protection/security-policy-settings/maximum-password-age).

For the code that applies this setting, read [Windows password age through policy, simply](/articles/windows-password-age-policy/).

## Why is the Assignments tab empty?

This specialised tab lists **baseline policy assignments**, not VMs waiting to be enabled. Microsoft documents assignments created through the portal or code; it does not state that changing a default setting is required for an assignment to appear.

In our example, the Windows baseline was included inside an **MCSB initiative assignment**, and its guest configuration reports existed even though this list was empty. The initiative-based setup is a possible explanation, but we have not verified the view's exact filter. Do not treat that explanation as a confirmed product limitation, or create another assignment merely to populate this list.

To see actual VM results, open **Policy → Compliance → the MCSB initiative assignment → the relevant Windows baseline policy → the VM's compliance details → Last evaluated resource**. Review the individual settings, reasons and evaluation time there. [Guest configuration results](https://learn.microsoft.com/en-us/azure/governance/policy/how-to/determine-non-compliance#compliance-details-for-guest-configuration).

## What does the Overview table mean?

This pane brings together onboarding and configuration management for machine operating systems. The Overview table describes subscription readiness, rather than whether every Windows or Linux setting is correct.

The following is an anonymised version of the row inspected during this walkthrough:

| Column | Example value | Meaning |
|---|---|---|
| Name | Lab subscription | The subscription represented by this row. |
| Status | Enabled | The portal recognises Machine Configuration as enabled for this subscription. It does not prove someone clicked Enable here. |
| Machines missing prerequisite | 0 | No machines are currently counted as missing the prerequisites by this view. |
| Machines with prerequisite | 1 | One machine is counted as having the prerequisites. In this walkthrough we separately verified its extension and managed identity. |
| Eligible machines | 0 | The view's eligibility counter. It is not the total VM count. The inspected UI did not explain its exact eligibility calculation. |

Do not read the final zero as “there are no VMs” or “the VM cannot use Machine Configuration.” This same subscription had a VM actively reporting configuration results. These counters are a portal summary; use resource and report details to resolve uncertainty.

## What does Enable actually do?

We opened **Enable** without submitting it. The wizard showed:

1. **Basics:** choose a scope and an assignment name. Its default name was **Deploy prerequisites to enable Guest Configuration policies on virtual machines**.
2. **Managed Identity:** choose the policy assignment's identity and its location. The wizard displayed Contributor permissions for deployment.
3. **Review + create:** review before submitting the assignment.

**Yes: this is a policy-based onboarding route that can install the extension on eligible VMs.** The built-in prerequisite initiative adds a system-assigned identity to the VM and deploys the appropriate Windows or Linux Guest Configuration extension. Microsoft recommends this initiative for extension deployment at scale. [Prerequisite policy](https://learn.microsoft.com/en-us/azure/governance/machine-configuration/how-to/create-policy-definition).

There are two identities to distinguish: the **policy assignment identity** performs Azure deployments; the **VM identity** belongs to the machine. Existing machines missing prerequisites need remediation to apply the policy changes. Do not assume that opening the wizard, assigning the initiative, or refreshing the table instantly installs everything. Check deployment and remediation results. We did not submit this wizard, so we have not verified whether this particular onboarding flow starts remediation automatically. [Policy remediation](https://learn.microsoft.com/en-us/azure/governance/policy/how-to/remediate-resources).

The Overview advertises baseline auditing as part of onboarding. The prerequisite initiative itself prepares machines; it does not contain the Windows password checks or automatically repair them. The baseline configuration and its reports remain separate.

## Which managed identity does it use?

The prerequisite initiative has four policies: add a system-assigned identity to eligible VMs without identities; add one while preserving existing user-assigned identities; install the Windows extension; install the Linux extension.

If the VM already has a system-assigned identity, the policy does not create a second one. The policy assignment's deployment identity and the VM's own identity have different jobs: the former deploys Azure resources, while the latter lets the machine authenticate. The agent performs the work inside the operating system.

Find the VM identity under **VM → Identity → System assigned** (under Security in the inspected VM menu). Its identity object is also visible under **Microsoft Entra ID → Enterprise applications → All applications**, filtered to **Application type = Managed Identities**. Search by the VM name and match the Object ID. It is not a standalone user-assigned identity resource. [Viewing managed identities](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/view-applications-portal).

## Is this the same as our policy-as-code setup?

**It serves the same prerequisite purpose.** In this walkthrough, the existing management-group assignment already used that built-in initiative, and the VM had its prerequisites. Creating another subscription assignment was unnecessary.

For an environment managed through code, keep the initiative assignment, its identity permissions and remediation process in that workflow. The portal is useful for inspecting results. An Enabled row alone does not tell you whether setup came from the portal, inherited policy or another deployment method.

## Policy, assignment, package, agent

![Azure Policy targets machines. A machine assignment identifies a configuration package. The agent downloads the package, checks or applies settings inside the VM, and reports compliance to Azure.](/learning-assets/machine-configuration/flow.svg)

| Part | What it does |
|---|---|
| Azure Policy assignment | Applies a policy or initiative at a scope, such as a management group. |
| Machine configuration assignment | Connects one machine to a particular configuration and mode. |
| Configuration package | Contains the instructions and dependencies for checking or applying settings. |
| Agent inside the machine | Runs those checks or changes and reports results. |

A machine assignment is a separate Azure resource: `Microsoft.GuestConfiguration/guestConfigurationAssignments`. Azure Policy can orchestrate these assignments; they can also be deployed directly. A policy assignment is therefore not the same object as a machine assignment. Custom assignments identify their ZIP package using an HTTPS content URI and a hash. [Assignment resources](https://learn.microsoft.com/en-us/azure/governance/machine-configuration/concepts/assignments).

## Is the package PowerShell, Python or policy JSON?

For the Windows DSC approach discussed here, the package is a **ZIP containing a compiled configuration (MOF), the required DSC resource modules, and package metadata**. It is more than an arbitrary script zipped by hand. PowerShell is used to author and build this kind of package; the policy JSON is a separate deployment and evaluation definition.

**DSC means Desired State Configuration.** You describe the state you want, such as a minimum password length. Resources provide the logic to read, test and, when supported, set that state. Machine Configuration uses that capability as part of its managed service. It also supports compatible Linux machines; do not assume a Windows resource can run unchanged on Linux.

A package built for `Audit` checks settings. A package built for `AuditAndSet` can also apply supported settings. That package capability is separate from the assignment's runtime mode. [Package contents and types](https://learn.microsoft.com/en-us/azure/governance/machine-configuration/how-to/develop-custom-package/2-create-package), [DSC, simply](/articles/dsc/).

## Why did we discuss a storage account?

The agent needs somewhere to download a **custom package**. Azure Blob Storage is a hosting option: the build publishes the ZIP, and the assignment references its HTTPS address and content hash. The storage account holds the artifact; it does not execute the configuration. Microsoft-provided baseline packages do not require you to upload your own copy to a new storage account. [Publishing custom packages](https://learn.microsoft.com/en-us/azure/governance/machine-configuration/how-to/develop-custom-package/4-publish-package).

A ZIP in the source repository is not automatically available to a running VM. The deployment must publish it to a reachable location and configure the required access. Keep source code, the built artifact, and the assignment that references it consistent.

## How does the configuration reach a private VM?

The policy does not open RDP and run PowerShell on the VM. The installed agent retrieves assignment information, obtains the referenced content and performs the work locally. It reports results back to the service.

The machine needs access to both the configuration service and package location. Microsoft supports outbound HTTPS on port 443 or an appropriately configured private network path. **No VM public IP or Bastion session is required for configuration reporting.** Hub peering alone does not provide every required endpoint, DNS record or permission.

If a custom package is in storage with public network access disabled, provide the private endpoint, DNS, routes and authentication needed to reach it. A managed identity provides authentication; it does not create network connectivity. Blocking all access to the package host can prevent new downloads. [Agent identity and connectivity requirements](https://learn.microsoft.com/en-us/azure/virtual-machines/extensions/guest-configuration).

## Does it fix the VM automatically?

| Machine assignment mode | Behaviour |
|---|---|
| Audit | Reports settings without changing them. |
| ApplyAndMonitor | Applies the configuration, then reports later drift. |
| ApplyAndAutoCorrect | Applies the configuration and corrects later drift. |

Applying settings requires a package that supports changing them. Turning on policy enforcement does not turn an audit-only baseline into a repair package. [Configuration modes](https://learn.microsoft.com/en-us/azure/governance/machine-configuration/overview/01-overview-concepts).

## What does remediation mean here?

There are two different operations:

| Operation | What changes |
|---|---|
| Remediate prerequisites or a deployment policy | Azure deploys missing resources, such as the extension or an applicable configuration assignment. |
| Apply settings inside Windows | The local agent runs the package's supported setting logic. |

For existing machines, a deployment policy's initial remediation can deliver the configuration. With `ApplyAndAutoCorrect`, later drift is corrected by the agent at its next evaluation; it does not require a new Azure remediation task for every drift event. An audit-only baseline cannot be turned into a repair package by clicking Remediate. [Remediation behaviour](https://learn.microsoft.com/en-us/azure/governance/machine-configuration/concepts/remediation-options).

Likewise, **Azure Policy enforcement enabled does not mean Deny**. It activates the policy's configured effect. An audit effect reports; a deployment effect deploys its specified resources. Neither label alone tells you whether Windows settings will be changed. Read the policy effect, package capability and machine assignment mode together.

## How would we enforce the password setting through code?

The proposed workflow is:

1. Keep the prerequisite initiative assigned at the intended scope.
2. Author and test a configuration that can set minimum password length to 14.
3. Build the package with apply capability and publish it to reachable storage.
4. Deploy a policy definition that delivers the machine assignment, referencing that package and its hash.
5. Assign it with `ApplyAndAutoCorrect`, the required deployment identity permissions, and the intended scope.
6. Remediate existing machines that need the assignment.
7. Verify the Windows setting and the new configuration report. Then check the separate baseline report after its next evaluation.

Changing one setting does not make the whole Windows baseline compliant. A controlled drift test can confirm that the agent restores that setting. This is an implementation and verification plan; the audit observation below is not evidence that this repair test has completed on the current VM. [Creating the policy](https://learn.microsoft.com/en-us/azure/governance/machine-configuration/how-to/create-policy-definition).

## What did our Windows example show?

The VM had a system-assigned managed identity and the **AzurePolicyforWindows** extension installed successfully. Its prerequisite policy was compliant. The **AzureWindowsBaseline** machine assignment was in **Audit** mode and reported:

| Setting | Reported value | Expected | Result |
|---|---:|---:|---|
| Minimum password length | 0 | At least 14 | Non-compliant |

This is the Windows password-policy setting. It does **not** mean the user's actual password has zero characters. The report proved the audit was working; it did not prove the setting had been fixed.

## How to read a failure

Open the relevant configuration assignment and inspect the individual setting, reason and evaluation time. From **Policy → Compliance**, the policy's compliance details can also link to **Last evaluated resource**, which opens the guest assignment details.

Do not stop at the overall red status: one failed setting can make the configuration non-compliant. Also check report timestamps before treating an older result as the current machine state. [Reading compliance details](https://learn.microsoft.com/en-us/azure/governance/policy/how-to/determine-non-compliance#compliance-details-for-guest-configuration).

## Why assign the baseline through a management group?

An initiative such as **Microsoft cloud security benchmark (MCSB)** can include guest configuration audit policies. A management-group assignment lets child subscriptions inherit one centrally managed configuration. It does not install every prerequisite merely because the initiative exists.

Our walkthrough therefore checked both the MCSB audit and the separate prerequisite assignment. An existing subscription-level Defender assignment such as **ASC Default** can overlap a central initiative. Inspect assignment scope, parameters and ownership before replacing anything; an empty specialised Machine Configuration list is not a reason to delete policies.

## What should be managed in code?

Keep the prerequisite policies, baseline assignments and any custom enforcement packages in source control. Review existing assignments before using portal onboarding so you understand whether it will overlap your current setup.

Installing an extension prepares the machine to run configurations. Deploying a repair configuration is another step. For the Windows example and the code behind these packages, read [Azure Windows baseline, simply](/articles/azure-windows-baseline/) and [DSC, simply](/articles/dsc/).
