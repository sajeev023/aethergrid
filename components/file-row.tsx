"use client";

import React from "react";
import {
  FileText,
  Image as ImageIcon,
  Film,
  Music,
  Archive,
  Code,
  File,
  Download,
  Trash2,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface FileItem {
  id: string;
  original_name: string;
  mime_type: string;
  size_bytes: number;
  created_at: string;
  status?: string;
  total_chunks?: number;
  replica_count?: number;
}

interface FileRowProps {
  file: FileItem;
  onDownload: (file: FileItem) => void;
  onDelete: (fileId: string) => void;
  isDeleting?: boolean;
}

export function FileRow({
  file,
  onDownload,
  onDelete,
  isDeleting = false,
}: FileRowProps) {
  const getFileIcon = (mime: string, name: string) => {
    const ext = name.split(".").pop()?.toLowerCase() || "";
    if (mime.startsWith("image/") || ["jpg", "jpeg", "png", "webp", "svg", "gif"].includes(ext)) {
      return <ImageIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
    }
    if (mime.startsWith("video/") || ["mp4", "mov", "mkv", "webm"].includes(ext)) {
      return <Film className="w-4 h-4 text-purple-600 dark:text-purple-400" />;
    }
    if (mime.startsWith("audio/") || ["mp3", "wav", "flac"].includes(ext)) {
      return <Music className="w-4 h-4 text-amber-600 dark:text-amber-400" />;
    }
    if (["zip", "tar", "gz", "7z", "rar"].includes(ext)) {
      return <Archive className="w-4 h-4 text-orange-600 dark:text-orange-400" />;
    }
    if (["ts", "tsx", "js", "jsx", "json", "py", "html", "css"].includes(ext)) {
      return <Code className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />;
    }
    if (["pdf", "doc", "docx", "txt", "md"].includes(ext)) {
      return <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
    }
    return <File className="w-4 h-4 text-[var(--foreground-muted)]" />;
  };

  const formatBytes = (bytes: number): string => {
    if (bytes >= 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
    if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    if (bytes >= 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${bytes} B`;
  };

  const formatDate = (dateStr: string): string => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div
      className={cn(
        "group flex items-center justify-between p-3 sm:px-4 rounded-[10px] border border-transparent hover:border-[var(--border)] hover:bg-[var(--surface-subtle)] transition-all",
        isDeleting ? "opacity-50 pointer-events-none" : ""
      )}
    >
      {/* File Type Icon & Name */}
      <div className="flex items-center gap-3 min-w-0 flex-1 mr-3">
        <div className="w-9 h-9 rounded-[8px] bg-[var(--surface)] border border-[var(--border-subtle)] flex items-center justify-center shrink-0 shadow-sm">
          {getFileIcon(file.mime_type, file.original_name)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-medium text-[14px] text-[var(--foreground)] truncate group-hover:text-[var(--primary)] transition-colors">
            {file.original_name}
          </div>
          <div className="flex items-center gap-2 text-[12px] text-[var(--foreground-muted)] sm:hidden mt-0.5">
            <span className="tabular-nums">{formatBytes(file.size_bytes)}</span>
            <span>•</span>
            <span>{formatDate(file.created_at)}</span>
          </div>
        </div>
      </div>

      {/* Desktop Metadata: Size & Date */}
      <div className="hidden sm:flex items-center gap-6 text-[13px] text-[var(--foreground-secondary)] mr-4 shrink-0">
        <div className="w-20 text-right tabular-nums">
          {formatBytes(file.size_bytes)}
        </div>
        <div className="w-24 text-right text-[12px] text-[var(--foreground-muted)]">
          {formatDate(file.created_at)}
        </div>
        <div className="w-24 text-center">
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[var(--success)] bg-[var(--success-muted)] px-2 py-0.5 rounded-full border border-[var(--success)]/20">
            <ShieldCheck className="w-3 h-3" />
            2x Replicas
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-1 shrink-0">
        <button
          type="button"
          onClick={() => onDownload(file)}
          className="p-2 rounded-[6px] text-[var(--foreground-secondary)] hover:text-[var(--primary)] hover:bg-[var(--surface)] transition-colors cursor-pointer"
          title="Download file"
          aria-label={`Download ${file.original_name}`}
        >
          <Download className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => onDelete(file.id)}
          className="p-2 rounded-[6px] text-[var(--foreground-secondary)] hover:text-[var(--error)] hover:bg-[var(--error-muted)] transition-colors cursor-pointer"
          title="Delete file"
          aria-label={`Delete ${file.original_name}`}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
