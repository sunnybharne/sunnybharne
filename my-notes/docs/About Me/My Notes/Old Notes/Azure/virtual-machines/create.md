# Create virtual machine

## Basic
- Availability options
    - No infrastructure redundancy
    - Availability zones (self selected , azure selected)
    - VM scale sets (Comes with a load balancer)
        - Create new scale sets
            - Select availability zones
            - Orchestration
                - Scale set model (mode)
                    - Flexible (Mix with linux and windows systems with spot with some spot instances)
                    - Uniform
    - Availability sets (does not come with load balancer)
        - more that two vm's
        - Fault domains (Based on power source and network switch)
            - 2 machines with 2 fault domains will create 1 each vm's in seperate power supplys)
            - 4 machines with 2 fault domains will create 2 vm's each in seperate power supplys)
        - Update domain (This for maintenance activity, up to 20 servers allowed)
            - 4 vm's and 5 update domains then only one vm will be updated for planned maintenance at a time.
            - 20 machines a 5 update domains then 5 vm's will be updated for planned maintenance at a time. 
- Security type
- Image
    - Ubuntu
    - Windows
- VM architecture
    - Arm 64
    - x64
- Run with spot instances
- Size
- Enable hibernation
- Administrator account
    - Username
    - password
        - SSH public key
        - Password
- Public inbound port
    - None
    - Allow selected ports
        - Http, Https, Ssh, Rdp

## Disk
- Encryption at host
- Os disk (Temporary storage)
    - Disk size
    - Disk type
        - Premium SSD
        - Standard SSD
        - Standard HDD
        - Zone redundant storage(data replicated in three zones)
            - Premium SSD
            - Standard SSD
    - Delete with VM
    - Key management
        - Platform managed keys
        - Customer managed keys
        - Platform managed and customer managed keys
    - Enable Ultra Disk compatibility (More faster than premium ssd)
- Temporary disk
- Data disks for vm's
    - Add extra data disk (This can be detached and reattached to another vm)
    - This cant be attached to two different VM's at the same time (Use file shares to do that
- Advanced
    - Use managed disks
    - Ephemeral os disk
        - none
        - os cache placement
        - test disk placement

## Networking
- Vnet 
    - every vm should be linked to a Vnet
    - Vnet should be in the same region as the vm
- Subnet
- Public ip (with this the vm can be accessed from the internet)
- Network security group(controls the access to the subnet)
    - Public inbound ports
        - None
        - Allow selected ports
        - Http, Https, Ssh, Rdp
- Delete NIC and public Ip when vm is deleted
- Enable accelerated netorking (high speed network between the vm's)
- Loadbalancing
    - None
    - Azure loadbalancer
    - Application gateway

## Managemnent
- Defender for cloud
- Identity (managed identity)
- Azure AD login
- Auto shutdown
- Enable backups
    - Disaster recovery
- Os updates
- Hot patching
- Rebooting

## Monitoring 
- Alerts (Cost involved)
- Boot diagonastcs
- Health monitoring

## Advance
- Extention
    - Install custom extentions
- Vm applications
    - Install custom applications
- Custom data
    - Init script
    - Custom data
- User data
    - Pass a script or a configuration file
- Performance nvme
- Dedicated host
    - Host group
    - Capacity reservation group
    - Proximity placemanent group (Shortest distance between the vm's)

------------------ Stuff below was from az 900
# IP address
- public IP address is not free , every public IP address has a cost attached to it.
- Dynamic Public IP address 
- Static Public IP address
- Private IP address

# Dedicated host virtual machines
- Create dedicated host from marketplace
- Then create virtual machines inside that dedicated host

# Azure Spot instances 
- The vm's can be stopped any time 
- Should be used for workloads which can handle vm's stopping , reserved for 1 or 3 years

# Reserved instance 
- You can reserve capacity in bulk for longer periods of time which can then cost you less 

# Azure monitoring 
- This helps monitor the logs and other metrics of the virtual machine

# VM Scale sets(VMSS)
- Scaling based on conditions
- up to 100 VMs in single scale sets can be increased that to 1000
- It creates a loadbalancer by default(Should be explicitly deleted)

# Availability sets
- load balancing between two servers
- Fault domains (machines running on different rack)
- Update domains (used for updateing the applications)

# Proximity group
- Having multiple machines close to each other
- Faster inter communication due to being very close to each other 

# Imp points
- RDP - port 3389 windows machine 
- SSH - port 22 Linux machine 
- Vent ( free of cost, only traffic going out of the Avnet is charged)
- Cloud init will run the script at startup
- NSG ( behaves like a small firewall ), no charges
- Inbound and outbound rules can be added
- Disk , charged 
- Public Ip , charged - traffic from public Internet 
- Static assignment ( ip address does not change on restart )
- Dynamic assignment ( ip address changes on restart )
- Nic ( network interface )
- One vm should be connected to at least one subnet using NIC(ACL using nsg).
- Can be assigned to more that one private IP address if there are more than one subnet linked to the VM.
- Each VM can be assigned one public IP address so that It can be accessed from the internet.

# VM sizes 
- Bs ( low cost )
- D general purpose 
- F more compute power 
- M more memory 
- N more gpu power

# Availability chart 
- Single instance premium ssd or ultra disk 99.9 
- Single instance standard ssd 99.5
- Single instanceHdd 95

# Availability sets ( logical grouping to increase availability) 99.95
- Fault domain ( grouping on different power source )
- Update domain ( grouping on the base of updates ) 

# Availablity zones 99.99 
- Scale set ( create multiple vms ) 
- Add optional lb
- Multiple availablity zones 
- Scaling 
- Manual scaling 
- Rule based scaling 

# Pricing:
- Dedicated host 
- Azure spot instance ( unused capacity ,azure can decide to take it back ) 
- Azure reservations ( pay for long term at discount ) 
