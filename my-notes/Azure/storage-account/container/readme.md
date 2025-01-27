# Container settings

## Settings
    - SAS token
    - Access policy (Can be created on the file level only)
        - Create a a policy and attach it to the SAS token
            - If the policy is deleted the access will be revoked(Dont need to remove the SAS token)
        - Immutable blob storage
            - Create policy to get read access to the data
                - policy make sure that the specified data does not get deleted in that specified time frame
            - Time based retention policy

## Change access tier
        - Hot,Cool,cold,Archive 

## Blob level setting
    - Snapshots
        - take snapshot of a single blob

