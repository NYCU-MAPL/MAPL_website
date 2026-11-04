#Requires -Version 5.1
[CmdletBinding()]
param(
    [string] $TargetDirectory = 'C:\xampp\www\content',
    [string] $StateDirectory = 'C:\ProgramData\MAPLWebsiteDeploy\data'
)
Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
Import-Module (Join-Path $PSScriptRoot 'MaplDeployment.psm1') -Force
New-Item -ItemType Directory -Path $StateDirectory -Force | Out-Null
$lock = $null
$workDirectory = $null
$logPath = Join-Path $StateDirectory 'deployment.log'
try {
    try { $lock = [IO.File]::Open((Join-Path $StateDirectory 'sync.lock'), 'OpenOrCreate', 'ReadWrite', 'None') }
    catch [IO.IOException] { Write-Output 'Another synchronization is running.'; return }
    Repair-MaplDeployment -TargetDirectory $TargetDirectory -StateDirectory $StateDirectory
    [Net.ServicePointManager]::SecurityProtocol = [Net.ServicePointManager]::SecurityProtocol -bor [Net.SecurityProtocolType]::Tls12
    $headers = @{ 'User-Agent' = 'MAPL-Website-Deploy'; Accept = 'application/vnd.github+json' }
    $commit = Invoke-RestMethod -Uri 'https://api.github.com/repos/NYCU-MAPL/MAPL_website/commits/gh-pages' -Headers $headers -TimeoutSec 60
    $releaseId = [string]$commit.sha
    if ($releaseId -notmatch '^[a-f0-9]{40}$') { throw 'GitHub returned an invalid commit SHA.' }
    $statePath = Join-Path $StateDirectory 'state.json'
    if (Test-Path -LiteralPath $statePath) {
        $state = Get-Content -LiteralPath $statePath -Raw | ConvertFrom-Json
        if ($state.targetDirectory -ne [IO.Path]::GetFullPath($TargetDirectory).TrimEnd([char[]]@('/', '\'))) { throw 'State belongs to a different website directory.' }
        if ($state.releaseId -eq $releaseId) { Write-Output "Already deployed: $releaseId"; return }
    }
    $workDirectory = Join-Path $StateDirectory ('staging-' + [guid]::NewGuid().ToString('N'))
    New-Item -ItemType Directory -Path $workDirectory | Out-Null
    $archivePath = Join-Path $workDirectory 'site.zip'
    Invoke-WebRequest -Uri "https://github.com/NYCU-MAPL/MAPL_website/archive/$releaseId.zip" -UseBasicParsing -Headers @{ 'User-Agent' = 'MAPL-Website-Deploy' } -OutFile $archivePath -TimeoutSec 300
    Add-Type -AssemblyName System.IO.Compression.FileSystem
    $archive = [IO.Compression.ZipFile]::OpenRead($archivePath)
    $sourceDirectory = Join-Path $workDirectory 'site'
    try {
        $rootName = $null
        foreach ($entry in $archive.Entries) {
            $name = $entry.FullName.Replace('\', '/').TrimEnd('/')
            if ([string]::IsNullOrEmpty($name) -or @($name.Split('/') | Where-Object { $_ -eq '' -or $_ -eq '.' -or $_ -eq '..' -or $_ -match '[:*?"<>|]' }).Count -gt 0 -or (($entry.ExternalAttributes -shr 16) -band 0xF000) -eq 0xA000) {
                throw 'Archive contains an unsafe file path or symbolic link.'
            }
            $parts = $name.Split('/')
            if ($null -eq $rootName) { $rootName = $parts[0] }
            if ($parts[0] -ne $rootName) { throw 'Unexpected GitHub archive layout.' }
            if ($parts.Count -eq 1) { continue }
            # Strip GitHub's repository/SHA wrapper, keeping Windows 5.1 paths short.
            $destination = Join-Path $sourceDirectory (($parts[1..($parts.Count - 1)]) -join [IO.Path]::DirectorySeparatorChar)
            if ($entry.FullName.EndsWith('/')) { New-Item -ItemType Directory -Path $destination -Force | Out-Null }
            else {
                New-Item -ItemType Directory -Path ([IO.Path]::GetDirectoryName($destination)) -Force | Out-Null
                [IO.Compression.ZipFileExtensions]::ExtractToFile($entry, $destination)
            }
        }
    }
    finally { $archive.Dispose() }
    $result = Publish-MaplWebsite -SourceDirectory $sourceDirectory -TargetDirectory $TargetDirectory -StateDirectory $StateDirectory -ReleaseId $releaseId
    $message = "$(Get-Date -Format o) DEPLOYED $releaseId ($($result.changedFiles) changed files); backup: $($result.backupDirectory)"
    Add-Content -LiteralPath $logPath -Value $message -Encoding UTF8
    Write-Output $message
}
catch {
    Add-Content -LiteralPath $logPath -Value "$(Get-Date -Format o) ERROR $($_.Exception.Message)" -Encoding UTF8
    throw
}
finally {
    if ($workDirectory -and (Test-Path -LiteralPath $workDirectory)) { Remove-Item -LiteralPath $workDirectory -Recurse -Force }
    if ($null -ne $lock) { $lock.Dispose() }
}
