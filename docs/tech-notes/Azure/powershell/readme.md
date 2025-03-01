# Powershell

```Powershell
    PSVersionTable.PSVersion #Gives the current version of powershell installed
    Get-Modules -Name Az -ListAvailable # Get all installed Az modules
    Get-InstalledModule -Name Az -AllVersions | Select-Object -Property Name,Version | ConvertTo-CSV
    Install-Module -Name modulename -AllowClobber -Force -Repository PSGallery # Installs the module
    Update-Module -Name Az -AllowClobber -Force -Repository PSGallery # updates the installed module
    Connect-AzAccount # Login to azure from powershell terminal
    Get-AzVM
    New-AzVM
    Remove-AzVM
    Get-AzKeyVault
    New-AzKeyVault
    Remove-AzKeyVault
    Get-AzVirtualNetwork
    New-AzVirtualNetwork
    Remove-AzVirtualNetwork
    Get-AzVirtualNetworkSubnetConfig
    New-AzVirtualNetworkSubnetConfig
    Remove-AzVirtualNetworkSubnetConfig
    Get-AzWebApp
    Get-AzSubscription
    Set-AzContext   -Subscription "SubID"
```
