# Powershell vm commands
    - Connect-AzAccount (Login to azure)
    - Get-AzContext (Get the az account context)
    - New-AzResourceGroup -Name myrg - Location yourlocation
    - New-AzVM -Name testVM -Location yourlocation
    - Invoke-AzVMRunCommand -ResourceGroupName 'name' -VMName 'vmname' -CommandId 'RunPowerShellScript' - ScriptionString 'Install-WindowsFeature'
    - Stop-AzVm -ResourceGroupName "Rgname" -Name "VmName"
    - Start-AzVm -ResourceGroupName "Rgname" -Name "VmName"
    - Remove-AzVm ""
    - Remove-AzResourceGroup -Name "My-Rg"


