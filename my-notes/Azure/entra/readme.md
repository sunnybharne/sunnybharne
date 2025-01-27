# EntraID

## Authentication   
## Autherization

## Subscription type
    - Free
        - Pim is not free
        - Self service password is not free
        - Custom roles creation is not free
        - MFA through phone and sms is not free
        - MFA throught authenticator app is free
        - Conditional access is not free
    - PD1 (Some users are with more features and some are on free tier)
    - PD2 This is for enterprice customers
    - Entra ID governance (Advance)

## Concept of account and subscriptions
    - Account
        - Person (Email@email.com)
        - Application (Managed Identity)
    - Tenant (Organization , www.google.com --> Domain)
        - Entra ID tenant
        - Azure AD B2C (Uses Thired party logins like linkeding or google )
            - Global administrator (Organization Owner)
            - You can switch tenants from the Manage tenants option
            - You can add custom domain to the the tenant too (In most cases you can just use the one that is provided by MS, I use it like that )
            - After making the custom domain just make it as a primary domain
    - Subscription (Billing)
        - Can be moved to a different tenent
        - Sub Types
            - Pay as you go
            - Enterprice
        - Cost management
            - Cost analysis(Shows you your spendings)
            - Cost alert
                - Create a budget
                - Create an anomaly(Its not a budget but just an email trigger with anomaly)
                    - This will detect if there are some wired changes to the resources or to the cost (Can get an email daily too)
            - Budget
                - Create budget
            - Azvisor recommendations
                - Gives advice on your resources
    - Resource Group
        


### Users
    - Users can be created 
    - External users can be invited
    - Op prem active directory users can be synced to the Entra ID users too
    - To assign license to users, user location in the user properties tab should be defined(This is because there are location specific constraints for Azure)
### Groups
    - Groups can be created to group users
    - You have to turn on if you want to add roles to the groups directly rather than giving roles to the users
### Dynamic Groups
    - This moved users to the specific groups depending upon the filter. 
        - You can created rules like display name contains certain things.(Depending on job titles , Depending on the location)
    - Membership option should be select to Dynamic user instead of assigned user

### Administratior units
    - Give roles to different units in the organization
    - Segrigate your organization in different units
    - You can add users directly to AU
    - You can add groups to the AU too

### Devices
    - Devices can be registered to make sure certain softwares or updates to the devices can be enforced
    - Used for conditional access

### Bulk operation
    - You can download a csv file and make changes to it and upload the changed file
    - This will make the changed csv data changes to the azure entraID

### Self password reset
    - This is a premium feature
    - This is by defaut enabled for the administrator
    - If enabled the users can just use forgot password
    - AAD connect can be used to reset password on on prem AD(In this case password is resetted on the cloud and pushed back to the on prem AD)

### RBAC
    - Least privilege
        - Example roles
            - Developer
            - Development manager
            - IT operations
            - Report Reader
            - Global administrator
    - you can define conditions on assigned role assignments
        - You can add an action
        - You can Add expression
        

### CBAC (Claims based access control)
    - Eg: createing SAS keys in storage account to gain access to the storage resource
    - You can disable the CBAC roles in the portal
    - You can also enable the RBAC using the active directory or entra ID to the storage accounts and many other resources
### Roles and administrator
    - Here you can assigne administrator level roles to the users

### Entra ID Custom roles
    - Entra ID free subscription does not allow custom roles
    - You can create the custom roles to be scope specific
        - custom role created on a subscrition can be assigned to all the resources inside that subscritption
        - custom role created on a subscription but towards a resource group socpe , then in that case the role can be assigned to all the resources that are available in that resource and not towards the resource outside the scoped resource groups.
    - You are only allowed to created 5000 custom roles
    - Deny assignments can not be added from the portal
    - DataActions can be used to define what types of action can the user perform

### Role assignment custom role
    - You are free to create this custom role , This is different from the custom role in Entra ID
    - Tou are also free to create conditional access in role assignmnet section its different that the conditional access in entraID

```Json
{
  "properties": {
    "roleName": "Custom Role Example",
    "description": "An example custom role for Azure",
    "assignableScopes": [
      "/subscriptions/{subscription-id}"
    ],
    "permissions": [
      {
        "actions": [
          "Microsoft.Compute/virtualMachines/start/action",
          "Microsoft.Compute/virtualMachines/deallocate/action"
        ],
        "notActions": [],
        "dataActions": [],
        "notDataActions": []
      }
    ]
  }
}
```


### Interpret access
    - You can go to the resource and look for the role assignment tab to check who has access to that resources
    - Navigate to Entra ID -->> Azure role assignments -->> here you can select the user and check what access does that user have on which resources
    - Keep in mind that there are two roles section in Entra Id
        - 1. Azure Role Assignments -> This one is for checking who has access to which resources
        - 2. Assigned Roles -> This is to check who has access to Admin roles (Entra ID specific)

### Deny assignments
    - There is no concept of Deny assignment in azure
    - The only way to denu assignment is not not give the access.

### Windows VM role assignments
    - When create a VM select login with Entra ID.
    - Then user can login with the entra ID credentials.
    - To connect using RDP, RDP file needs to be modified
        - Add credentials in the file and save it
            - Allow remote desktop connection from entra from inside the windows VM
                - User will be able to connect successfully
    
