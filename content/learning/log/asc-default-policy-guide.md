---
title: "ASC Default, simply"
description: "Defender for Cloud’s security checks: what they report, not what they fix."
date: 2026-09-05
track: azure-platform
provider: Microsoft cloud security benchmark 57.59.0
tags:
  - azure-policy
  - security
draft: false
---

**ASC means Azure Security Center**, now called **[Microsoft Defender for Cloud](/articles/defender-for-cloud/)**. It checks your Azure setup for security risks.

**ASC Default** is its security checklist.

## What it does

It reports security risks, such as open ports or missing encryption. **It does not block deployments or fix settings.**

This describes version **57.59.0** defaults, checked **5 September 2026**.

## What matters

- **Policy:** one check. **Initiative:** a bundle. **Assignment:** where and how it runs.
- **Enforcement `Default` does not mean Deny.** An audit effect still only reports.
- **An assignment does not prove a paid Defender plan is enabled.** Check the plan separately.
- **Noncompliant can mean missing evidence**, not only a bad setting. Inspect the failed condition.
- **Compliant does not mean fully secure.** A private endpoint check, for example, may not check public access.

## Check your assignment

In Azure Policy, open **Assignments → ASC Default**. Check scope, version, parameters, overrides and exemptions before interpreting results.

An assignment using `57.*.*` receives newer minor and patch versions, so its checks can change.

Want to change Windows settings? Use a separate applying policy: [Windows VM password rules](/articles/windows-vm-policy-enforcement/).

## References

- [Microsoft’s policy reference](https://learn.microsoft.com/en-us/azure/defender-for-cloud/policy-reference)
- [Assignment settings and versioning](https://learn.microsoft.com/en-us/azure/governance/policy/concepts/assignment-structure)
- [All 224 checks: saved reference](https://github.com/sunnybharne/sunnybharne/blob/8811ce2ef5b67999808018d90246f2014b8b7ac2/content/learning/log/asc-default-policy-guide.md#all-224-policies)

**Upcoming change:** from **27 October 2026**, new subscriptions must opt in to Foundational CSPM. Already-enabled subscriptions stay enabled. [Microsoft notice](https://learn.microsoft.com/en-us/azure/defender-for-cloud/foundational-cspm-opt-in)
