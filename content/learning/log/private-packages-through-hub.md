---
title: "Private VM configuration through a hub, simply"
description: "A shared private download point for VM configuration packages, with automatic setup for new subscriptions."
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

**Keep configuration packages in private storage. Give spoke VMs access through a shared private endpoint in the hub. Use policy and infrastructure code to prepare each new VM and network automatically.**

This is a **proposed architecture**, using generic names. It explains the design for stakeholder review; it does not claim that this hub solution has been deployed or tested.

## The problem we are solving

A Windows VM needs a configuration package to apply a setting, such as a local password rule. The package is a ZIP containing the configuration and the code that checks and changes Windows.

The VM cannot reach GitHub or another public package host. We also want to add subscriptions without manually configuring every VM.

**Azure Policy can tell a VM which package to use. The VM still needs a working path to download it.** Microsoft requires custom packages to be available over HTTPS from a location the managed machine can reach. [Package hosting requirements](https://learn.microsoft.com/en-us/azure/governance/machine-configuration/how-to/develop-custom-package/4-publish-package).

## 1. Share the private connection through the hub

A **hub** is the platform team's shared network. A **spoke** is a workload's network, usually in a separate subscription. **Peering** provides a private connection between the two networks.

![Three subscription VNets peer directly to one regional hub. A Blob private endpoint sits in a dedicated hub subnet and connects to package storage outside the VNet. Each VM initiates its own private download.](/learning-assets/private-packages-through-hub/shared-hub.svg)

[Open diagram 1 at full size](/learning-assets/private-packages-through-hub/shared-hub.svg)

The platform team provides a storage account, a Blob container for packages and a **Blob private endpoint in the hub**. Public network access and anonymous Blob access stay disabled. The storage account can belong to the platform subscription while remaining outside the VNet. The endpoint is its private network entry point.

Every connected spoke reaches this endpoint through its **own direct peering to the hub**. The design does not depend on one spoke reaching another spoke. Microsoft describes this central placement for private endpoints serving shared resources. [Shared private endpoint architecture](https://learn.microsoft.com/en-us/azure/architecture/networking/guide/private-link-hub-spoke-network).

A firewall is not required just to reach this hub endpoint. If the organisation requires traffic inspection, the platform team must design and test the routing separately. Putting a firewall in the hub does not automatically send traffic through it.

## 2. Separate the instruction from the download

![Four stages: Azure Policy deploys a Machine Configuration assignment; the VM agent resolves the private address and downloads the ZIP using its read identity; Windows applies the setting; the agent reports the result over a separately configured service connection.](/learning-assets/private-packages-through-hub/vm-download.svg)

[Open diagram 2 at full size](/learning-assets/private-packages-through-hub/vm-download.svg)

| Part | Its job |
|---|---|
| Azure Policy | Select applicable VMs and deploy their configuration assignments. |
| Private DNS | Turn the storage name into the hub endpoint's private IP. |
| Private endpoint | Provide the private path to Blob Storage. |
| Managed identity | Let storage check whether the VM may read the package. |
| Machine Configuration agent | Download the ZIP, verify its hash, check Windows and apply supported changes. |

The VM initiates the download. The ZIP comes back on that connection; policy does not push the ZIP through the management group.

An assignment using **ApplyAndAutoCorrect** can correct later changes during agent checks. It requires a package capable of changing the setting. A package that only audits cannot enforce it. [Configuration modes](https://learn.microsoft.com/en-us/azure/governance/machine-configuration/concepts/remediation-options).

## How DNS works for all the spokes

Think of DNS as a contact list: the application supplies a name and receives an address.

For this design, a managed **Azure DNS Private Resolver** in the hub answers the spokes' DNS questions. The Blob private DNS zone, **privatelink.blob.core.windows.net**, is linked to the hub. Each spoke's VNet DNS setting points to the resolver's private inbound address, configured by the landing-zone template.

The application keeps using the normal storage hostname. DNS supplies the hub endpoint's private IP. **Peering alone does not make a spoke use the hub's DNS.**

This design avoids adding every spoke as a link to every private DNS zone. For smaller environments using Azure-provided DNS directly, linking the shared zone to each client VNet is another valid model. Choose one consistent resolution design. [DNS resolver patterns](https://learn.microsoft.com/en-us/azure/dns/private-resolver-endpoints-rulesets), [Private endpoint DNS integration](https://learn.microsoft.com/en-us/azure/private-link/private-endpoint-dns-integration).

## Who can read or change the packages?

Use a **package-reader managed identity** with **Storage Blob Data Reader** on the package container. This identity reads configuration; it does not need Owner access or permission to upload packages.

A user-assigned identity can be reused by a controlled group of VMs that need the same packages. IaC or a dedicated policy attaches it to those VMs, and the configuration assignment references it for package access. This reduces the need for a separate storage role assignment for every VM. Microsoft also supports system-assigned identities for package downloads; a reusable identity is a design choice, not a mandatory requirement. [Package access](https://learn.microsoft.com/en-us/azure/governance/machine-configuration/how-to/develop-custom-package/5-access-package), [Supported identity options](https://learn.microsoft.com/en-us/azure/governance/machine-configuration/how-to/create-policy-definition).

The **policy assignment's identity** has a different job: deploying the Azure resources needed for remediation. The **publishing identity** writes tested packages. Keeping these roles separate prevents VMs from replacing the code other machines will run.

An NSG on the endpoint subnet can limit access to approved networks on HTTPS port 443 when private endpoint NSG support is enabled. DNS and a private IP do not grant access to Blob data.

## 3. Make new subscriptions join automatically

![The platform foundation creates shared services. Landing-zone code creates each spoke, peering and DNS settings. Inherited policies prepare applicable VMs. Automated checks verify private resolution, download, application and reporting. Repeat the hub pattern as regions or capacity require.](/learning-assets/private-packages-through-hub/automatic-onboarding.svg)

[Open diagram 3 at full size](/learning-assets/private-packages-through-hub/automatic-onboarding.svg)

| Managed through code | What it creates or configures |
|---|---|
| Platform connectivity | Hub endpoint subnet, Blob endpoint, DNS resolver, zone and required network rules. |
| Package storage and IAM | Private storage, package container, reader identity and scoped read/write roles. |
| Landing-zone deployment | Spoke VNet, both peering links, DNS settings and approved network access. |
| Policy management | Prerequisite initiative, private service setting and custom configuration policy at the organisation's management group. |
| Package pipeline | Build, test and publish a versioned ZIP; update the policy URL and hash. |

The organisation's management group is the parent of the intended subscriptions; it need not be the tenant root. Descendant subscriptions inherit the policy assignment, subject to its filters and exclusions. Applicable VMs still need the extension, identities and correct deployment permissions. Existing resources require initial remediation; this is not an instantaneous change across the estate. [Machine Configuration prerequisites](https://learn.microsoft.com/en-us/azure/governance/machine-configuration/overview/02-setup-prerequisites).

The result is **no manual setup per VM**. Network configuration still exists, but a reviewed template repeats it automatically.

## The service connection also matters

Downloading our ZIP is only one connection. The agent also communicates with the **Machine Configuration service** to receive configuration information and report results.

For Azure VMs, Microsoft documents **EnablePrivateNetworkGC = TRUE** to enable private service communication through the Azure host/platform connection. Automate this VM tag as part of onboarding. It does not make GitHub reachable or replace the private endpoint, DNS and storage permissions for our custom package. [Machine Configuration network requirements](https://learn.microsoft.com/en-us/azure/governance/machine-configuration/overview/03-network-requirements).

This article covers private package delivery. VM extension installation, identity, operating-system updates and other Azure agents have their own dependencies. Validate those before describing the entire environment as isolated from public endpoints.

## How do we upload when storage is private?

The publishing pipeline needs a worker with private connectivity, DNS and permission to write to the container. A normal public GitHub-hosted runner cannot reach a private IP just because it has Azure credentials.

Use a self-hosted runner with the required network access, or a supported GitHub-hosted runner connected to an Azure VNet. That worker still needs its own approved connection to GitHub. Workload VMs do not need to reach GitHub to download the published package. [GitHub runner private networking](https://docs.github.com/en/organizations/managing-organization-settings/about-azure-private-networking-for-github-hosted-runners-in-your-organization).

Publish a new version instead of overwriting an existing ZIP. Keep its matching hash in policy code, promote it through a test scope first and retain the previous version for rollback.

## What about thousands of subscriptions?

**Scale the pattern across regional hubs. Do not assume one hub has unlimited capacity.** Size by VNets, VMs, download load and DNS requests, not subscription count alone.

As documented when this article was written, a VNet supports **500 peerings**, or up to **1,000** with Azure Virtual Network Manager connectivity configuration. Check current limits and leave headroom. Larger estates need multiple hub groups with suitable package hosting and DNS. [VNet peering limits](https://learn.microsoft.com/en-us/azure/virtual-network/virtual-network-peering-overview).

Adding several private endpoints for the same storage name does not automatically make DNS select the nearest healthy region. Design regional DNS and package placement together. The automation pattern can be shared even when its regional resources differ.

Shared services also introduce shared dependencies. Plan availability and monitor storage, DNS and connectivity. Budget for private endpoints, resolver endpoints, storage operations and applicable network traffic. Centralisation reduces repeated setup; it does not remove operating costs.

## What would prove the design works?

Start with one hub and two spokes in different subscriptions. The acceptance check should prove that:

1. Both VMs resolve the package hostname to the hub endpoint's private IP.
2. Both download the ZIP using only their approved read identities while storage public access remains disabled.
3. A VM without read permission cannot download the package.
4. The agent changes a deliberately noncompliant test setting and reports the correct result.
5. A new landing zone passes the same checks without manual portal changes.

Only after those checks should the policy be expanded to more workloads. For the package code itself, see [Windows password age through policy, simply](/articles/windows-password-age-policy/).
