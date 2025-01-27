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
