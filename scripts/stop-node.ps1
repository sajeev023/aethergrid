<#
.SYNOPSIS
    Stops the AetherGrid Node #001 Storage Daemon on Windows.
#>

$NodeRoot = "D:\AetherGridStorage"
$PidFile = "$NodeRoot\metadata\daemon.pid"

if (-not (Test-Path $PidFile)) {
    Write-Host "ℹ️ No running daemon PID file found at $PidFile." -ForegroundColor Yellow
    exit 0
}

$PidToStop = Get-Content $PidFile -ErrorAction SilentlyContinue

if ($PidToStop) {
    try {
        $Proc = Get-Process -Id $PidToStop -ErrorAction Stop
        Write-Host "🛑 Stopping AetherGrid Node daemon (PID: $PidToStop)..." -ForegroundColor Yellow
        Stop-Process -Id $PidToStop -Force
        Start-Sleep -Seconds 1
        Remove-Item $PidFile -Force -ErrorAction SilentlyContinue
        Write-Host "✅ AetherGrid Node daemon stopped cleanly." -ForegroundColor Green
    } catch {
        Write-Host "⚠️ Process $PidToStop not currently running. Cleaning stale PID file." -ForegroundColor Gray
        Remove-Item $PidFile -Force -ErrorAction SilentlyContinue
    }
}
