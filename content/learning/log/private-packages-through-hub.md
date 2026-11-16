---
title: "Serving VM configuration packages through a hub"
description: "A proposed design for VMs in spoke networks to download configuration packages from private Blob Storage."
date: 2026-09-09
track: azure-platform
provider: Microsoft Learn
tags:
  - machine-configuration
  - private-link
  - networking
  - azure-policy
draft: false
---

A VM in a spoke network needs a Windows configuration ZIP but cannot reach a public package host. I propose a shared Blob private endpoint in the regional hub. The design still needs testing.

## Route the download

![Each spoke VNet peers directly with the hub. VMs reach the package container through the hub’s Blob private endpoint.](/learning-assets/private-packages-through-hub/shared-hub.svg)

Keep public network access and anonymous Blob access disabled. Link `privatelink.blob.core.windows.net` to the hub VNet. Point each spoke’s DNS at the hub’s Azure DNS Private Resolver inbound endpoint. The normal storage hostname should resolve to the private endpoint IP from every spoke. If traffic needs firewall inspection, configure that route explicitly. [Shared private endpoints](https://learn.microsoft.com/en-us/azure/architecture/networking/guide/private-link-hub-spoke-network) · [DNS integration](https://learn.microsoft.com/en-us/azure/private-link/private-endpoint-dns-integration)

## Separate the three identities

![Azure Policy deploys the assignment. The VM downloads and verifies the ZIP, applies supported settings, and reports the result.](/learning-assets/private-packages-through-hub/vm-download.svg)

| Identity | Job |
| --- | --- |
| Publisher | Upload a tested, versioned ZIP from a runner with private storage access. Keep the previous ZIP for rollback. |
| Policy assignment | Deploy the machine assignment with the package URI, hash, mode, and reader identity. |
| VM package reader | Download the ZIP over HTTPS with **Storage Blob Data Reader** scoped to the container. A controlled group of VMs can share a user-assigned identity. |

The agent verifies the hash, runs the package, and reports to the Machine Configuration service. For Azure VMs, the `EnablePrivateNetworkGC = TRUE` tag configures private service communication. Package downloads still use the Blob endpoint. An apply-capable package with `ApplyAndAutoCorrect` can repair later drift. [Package access](https://learn.microsoft.com/en-us/azure/governance/machine-configuration/how-to/develop-custom-package/5-access-package) · [Service connectivity](https://learn.microsoft.com/en-us/azure/governance/machine-configuration/overview/03-network-requirements)

## Onboard new subscriptions

![Landing-zone code creates spoke peering and DNS settings. Inherited policies prepare VMs. Checks verify the download, setting, and report.](/learning-assets/private-packages-through-hub/automatic-onboarding.svg)

Landing-zone code creates the spoke, both peering links, DNS settings, and network rules. Assign the prerequisite initiative and configuration policy at the parent management group. Attach the reader identity and remediate existing VMs that lack the extension or assignment. [Prerequisites](https://learn.microsoft.com/en-us/azure/governance/machine-configuration/overview/02-setup-prerequisites)

For multiple hubs, plan DNS and package placement together. Several endpoint IPs for one hostname do not guarantee regional failover. Size each hub for peering count, DNS requests, and download traffic. [Peering limits](https://learn.microsoft.com/en-us/azure/virtual-network/virtual-network-peering-overview)

## Acceptance test

1. From VMs in two spoke subscriptions, resolve the storage hostname to the hub endpoint and download the ZIP with public access disabled.
2. Confirm a VM without the reader role is denied.
3. Change a test setting. Check that the agent restores it and reports the expected value.
4. Deploy another landing zone and repeat without manual setup. [Windows package example](/articles/windows-password-age-policy/)
