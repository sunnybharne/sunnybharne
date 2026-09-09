@{
    RootModule = 'WindowsMaximumPasswordAge.psm1'
    ModuleVersion = '1.0.0'
    GUID = '61fdcfb9-318b-4135-821c-d3205d4833d1'
    Author = 'Platform engineering'
    Description = 'Limit local Windows password age in days.'
    PowerShellVersion = '7.1'
    DscResourcesToExport = @('WindowsMaximumPasswordAge')
    FunctionsToExport = @('Get-WindowsMaximumPasswordAge')
    # Omit CmdletsToExport: PSDesiredStateConfiguration class discovery issue #117.
    VariablesToExport = @()
    AliasesToExport = @()
}
