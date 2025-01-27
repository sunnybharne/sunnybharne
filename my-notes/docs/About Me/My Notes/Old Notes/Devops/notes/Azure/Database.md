## Database

### Important points
1. Availability per mounth
    99.95% - 22min
    99.99% - 4.5 mins
    5'9s - 26 sec
2. Durability
    11'9s - 1 million files for 10 million years you lose one file
3. Consistency
    - Strong consistency --> Syncronous replication(slow)
    - Eventual consistancy --> Asunchronous replication(slow, might return different values)
    - Read after write consistency --> Inserts are immediately available, Updates are with eventual consistency
3. RTO (Recovery time objective)
    - Maximum acceptable downtime
4. RPO (Recovery point objective)
    - Maximum acceptable data loss
   
### Relational database
    - predefine schema and table relationships 
    - Relational Database
        - OLTP (Online transaction processing)
            - Large number of users make large number of small transactions
                - Managed DB (99.99% availability)
                    - Microsoft SQL server
                    - mySQL server
                    - PostgreSQL
        - OLAP (Online analytics processing)
                - Analyze huge data
                    - Azure Synaps Analytics
    - No SQL database
        - Azure cosmosdb (99.999% availability)
            - Documents
            - Shards
    - In memory database (Caching data)
        - Redis

