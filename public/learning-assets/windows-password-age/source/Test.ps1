[CmdletBinding()]
param([Parameter(Mandatory)] [string] $Path)

$ErrorActionPreference = 'Stop'
if (-not $IsWindows) { throw 'Run package integration tests on a disposable Windows runner.' }
if ($env:GITHUB_ACTIONS -ne 'true') { throw 'These mutation tests run only on a disposable GitHub Actions runner.' }
Import-Module PSDesiredStateConfiguration -RequiredVersion 2.0.7 -Force
Import-Module GuestConfiguration -RequiredVersion 4.12.0 -Force

$Path = (Resolve-Path $Path).Path
$testPath = Join-Path ([System.IO.Path]::GetTempPath()) ("guest-test-{0}" -f [guid]::NewGuid())
New-Item -ItemType Directory -Path $testPath | Out-Null
Expand-Archive -Path $Path -DestinationPath $testPath
$module = Get-ChildItem (Join-Path $testPath 'Modules') -Filter WindowsMaximumPasswordAge.psd1 -Recurse | Select-Object -First 1
if (-not $module) { throw 'The package is missing the WindowsMaximumPasswordAge module.' }
Import-Module $module.FullName -Force

function Set-TestAge([int] $Value) {
    $argument = if ($Value -le 0) { "unlimited" } else { [string] $Value }
    $null = & "$env:windir\System32\net.exe" accounts "/maxpwage:$argument" 2>&1
    if ($LASTEXITCODE -ne 0) { throw "Could not prepare test age $Value." }
    if ($Value -gt 0 -and (Get-WindowsMaximumPasswordAge) -ne $Value) { throw "Test age $Value was not applied." }
}

function Assert-PasswordReport($Report, [bool] $Compliant, [uint32] $Actual, [uint32] $Required) {
    if ($Report.complianceStatus -isnot [bool] -or $Report.complianceStatus -ne $Compliant) {
        throw "Unexpected package compliance status for actual age $Actual."
    }
    $reason = @($Report.resources | ForEach-Object { $_.reasons } | Where-Object {
        $_.code -eq 'WindowsMaximumPasswordAge:WindowsMaximumPasswordAge:MaximumPasswordAge' -and
        $_.phrase -eq "Maximum password age is $Actual. Required value is at most $Required."
    })
    if ($reason.Count -ne 1) { throw 'The report did not contain the expected password finding. An engine error is not a valid policy result.' }
}

$original = Get-WindowsMaximumPasswordAge
$results = [ordered]@{ originalAge = $original }
$policyParameter = @{
    ResourceType = 'WindowsMaximumPasswordAge'
    ResourceId = 'MaximumAge'
    ResourcePropertyName = 'MaximumPasswordAge'
    ResourcePropertyValue = '42'
}
try {
    Set-TestAge 90
    $before = Get-GuestConfigurationPackageComplianceStatus -Path $Path -Parameter @($policyParameter)
    $results.before = $before
    Assert-PasswordReport -Report $before -Compliant $false -Actual 90 -Required 42

    $results.remediation = Start-GuestConfigurationPackageRemediation -Path $Path -Parameter @($policyParameter)
    if ((Get-WindowsMaximumPasswordAge) -ne 42) { throw 'Remediation did not set the age to 42.' }
    $after = Get-GuestConfigurationPackageComplianceStatus -Path $Path -Parameter @($policyParameter)
    $results.after = $after
    Assert-PasswordReport -Report $after -Compliant $true -Actual 42 -Required 42

    Set-TestAge 30
    # Preserve a shorter existing expiration period.
    $weakerParameter = @{
        ResourceType = 'WindowsMaximumPasswordAge'
        ResourceId = 'MaximumAge'
        ResourcePropertyName = 'MaximumPasswordAge'
        ResourcePropertyValue = '42'
    }
    $stricter = Get-GuestConfigurationPackageComplianceStatus -Path $Path -Parameter @($weakerParameter)
    $results.stricter = $stricter
    Assert-PasswordReport -Report $stricter -Compliant $true -Actual 30 -Required 42
    $results.stricterRemediation = Start-GuestConfigurationPackageRemediation -Path $Path -Parameter @($weakerParameter)
    if ((Get-WindowsMaximumPasswordAge) -ne 30) { throw 'The resource changed a shorter existing expiration period.' }
    $results.stricterValuePreserved = $true
    Set-TestAge 0
    $unlimited = Get-GuestConfigurationPackageComplianceStatus -Path $Path -Parameter @($policyParameter)
    if ($unlimited.complianceStatus -ne $false) { throw "Unlimited expiration must be noncompliant." }
    $results.unlimitedRemediation = Start-GuestConfigurationPackageRemediation -Path $Path -Parameter @($policyParameter)
    if ((Get-WindowsMaximumPasswordAge) -ne 42) { throw "Unlimited expiration was not corrected." }
}
finally {
    try {
        Set-TestAge $original
        $results.restoredAge = Get-WindowsMaximumPasswordAge
    }
    finally {
        $results | ConvertTo-Json -Depth 30 | Set-Content (Join-Path (Split-Path $Path) 'test-results.json') -Encoding utf8
        Remove-Item -Path $testPath -Recurse -Force -ErrorAction SilentlyContinue
    }
}

Write-Output 'Verified: 90 and unlimited are corrected to 42; 30 is preserved; the runner policy is restored.'
