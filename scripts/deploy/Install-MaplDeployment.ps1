#Requires -Version 5.1
#Requires -RunAsAdministrator
[CmdletBinding()]
param([string] $TargetDirectory = 'C:\xampp\www\content')
Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
if ($env:OS -ne 'Windows_NT') { throw 'Run this installer on the Windows Apache server.' }
$TargetDirectory = [IO.Path]::GetFullPath($TargetDirectory).TrimEnd('\')
if ([IO.Path]::GetFileName($TargetDirectory) -ne 'content' -or -not (Test-Path -LiteralPath (Join-Path $TargetDirectory 'index.html') -PathType Leaf)) {
    throw 'Select the existing content directory containing the manually deployed website.'
}
$installDirectory = Join-Path $env:ProgramData 'MAPLWebsiteDeploy'
$stateDirectory = Join-Path $installDirectory 'data'
New-Item -ItemType Directory -Path $installDirectory -Force | Out-Null
if (((Get-Item -LiteralPath $installDirectory -Force).Attributes -band [IO.FileAttributes]::ReparsePoint) -ne 0) { throw 'Install directory must not be a junction or symbolic link.' }
# Only administrators and SYSTEM can modify code run by the scheduled task.
& icacls.exe $installDirectory '/reset' '/T' '/C' | Out-Null
if ($LASTEXITCODE -ne 0) { throw 'Could not reset deployment directory permissions.' }
& icacls.exe $installDirectory '/inheritance:r' '/grant:r' '*S-1-5-18:(OI)(CI)F' '*S-1-5-32-544:(OI)(CI)F' | Out-Null
if ($LASTEXITCODE -ne 0) { throw 'Could not secure the deployment directory.' }
foreach ($name in @('Sync-MaplWebsite.ps1', 'MaplDeployment.psm1')) {
    $source = Join-Path $PSScriptRoot $name
    $destination = Join-Path $installDirectory $name
    if ([IO.Path]::GetFullPath($source) -ne $destination) { Copy-Item -LiteralPath $source -Destination $destination -Force }
}
$worker = Join-Path $installDirectory 'Sync-MaplWebsite.ps1'
# Check connectivity and perform the first synchronization before registering.
& $worker -TargetDirectory $TargetDirectory -StateDirectory $stateDirectory
$powerShell = Join-Path $env:SystemRoot 'System32\WindowsPowerShell\v1.0\powershell.exe'
$arguments = '-NoProfile -NonInteractive -ExecutionPolicy Bypass -File "{0}" -TargetDirectory "{1}" -StateDirectory "{2}"' -f $worker, $TargetDirectory, $stateDirectory
$action = New-ScheduledTaskAction -Execute $powerShell -Argument $arguments -WorkingDirectory $installDirectory
$triggers = @(
    (New-ScheduledTaskTrigger -AtStartup),
    (New-ScheduledTaskTrigger -Once -At (Get-Date).AddMinutes(1) -RepetitionInterval (New-TimeSpan -Minutes 5))
)
$principal = New-ScheduledTaskPrincipal -UserId 'SYSTEM' -LogonType ServiceAccount -RunLevel Highest
$settings = New-ScheduledTaskSettingsSet -MultipleInstances IgnoreNew -StartWhenAvailable -ExecutionTimeLimit (New-TimeSpan -Minutes 15) -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries
Register-ScheduledTask -TaskName 'MAPL Website Sync' -Action $action -Trigger $triggers -Principal $principal -Settings $settings -Description 'Sync verified gh-pages builds to C:\xampp\www\content every 5 minutes, with backups.' -Force | Out-Null
Start-ScheduledTask -TaskName 'MAPL Website Sync'
Write-Output "Installed MAPL Website Sync. Target: $TargetDirectory"
Write-Output "Log: $(Join-Path $stateDirectory 'deployment.log')"
