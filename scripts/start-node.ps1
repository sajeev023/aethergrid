<#
.SYNOPSIS
    Starts the AetherGrid Node #001 Storage Daemon on Windows.
#>

$ErrorActionPreference = "Stop"

$NodeRoot = "D:\AetherGridStorage"
$PidFile = "$NodeRoot\metadata\daemon.pid"
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ProjectRoot = Split-Path -Parent $ScriptDir
$DaemonScript = "$ProjectRoot\node-client\node-daemon.mjs"

Write-Host "=======================================================" -ForegroundColor Cyan
Write-Host "   🚀 STARTING AETHERGRID NODE #001 (DEDICATED D:)    " -ForegroundColor Cyan
Write-Host "=======================================================" -ForegroundColor Cyan

# Check if already running
if (Test-Path $PidFile) {
    $ExistingPid = Get-Content $PidFile -ErrorAction SilentlyContinue
    if ($ExistingPid -and (Get-Process -Id $ExistingPid -ErrorAction SilentlyContinue)) {
        Write-Host "⚠️ Node daemon is ALREADY running with PID: $ExistingPid" -ForegroundColor Yellow
        Write-Host "To view status run: powershell -File scripts\status-node.ps1"
        exit 0
    } else {
        Remove-Item $PidFile -Force -ErrorAction SilentlyContinue
    }
}

# Ensure directories
if (-not (Test-Path "$NodeRoot\chunks")) {
    New-Item -ItemType Directory -Force -Path "$NodeRoot\chunks", "$NodeRoot\metadata", "$NodeRoot\logs" | Out-Null
}

Write-Host "Storage Directory: $NodeRoot" -ForegroundColor Green
Write-Host "Launching background daemon process..." -ForegroundColor Gray

$Process = Start-Process -FilePath "node" `
    -ArgumentList "`"$DaemonScript`" --dir `"$NodeRoot`" --capacity 50" `
    -PassThru `
    -NoNewWindow

Start-Sleep -Seconds 2

if ($Process -and (-not $Process.HasExited)) {
    Write-Host "✅ AetherGrid Node #001 successfully started (PID: $($Process.Id))" -ForegroundColor Green
    Write-Host "Logs streaming to: $NodeRoot\logs\node-daemon.log" -ForegroundColor Gray
} else {
    Write-Host "❌ Failed to start storage daemon. Check node-client\node-daemon.mjs." -ForegroundColor Red
}
