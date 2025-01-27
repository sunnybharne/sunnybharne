# Storage account (s3)

## Storage account creation option

## Basic Information
    - Globally unique storage account name.
    - Region specific
    - Storage account accessibility
        - Storage explorer, downloadable software for viewing the storage services
        - Storage browser is another way of viewing your storage services

## Performance
    - Standard (GPV2) 
        - Storage Types
            - (All types)
        - Redundancy 
            - LSR,ZRS,GRS,GZRS
    - Premium (High performance)
        - Storage Types
            - Block Blobs (Consistent reads) , Datalake option available
            - Page Blobs (Random reads), Datalake option not available
            - File Shares
        - Redundancy
            - LZR, ZRS

## Storage Type
    - Containers - ( Blob,unstructured data )
    - File Shares - SMB or NFS (Linux) , Azure file sync is hybrid approach to file share
        - Types
            - Transaction optimized, Hot and cold
        - This does not work from home system as the SMB/445 port is blocked by ISP's
        - Add directory
        - Backups (Runs on a schedule, can be done manually too)
        - Snapshot(point in time version of the file is saved, never expires)
        ## Azure file sync
            - Download application on the server 
            - This server syncs files to the file share
            - Group sync (Which files needs to be synced)
    - Queues - messages can be queued or dequeued
    - Tables (No sql database)
        - entities 
            - partitionKey = column and rowKey = row

## Advance settings
    - Require secure transfer for RestAPI
    - Enable anonymous access on individual containers
    - Enable storage account key access, SAS token (shared access signature) to access data, You can too login with this in portal 
    - Default to microsoft entra authentication in auzre portal
    - Mininum TLS version
    - Datalake
        - used for big data, can store more that 5 petabytes, hadoop of synaps
    - Enable large file share(Initial capacity = 100 TB, select this to get more storage)


## Azure migrate
    - Discovery (Examins your achitecture and gives a suggestion on migration)

-------------------------
# Storage account level settings

## Data management
    - Lifecycle management
        - Add rules with conditions
            - Hot(default)
            - Cool (Cheaper storage with more expensive read writes) , stored for minimum 30 days
            - cold (much cheaper storage with more expensive reads and wirtes), stored for minimum of 90 days
            - Archive (offline storage,Cheapest but most expensice reads and writes), stored for minimum of 120 day
                - To access files from the archive tier , files needs to be rehydrated first.
                - You have to set the access tier to archive on file to file basis
            - Premium storage account
                - no access tiers
                - no lifecycle management
    - Data protection
        - Enable azure backups for blobs
        - Enable point in time restore
        - Enable soft delete or blobs/containers
        - Enable permanent delete for soft deleted items
        - Enable versioning
        - Enable blob change feed (Keep track of create, modification and delete change to blobs)
            - Immutablitiy (In this file will not be deleted ever)
    - Object replication (Versioning needs to be enabled for this)
        - Create replication rules to replicate objects to destination account
        - Failover(Click this button to make secondary region primary)
    - Object replication
        - Create replication
            - Source account -->> destination account(Read only)

## Redundancy (data does not leave the region)
    - LSR - default, 3 Copies in same datacenter (11 9's))
    - ZRS - 3 copies in different AZ
    - GRS - Extra three copies are added to another region (3 + 3)
    - GZRS - Extra one LRS is added to another region
    - RA GRS - Read only GRS
    - RA GZRS - read only GZRS

## Security and Networking
    - Networking
        - Firewall and virtual networks
            - Public, specific IP , Disable 
        - Private endpoint connections
            - Private links 
        - Custom domains
    - Network routing
        - Microsoft network routing (This tries to be on MS backnbone)
        - Internet Routing (This doesnt)
    - Access Keys (This gives access to the entire storage account)
        - You get two keys
            - Key
            - Connection string(This can be used to connect programatically)
     - SAS (Shared access signature) - Access with more conditions
        - Can be created on different levels
        - You can limit more things like the time , type of access etc
        - Can access a single file via browser
        - Can access entire container
    - Encription
        - Data encrypted by default
        - MMK (Micrososft managed keys)
        - CMK (Customer managed keys)
            when its created you have to decide if this needs to be appled on only blobs or all storage types(Cant be changed afterwords)
            - Encription scope
                - can encript a data over a scope
        - Enable infrastructure encryption

## Settings
    - Configuration
        - Allow blog anonymous access(This give access to the files without SAS token)
        - Access Tier
            - Hot ,cool, Other options are available on specific files
    - Endpoints
        - All the links to the storage types
        - You get extra read endpoints in case if GZRS

## Monitoring
    - insights
    - Alerts
    - Metrics(compute unit level metrics)
    - Workbooks (Queries)
    - Diagonastics settings
        - this needs to be turned on
        - Can send to log analythics workspace, storage account or stream to event hub

