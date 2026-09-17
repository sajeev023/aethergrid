<#
.SYNOPSIS
    Tails the live logs of AetherGrid Node #001 on Windows.
#>

$LogFile = "D:\AetherGridStorage\logs\node-daemon.log"

if (-not (Test-Path $LogFile)) {
    Write-Host "⚠️ Log file not found at $LogFile. Has the daemon been started?" -ForegroundColor Yellow
    exit 1
}

Write-Host "Streaming live logs from $LogFile (Ctrl+C to exit)..." -ForegroundColor Cyan
Get-Content -Path $LogFile -Tail 20 -Wait
