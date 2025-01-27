# Vnet Docs

## Completed pages
- [x] [Virtual Network Documentation](https://learn.microsoft.com/en-us/azure/virtual-network/)
- [x] About Virtual Network
- Qickstart
    [x] Create Virtual network - Portal
    [x] Create Virtual network - powershell
    [x] Create Virtual network - Azure CLI
    [x] Create Virtual network - Bicep

## Todo
- [ ] [Vnet Training](https://learn.microsoft.com/en-us/training/modules/introduction-to-azure-virtual-networks/?source=recommendations)

## Vnet Basics
- Communication of Azure resources with the internet.
    - public outbound communication is allowed by default
    - Manage public outbound connections using
        - public ip address
        - Nat gateway
        - public loadbalancer
    - Manage inbound connections using
        - public ip address
        - public loadbalancer
    - Assigning internal standard loadbalancer will not provide outboud ability to the vnet

- Communication between Azure resources.
    - Virtual network service point
        - Direct connection to the serverless resources from vnet private endpoint via azure backbone network
    - Private link
        - This brings the virtual public service virtualling inside the vnet 
    - Vnet peering
        - Connectes two vnets(even from different region)
        
- Communication with on-premises resources.
    - Point to site VPN
        - Connection between Vnet and a single computer
        - Connection is done using an encrypted tunner over the internet
    - Site to site VPN
        - Connection between Onprem VPN device and VPN gateway in azure network
        - Connection is done using an encrypted tunner over the internet
    - Azure express route
        - Onprem to Azure vpn connection using dedicated channel
        - Connection does not route via the internet

- Filtering of network traffic between subnets
    - Network security groups and application security groups
    - Network virtual appliances
        - NVA is a VM that performs a Network function(Like firewall or WAN)

- Routing of network traffic.
    - Routing be done by default, Default rules can be overridden by using below
        - Rote table, Custom route tables can be created
        - Border gateway protocol (BGP) - Need more understanding

- Integration with Azure services.(Accessing resources privately)
    - Deploy dedicated instances of the service
    - Azure private link(This is over the auzre backbone network)
    - Service endpoints(This is over public endpoints)

## Imp points
- When moving VM from one vnet to another, VM needs to be deleted and created again in the new vnet
- There are limits to how many resources can be deployed to the VPN
- Virtual networks and subnets span all availability zones in a region
- There is no charge for using the VNET
