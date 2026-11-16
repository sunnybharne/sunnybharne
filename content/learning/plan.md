---
title: "My Azure certification plan"
description: "I have 6–8 hours a week for Microsoft Learn, labs, and exam practice."
updated: 2026-11-16
---

## Exam targets

AZ-900 is my warm-up. Earning Azure Administrator Associate with AZ-104 meets a prerequisite for both expert credentials, Azure Solutions Architect and DevOps Engineer. I haven’t recorded any study sessions, exam bookings, or passes yet.

I’m aiming to sit each exam at the end of its study window.

| Study window | Exam |
| --- | --- |
| 5–15 Nov 2026 | [AZ-900 · Azure Fundamentals][fundamentals] |
| 16 Nov 2026–24 Jan 2027 | [AZ-104 · Azure Administrator][administrator] |
| 25 Jan–7 Mar 2027 | [AZ-305 · Azure Solutions Architect][architect] |
| 8 Mar–18 Apr 2027 | [AZ-400 · DevOps Engineer][devops] |
| 19 Apr–30 May 2027 | [AZ-700 · Azure Network Engineer][network] |
| 31 May–25 Jul 2027 | [SC-500 · Cloud and AI Security Engineer][security] |
| 26 Jul–8 Aug 2027 | [AI-901 · Azure AI Fundamentals][ai-fundamentals] (optional) |
| 9 Aug–3 Oct 2027 | [AI-103 · Azure AI Apps and Agents Developer][ai-developer] |
| 4–17 Oct 2027 | [DP-900 · Azure Data Fundamentals][data-fundamentals] (optional) |
| 18–31 Oct 2027 | [SC-900 · Security, Compliance, and Identity Fundamentals][security-fundamentals] (optional) |

I’ll reassess after the first four exams. On 8 March 2027 I’ll compare AZ-400 with [AZ-401][agentic-devops] before starting the DevOps labs.

## Study week

- **Monday and Wednesday, one hour each.** Study one exam objective on Microsoft Learn and answer practice questions.
- **Saturday, three hours.** Check the cost, build a lab in a dedicated resource group, test it, and delete billable resources.
- **Sunday, two hours.** Repeat the task without a walkthrough and revisit mistakes from one and three weeks ago.

On a six-hour week I shorten the lab. An eighth hour goes to the topic I missed most often. I use AI for extra practice questions and check disputed answers against Microsoft Learn.

## AZ-900 sessions

[AZ-900 study guide][az900-guide]

| November 2026 | Task |
| --- | --- |
| 5 Nov | Set up a personal Learn profile, take a baseline assessment, and start [cloud concepts][cloud-concepts]. |
| 7–9 Nov | Compare regions, zones, compute, and storage in [Azure architecture and services][azure-services]. Work through [identity, cost, and governance][azure-governance]. |
| 11–14 Nov | Complete the [guided projects][guided-projects], take a fresh practice assessment, and try the exam interface sandbox. |
| 15 Nov | Exam target if ready. |

## AZ-104 labs

I’ll use the [study guide][az104-guide] to track objectives and the [course][az104-course] for exercises.

| Week of | Lab and success check |
| --- | --- |
| 16 Nov 2026 | Review the [prerequisites][admin-prerequisites]. Assign roles to test users and groups at different scopes and explain which requests succeed. [Identity and governance][admin-identity] |
| 23 Nov | Deploy a resource with Bicep. Test which operations RBAC, a policy, and a resource lock block. |
| 30 Nov | Test Blob access, SAS expiry, lifecycle rules, and recovery. Compare redundancy and Azure Files access options. [Storage][admin-storage] |
| 7 Dec | Resize a VM and inspect its disks, availability zones, and scale-set settings. [Compute][admin-compute] |
| 14 Dec | Deploy an App Service slot and a container. Review compute and storage mistakes. |
| 21 and 28 Dec | Two hours each week for recall, subnetting, and DNS. Weekends off. |
| 4 Jan 2027 | Test peering, NSGs, routes, and private endpoint DNS. Diagnose a connection with Network Watcher. [Networking][admin-network] |
| 11 Jan | Configure an alert, run a log query, and test recovery. Review Site Recovery and take a timed assessment. [Monitoring and recovery][admin-monitor] |
| 18 Jan | Revisit the two weakest objectives. On 23 Jan, do a fresh assessment and repeat a lab unaided. |

## Later labs

| Exam | Planned work |
| --- | --- |
| [AZ-305 study guide][az305-guide] | Design identity and monitoring for several teams. Choose storage and compute for an application, then design its recovery around an explicit recovery time and acceptable data loss. [Course][az305-course] |
| [AZ-400 study guide][az400-guide] | Build a YAML pipeline on my self-hosted agent. Publish test results, promote a versioned artifact through approval, trigger an alert, and roll back a release. [Course][az400-course] |
| AZ-700 | Plan addresses and routes, connect networks, and troubleshoot DNS and private access. |
| SC-500 | Test access to Key Vault, storage, and AI workloads. Investigate findings in Defender for Cloud and Sentinel. |
| AI-901 and AI-103 | Practise Python and APIs. Build a Foundry app with retrieval and agents, then evaluate its answers and tool use. |
| DP-900 and SC-900 | Compare relational and non-relational storage. Review Microsoft identity, security, and compliance services. |

## When I’ll book

My target is **85% on two separate practice assessments** with fresh questions. I also want to explain each missed answer, finish a relevant lab unaided, and complete a timed session. If I need more practice, I’ll move the target by a week or two.

If a practice assessment is unavailable, I’ll test each objective in a lab or a timed scenario. Before booking, I’ll check the exam guide, prerequisites, local price, and appointment times in the [Microsoft certification catalog][catalog]. After each session I’ll record the objective, time spent, what I could do unaided, and what to practise next.

## Other credentials I’m considering

For work beyond this calendar, I’m considering [AI-200][cloud-developer] and [AI-300][ai300-guide] for AI operations, [DP-300][database] or [DP-750][databricks] for data, and [AZ-140][desktop] or [AZ-802][windows-server] for desktop and hybrid infrastructure.

[fundamentals]: https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/
[administrator]: https://learn.microsoft.com/en-us/credentials/certifications/azure-administrator/
[architect]: https://learn.microsoft.com/en-us/credentials/certifications/azure-solutions-architect/
[devops]: https://learn.microsoft.com/en-us/credentials/certifications/devops-engineer/
[network]: https://learn.microsoft.com/en-us/credentials/certifications/azure-network-engineer-associate/
[security]: https://learn.microsoft.com/en-us/credentials/certifications/cloud-and-ai-security-engineer-associate/
[ai-fundamentals]: https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-fundamentals/
[ai-developer]: https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-apps-and-agents-developer-associate/
[data-fundamentals]: https://learn.microsoft.com/en-us/credentials/certifications/azure-data-fundamentals/
[security-fundamentals]: https://learn.microsoft.com/en-us/credentials/certifications/security-compliance-and-identity-fundamentals/
[agentic-devops]: https://learn.microsoft.com/en-us/credentials/certifications/agentic-devops-engineer-expert/
[admin-prerequisites]: https://learn.microsoft.com/en-us/training/paths/az-104-administrator-prerequisites/
[cloud-concepts]: https://learn.microsoft.com/en-us/training/paths/microsoft-azure-fundamentals-describe-cloud-concepts/
[azure-services]: https://learn.microsoft.com/en-us/training/paths/azure-fundamentals-describe-azure-architecture-services/
[azure-governance]: https://learn.microsoft.com/en-us/training/paths/describe-azure-management-governance/
[guided-projects]: https://learn.microsoft.com/en-us/training/paths/introduction-cloud-infrastructure-apply-azure-skills-guided-projects/
[az104-guide]: https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-104
[az104-course]: https://learn.microsoft.com/en-us/training/courses/az-104t00
[admin-identity]: https://learn.microsoft.com/en-us/training/paths/az-104-manage-identities-governance/
[admin-storage]: https://learn.microsoft.com/en-us/training/paths/az-104-manage-storage/
[admin-compute]: https://learn.microsoft.com/en-us/training/paths/az-104-manage-compute-resources/
[admin-network]: https://learn.microsoft.com/en-us/training/paths/az-104-manage-virtual-networks/
[admin-monitor]: https://learn.microsoft.com/en-us/training/paths/az-104-monitor-backup-resources/
[az305-guide]: https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-305
[az305-course]: https://learn.microsoft.com/en-us/training/courses/az-305t00
[az400-guide]: https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-400
[az400-course]: https://learn.microsoft.com/en-us/training/courses/az-400t00
[catalog]: https://learn.microsoft.com/en-us/credentials/browse/?credential_types=certification
[az900-guide]: https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-900
[cloud-developer]: https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-cloud-developer-associate/
[ai300-guide]: https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-300
[database]: https://learn.microsoft.com/en-us/credentials/certifications/azure-database-administrator-associate/
[databricks]: https://learn.microsoft.com/en-us/credentials/certifications/implementing-data-engineering-solutions-using-azure-databricks/
[desktop]: https://learn.microsoft.com/en-us/credentials/certifications/azure-virtual-desktop-specialty/
[windows-server]: https://learn.microsoft.com/en-us/credentials/certifications/windows-server-hybrid-administrator/
