---
title: "How a Logic App reaches private storage"
description: "One integration subnet carries outbound traffic to four storage private endpoints. Inbound HTTP needs its own path."
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

In the Sweden Central lab, a Standard Logic App uses VNet integration to reach runtime storage. The storage account has public network access disabled.

![The Logic App sends outbound traffic into an integration subnet. The same VNet routes that traffic to four storage private endpoints in a second subnet. Storage public access stays off.](/learning-assets/logic-app-storage-networking/path.svg)

## Resources

| Resource | Role in this lab |
| --- | --- |
| `logic-plb-app-test-swc-001` | Standard Logic App, Running, WS1. |
| `stplbapptestswc001` | Runtime storage: job storage and the content file share `logic-plb-app-test-swc-001`. Public network access is **Disabled**. |
| `vnet-spoke-test-swc-001` | Spoke VNet `10.202.0.0/20`. |
| `snet-logicapp-integration-test-swc-001` | Outbound integration subnet `10.202.1.0/24`, delegated to `Microsoft.Web/serverFarms`. |
| `snet-privatelink-test-swc-001` | Private endpoint subnet `10.202.2.0/27`. Holds four storage private endpoints. |

## Outbound storage access

The app sends traffic through its delegated integration subnet. Route All and content-share routing are enabled. Azure DNS (`168.63.129.16`) resolves the storage hostnames to private IPs in the endpoint subnet.

The two subnets share a VNet. Neither has an NSG, route table, or NAT gateway, so the default route connects them. The endpoint NICs connect to Blob, File, Queue, and Table through Private Link. Their names are `pep-app-blob-test-swc-001`, `pep-app-file-test-swc-001`, `pep-app-queue-test-swc-001`, and `pep-app-table-test-swc-001`. [Private runtime storage](https://learn.microsoft.com/en-us/azure/logic-apps/deploy-single-tenant-logic-apps-private-storage-account)

The app has a system-assigned identity for authentication. Storage still requires credentials or permissions for each data operation.

## Inbound HTTP

Public inbound access is off and the app has no private endpoint of its own. A VM in the spoke cannot invoke an HTTP trigger through the storage endpoints. A scheduled workflow could run if its outbound dependencies were reachable.

## Service endpoints

A storage service endpoint uses the public storage address. To use one, enable **Microsoft.Storage** on the integration subnet, allow selected networks on the account, and add the subnet to its firewall. Check that the content file share remains reachable and that policy permits public network access. [App Service VNet integration](https://learn.microsoft.com/en-us/azure/app-service/overview-vnet-integration#service-endpoints), [storage network rules](https://learn.microsoft.com/en-us/azure/storage/common/storage-network-security-virtual-networks)

Both endpoint types can coexist. DNS determines which address a client uses. In this lab the subnets have no storage service endpoint, the firewall has no VNet rules, and public access is disabled. Removing the four private endpoints would leave the app without a storage path. [Storage private endpoints](https://learn.microsoft.com/en-us/azure/storage/common/storage-private-endpoints)

## What we verified

The app was running on WS1 and all four storage private endpoints were approved. No workflow had been deployed, so a storage read from a running workflow remains untested. [WS1 pricing](/articles/logic-apps-pricing/)

## References

- [Private networking for Standard Logic Apps](https://learn.microsoft.com/en-us/azure/logic-apps/secure-single-tenant-workflow-virtual-network-private-endpoint)
- [Deploy with private runtime storage](https://learn.microsoft.com/en-us/azure/logic-apps/deploy-single-tenant-logic-apps-private-storage-account)
- [Regional VNet integration](https://learn.microsoft.com/en-us/azure/app-service/overview-vnet-integration)
- [Storage account walkthrough](/articles/storage-account/)
- [Logic Apps hosting plans](/articles/logic-apps/)
