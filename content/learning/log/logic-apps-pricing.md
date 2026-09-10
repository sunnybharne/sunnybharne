---
title: "Logic Apps pricing, simply"
description: "What you pay on Consumption, Standard WS1–WS3, ASE v3, Hybrid, and the preview Automation option, using Sweden Central list prices."
date: 2026-09-10
track: azure-platform
provider: Microsoft Learn
resourceTitle: "Logic Apps pricing"
resourceUrl: https://azure.microsoft.com/en-us/pricing/details/logic-apps/
minutes: 16
tags:
  - logic-apps
  - cost
draft: false
---

**Logic Apps does not have one price.** The hosting option picks the meter. Connectors, runtime storage and integration accounts can add more.

This note uses **Sweden Central** pay-as-you-go **USD** list prices from the Azure Retail Prices API on **10 September 2026**. Monthly figures use **730 hours**, the same convention as Microsoft’s Standard examples. Enterprise Agreement discounts, reservations and extra resources such as Application Insights are not included. [Pricing model](https://learn.microsoft.com/en-us/azure/logic-apps/logic-apps-pricing), [Pricing page](https://azure.microsoft.com/en-us/pricing/details/logic-apps/).

The lab Standard app `logic-plb-app-test-swc-001` is **WS1**. That plan bills while the app exists, even with no workflows. See [Logic Apps, simply](/articles/logic-apps/) for hosting choices and [the private storage path](/articles/logic-app-storage-networking/) for why this lab is not Consumption.

![Hosting options and Sweden Central list prices for Logic Apps.](/learning-assets/logic-apps-pricing/hosting.svg)

## What you are choosing

| Portal option | You pay for | Idle cost |
| --- | --- | --- |
| Consumption | Each trigger and action | **$0** |
| Standard · Workflow Service Plan | Reserved vCPU and memory (WS1, WS2 or WS3) | The SKU, even when idle |
| Standard · App Service Environment v3 | Isolated v2 Windows plan instances | Those instances |
| Standard · Hybrid | Logic Apps vCPU time **plus** Kubernetes and SQL you run | Your infra; Azure still bills vCPU while the app is enabled |
| Automation Project (preview) | Environment hours plus execution | Preview meters; confirm before adopting |

ISE (Integration Service Environment) is **retired**. It is not a current option for private networking.

## Sweden Central list prices

Built-in Consumption actions: first **4,000 per subscription per month** are free, then **$0.000025** each.

| Meter | Price |
| --- | --- |
| Consumption Standard connector | $0.000163 per call |
| Consumption Enterprise connector | $0.0013 per call |
| Consumption data retention | $0.12 per GB-month |
| Standard vCPU | $0.1972 per hour |
| Standard memory | $0.0141 per GiB-hour |
| Hybrid vCPU | $0.234 per hour |
| Integration Account Basic | $300 per month |
| Integration Account Standard or Premium | $1,000 per month |

Standard **WS** monthly estimate for **one instance**:

| SKU | Capacity | Estimate |
| --- | --- | --- |
| WS1 | 1 vCPU, 3.5 GB | **$180** |
| WS2 | 2 vCPU, 7 GB | **$360** |
| WS3 | 4 vCPU, 14 GB | **$720** |

Formula: `730 × [(vCPU × $0.1972) + (GB × $0.0141)]`. Scale-out repeats that charge. Zone redundancy needs more instances, so the floor rises.

ASE v3 has **no stamp fee**. You pay Isolated v2 Windows instances. Logic Apps on ASE is Windows only.

| SKU | Capacity | Hourly | ~730 hours |
| --- | --- | --- | --- |
| I1v2 | 2 vCPU, 8 GB | $0.57 | **$416** |
| I2v2 | 4 vCPU, 16 GB | $1.14 | **$832** |
| I3v2 | 8 vCPU, 32 GB | $2.28 | **$1,664** |

Hybrid in Sweden Central is **$0.234** per vCPU-hour. East US is **$0.18**. Charge = allocated vCPUs × replicas × hourly rate. You still run the cluster and SQL.

## When Consumption is cheaper

Consumption wins when volume stays modest **and** you do not need VNet integration.

| Workload in one month | Consumption | One WS1 |
| --- | --- | --- |
| 2,000 built-in actions | **$0** (inside the free grant) | ~$180 |
| 200,000 built-in actions | **$4.90** | ~$180 |
| 10 million built-in actions | **~$250** | ~$180 if they fit on WS1 |

About **7.2 million** built-in actions in a month is where Consumption’s action bill matches one idle WS1, before storage or connectors.

Polling triggers on Consumption can bill even when they **skip**. Skipped or failed executions still count. Loops bill the loop and each inner action, each cycle.

This lab needs private runtime storage. **Consumption cannot do that path.** Standard is the hosting choice here, not a cost optimisation.

## When Standard is cheaper

Standard includes **unlimited free built-in operations**. Managed connector calls still use the **same** Standard and Enterprise prices as Consumption.

Standard becomes cheaper when you **replace** high-volume managed connectors with built-in ones (Service Bus, Blob, SQL and similar) that run in the app process.

| If Standard uses built-in instead of managed Standard connectors | Rough break-even vs one WS1 |
| --- | --- |
| Standard connector calls | About **1.1 million** calls / month |
| Enterprise connector calls | About **180,000** calls / month |

If you keep managed connectors on Standard, you pay **WS1 plus** those connector calls. Consumption would pay only the connector calls. Hosting is then extra, paid for VNet, local built-in throughput, multiple workflows in one app, or stateful/stateless options.

ASE is for isolation and packing many apps into one environment. It is not a cheaper WS1. Hybrid is for running on your infrastructure, not for shaving the WS1 floor.

## Extra bills next to the plan

These sit on the invoice whether you picked Consumption or Standard:

- **Managed connectors** — per call, rates above.
- **Runtime storage** on Standard — your storage account, billed as Storage. This lab’s private endpoints do not add a Logic Apps meter; they add Private Link and DNS.
- **Integration account** — $0 Free (one per region, no SLA), $300 Basic, $1,000 Standard or Premium. Standard can use XML and Liquid maps **without** one.
- **Application Insights** — optional, usage-based.

A disabled logic app does not start new runs. In-progress runs can finish and still bill. Delete leftover integration accounts and storage yourself.

## What this lab is paying

`logic-plb-app-test-swc-001` on **WS1** in Sweden Central: about **$180 per month** for the plan, plus storage for the runtime account, plus any managed connector calls later. No workflows yet does not pause the plan.

Switching that app to Consumption would drop the hosting floor to $0 and **break** the private storage path.

## References

- [Usage metering, billing, and pricing](https://learn.microsoft.com/en-us/azure/logic-apps/logic-apps-pricing)
- [Plan and manage costs](https://learn.microsoft.com/en-us/azure/logic-apps/plan-manage-costs)
- [Hosting comparison](https://learn.microsoft.com/en-us/azure/logic-apps/single-tenant-overview-compare)
- [Logic Apps pricing](https://azure.microsoft.com/en-us/pricing/details/logic-apps/)
- [Azure Retail Prices API](https://learn.microsoft.com/en-us/rest/api/cost-management/retail-prices/azure-retail-prices)
