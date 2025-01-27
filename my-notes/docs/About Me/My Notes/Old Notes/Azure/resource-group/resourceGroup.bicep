targetScope = 'subscription'

@description('Parameters')
param resourceGroupName string = 'rg'
param resourceGroupLocation string = 'swedencentral'

resource newRG 'Microsoft.Resources/resourceGroups@2024-03-01' = {
  name: resourceGroupName
  location: resourceGroupLocation
}
