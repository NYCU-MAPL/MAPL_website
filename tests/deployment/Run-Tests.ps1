#Requires -Version 5.1
Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
$modulePath = Join-Path $PSScriptRoot '../../scripts/deploy/MaplDeployment.psm1'
Import-Module $modulePath -Force
$root = Join-Path ([IO.Path]::GetTempPath()) ('MAPL deploy tests ' + [guid]::NewGuid().ToString('N'))
$target = Join-Path $root 'www/content'
$state = Join-Path $root 'state'
$passed = 0

function Assert-True($Condition, [string] $Message) {
    if (-not $Condition) { throw "FAILED: $Message" }
}
function Assert-Throws([scriptblock] $Action, [string] $Message) {
    $failed = $false
    try { & $Action | Out-Null } catch { $failed = $true }
    Assert-True $failed $Message
}
function Put-File([string] $Path, [string] $Text) {
    New-Item -ItemType Directory -Path ([IO.Path]::GetDirectoryName($Path)) -Force | Out-Null
    [IO.File]::WriteAllText($Path, $Text)
}
function Read-File([string] $Path) { return [IO.File]::ReadAllText($Path) }
function New-Release([string] $Name, [string] $Version) {
    $directory = Join-Path $root $Name
    Put-File (Join-Path $directory 'index.html') ('<script type="module" src="./assets/' + $Version + '.js"></script>')
    Put-File (Join-Path $directory ('assets/' + $Version + '.js')) $Version
    Put-File (Join-Path $directory 'media/shared.txt') $Version
    Put-File (Join-Path $directory 'licenses/octicons.txt') 'MIT License: GitHub Octicons'
    Put-File (Join-Path $directory '.nojekyll') ''
    return $directory
}
function Passed([string] $Name) { $script:passed++; Write-Output "PASS $Name" }

try {
    Put-File (Join-Path $target 'index.html') 'original-index'
    Put-File (Join-Path $target 'assets/old.js') 'legacy-bundle'
    Put-File (Join-Path $target 'media/shared.txt') 'original-image'
    Put-File (Join-Path $target 'pages/papers/keep.pdf') 'legacy-paper'
    Put-File (Join-Path $root 'www/HuPR/index.html') 'project-page'
    Put-File (Join-Path $root 'www/filebrowser-marker') 'other-service'
    $source = New-Release 'source-one' 'version-one'
    $result = Publish-MaplWebsite $source $target $state ('a' * 40)
    Assert-True ((Read-File (Join-Path $target 'index.html')) -eq (Read-File (Join-Path $source 'index.html'))) 'HTML published'
    Assert-True ((Read-File (Join-Path $target 'media/shared.txt')) -eq 'version-one') 'Media updated'
    Assert-True ((Read-File (Join-Path $target 'licenses/octicons.txt')) -eq 'MIT License: GitHub Octicons') 'Icon license published'
    foreach ($path in @('pages/papers/keep.pdf', 'assets/old.js')) { Assert-True (Test-Path -LiteralPath (Join-Path $target $path)) "Legacy file retained: $path" }
    Assert-True ((Read-File (Join-Path $root 'www/HuPR/index.html')) -eq 'project-page') 'Sibling project untouched'
    Assert-True ((Read-File (Join-Path $root 'www/filebrowser-marker')) -eq 'other-service') 'Sibling service untouched'
    Assert-True ((Read-File (Join-Path $result.backupDirectory 'index.html')) -eq 'original-index') 'Original HTML backed up'
    Passed 'verified update, backup, legacy files and sibling services'

    $same = Publish-MaplWebsite $source $target $state ('a' * 40)
    Assert-True ($same.changedFiles -eq 0) 'Identical content is not recopied'
    Passed 'unchanged files skipped'

    $before = Read-File (Join-Path $target 'index.html')
    $broken = New-Release 'source-missing' 'missing'
    Remove-Item -LiteralPath (Join-Path $broken 'assets/missing.js')
    Assert-Throws { Publish-MaplWebsite $broken $target $state ('b' * 40) } 'Reject missing bundle'
    Assert-True ((Read-File (Join-Path $target 'index.html')) -eq $before) 'Incomplete build leaves HTML intact'
    Passed 'incomplete build rejected before any website changes'

    $unexpected = New-Release 'source-unexpected-license' 'unexpected-license'
    Put-File (Join-Path $unexpected 'licenses/unexpected.txt') 'unexpected file'
    Assert-Throws { Publish-MaplWebsite $unexpected $target $state ('b' * 40) } 'Only the known icon license path is allowed'
    Assert-True ((Read-File (Join-Path $target 'index.html')) -eq $before) 'Unexpected license leaves HTML intact'
    Assert-True (-not (Test-Path -LiteralPath (Join-Path $target 'licenses/unexpected.txt'))) 'Unexpected license is not published'
    Passed 'known icon license accepted and unexpected license entries rejected'

    $unsafe = New-Release 'source-unsafe' 'unsafe'
    Put-File (Join-Path $unsafe 'media/execute.ps1') 'untrusted code'
    Assert-Throws { Publish-MaplWebsite $unsafe $target $state ('b' * 40) } 'Reject executable payload'
    Assert-Throws { Publish-MaplWebsite $source (Join-Path $root 'www') $state ('b' * 40) } 'Reject web root as destination'
    Assert-Throws { Publish-MaplWebsite $source $target (Join-Path $root 'www/deployment-state') ('b' * 40) } 'Reject public state directory'
    $module = Get-Module MaplDeployment
    foreach ($path in @('../outside', '/absolute', 'media/../../outside', 'media/file:stream', 'C:\outside')) {
        Assert-Throws { & $module { param($r, $p) Get-MaplChildPath $r $p } $target $path } "Reject escaping path $path"
    }
    Passed 'destination, executable and traversal checks'

    $failureSource = New-Release 'source-failure' 'version-two'
    # Inject an I/O failure only when promoting the new HTML, after resources
    # have changed. Recovery still uses the real copy implementation.
    & $module {
        param($Prefix)
        $script:FailurePrefix = $Prefix
        $script:RealWriteMaplFile = ${function:Write-MaplFile}
        function script:Write-MaplFile([string] $Source, [string] $Destination) {
            if ($Source.StartsWith($script:FailurePrefix) -and [IO.Path]::GetFileName($Destination) -eq 'index.html') { throw 'Simulated HTML write failure' }
            & $script:RealWriteMaplFile $Source $Destination
        }
    } $failureSource
    Assert-Throws { Publish-MaplWebsite $failureSource $target $state ('c' * 40) } 'Injected write fails'
    Assert-True ((Read-File (Join-Path $target 'index.html')) -eq $before) 'HTML restored'
    Assert-True ((Read-File (Join-Path $target 'media/shared.txt')) -eq 'version-one') 'Overwritten resource restored'
    Assert-True ((Get-Content (Join-Path $state 'state.json') -Raw | ConvertFrom-Json).releaseId -eq ('a' * 40)) 'Release not advanced on failure'
    Assert-True (-not (Test-Path -LiteralPath (Join-Path $state 'pending.json'))) 'Failed transaction recovered'
    Import-Module $modulePath -Force
    Passed 'mid-deployment I/O failure rolls back HTML, media and release state'

    $backup = Join-Path $state 'backups/interrupted'
    Put-File (Join-Path $backup 'index.html') $before
    Put-File (Join-Path $backup 'media/shared.txt') 'version-one'
    Put-File (Join-Path $target 'index.html') 'interrupted-index'
    Put-File (Join-Path $target 'media/shared.txt') 'interrupted-image'
    $pending = @{ transactionId = 'interrupted'; targetDirectory = [IO.Path]::GetFullPath($target); backupDirectory = [IO.Path]::GetFullPath($backup); files = @('index.html', 'media/shared.txt') }
    $pending | ConvertTo-Json | Set-Content (Join-Path $state 'pending.json') -Encoding UTF8
    Repair-MaplDeployment $target $state
    Assert-True ((Read-File (Join-Path $target 'index.html')) -eq $before) 'Interrupted HTML recovered'
    Assert-True ((Read-File (Join-Path $target 'media/shared.txt')) -eq 'version-one') 'Interrupted resource recovered'
    Passed 'interruption recovered on next synchronization'

    $committed = Get-Content (Join-Path $state 'state.json') -Raw | ConvertFrom-Json
    $pending.transactionId = $committed.transactionId
    $pending | ConvertTo-Json | Set-Content (Join-Path $state 'pending.json') -Encoding UTF8
    Put-File (Join-Path $backup 'index.html') 'must-not-restore'
    Repair-MaplDeployment $target $state
    Assert-True ((Read-File (Join-Path $target 'index.html')) -eq $before) 'Committed transaction preserved'
    Passed 'crash after commit does not roll back a successful deployment'

    foreach ($script in Get-ChildItem -LiteralPath (Join-Path $PSScriptRoot '../../scripts/deploy') -File) {
        $tokens = $null
        $parseErrors = $null
        $null = [Management.Automation.Language.Parser]::ParseFile($script.FullName, [ref]$tokens, [ref]$parseErrors)
        Assert-True ($parseErrors.Count -eq 0) "PowerShell syntax: $($script.Name)"
    }
    Passed 'all deployment scripts parse'
    Write-Output "$passed deployment checks passed on PowerShell $($PSVersionTable.PSVersion)."
}
finally {
    if (Test-Path -LiteralPath $root) { Remove-Item -LiteralPath $root -Recurse -Force }
}
