# Resource Group
[Resource Group Docs](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/manage-resource-groups-portal)

## Resource group Imp information
- Resource groups store metadata about the resources in the region where the resource group is created.
- Resource groups should club the resources that share the same lifecycle.
- Resource groups can contain resources from different regions.

## Resource group Imp sh commands
```bash
az group create --name demoResourceGroup --location westus
az group list
az group show --name exampleGroup
az group delete --name exampleGroup
```

## Resource group Imp powershell commands
```powershell
New-AzResourceGroup -Name demoResourceGroup -Location westus
Get-AzResourceGroup
Get-AzResourceGroup -Name exampleGroup
Remove-AzResourceGroup -Name exampleGroup
```

## Bicep
```zsh
az deployment create --name deploymentName --location swedencentral --template-file resourceGroup.bicep --parameters resourceGroupName=nameOftheRG resourceGroupLocation=swedencentral 
```

## Completed pages
- [x] Portal
- [x] Cli
- [x] Powershell
- [x] [Bicep](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/create-resource-group)
- [ ] Terraform
- [ ] [Python](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/manage-resource-groups-python?tabs=macos)
