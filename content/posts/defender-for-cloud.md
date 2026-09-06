---
title: "Defender for Cloud, simply"
description: "How Microsoft finds cloud security risks, detects threats, and separates free checks from paid protection."
date: 2026-09-07
tags:
  - azure-policy
  - security
draft: false
---

**Microsoft Defender for Cloud checks your cloud setup for security risks.** With the right protection plans enabled, it also detects attacks.

It supports Azure, connected AWS and Google Cloud accounts, and supported on-premises workloads. It was previously called Azure Security Center.

## Three jobs

| Part | What it does |
|---|---|
| Cloud security posture management (CSPM) | Finds weak configurations and recommends fixes. |
| Cloud workload protection (CWPP) | Detects threats against servers, containers, databases and other supported services. |
| DevOps security | Brings code and pipeline security findings into the cloud security view. |

Microsoft calls the combined platform a **CNAPP**: Cloud Native Application Protection Platform.

## How it works

1. You enable plans for a subscription or connect another cloud environment.
2. Defender collects resource configuration, assessments and security signals. Collection uses service integrations, agentless scans or agents/extensions, depending on the feature.
3. It evaluates that data and produces **recommendations** for weaknesses and **alerts** for suspected threats.

Azure Policy supplies many Azure configuration checks. [ASC Default](/articles/asc-default-policy-guide/) is the benchmark assignment—not the whole Defender product. Other capabilities use scanners and workload telemetry.

**Example:** an exposed VM management port is a configuration finding. Suspicious activity on that VM can produce a threat alert when the relevant protection is enabled.

## Free versus paid

| Plan | What you get |
|---|---|
| Foundational CSPM — free | Basic recommendations, inventory and secure score. |
| Defender CSPM — paid | Advanced assessment, attack paths and risk prioritization. |
| Workload plans — separately priced | Protection for specific services, such as Servers or Storage. |

**An ASC Default assignment does not prove paid protection is active.** Check **Defender for Cloud → Environment settings → subscription → Defender plans**.

Enabling paid plans can add charges. Recommendations alone do not automatically fix resources; remediation needs a separate action or configured automation.

## References

- [Microsoft: product overview](https://learn.microsoft.com/en-us/azure/defender-for-cloud/defender-for-cloud-introduction)
- [CSPM plan comparison](https://learn.microsoft.com/en-us/azure/defender-for-cloud/concept-cloud-security-posture-management)
- [Pricing](https://azure.microsoft.com/en-us/pricing/details/defender-for-cloud/)
