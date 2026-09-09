[CmdletBinding()]
param(
    [string] $ParameterPath = (Join-Path $PSScriptRoot 'parameters.json'),
    [string] $OutputPath = (Join-Path $PSScriptRoot '../artifacts/maximum-age')
)

$ErrorActionPreference = 'Stop'
if (-not $IsWindows) { throw 'Build this Windows package on Windows with PowerShell 7.' }

Import-Module PSDesiredStateConfiguration -RequiredVersion 2.0.7 -Force
Import-Module GuestConfiguration -RequiredVersion 4.12.0 -Force

$root = $PSScriptRoot
$settings = Get-Content $ParameterPath -Raw | ConvertFrom-Json
if ($settings.name -ne 'WindowsMaximumPasswordAge' -or $settings.version -notmatch '^\d+\.\d+\.\d+$') {
    throw 'Use the WindowsMaximumPasswordAge package name and a semantic version.'
}
if ($settings.maximumPasswordAge -lt 1 -or $settings.maximumPasswordAge -gt 999) { throw 'Use 1 to 999 days.' }

$packageName = '{0}_v{1}' -f $settings.name, $settings.version.Replace('.', '_')
$sourcePath = $root
$modulePath = Join-Path $sourcePath 'Modules'
$originalModulePath = $env:PSModulePath
$temporaryPath = Join-Path ([System.IO.Path]::GetTempPath()) ("guest-package-{0}" -f [guid]::NewGuid())
New-Item -ItemType Directory -Path $temporaryPath -Force | Out-Null
New-Item -ItemType Directory -Path $OutputPath -Force | Out-Null
$OutputPath = (Resolve-Path $OutputPath).Path

try {
    $env:PSModulePath = "$modulePath$([System.IO.Path]::PathSeparator)$originalModulePath"
    # Load class resources before the configuration script is parsed.
    Import-Module (Join-Path $modulePath 'WindowsMaximumPasswordAge/WindowsMaximumPasswordAge.psd1') -Force
    $resource = Get-DscResource -Module WindowsMaximumPasswordAge -Name WindowsMaximumPasswordAge -ErrorAction Stop
    if (-not $resource) { throw 'The WindowsMaximumPasswordAge DSC resource was not discovered.' }
    $resource | Select-Object Name, ResourceType, Version, ImplementedAs | Format-Table | Out-Host
    & (Join-Path $sourcePath 'Configuration.ps1') -PackageName $packageName `
        -MaximumPasswordAge $settings.maximumPasswordAge -OutputPath $temporaryPath

    $package = New-GuestConfigurationPackage -Name $packageName -Version $settings.version `
        -Configuration (Join-Path $temporaryPath 'localhost.mof') -Type AuditAndSet `
        -Path $OutputPath -Force

    $manifest = [ordered]@{
        packageFile = "$packageName.zip"
        packageName = $packageName
        version = $settings.version
        contentHash = (Get-FileHash $package.Path -Algorithm SHA256).Hash
    }
    $manifest | ConvertTo-Json | Set-Content (Join-Path $OutputPath 'manifest.json') -Encoding utf8
    $manifest | ConvertTo-Json
}
finally {
    $env:PSModulePath = $originalModulePath
    Remove-Item -Path $temporaryPath -Recurse -Force -ErrorAction SilentlyContinue
}
