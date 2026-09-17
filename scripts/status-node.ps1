<#
.SYNOPSIS
    Checks the status and physical health of AetherGrid Node #001 on Windows.
#>

$NodeRoot = "D:\AetherGridStorage"
$PidFile = "$NodeRoot\metadata\daemon.pid"
$LogFile = "$NodeRoot\logs\node-daemon.log"

Write-Host "=======================================================" -ForegroundColor Cyan
Write-Host "   AETHERGRID NODE #001 HEALTH & TELEMETRY             " -ForegroundColor Cyan
Write-Host "=======================================================" -ForegroundColor Cyan

# 1. Check Process Status
if (Test-Path $PidFile) {
    $DaemonPid = Get-Content $PidFile -ErrorAction SilentlyContinue
    if ($DaemonPid) {
        $Proc = Get-Process -Id $DaemonPid -ErrorAction SilentlyContinue
        if ($Proc) {
            Write-Host "Process Status:       RUNNING (PID: $DaemonPid)" -ForegroundColor Green
            Write-Host "Process Memory:       $([math]::round($Proc.WorkingSet64/1MB, 2)) MB"
        } else {
            Write-Host "Process Status:       STOPPED (Stale PID)" -ForegroundColor Red
        }
    } else {
        Write-Host "Process Status:       STOPPED" -ForegroundColor Red
    }
} else {
    Write-Host "Process Status:       STOPPED" -ForegroundColor Red
}

# 2. Check Physical Storage Volume
$DriveD = Get-Volume -DriveLetter D -ErrorAction SilentlyContinue
if ($DriveD) {
    Write-Host "Physical Disk:        D: ($($DriveD.FileSystemType))"
    Write-Host "Volume Free Space:    $([math]::round($DriveD.SizeRemaining/1GB, 2)) GB free of $([math]::round($DriveD.Size/1GB, 2)) GB"
}

# 3. Check Stored Chunks
$ChunksCount = 0
$ChunksSize = 0
if (Test-Path "$NodeRoot\chunks") {
    $ChunkFiles = Get-ChildItem -Path "$NodeRoot\chunks" -Filter "*.chunk" -ErrorAction SilentlyContinue
    if ($ChunkFiles) {
        $ChunksCount = ($ChunkFiles | Measure-Object).Count
        if ($ChunksCount -gt 0) {
            $ChunksSize = [math]::round(($ChunkFiles | Measure-Object -Property Length -Sum).Sum / 1MB, 2)
        }
    }
}

Write-Host "AetherGrid Directory: $NodeRoot"
Write-Host "Encrypted Chunks:     $ChunksCount chunks ($ChunksSize MB)"
Write-Host "Configured Capacity:  50.00 GB"

# 4. Recent Log Activity
Write-Host ""
Write-Host "Recent Daemon Log Activity:" -ForegroundColor Gray
if (Test-Path $LogFile) {
    Get-Content $LogFile -Tail 5 | ForEach-Object { Write-Host "  $_" -ForegroundColor DarkGray }
} else {
    Write-Host "  (No log file found at $LogFile)" -ForegroundColor DarkGray
}
Write-Host "-------------------------------------------------------"
