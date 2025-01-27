# Azure policies
    - Definations (Predefined policies already defined by azrue)
    - Policies in the defination can be assigned to a specific scope
    - You can also exclude certain resources from the policy assignments
    - Policy enforcement
        - Enabled (This is prevent users from creating the resources)
        - Disabled (This is not prevent but just inform)
    - We can define what happends when a policy is violated
    - By default the policy only affects the newly created resources
    - User will have to remediate the policies of you want those policies to be applied back again to older resources
    - You can choose to deploy a template depending upon a policy
    - Custom policies can also be defined
    - Policy effect can be deny or audit
        - Deny  
            - User will not be able to create the resource
        - Audit
            - User will be able to create the resource but it will be reported
    - No allowed resources policy can be used to stop team members to create certain resources

## Custom policies
    - Policies are json documents
            
## Tag policies
    - You can have policy for the resources to have certain tags

## Resource move
    - resources can be moved to other subscription or rg or a region
    - But this will change the resource parameters like resource ID's if you move it to other subscriptions

## Policies scope
    - Subscription
    - MG
    - RG
    - Resource level(This is possible using CLI)
