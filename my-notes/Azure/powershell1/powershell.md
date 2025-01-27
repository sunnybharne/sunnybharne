# PowerShell

- PS = commandline shell + scripting language
- PS accepts and returns .Net objects
- Powershell desired state configuration (DSC) is a management framework in PowerShell that enables you to manage your enterprise infrastructure with configuration as code.
- cmdlet = powershell command

```powershell
$PSVersionTable.PSVersion
$PSVersionTable.PSVersion
Get-Verb
Get_Command
Get-Member 
Get-Help
```

- Search Commands
```powershell
Get-Command -Verb Get -Noun alias* 
Get-Command -Name Get-Process
Get-Command -Name *-Process
```

- Get help
```powershell
Get-Help -Name Get-Help # Get help
Get-Help Get-FileHash -Examples
Get-Help -Name Get-Help -Full
Get-Process | Get-Member # gets the object types
help -Name Get-Help -Full
help Get-Help -
```

- Get-Member
```powershell
Get-Process tmux | Get-Member
Get-Process -Name 'name-of-process' | Get-Member | Select-Object Name, MemberType
```

- Formatting results
```powershell
|Format-Table 
|Format-List
|Format-Wide
|Format-Custom
```

- Operators
```powershell
# Add c for case sensitivity like -ceq for equals to with case sensitivity
|`-eq`|Equal to|
|`-ne`|Not equal to|
|`-gt`|Greater than|
|`-ge`|Greater than or equal to|
|`-lt`|Less than|
|`-le`|Less than or equal to|
```

- Complex example
```powershell
Get-Process | Where-Object CPU -gt 2 | Sort-Object CPU -Descending | Select-Object -First 3
Get-Process | Select-Object Name | Where-Object Name -eq 'name-of-process'
```

# Powershell

## Basic info
- Accepts and returns .Net object rather than plain text
- Commands in pwsh is called cmdlets
- Follows Verb-Noun naming convention
- In Get-Help command [Parameter] [<System.String>]
    - First [] in parameters specify that it can be specified by name and position
    - [] in System.string specificed that it can take array of string

## Basic commands
```Powershell
$PSVersionTable.PSVersion ## Shows the version in table format
pwsh -v ## Give full list of verbs available
Get-Verb ## Gets all the verbs there are 
Get-Command ## Get all the commands available on the system
Get-Command -Name Get-Process
Get-Command -Name *-Process
Get-Command -Verb Get
Get-Command -Noun U*
Get-Command -Verb Get -Noun P*
Get-Command | Select-Object -First 5 -Property Name , Source
Get-Process | Get-Member -MemberType Method ## Gives the members of the object method . property, script property
Get-Help ## Self explanatory
```

## Desired state configuration(DSC)

## Modules
- Import-Module
- Remove-Module

## Books
- PowerShell 101
- The powershell conference book
- Powershell deep dives

## IMP Folks
- Jeffrey Snover

## Continue 
https://learn.microsoft.com/en-us/powershell/scripting/learn/ps101/02-help-system?view=powershell-7.4#switch-parameters
