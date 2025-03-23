// Vnet -> https://learn.microsoft.com/en-us/azure/templates/microsoft.network/virtualnetworks?pivots=deployment-language-bicep

param vnetName string = 'Vnet'
param location string = 'swedencentral'

resource vnet 'Microsoft.Network/virtualNetworks@2024-05-01' = {
  name : vnetName
  location : resourceGroup().location
  properties : {
    addressSpace: {
      addressPrefixes: [ '10.0.0.0/16']
    }
  }
}
