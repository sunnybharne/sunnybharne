---
title: "Logic Apps hosting and networking"
description: "Compare hosting plans and configure a Standard Logic App with private runtime storage."
date: 2026-09-09
track: azure-platform
provider: Microsoft Learn
draft: false
tags:
  - logic-apps
  - networking
---

We chose **Standard on a Workflow Service Plan** so the Logic App could reach private storage through VNet integration. The plan bills for capacity even while workflows are idle. [Sweden Central pricing](/articles/logic-apps-pricing/)

## Hosting plans

| Plan | Where it runs | What you pay for |
| --- | --- | --- |
| Consumption | Shared hosting without direct VNet integration | Operations |
| Standard, Workflow Service Plan | Dedicated compute with VNet integration | Hosting capacity |
| Standard, App Service Environment v3 | Isolated App Service environment | Environment and hosting capacity |
| Standard, Hybrid | Infrastructure you manage | Runtime and infrastructure |
| Automation Project (preview in the September 2026 portal) | Managed hosting with VNet integration and scale to zero | Base charge and vCPU-seconds |

A Standard app holds multiple workflows. Its Windows plan supplies their CPU and memory. We chose Sweden Central to match the VNet and left zone redundancy off for the lab. [Hosting options](https://learn.microsoft.com/en-us/azure/logic-apps/single-tenant-overview-compare) · [Zone redundancy](https://learn.microsoft.com/en-us/azure/logic-apps/set-up-zone-redundancy-availability-zones)

## Connect to storage

| Storage setting | Required network path |
| --- | --- |
| Public network access **Disabled** | Integrate the app with a delegated subnet. Use storage private endpoints in a separate subnet. Our runtime storage used Blob, File, Queue, and Table endpoints. [Lab configuration](/articles/logic-app-storage-networking/) |
| Public access from **Selected networks** | Enable `Microsoft.Storage` on the integration subnet and allow that subnet in the storage firewall. This path uses the public storage address. A policy requiring disabled public access can block it. [Storage network rules](https://learn.microsoft.com/en-us/azure/storage/common/storage-network-security-virtual-networks) |

For a workflow that reads blobs through the VNet, use the **built-in Blob connector** and grant data access. Managed connectors run outside the app runtime. If both storage paths exist, DNS determines which address the app reaches. Inspect each private endpoint’s target account and subresource. [Private runtime storage](https://learn.microsoft.com/en-us/azure/logic-apps/deploy-single-tenant-logic-apps-private-storage-account)

## Inbound requests

A caller needs a private endpoint **on the Logic App** to invoke an HTTP workflow when public inbound access is off. Storage private endpoints serve the app’s outbound requests. A scheduled workflow can run with inbound access closed if it can reach its dependencies. [Logic Apps private networking](https://learn.microsoft.com/en-us/azure/logic-apps/secure-single-tenant-workflow-virtual-network-private-endpoint)

## Verify the connection

Check DNS resolution from the app, private endpoint approvals, and storage firewall rules. Run a workflow that reads a test blob and inspect its run history. If testing both storage paths, check each separately.
