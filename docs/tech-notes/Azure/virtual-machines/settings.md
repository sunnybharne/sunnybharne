# Virtual machine settings

## Connect
- Connect
    - rdp on windows machine(port 3389)
    - ssh on linux based machine(port 443)
- Bastion
    - Deploy baston
    - Bastion needs to be in the same region
    - Bastion needs to be attached to the same vnet
    - Tier
        - Basic
        - Standard(Sharable link)
    - Need a new subnet for the bastion, needs /26 

## Networking
- Network settings
    - Attach network interface, nsg configuratio
- Load balancing
- Application security
    - Attach application security group
- Network manager
    - Create network manager

## Settings
- Disks
    - Os disks
        - Swap os disks
            - Host caching
    - Data disks
        - Create and attach a new data disks.
        - Storage type
        - Size (4,8,16,32,64,124,256)
        - Encription
- Extentions + applications
    - Extentions
    - Vm applications
- Operating system (only user data can be updated here)
    - Operating system (cant be updated)
    - SKU (cant be updated)
    - Computer name (cant be updated)
    - Username (cant be updated)
    - Password (cant be updated)
    - User data
- Configuration
    - Proximity placement group
    - Host
    - Security type
        - Standard
        - Trusted launch virtual machine
        - Confidential virtual machine
    - Performance nvme
    - Capacity reservation
        - Capacity reservation group
    - Advisor recommendations
    - Properties
        - Change subscriptions
        - Other none changable properties
    - Locks
- Availability + scale
    - Size (select the vm size, vm will restart if its already running)
        - D series --> General purpose
        - E series --> High memory
        - B series --> Burstable(Variable cpu performance) 
        - F series --> High GPU
    - Availability + scaling
        - Availability zones, choose upto three availability zones in a region (Three az's meaning two extra vm cost)
        - Scaling (select -> vmss)
        - Availability set -> make vm part of availablity set

## Security
- Identity
    - System assigned
    - User assigned
- Ms defender for cloud

## Backup + disaster recovery
- Backup
- Disaster recovery
- Restore point

## Operations
- Autoshut down
    - Switch on/off
    - Schedule
    - Notification
- Run command (run commands in the vm)
- Updates (Os updates, schedule updates)
- Health monitoring (enable)
- Configuration management (Initiative, definations)
- Policies
- Inventory
- Change tracking

## Monitoring
- Insights
- Alerts
- Metrics
- Diagnostics settings
- Logs
- Workbooks

## Automation
- Task
- Export templetes
