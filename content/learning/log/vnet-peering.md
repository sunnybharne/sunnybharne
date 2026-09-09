---
title: "VNet peering, simply"
description: "Connect two Azure private networks and understand what that connection allows."
date: 2026-09-09
track: azure-platform
provider: Microsoft Learn
tags:
  - networking
  - virtual-network
  - azure-bastion
draft: false
---

**VNet peering connects two Azure virtual networks using private IP addresses.** Traffic between them stays on Microsoft's backbone. The VNets keep their own resources and subscription ownership. Peering can connect networks in the same region or different regions. [Microsoft overview](https://learn.microsoft.com/en-us/azure/virtual-network/virtual-network-peering-overview).

## Why would we need it?

Imagine a platform subscription with a hub VNet and Bastion. An application subscription contains a VM in another VNet. Being in the same tenant does not connect those networks.

![Laptop connects over Internet HTTPS to hub Bastion. Bastion connects over private VNet peering to a spoke VM. The VM has no public IP.](/learning-assets/vnet-peering/path.svg)

With peering, hub Bastion can reach that VM's private IP. Basic or higher supports this shared deployment. The user still needs resource permissions and valid VM login rights. [Bastion across peered networks](https://learn.microsoft.com/en-us/azure/bastion/vnet-peering).

## What do we configure?

Create a peering link on **each VNet**, pointing to the other. Check that both show **Connected**.

| Setting | For this Bastion example |
|---|---|
| Address ranges | Must not overlap. Example: hub `10.10.0.0/16`, spoke `10.20.0.0/16`. |
| Virtual network access | Enable in both directions. |
| Forwarded traffic | Leave off for this direct Bastion-to-VM connection. Used for traffic forwarded by an appliance. |
| Gateway transit / remote gateway | Leave off. These are for sharing a VPN or ExpressRoute gateway, not Bastion. |

Peering permits a network path; it does not configure the application's firewall or grant a Windows login. [Settings and requirements](https://learn.microsoft.com/en-us/azure/virtual-network/virtual-network-manage-peering).

## Does everything become public?

**No.** Peering itself adds no public IP. For a public-facing Bastion session, the laptop reaches Bastion over Internet HTTPS on port 443. Bastion then opens private RDP to the Windows VM on port 3389. The VM needs no public IP.

NSGs and Windows Firewall must permit that RDP connection. Peering is broader than a single port: use firewall rules to limit which services can communicate.

## Does it connect every spoke together?

**No. Peering is not transitive.** If spoke A peers with the hub and spoke B peers with the hub, A does not automatically gain a route to B through it. That needs a separate network design. Peering also does not automatically send traffic through a hub firewall. [Peering constraints](https://learn.microsoft.com/en-us/azure/virtual-network/virtual-network-manage-peering#requirements-and-constraints).

## How do we know it worked?

Check both peering states, then the VM NIC's effective routes. The remote network should have a **Virtual network peering** route. Finally, test the intended service. A connected peering alone does not prove an RDP login works.

In this walkthrough, the hub and VM networks were connected without adding a public IP to the VM. The interactive Bastion login remains a separate test.

Peering has data-transfer charges. It is not a free replacement for all network services. [Routing and pricing](https://learn.microsoft.com/en-us/azure/virtual-network/virtual-network-peering-overview).
