## Shared responsibility model
    - On premise: Customer is responsible for everything.
    - Iaas: MS responsible for physical infrastructure, customer responsible for OS, apps, data.(Azure VM)
    - PaaS: MS responsible for physical infrastructure, OS, apps, customer responsible for data.(Azure SQL, Azure App Service)
    - SaaS: MS responsible for everything.(Office 365, Dynamics 365)

## cloud types
    - Public cloud - Azure
    - Private cloud - Government cloud
    - Hybrid Cloud - Public + Private cloud

## Regions and Zones
    - Soveregin Region --->> Used by Governments
    - Region A ------------------------------Region Pair-----------------------------Region B
    |
    - ( Availability zones A |  Availability zones B )
    |
    - Data center A | Data center B

## Priceing calculator
    - This gives you a basic rought estimate for using the service on the cloud.
    - Capex - Buying the servers
    - Opex - Renting the servers

## Cloud concepts
    1. High availability -> Up time , no downtime is 100% availability(Not possible)
    2. Scalability -> Design to add/ remove extra servers (Vertical scaling, horizontal scaling)
    3. Elasticity -> Automating scalaility
    4. Reliability -> Ability to system to recover from failures 
        - Autoscaling 
        - Avoid single point of failure 
        - Backups
        - Multi Region deployments
        - Health probes and self healing
    5. Predictibility -> Predict and forcast and control performance and behavior of the system (Autoscaling)
        - Microsoft security Respons center
        - Always on DDos
        - Azure policies and blueprints
        - Azure Entra ID
        - RBAC
        - update management
        - Encryption by default
        - Firewalls
    6. Governance -> Monitoring and policies 
        - policies
        - auditing and reporting
        - Industry standards
        - management groups 
        - custom roles
        - soft deletes
        - cloud adoption framework
    7. Managability -> 
        - Portal
        - CLI
        - Api's
    8. Serverless
        - Functions
        - Container Apps
        - Kubernetes
        - SQL database
    9. Cosmos DB

## Types of service
    - Zonal services --> Will be deployed in one az and not redundant
    - Zone redundant services --> These services are zone redundant and can tolearate outages
    - Always available services --> By defaul zone redundant (Azure Entra ID, Azure portal, Azure front door)

## IMP point 
    - NSG can be attached to subnet
    - NSG can be attached to Vertual machines network interface
    - NSG cant be attached to the Vnet
