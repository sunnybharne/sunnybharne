---
title: "Logic App to private storage, simply"
description: "How a Standard Logic App reaches a locked-down storage account: VNet integration, two subnets, private endpoints, and why a service endpoint is not this path."
date: 2026-09-10
track: azure-platform
provider: Microsoft Learn
resourceTitle: "Secure traffic between Standard logic apps and Azure virtual networks using private endpoints"
resourceUrl: https://learn.microsoft.com/en-us/azure/logic-apps/secure-single-tenant-workflow-virtual-network-private-endpoint
minutes: 20
tags:
  - logic-apps
  - networking
  - private-link
  - storage
draft: false
---

**The Logic App is connected to the storage account.** That connection is private. It is not a private endpoint on the Logic App, and it is not a service endpoint.

This note records a Standard Logic App in Sweden Central and the storage account it uses for runtime files. Resource names are from that lab. Network access is not the same as permission to read or write data. Authentication still applies. Connection strings and keys stay out of this article.

![The Logic App sends outbound traffic into an integration subnet. The same VNet routes that traffic to four storage private endpoints in a second subnet. Storage public access stays off.](/learning-assets/logic-app-storage-networking/path.svg)

## What is connected?

| Resource | Role in this lab |
| --- | --- |
| `logic-plb-app-test-swc-001` | Standard Logic App, Running, WS1. |
| `stplbapptestswc001` | Runtime storage: job storage and the content file share `logic-plb-app-test-swc-001`. Public network access is **Disabled**. |
| `vnet-spoke-test-swc-001` | Spoke VNet `10.202.0.0/20`. |
| `snet-logicapp-integration-test-swc-001` | Outbound integration subnet `10.202.1.0/24`, delegated to `Microsoft.Web/serverFarms`. |
| `snet-privatelink-test-swc-001` | Private endpoint subnet `10.202.2.0/27`. Holds four storage private endpoints. |

The app uses that storage account. If those four private endpoints are removed and public access stays disabled, the Logic App stops working. It has no other path to storage.

There is no private endpoint **on the Logic App**. There is no service endpoint on these subnets. Storage has no VNet firewall rules. The only private storage path is the four private endpoints.

## Two directions, not one cable

Ask “is it privately connected?” and Azure has two answers.

**Outbound** is how the app *leaves* toward storage, DNS, or the internet. That uses **VNet integration**. The app’s outgoing traffic is placed in `snet-logicapp-integration-test-swc-001`. Packets look like they come from `10.202.1.0/24`. This lab has **route all** on, and the content share is forced over the VNet. The app sets DNS to `168.63.129.16`, Azure’s DNS, so storage names can resolve to private endpoint addresses.

**Inbound** is how something *calls* the Logic App, for example an HTTP trigger. That would need either public access on the app, or a private endpoint **on the app**. This lab has public inbound **off** and **no** app private endpoint. A VM in the VNet cannot privately HTTP-trigger the app. Recurrence could still run later, once a workflow exists, if outbound dependencies stay reachable.

A managed identity is not a network hop. It authenticates the app to Azure APIs. It does not give the app a private IP.

This lab has **no workflows** yet, so nothing is triggerable. The network path to storage still matters: Standard hosting needs that account to run.

See the [hosting comparison](/articles/logic-apps/) for plan choices and [Logic Apps pricing](/articles/logic-apps-pricing/) for what WS1 costs. This note is only the network path.

## VNet integration is not a private endpoint

A **private endpoint** is a NIC in a subnet that *is* the PaaS resource for inbound. Clients send packets to that private IP. Storage has that: four NICs in `snet-privatelink-test-swc-001` for blob, file, queue and table.

**VNet integration** does the other job. It lets the Logic App *join* the VNet so its *outbound* traffic can use VNet routing. Azure delegates the integration subnet to App Service. There is no “Logic App private IP” for callers to hit.

So yes: outbound is privately on the VNet. No: that is not a private endpoint, and it is not inbound access to the app.

Traffic does **not** enter this VNet from the public internet to reach storage. The app’s outbound sockets are injected into the integration subnet. From there the path stays inside the VNet until Private Link carries it into the storage account.

## Same VNet, two subnets

The two subnets are not the same. They are also not “linked” as one attachment.

| Subnet | What sits there | What it is for |
| --- | --- | --- |
| `snet-logicapp-integration-test-swc-001` | Logic App outbound | The app enters the VNet here. |
| `snet-privatelink-test-swc-001` | Four storage private endpoints | Storage is reached here. |

Storage does not “live” in the privatelink subnet. The account still lives in Azure Storage. That subnet only holds the private endpoint NICs.

Subnets in one VNet can talk to each other by default. In this lab neither subnet has an NSG, route table, or NAT gateway, so that default still applies: `10.202.1.0/24` can send to `10.202.2.0/27`.

The working path is:

```text
Logic App
  → integration subnet 10.202.1.0/24
  → same VNet routing
  → private endpoint NICs 10.202.2.0/27
  → Private Link
  → stplbapptestswc001
```

The four endpoints are `pep-app-blob-test-swc-001`, `pep-app-file-test-swc-001`, `pep-app-queue-test-swc-001`, and `pep-app-table-test-swc-001`. All sit on the privatelink subnet. A Standard app with this storage pattern needs those services, not blob alone. [Private runtime storage](https://learn.microsoft.com/en-us/azure/logic-apps/deploy-single-tenant-logic-apps-private-storage-account).

## Is this a service endpoint?

**No.** Nothing here is using a service endpoint today.

A **service endpoint** is a setting on a subnet, not on the Logic App. `Microsoft.Storage` on a subnet lets Azure treat traffic from that subnet as coming from the VNet when it uses storage’s **public** hostname. The storage firewall must also allow that subnet. The destination is still the public storage endpoint, only restricted.

This lab cannot use that path:

- Storage public access is **Disabled**. The public door is shut.
- Storage has **no** virtual network rules.
- The subnets do not show a storage service endpoint.

If the four private endpoints were deleted and public access stayed disabled, a service endpoint would not save the app.

## Can we use a service endpoint instead?

Only after changing storage. Roughly:

1. Change storage public access from **Disabled** to **Enabled from selected virtual networks and IP addresses**.
2. Enable **Microsoft.Storage** on the Logic App integration subnet.
3. Add that subnet to the storage firewall.
4. Then the private endpoints could be removed *if* that public-but-restricted path is what you want.

That is a weaker model. The content file share often still wants a **file** private endpoint when the account is locked down. A policy that requires storage public access to stay disabled will block this design. [App Service VNet integration and service endpoints](https://learn.microsoft.com/en-us/azure/app-service/overview-vnet-integration#service-endpoints), [storage VNet rules](https://learn.microsoft.com/en-us/azure/storage/common/storage-network-security-virtual-networks).

## Can both exist at once?

**Yes.** Azure will let a storage account have private endpoints and service endpoints together.

They do not both carry the same request. DNS picks the path:

- If the storage hostname resolves to a **private IP**, the private endpoint is used.
- A service endpoint only applies when traffic still goes to storage’s **public** address.

Keep public access **Disabled**, and the live path stays the private endpoints. A service endpoint would sit unused. Traffic that still tried the public hostname would be dropped.

Do not assume automatic fallback if Private Link fails. Test each path on purpose. [Storage private endpoints](https://learn.microsoft.com/en-us/azure/storage/common/storage-private-endpoints).

## What we checked

- App public inbound: disabled. No private endpoint on the app. HTTP inbound has no path.
- App outbound: VNet integration on the integration subnet, route all on, content share over VNet, DNS `168.63.129.16`.
- Storage public access: disabled. Four approved private endpoints on the privatelink subnet.
- Same spoke VNet. Two different subnets. Default routing between them. No NSG or UDR on those two subnets in this lab.
- Identity: system assigned. Authentication only.
- No workflows deployed yet.

A successful workflow run later would prove data-plane access. This note is control-plane configuration: how the path is wired, not a live packet capture.

## References

- [Private networking for Standard Logic Apps](https://learn.microsoft.com/en-us/azure/logic-apps/secure-single-tenant-workflow-virtual-network-private-endpoint)
- [Deploy with private runtime storage](https://learn.microsoft.com/en-us/azure/logic-apps/deploy-single-tenant-logic-apps-private-storage-account)
- [Regional VNet integration](https://learn.microsoft.com/en-us/azure/app-service/overview-vnet-integration)
- [Storage account walkthrough](/articles/storage-account/)
- [Logic Apps hosting plans](/articles/logic-apps/)
