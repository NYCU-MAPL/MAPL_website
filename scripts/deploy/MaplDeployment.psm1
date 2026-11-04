#Requires -Version 5.1
Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function Get-MaplFullPath([string] $Path) {
    return [IO.Path]::GetFullPath($Path).TrimEnd([char[]]@('/', '\'))
}

function Test-MaplChildPath([string] $Path, [string] $Parent) {
    $prefix = (Get-MaplFullPath $Parent) + [IO.Path]::DirectorySeparatorChar
    return (Get-MaplFullPath $Path).StartsWith($prefix, [StringComparison]::OrdinalIgnoreCase)
}

function Get-MaplChildPath([string] $Root, [string] $RelativePath) {
    $parts = $RelativePath.Replace('\', '/').Split('/')
    if ($parts.Count -eq 0 -or @($parts | Where-Object { $_ -eq '' -or $_ -eq '.' -or $_ -eq '..' -or $_ -match '[:*?"<>|]' }).Count -gt 0) {
        throw "Unsafe relative path: $RelativePath"
    }
    $path = Get-MaplFullPath (Join-Path $Root ($parts -join [IO.Path]::DirectorySeparatorChar))
    if (-not (Test-MaplChildPath $path $Root)) { throw "Path escapes destination: $RelativePath" }
    # Never follow junctions or symbolic links inside the destination.
    $ancestor = $path
    while ($ancestor -and ($ancestor -eq (Get-MaplFullPath $Root) -or (Test-MaplChildPath $ancestor $Root))) {
        if (Test-Path -LiteralPath $ancestor) {
            if (((Get-Item -LiteralPath $ancestor -Force).Attributes -band [IO.FileAttributes]::ReparsePoint) -ne 0) {
                throw "Refusing linked path: $ancestor"
            }
        }
        $ancestor = [IO.Path]::GetDirectoryName($ancestor)
    }
    return $path
}

function Assert-MaplDirectories([string] $TargetDirectory, [string] $StateDirectory) {
    if ([IO.Path]::GetFileName($TargetDirectory) -ne 'content' -or -not (Test-Path -LiteralPath (Join-Path $TargetDirectory 'index.html') -PathType Leaf)) {
        throw 'TargetDirectory must be the existing content directory with index.html.'
    }
    $webRoot = [IO.Path]::GetDirectoryName($TargetDirectory)
    if ($StateDirectory -eq $webRoot -or (Test-MaplChildPath $StateDirectory $webRoot)) {
        throw 'StateDirectory must be outside the Apache web root.'
    }
    $null = Get-MaplChildPath $TargetDirectory 'index.html'
    New-Item -ItemType Directory -Path $StateDirectory -Force | Out-Null
    if (((Get-Item -LiteralPath $StateDirectory -Force).Attributes -band [IO.FileAttributes]::ReparsePoint) -ne 0) {
        throw 'StateDirectory must not be a junction or symbolic link.'
    }
}

function Write-MaplFile([string] $Source, [string] $Destination) {
    $parent = [IO.Path]::GetDirectoryName($Destination)
    New-Item -ItemType Directory -Path $parent -Force | Out-Null
    $temporary = Join-Path $parent ('.mapl-' + [guid]::NewGuid().ToString('N') + '.tmp')
    try {
        [IO.File]::Copy($Source, $temporary, $false)
        if ((Get-FileHash -LiteralPath $Source -Algorithm SHA256).Hash -ne (Get-FileHash -LiteralPath $temporary -Algorithm SHA256).Hash) {
            throw "Copy verification failed: $Destination"
        }
        if ([IO.File]::Exists($Destination)) { [IO.File]::Replace($temporary, $Destination, [NullString]::Value) }
        else { [IO.File]::Move($temporary, $Destination) }
    }
    finally {
        if (Test-Path -LiteralPath $temporary) { Remove-Item -LiteralPath $temporary -Force }
    }
}

function Write-MaplJson($Value, [string] $Destination) {
    $temporary = Join-Path ([IO.Path]::GetDirectoryName($Destination)) ([guid]::NewGuid().ToString('N') + '.json')
    try {
        $Value | ConvertTo-Json -Depth 10 | Set-Content -LiteralPath $temporary -Encoding UTF8
        Write-MaplFile $temporary $Destination
    }
    finally {
        if (Test-Path -LiteralPath $temporary) { Remove-Item -LiteralPath $temporary -Force }
    }
}

function Repair-MaplDeployment {
    [CmdletBinding()]
    param([string] $TargetDirectory, [string] $StateDirectory)
    $TargetDirectory = Get-MaplFullPath $TargetDirectory
    $StateDirectory = Get-MaplFullPath $StateDirectory
    Assert-MaplDirectories $TargetDirectory $StateDirectory
    $pendingPath = Join-Path $StateDirectory 'pending.json'
    if (-not (Test-Path -LiteralPath $pendingPath)) { return }
    $pending = Get-Content -LiteralPath $pendingPath -Raw | ConvertFrom-Json
    if ($pending.targetDirectory -ne $TargetDirectory -or -not (Test-MaplChildPath $pending.backupDirectory (Join-Path $StateDirectory 'backups'))) {
        throw 'Pending deployment does not match this target/state directory.'
    }
    $statePath = Join-Path $StateDirectory 'state.json'
    $state = if (Test-Path -LiteralPath $statePath) { Get-Content -LiteralPath $statePath -Raw | ConvertFrom-Json } else { $null }
    if ($null -eq $state -or $state.transactionId -ne $pending.transactionId) {
        # Restore overwritten resources before restoring HTML. New assets are kept
        # so browsers that already loaded a newer bundle do not receive 404s.
        foreach ($file in @($pending.files | Sort-Object @{ Expression = { $_ -eq 'index.html' } }, { $_ })) {
            $source = Get-MaplChildPath $pending.backupDirectory $file
            $destination = Get-MaplChildPath $TargetDirectory $file
            Write-MaplFile $source $destination
        }
        Write-Verbose 'Recovered the previously published files from an interrupted deployment.'
    }
    Remove-Item -LiteralPath $pendingPath -Force
}

function Publish-MaplWebsite {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory = $true)][string] $SourceDirectory,
        [Parameter(Mandatory = $true)][string] $TargetDirectory,
        [Parameter(Mandatory = $true)][string] $StateDirectory,
        [Parameter(Mandatory = $true)][ValidatePattern('^[a-f0-9]{40}$')][string] $ReleaseId
    )
    $SourceDirectory = Get-MaplFullPath $SourceDirectory
    $TargetDirectory = Get-MaplFullPath $TargetDirectory
    $StateDirectory = Get-MaplFullPath $StateDirectory
    Assert-MaplDirectories $TargetDirectory $StateDirectory
    if ($SourceDirectory -eq $TargetDirectory -or (Test-MaplChildPath $SourceDirectory $TargetDirectory)) { throw 'Source must be a separate staging directory.' }
    Repair-MaplDeployment $TargetDirectory $StateDirectory
    foreach ($required in @('index.html', '.nojekyll', 'assets', 'media')) {
        if (-not (Test-Path -LiteralPath (Join-Path $SourceDirectory $required))) { throw "Incomplete build: missing $required" }
    }
    $html = Get-Content -LiteralPath (Join-Path $SourceDirectory 'index.html') -Raw
    $assetLinks = [regex]::Matches($html, '(?:src|href)\s*=\s*["''](?<path>(?:\./)?assets/[^"''?#]+)')
    if ($assetLinks.Count -eq 0) { throw 'index.html does not reference a Vite assets bundle.' }
    foreach ($link in $assetLinks) {
        $relative = $link.Groups['path'].Value -replace '^\./', ''
        if (-not (Test-Path -LiteralPath (Get-MaplChildPath $SourceDirectory $relative) -PathType Leaf)) { throw "Missing HTML asset: $relative" }
    }
    $changes = @()
    foreach ($file in Get-ChildItem -LiteralPath $SourceDirectory -Recurse -Force) {
        if (($file.Attributes -band [IO.FileAttributes]::ReparsePoint) -ne 0) { throw 'Build contains a symbolic link or junction.' }
        if ($file.PSIsContainer) { continue }
        $relative = $file.FullName.Substring($SourceDirectory.Length + 1).Replace('\', '/')
        $top = $relative.Split('/')[0]
        if ($top -notin @('assets', 'media', 'index.html', '.nojekyll', 'CNAME', 'favicon.svg', 'favicon.ico', 'robots.txt', 'sitemap.xml')) { throw "Unexpected build entry: $relative" }
        if ($relative -match '(?i)(^|/)(\.git|\.github|\.env)(/|\.|$)|\.(ps1|psm1|exe|bat|cmd|php|aspx?|pem|key)$') { throw "Non-static build entry: $relative" }
        $destination = Get-MaplChildPath $TargetDirectory $relative
        if (Test-Path -LiteralPath $destination -PathType Container) { throw "File conflicts with an existing directory: $relative" }
        if ((Test-Path -LiteralPath $destination -PathType Leaf) -and (Get-FileHash -LiteralPath $file.FullName -Algorithm SHA256).Hash -eq (Get-FileHash -LiteralPath $destination -Algorithm SHA256).Hash) { continue }
        $changes += [pscustomobject]@{ relative = $relative; source = $file.FullName; destination = $destination }
    }
    $transactionId = [guid]::NewGuid().ToString('N')
    $backupDirectory = Join-Path (Join-Path $StateDirectory 'backups') $transactionId
    New-Item -ItemType Directory -Path $backupDirectory -Force | Out-Null
    $backedUp = @()
    foreach ($change in $changes) {
        if (Test-Path -LiteralPath $change.destination -PathType Leaf) {
            $backup = Get-MaplChildPath $backupDirectory $change.relative
            New-Item -ItemType Directory -Path ([IO.Path]::GetDirectoryName($backup)) -Force | Out-Null
            [IO.File]::Copy($change.destination, $backup, $false)
            $backedUp += $change.relative
        }
    }
    $pending = [ordered]@{ transactionId = $transactionId; targetDirectory = $TargetDirectory; backupDirectory = $backupDirectory; files = @($backedUp) }
    Write-MaplJson $pending (Join-Path $StateDirectory 'pending.json')
    try {
        foreach ($change in @($changes | Sort-Object @{ Expression = { $_.relative -eq 'index.html' } }, { $_.relative })) {
            Write-MaplFile $change.source $change.destination
        }
        $state = [ordered]@{ releaseId = $ReleaseId; transactionId = $transactionId; targetDirectory = $TargetDirectory; backupDirectory = $backupDirectory; deployedAt = [DateTime]::UtcNow.ToString('o') }
        Write-MaplJson $state (Join-Path $StateDirectory 'state.json')
    }
    catch {
        $failure = $_
        Repair-MaplDeployment $TargetDirectory $StateDirectory
        throw $failure
    }
    # A crash after state.json is written is recognized as a committed transaction.
    Remove-Item -LiteralPath (Join-Path $StateDirectory 'pending.json') -Force -ErrorAction SilentlyContinue
    return [pscustomobject]@{ releaseId = $ReleaseId; changedFiles = $changes.Count; backupDirectory = $backupDirectory }
}

Export-ModuleMember -Function Publish-MaplWebsite, Repair-MaplDeployment
