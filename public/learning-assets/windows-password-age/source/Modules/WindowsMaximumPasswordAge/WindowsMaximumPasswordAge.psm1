function Get-WindowsMaximumPasswordAge {
    [CmdletBinding()]
    [OutputType([int])]
    param()

    $computer = Get-CimInstance -ClassName Win32_ComputerSystem -Property DomainRole -ErrorAction Stop
    if ($null -eq $computer.DomainRole) { throw 'Could not determine whether this machine is a domain controller.' }
    if ($computer.DomainRole -in 4, 5) { throw 'Domain controllers are not supported. This resource manages local account policy only.' }

    $path = Join-Path ([System.IO.Path]::GetTempPath()) ("password-policy-{0}.inf" -f [guid]::NewGuid())
    try {
        $null = & "$env:windir\System32\secedit.exe" /export /cfg $path /areas SECURITYPOLICY /quiet 2>&1
        if ($LASTEXITCODE -ne 0) { throw 'Could not export the local password policy.' }

        $policy = Get-Content -Path $path -Raw -ErrorAction Stop
        $match = [regex]::Match($policy, '(?m)^MaximumPasswordAge\s*=\s*(-?\d+)\s*$')
        if (-not $match.Success) { throw 'MaximumPasswordAge was missing from the security policy export.' }
        return [int] $match.Groups[1].Value
    }
    finally {
        Remove-Item -Path $path -Force -ErrorAction SilentlyContinue
    }
}

class WindowsMaximumPasswordAgeReason {
    [DscProperty()] [string] $Code
    [DscProperty()] [string] $Phrase
}

[DscResource()]
class WindowsMaximumPasswordAge {
    [DscProperty(Key)] [string] $Name
    # Machine Configuration passes policy parameters into the MOF as strings.
    [DscProperty(Mandatory)] [string] $MaximumPasswordAge
    [DscProperty(NotConfigurable)] [WindowsMaximumPasswordAgeReason[]] $Reasons

    [WindowsMaximumPasswordAge] Get() {
        $age = $this.GetDesiredAge()
        $actual = Get-WindowsMaximumPasswordAge
        $current = [WindowsMaximumPasswordAge]::new()
        $current.Name = $this.Name
        $current.MaximumPasswordAge = $actual.ToString([System.Globalization.CultureInfo]::InvariantCulture)
        $current.Reasons = @([WindowsMaximumPasswordAgeReason]@{
            Code = 'WindowsMaximumPasswordAge:WindowsMaximumPasswordAge:MaximumPasswordAge'
            Phrase = "Maximum password age is $actual. Required value is at most $age."
        })
        return $current
    }

    [bool] Test() {
        $age = $this.GetDesiredAge()
        $actual = Get-WindowsMaximumPasswordAge
        return $actual -gt 0 -and $actual -le $age
    }

    [void] Set() {
        $age = $this.GetDesiredAge()
        if ($this.Test()) { return }

        $null = & "$env:windir\System32\net.exe" accounts "/maxpwage:$age" 2>&1
        if ($LASTEXITCODE -ne 0) { throw 'Could not set the local maximum password age.' }
        if (-not $this.Test()) { throw 'The local password policy did not reach the required value.' }
    }

    hidden [uint32] GetDesiredAge() {
        if ($this.Name -ne 'LocalMachine') { throw 'Only the LocalMachine password policy is supported.' }
        $age = [uint32] 0
        if (-not [uint32]::TryParse($this.MaximumPasswordAge, [ref] $age) -or $age -lt 1 -or $age -gt 999) {
            throw 'The requested age must be between 1 and 999 days. Shorter existing expiration periods are preserved.'
        }
        return $age
    }
}

Export-ModuleMember -Function Get-WindowsMaximumPasswordAge
