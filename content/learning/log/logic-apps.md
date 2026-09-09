---
title: "Logic Apps, simply"
description: "Understand Logic Apps hosting plans and how a workflow connects to private storage."
date: 2026-09-09
track: azure-platform
provider: Microsoft Learn
draft: false
tags:
  - logic-apps
  - networking
---

A Logic App runs a workflow: something starts it, then it performs a series of actions. For example: run every hour, read a blob, and process its contents.

## Which hosting plan?

The plan determines where the workflow runs, how it connects to networks, and how you pay.

| Portal option | Simple explanation | Charging model |
| --- | --- | --- |
| Consumption | Shared infrastructure, useful for small workflows using public service endpoints. No direct VNet integration. | Pay per operation. |
| Standard — Workflow Service Plan | Dedicated compute with VNet integration. Our choice for this private networking demonstration. | Hosting capacity, even when workflows are idle; other service charges can apply. |
| Standard — App Service Environment V3 | Run in a dedicated, isolated App Service environment. Useful when an organisation needs that level of isolation. | Environment and hosting capacity. |
| Standard — Hybrid | Run the runtime on infrastructure you manage, with local network access. | Runtime usage plus the infrastructure you operate. |
| Automation Project (preview) | The portal offers managed hosting with VNet integration and scale to zero. Check preview limitations and availability before adopting it. | The portal lists a base charge plus vCPU-second usage. |

The preview option and its labels reflect the portal shown during this walkthrough. They may change.

## Service endpoint or private endpoint?

These are different features:

- **VNet integration** lets the Standard Logic App send traffic into a VNet.
- A **service endpoint** lets a supported service recognise traffic from an allowed subnet. Storage still uses its public endpoint, with its firewall allowing selected networks.
- A **private endpoint** gives the storage service a private IP in a subnet. This works with storage public network access disabled, provided DNS, routing and permissions are configured.

For a storage account with public network access disabled, use a **private endpoint**. A service endpoint alone cannot provide access to that account.

The private storage path is:

```text
Logic App Standard
    → VNet integration
    → Storage private endpoint
    → Blob Storage
```

Use the built-in Blob connector for this path. Managed connectors run outside the app's runtime and do not automatically use its VNet integration. Network access also does not grant permission to read blobs: authentication and authorisation are still required.

A private endpoint on the Logic App itself serves a different purpose: private inbound access to the app. It is not what gives the app outbound access to storage.

## Basics: what are these fields?

**Instance details** is just a heading for the Logic App resource being created. It does not mean you must create a VM. One Standard Logic App can contain several workflows.

| Field | Meaning |
| --- | --- |
| Resource group | A container for related resources. A new group makes the demo easier to manage and remove later. |
| Logic App name | The name of the app that contains the workflows. It also forms part of its Azure hostname, subject to availability. Each workflow inside it gets its own name. |
| Region | Where the app runs. For this demo, choose Sweden Central to match the intended VNet. |
| Windows plan | The hosting compute that runs the app: its CPU, memory, capacity and price tier. Azure manages the Windows hosts; there is no Windows desktop or administrator password to configure here. |
| Zone redundancy | Spreads hosting instances across availability zones within the region to help survive a zone failure. Leave disabled for this small demo. |

The **Logic App** contains the workflow definitions. The **Windows plan** supplies the computing power to execute them. They are separate Azure resources. The plan can continue to cost money even when the app has no workflow runs.

See Microsoft's [Standard app creation guide](https://learn.microsoft.com/en-us/azure/logic-apps/create-single-tenant-workflows-azure-portal) and [zone redundancy guide](https://learn.microsoft.com/en-us/azure/logic-apps/set-up-zone-redundancy-availability-zones).

## Why another private endpoint?

The existing storage private endpoint targets Storage. The inbound private endpoint in the Logic App creation form targets the Logic App. They have different private IP addresses and cannot be reused as the same endpoint.

```text
Private caller → Logic App private endpoint → Logic App
Logic App → VNet integration → Storage private endpoint → Storage
```

The existing storage endpoint can serve multiple authorised clients that can reach it and resolve its DNS name. We do not need to duplicate it for each app. We do need a separate endpoint if we want private inbound access to the Logic App itself.

Keep public access disabled and enable VNet integration for outbound access. Put the app's private endpoint in a suitable non-delegated subnet, separate from its outbound integration subnet. Access can also come from connected networks with working routing, DNS and security rules; it is not limited strictly to the endpoint's own VNet.

An existing private storage account can be reused, but the integration subnet must reach its required storage endpoints and resolve their private DNS names. Choosing a VNet merely by name does not establish that connectivity.

The app's runtime storage also needs connectivity. A Blob private endpoint alone may not cover its runtime storage needs; check the required File, Queue and Table endpoints before deployment.

## References

- [Compare hosting options](https://learn.microsoft.com/en-us/azure/logic-apps/single-tenant-overview-compare)
- [Private networking for Standard Logic Apps](https://learn.microsoft.com/en-us/azure/logic-apps/secure-single-tenant-workflow-virtual-network-private-endpoint)
- [Deploy with private runtime storage](https://learn.microsoft.com/en-us/azure/logic-apps/deploy-single-tenant-logic-apps-private-storage-account)
- [Plan and manage costs](https://learn.microsoft.com/en-us/azure/logic-apps/plan-manage-costs)

## Networking: the service endpoint example

Use a separate demo storage account so the existing private account stays unchanged.

| Choice | Why |
| --- | --- |
| VNet integration: On | Lets the app send traffic through the selected subnet. |
| Outbound integration subnet | A subnet delegated for App Service integration, separate from the private endpoint subnet. |
| Storage public access: Selected virtual networks and IP addresses | The portal says it restricts storage to the integration subnet. This is the service endpoint approach. |
| Add client IP: Unchecked | The laptop does not need direct storage access for this demonstration. |
| Private endpoints for connected services: Off | This example uses the storage public endpoint with subnet restrictions. |
| Logic App public inbound access: Off | Receiving public requests is separate from sending requests to storage. |
| Logic App inbound private endpoint: Off for now | Not needed for a scheduled storage test. Without an inbound access path, private HTTP callers cannot invoke the app either. |

The storage service endpoint is configured on the integration subnet as `Microsoft.Storage`. The storage firewall must allow that subnet. Selecting a VNet alone is not sufficient. Verify the generated deployment and resulting subnet settings before calling the example complete.

Traffic flows from the Logic App through its integration subnet to the storage public endpoint over Azure's network. No private DNS zone is needed for this storage service endpoint path. Authentication is still required.

A policy that requires storage public network access to be disabled can block this design, even though access is limited to a subnet. Check policy validation before deployment.

See [VNet integration and service endpoints](https://learn.microsoft.com/en-us/azure/app-service/overview-vnet-integration#service-endpoints) and [storage virtual network rules](https://learn.microsoft.com/en-us/azure/storage/common/storage-network-security-virtual-networks).

## Can we select both storage options?

Yes. Under **Networking → Connected services network access**, the portal offers two separate controls:

1. **Storage public network access → Enable public access from selected virtual networks and IP addresses.** This restricts the storage public endpoint to allowed networks. The integration subnet needs the storage service endpoint.
2. **Private endpoints for connected services → Add private endpoint → On.** This adds private connectivity to the storage account selected on the Storage tab. Enter a name prefix, choose a non-delegated subnet, and configure private DNS.

The prefix names the endpoints; it does not choose the target service. After deployment, inspect each endpoint's **Private link resource** and **Target subresource** to see the account and service it targets. Storage uses separate endpoints for services such as Blob and File.

Both methods can exist on the storage account. They are not two paths used simultaneously for every request. DNS determines the destination: when the storage hostname resolves to the private endpoint IP, that request uses Private Link. A client resolving the public address needs a permitted public endpoint path. Do not assume automatic fallback if private connectivity fails.

If storage public access is **Disabled**, its service endpoint path stops working. The private endpoint path can continue to work. Disabling the Logic App's public access is a different setting and does not disable its outbound storage connections.

## What if both incoming options are off?

With Logic App public access disabled and no inbound private endpoint, callers have no normal HTTP entry point to the app. A scheduled workflow can still run when its runtime dependencies are reachable. Enable an inbound private endpoint when private clients need to call an HTTP-triggered workflow.

A private endpoint does not itself trigger a workflow. It supplies a network path to the app or storage service.

## Remaining creation tabs

- **Monitoring:** Application Insights collects diagnostic and performance data, with usage-based charges. The portal may disable its automatic setup for some selections. Our demonstration leaves it off.
- **Authentication:** Controls how the app authenticates to its runtime storage. Network access and data permission are separate requirements. Keep secrets out of articles and source control.
- **Tags:** Add the ownership and environment tags required by your organisation.
- **Review + create:** Check the final resources and policy validation. Creating the hosting resources does not prove a workflow ran successfully.

## Verify the result

Check provisioning, the app's public access setting, VNet integration, subnet service endpoints, and storage firewall rules. Check private endpoint approvals and the private DNS records and VNet links. Then run a workflow that reads or writes a test object with the built-in connector and inspect its run history.

If both storage methods are configured, a successful run alone does not prove both paths work. Confirm DNS and test each path separately in a controlled environment. A tenant policy requiring storage public access to be disabled must be resolved through the organisation's approved exception process before a service endpoint demonstration can deploy.
