---
title: "My Azure certification learning plan"
description: "A dated plan using Microsoft Learn, practical labs, and AI revision, built around 6–8 hours a week."
updated: 2026-11-04
---

This is my single ongoing note for learning, certification preparation, and progress. I currently have no Microsoft certifications. My available study time is **6–8 hours a week**, and this plan uses seven hours as the baseline.

**Status: proposed plan.** These are study targets, not booked exams or completed achievements. The pace assumes I can build on my Azure platform experience. I will move subsequent dates when a readiness check shows gaps.

## Which certifications to prioritise

My main route is **AZ-104 → AZ-305 → AZ-400 → AZ-700 → SC-500**, with a short AZ-900 warm-up first. This groups administration, architecture, delivery, networking, and security so that each stage reuses earlier work.

AZ-104 earns Azure Administrator Associate. That certification meets the certification prerequisite for both [Azure Solutions Architect Expert][architect] and [DevOps Engineer Expert][devops]; I then need AZ-305 and AZ-400 respectively. AZ-900 is useful first-exam practice, but is not required for this route.

| Study window | Proposed exam target | Credential and purpose |
| --- | --- | --- |
| 5–15 Nov 2026 | 15 Nov 2026 | [AZ-900: Azure Fundamentals][fundamentals]. Exam experience and Azure terminology; about 13 hours. |
| 16 Nov 2026–24 Jan 2027 | 24 Jan 2027 | [AZ-104: Azure Administrator Associate][administrator]. Foundation for the expert credentials; about 60 hours, including light holiday revision. |
| 25 Jan–7 Mar 2027 | 7 Mar 2027 | [AZ-305: Azure Solutions Architect Expert][architect]. Turn implementation knowledge into design decisions; about 42 hours. |
| 8 Mar–18 Apr 2027 | 18 Apr 2027 | [AZ-400: DevOps Engineer Expert][devops]. Build on pipeline and infrastructure automation experience; about 42 hours. |
| 19 Apr–30 May 2027 | 30 May 2027 | [AZ-700: Azure Network Engineer Associate][network]. Routing, private access, hybrid connectivity, and troubleshooting; about 42 hours. |
| 31 May–25 Jul 2027 | 25 Jul 2027 | [SC-500: Cloud and AI Security Engineer Associate][security]. Cloud and AI security; about 56 hours. |
| 26 Jul–8 Aug 2027 | 8 Aug 2027 | [AI-901: Azure AI Fundamentals][ai-fundamentals]. Optional bridge into Python, AI concepts, and Foundry. |
| 9 Aug–3 Oct 2027 | 3 Oct 2027 | [AI-103: Azure AI Apps and Agents Developer Associate][ai-developer]. Build and evaluate AI applications; about 56 hours. |
| 4–17 Oct 2027 | 17 Oct 2027 | [DP-900: Azure Data Fundamentals][data-fundamentals]. Optional breadth in data services. |
| 18–31 Oct 2027 | 31 Oct 2027 | [SC-900: Security, Compliance, and Identity Fundamentals][security-fundamentals]. Optional broader Microsoft security knowledge, including Microsoft 365. |

These are preparation estimates, not Microsoft promises. **Getting most Azure certifications at this pace is a multi-year goal.** I will prioritise the first four credentials and reassess. Later dates are increasingly provisional; optional fundamentals can become catch-up weeks. If Python or AI development is unfamiliar, I will extend those stages.

For the fastest route to role-based credentials, I can skip the AZ-900 exam, use its material only to fill gaps, and start AZ-104 earlier. For a quick first credential, I will keep this short warm-up.

## Use the current exam paths

Checked against Microsoft sources on **4 November 2026**. Several familiar exams have already retired:

| Older exam | Retirement date | Replacement path |
| --- | --- | --- |
| DP-100 | 1 Jun 2026 | AI-300: Machine Learning Operations Engineer Associate |
| AI-900 | 30 Jun 2026 | AI-901: Azure AI Fundamentals |
| AI-102 | 30 Jun 2026 | AI-103: Azure AI Apps and Agents Developer Associate |
| AZ-204 | 31 Jul 2026 | AI-200: Azure AI Cloud Developer Associate |
| AZ-500 | 31 Aug 2026 | SC-500: Cloud and AI Security Engineer Associate |

Sources: [Microsoft's transition announcement][transitions] and [July certification updates][july-updates]. These replacements have different skill requirements; an old course is not complete preparation for the new exam.

[AZ-401: Agentic DevOps Engineer Expert][agentic-devops] is currently in beta. Its page says results are not immediate and a practice assessment is unavailable. I will recheck AZ-400 and AZ-401 on **8 March 2027**, before the DevOps stage. At every stage and before booking, I will check the current guide, availability, prerequisites, and retirement notices.

## What to do before studying

1. **Set up a personal Microsoft Learn and certification profile.** Microsoft recommends a personal account so exam records are not tied to an employer. Start from the [AZ-900 page][fundamentals] and use registration details matching my identification.
2. **Take an unaided baseline assessment.** Record weak topics, not just the score. Follow the current Practice Assessment link on each certification page. Several now use AI Skills Navigator; the older Learn assessments for AZ-104, AZ-305, and AZ-400 are no longer updated according to their pages.
3. **Check prerequisites.** Refresh subnetting, DNS, Entra ID, RBAC, PowerShell or Azure CLI, and Bicep/ARM deployments using [AZ-104 prerequisites][admin-prerequisites]. Terraform experience helps, but I still need the exam's named tools.
4. **Prepare an isolated lab area.** Use a permitted practice environment, a dedicated resource group, budget alerts, and cleanup steps. Check costs before deploying and remove billable resources afterwards. No resources have been created by this plan.
5. **Track the official objectives.** Mark each as new, needs practice, or can explain and perform independently. Keep the gap list and progress in this note.

## My seven-hour study week

| Session | Time | Method |
| --- | --- | --- |
| Monday | 1 hour | Recall earlier material, then study Microsoft Learn. Ask AI to explain one unclear concept. |
| Wednesday | 1 hour | Continue Learn and answer scenario questions before seeing explanations. |
| Saturday | 3 hours | Finish module exercises and build a small lab. Predict, test, troubleshoot, and clean up. |
| Sunday | 2 hours | Practise without AI help, review errors, and update this note. Revisit material from one and three weeks earlier. |

Tuesday, Thursday, and Friday are free or catch-up days. A six-hour week shortens Saturday to two hours; an eighth hour goes to the weakest objective. Exam appointments replace part of that week's study time. The two holiday weeks below contain only two hours of revision each.

My learning loop is **diagnose → study the gap → practise → explain without help**. I will skim familiar material only when I can pass a fresh check and demonstrate the task.

## First sessions: 5–15 November 2026

Use the [AZ-900 study guide][az900-guide] with these Microsoft Learn paths. Ask the AI tutor to quiz the day's topic using the prompts below.

| Date | Time | What to learn or do |
| --- | --- | --- |
| Thu 5 Nov | 1 hour | Profile setup, baseline assessment, and start [cloud concepts][cloud-concepts]: service models and shared responsibility. |
| Sat 7 Nov | 3 hours | Finish cloud concepts; study [Azure architecture and services][azure-services]. Compare regions, zones, compute, storage, and networking. |
| Sun 8 Nov | 2 hours | Finish services; start [management and governance][azure-governance]. Explain identity, access, cost, and policy choices aloud. |
| Mon 9 Nov | 1 hour | Finish management and governance. Use AI scenarios to revisit baseline mistakes. |
| Wed 11 Nov | 1 hour | Begin [guided projects][guided-projects]. Explore the portal and outline a small application. |
| Sat 14 Nov | 3 hours | Finish relevant exercises, take a fresh practice check, and try the exam interface sandbox linked from the certification page. Apply the readiness rule. |
| Sun 15 Nov | Up to 2 hours | Proposed AZ-900 appointment if ready and available; otherwise repair weak topics and move the date. |

The **exam sandbox** demonstrates the exam interface; it is not an Azure subscription for resource labs.

## AZ-104: dated study and lab sessions

Use the [study guide][az104-guide] as the complete checklist and the [self-directed course][az104-course] for training. November and December dates are in **2026**; January dates are in **2027**. Each row follows the weekly hours above.

| Learn dates and topic | Saturday practical work | Sunday check |
| --- | --- | --- |
| **16 & 18 Nov:** prerequisites; [identities and governance][admin-identity] | **21 Nov:** finish identity modules; test users, groups, and RBAC scopes. | **22 Nov:** explain why access succeeds or fails. |
| **23 & 25 Nov:** governance, policy, locks, tags, subscriptions | **28 Nov:** a small Bicep deployment; test a policy and resource lock. | **29 Nov:** compare RBAC, Policy, and locks. |
| **30 Nov & 2 Dec:** [storage][admin-storage] | **5 Dec:** Blob access, SAS expiry, lifecycle and recovery; review Azure Files. | **6 Dec:** choose redundancy and access methods from scenarios. |
| **7 & 9 Dec:** [compute][admin-compute], VM availability | **12 Dec:** deploy and resize a VM; inspect disks, zones, and scale-set settings. | **13 Dec:** explain availability and scaling choices. |
| **14 & 16 Dec:** App Service and containers; finish compute | **19 Dec:** practise a deployment slot and small container deployment. | **20 Dec:** mixed compute/storage questions and cleanup review. |
| **21 & 23 Dec:** one hour each of recall and mistake review | **26 Dec:** rest | **27 Dec:** rest |
| **28 & 30 Dec:** one hour each of recall and subnet/DNS exercises | **2 Jan:** rest | **3 Jan:** rest |
| **4 & 6 Jan:** [virtual networking][admin-network] | **9 Jan:** finish modules; test peering, NSGs, routes, and private-endpoint DNS. | **10 Jan:** diagnose connectivity; review load balancing and Network Watcher. |
| **11 & 13 Jan:** [monitoring, backup, and recovery][admin-monitor] | **16 Jan:** an alert, log query, and recovery exercise; review Site Recovery. | **17 Jan:** timed assessment and objective-gap review. |
| **18 & 20 Jan:** repair the two weakest areas | **23 Jan:** fresh practice and a lab without a walkthrough; readiness decision. | **24 Jan:** proposed AZ-104 appointment, or additional practice. |

These are the main tasks, not a replacement for the full guide. If a learning path takes longer, use catch-up time or extend the stage rather than dropping objectives.

## After AZ-104: weekly topics

All dates below are **2027**. Continue the same Monday/Wednesday learning, Saturday practical work, and Sunday review routine.

For architecture, use the [AZ-305 guide][az305-guide] and [self-directed course][az305-course]. Give AI the case-study constraints and ask it to challenge my design.

| Week | Focus and output |
| --- | --- |
| 25–31 Jan | Identity, governance, monitoring: design a multi-team Azure environment. |
| 1–7 Feb | Data storage and integration: compare database choices for specific requirements. |
| 8–14 Feb | Business continuity: design for explicit recovery time and recovery point objectives. |
| 15–21 Feb | Compute, applications, networks: explain service trade-offs for a small application. |
| 22–28 Feb | Migration and full case studies: defend cost, security, and reliability decisions. |
| 1–7 Mar | Practice, weak-area repair, readiness review; target AZ-305 on 7 Mar. |

For DevOps, use the [AZ-400 guide][az400-guide] and [self-directed course][az400-course], after checking AZ-401's status. Azure DevOps lab jobs will use my existing self-hosted agent.

| Week | Focus and output |
| --- | --- |
| 8–14 Mar | Processes, collaboration, source control, and branch policies. |
| 15–21 Mar | Continuous integration and testing: a YAML pipeline with useful test results. |
| 22–28 Mar | Release pipelines, environments, approvals, and a demonstrated rollback. |
| 29 Mar–4 Apr | Artifacts, dependencies, and infrastructure delivery: version and reuse a build output. |
| 5–11 Apr | Security, compliance, secrets, instrumentation: inspect permissions and alert on failure. |
| 12–18 Apr | Mixed scenarios, practice, gap repair; target AZ-400 on 18 Apr. |

Later phases will be expanded here after the first exams. Initial topic blocks:

| Dates | Study and practical focus |
| --- | --- |
| 19 Apr–2 May | AZ-700: address planning, DNS, routing, peering, hybrid connectivity. |
| 3–16 May | AZ-700: application delivery, private access, security, troubleshooting labs. |
| 17–30 May | AZ-700: remaining guide objectives, practice, readiness review. |
| 31 May–13 Jun | SC-500: identity, access, governance, Key Vault. |
| 14–27 Jun | SC-500: storage, databases, networks, compute, AI workload protection. |
| 28 Jun–11 Jul | SC-500: security posture, Defender for Cloud, Sentinel, Security Copilot. |
| 12–25 Jul | SC-500: integrated scenarios and revision. Its page currently says the official practice assessment is unavailable; recheck then. |
| 26 Jul–8 Aug | Optional AI-901: Python/API basics, AI concepts, introductory Foundry exercises. |
| 9–22 Aug | AI-103: Python refresh, solution planning, a working Foundry application. |
| 23 Aug–5 Sep | AI-103: generative AI, retrieval, agents, evaluation, safe tool use. |
| 6–19 Sep | AI-103: vision, text analysis, information extraction, operational checks. |
| 20 Sep–3 Oct | AI-103: remaining objectives, integrated application, unaided practice. |
| 4–17 Oct | Optional DP-900: data concepts, relational/non-relational services, analytics. |
| 18–31 Oct | Optional SC-900: Microsoft identity, security, and compliance concepts. |

Find current Learn material and study guides under **Prepare for the exam** and **Certification resources** on the [AZ-700][network], [SC-500][security], [AI-901][ai-fundamentals], [AI-103][ai-developer], [DP-900][data-fundamentals], and [SC-900][security-fundamentals] pages.

## How to use AI to learn faster

Give the tutor the official objective and relevant documentation. AI explanations and questions can be wrong: verify disputed answers in Microsoft documentation and test practical claims. AI scores alone do not establish readiness.

**Tutor prompt**

> I am preparing for [exam] with seven hours a week. Today's objective is [paste objective and Microsoft Learn link]. Ask three diagnostic questions, one at a time, and wait for my answers. Teach the gaps using an Azure example. Link official sources and flag anything you cannot verify.

**Scenario prompt**

> Create five original practice scenarios for [objective], with realistic constraints and plausible wrong choices. Ask one at a time without revealing the answer. After I explain my choice, assess my reasoning, explain each alternative, and identify what to revise. Do not claim these are real exam questions.

**Lab prompt**

> Design a small lab for [objective] with prerequisites, expected costs, success checks, and cleanup. Give the task first; reveal commands only when I ask for hints. After I finish, change one requirement and ask me to adapt without help.

**Revision prompt**

> Here is my sanitised mistake log. Group errors by concept, select the two most useful topics to revise, and make a 30-minute retrieval quiz. Ask why the tempting alternative is wrong. Verify explanations against current Microsoft documentation.

Attempt questions and labs before asking for answers. Use sanitised examples and finish each week unaided. Useful technical explanations can become [articles](/articles/); the plan and progress stay in this note.

## Readiness before booking

My preparation rule is to meet all three conditions:

- Around **85% or better on two separated practice sessions**, including unfamiliar scenarios and explanations of wrong alternatives. Memorised repeats and unverified AI marking do not count.
- No major objective I cannot explain, with relevant labs completed without following every step of a walkthrough.
- Enough time for mixed questions and case studies, plus familiarity with the exam interface.

The 85% target is my study heuristic, not Microsoft's passing-score formula or a guarantee. If it is not met, add one or two weeks and move later dates. When an official practice assessment is unavailable, rely more on objective-by-objective demonstrations and independently checked scenarios.

Before booking, confirm the current exam, appointment availability, local price, and any employer voucher. **No exam is booked by this note.** After earning a role-based or specialty certification, track expiry and use Microsoft's [free annual renewal process][renewal] while eligible.

## Broader coverage later

After the core route, select a track based on actual work and remaining gaps:

- **Applications and AI operations:** [AI-200, Azure AI Cloud Developer Associate][cloud-developer], then [AI-300's MLOps and GenAIOps scope][ai300-guide] once I have the Python and machine-learning experience.
- **Data:** [DP-300, Azure Database Administrator Associate][database], or [DP-750, Azure Databricks Data Engineer Associate][databricks].
- **Desktop and hybrid:** [AZ-140, Azure Virtual Desktop Specialty][desktop], or [AZ-802, Windows Server Administrator Associate][windows-server], when those workloads are relevant.

These are later options, not additional exams in the current calendar. Recheck the [live certification catalog][catalog] at each checkpoint because paths can change or retire.

## Progress and next action

**Next planned session: Thursday, 5 November 2026 — profile setup, AZ-900 baseline, and cloud concepts.**

No study sessions or exam passes have been recorded yet. Add a short entry after each session:

`Date · objective · minutes · what I did without help · mistake and correction · official source · next review date`

Keep detailed technical notes in my articles; record learning decisions, evidence of progress, and schedule changes here.

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
[transitions]: https://techcommunity.microsoft.com/blog/skills-hub-blog/the-ai-job-boom-is-here-are-you-ready-to-showcase-your-skills/4494128
[july-updates]: https://learn.microsoft.com/en-us/partner-center/announcements/2026-july#specialization-skilling-updates
[agentic-devops]: https://learn.microsoft.com/en-us/credentials/certifications/agentic-devops-engineer-expert/
[admin-prerequisites]: https://learn.microsoft.com/en-us/training/paths/az-104-administrator-prerequisites/
[az900-guide]: https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-900
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
[renewal]: https://learn.microsoft.com/en-us/credentials/certifications/renew-your-microsoft-certification
[cloud-developer]: https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-cloud-developer-associate/
[ai300-guide]: https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-300
[database]: https://learn.microsoft.com/en-us/credentials/certifications/azure-database-administrator-associate/
[databricks]: https://learn.microsoft.com/en-us/credentials/certifications/implementing-data-engineering-solutions-using-azure-databricks/
[desktop]: https://learn.microsoft.com/en-us/credentials/certifications/azure-virtual-desktop-specialty/
[windows-server]: https://learn.microsoft.com/en-us/credentials/certifications/windows-server-hybrid-administrator/
[catalog]: https://learn.microsoft.com/en-us/credentials/browse/?credential_types=certification
