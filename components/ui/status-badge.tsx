import * as React from "react";
import { CheckCircle2, AlertTriangle, AlertCircle, RefreshCw, Clock, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

export type HealthStatus = 
  | "HEALTHY" 
  | "DEGRADED" 
  | "OFFLINE" 
  | "RECOVERING" 
  | "SYNCHRONIZING" 
  | "VERIFIED" 
  | "ACTIVE" 
  | "PAUSED" 
  | "SIMULATION";

interface StatusBadgeProps {
  status: HealthStatus | string;
  label?: string;
  showIcon?: boolean;
  size?: "sm" | "default";
  className?: string;
}

export function StatusBadge({
  status,
  label,
  showIcon = true,
  size = "default",
  className,
}: StatusBadgeProps) {
  const normStatus = (status || "HEALTHY").toUpperCase() as HealthStatus;

  let bg = "bg-[var(--surface-subtle)]";
  let border = "border-[var(--border)]";
  let text = "text-[var(--foreground-secondary)]";
  let Icon = CheckCircle2;
  let defaultLabel: string = normStatus;

  switch (normStatus) {
    case "HEALTHY":
    case "ACTIVE":
    case "VERIFIED":
      bg = "bg-[var(--success-muted)]";
      border = "border-[var(--success)]/30";
      text = "text-[var(--success)]";
      Icon = CheckCircle2;
      defaultLabel = normStatus === "HEALTHY" ? "Healthy — 2x Replicas" : "Active";
      break;
    case "DEGRADED":
      bg = "bg-[var(--warning-muted)]";
      border = "border-[var(--warning)]/30";
      text = "text-[var(--warning)]";
      Icon = AlertTriangle;
      defaultLabel = "Degraded — Failover Active";
      break;
    case "OFFLINE":
      bg = "bg-[var(--error-muted)]";
      border = "border-[var(--error)]/30";
      text = "text-[var(--error)]";
      Icon = AlertCircle;
      defaultLabel = "Offline";
      break;
    case "RECOVERING":
      bg = "bg-[var(--info-muted)]";
      border = "border-[var(--info)]/30";
      text = "text-[var(--info)]";
      Icon = RefreshCw;
      defaultLabel = "Recovering Replicas";
      break;
    case "SYNCHRONIZING":
      bg = "bg-[var(--info-muted)]";
      border = "border-[var(--info)]/30";
      text = "text-[var(--info)]";
      Icon = RefreshCw;
      defaultLabel = "Synchronizing";
      break;
    case "PAUSED":
      bg = "bg-[var(--surface-subtle)]";
      border = "border-[var(--border)]";
      text = "text-[var(--foreground-muted)]";
      Icon = Clock;
      defaultLabel = "Paused";
      break;
    case "SIMULATION":
      bg = "bg-[var(--primary-muted)]";
      border = "border-[var(--primary)]/30";
      text = "text-[var(--primary)]";
      Icon = ShieldAlert;
      defaultLabel = "Simulation Mode";
      break;
  }

  const isSmall = size === "sm";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-medium rounded-full border transition-colors",
        bg,
        border,
        text,
        isSmall ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-[12px]",
        className
      )}
      role="status"
    >
      {showIcon && (
        <Icon className={cn("shrink-0", isSmall ? "w-3 h-3" : "w-3.5 h-3.5", normStatus === "RECOVERING" || normStatus === "SYNCHRONIZING" ? "animate-spin" : "")} />
      )}
      <span>{label || defaultLabel}</span>
    </span>
  );
}
