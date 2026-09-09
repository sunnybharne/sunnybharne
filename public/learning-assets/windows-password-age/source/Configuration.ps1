param(
    [Parameter(Mandatory)] [string] $PackageName,
    [Parameter(Mandatory)] [ValidateRange(1, 999)] [uint32] $MaximumPasswordAge,
    [Parameter(Mandatory)] [string] $OutputPath
)

configuration WindowsMaximumPasswordAge {
    param([string] $MaximumPasswordAge)

    Import-DscResource -ModuleName WindowsMaximumPasswordAge -Name WindowsMaximumPasswordAge -ModuleVersion '1.0.0'

    Node localhost {
        WindowsMaximumPasswordAge MaximumAge {
            Name = 'LocalMachine'
            MaximumPasswordAge = $MaximumPasswordAge
        }
    }
}

WindowsMaximumPasswordAge -MaximumPasswordAge ([string] $MaximumPasswordAge) -OutputPath $OutputPath | Out-Null

# Keep the compiled configuration name aligned with the versioned package.
$mofPath = Join-Path $OutputPath 'localhost.mof'
$mof = Get-Content $mofPath -Raw
$mof = $mof.Replace('ConfigurationName = "WindowsMaximumPasswordAge";', "ConfigurationName = `"$PackageName`";")
# Published content contains no runner identity, timestamp, or checkout path.
$mof = [regex]::Replace($mof, '(?s)^\s*/\*.*?\*/\s*', '')
$mof = [regex]::Replace($mof, '(?m)^\s*SourceInfo\s*=\s*"(?:\\.|[^"\\])*";', ' SourceInfo = "";')
$mof = [regex]::Replace($mof, '(?m)^\s*Author\s*=\s*"[^"]*";', ' Author="Platform engineering";')
$mof = [regex]::Replace($mof, '(?m)^\s*Generation(?:Date|Host)\s*=\s*"[^"]*";', '')
Set-Content -Path $mofPath -Value $mof -Encoding unicode
