import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { registerStorageNode } from "@/lib/db";
import { logger } from "@/lib/logger";
import crypto from "crypto";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const session = await getCurrentUser(request);
    if (!session) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const body = await request.json();
    const { nodeName, capacityGb, storageDirectory } = body;

    const capacityNum = parseInt(capacityGb || "20", 10);
    if (isNaN(capacityNum) || capacityNum < 1) {
      return NextResponse.json({ error: "Capacity must be at least 1 GB." }, { status: 400 });
    }

    const nodeId = `node_${crypto.randomBytes(6).toString("hex")}`;
    const rawToken = `aeth_node_${crypto.randomBytes(16).toString("hex")}`;
    const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");

    // Validate storage directory to prevent host filesystem and system folder compromises
    let resolvedDir: string;
    if (storageDirectory) {
      if (typeof storageDirectory !== "string") {
        return NextResponse.json({ error: "Invalid storage directory format." }, { status: 400 });
      }

      // Block UNC and device paths
      if (/^[\\/]{2}/.test(storageDirectory) || /^[\\/]{2}\?/.test(storageDirectory) || /^[\\/]{2}\./.test(storageDirectory)) {
        logger.security("Node registration UNC/Device path attempt rejected", { storageDirectory, userId: session.userId });
        return NextResponse.json({ error: "Security Violation: UNC and device paths are strictly forbidden." }, { status: 400 });
      }

      const normalized = path.resolve(storageDirectory);
      const lower = normalized.toLowerCase();

      // Block root drives and critical Windows system directories
      if (/^[a-zA-Z]:[\\/]?$/.test(normalized) || 
          lower.includes("\\windows") || 
          lower.includes("\\program files") || 
          lower.includes("\\appdata") || 
          lower.includes("\\.ssh") || 
          lower.includes("\\.env") ||
          lower.includes("\\system32")) {
        logger.security("Node registration attempted inside sensitive OS directory", { storageDirectory, userId: session.userId });
        return NextResponse.json({ error: "Security Violation: Storage directory cannot be placed inside operating system or user profile directories." }, { status: 403 });
      }

      // Non-admins can only provision within the app data tree or dedicated external drives (e.g., D:\)
      if (!session.roles.includes("ADMIN")) {
        const defaultRoot = path.resolve(process.cwd(), "data", "nodes");
        const dedicatedRoot = process.env.AETHERGRID_NODE_STORAGE_PATH ? path.resolve(process.env.AETHERGRID_NODE_STORAGE_PATH) : "D:\\AetherGridStorage";
        const isUnderDefault = normalized.startsWith(defaultRoot);
        const isUnderDedicated = normalized.startsWith(dedicatedRoot);

        if (!isUnderDefault && !isUnderDedicated) {
          logger.security("Non-admin node registration attempted outside approved storage trees", { storageDirectory, userId: session.userId });
          return NextResponse.json({ error: "Security Violation: Non-administrator nodes must be sandboxed within approved storage locations." }, { status: 403 });
        }
      }

      resolvedDir = normalized;
    } else {
      resolvedDir = path.resolve(process.cwd(), "data", "nodes", nodeId);
    }

    const node = registerStorageNode({
      id: nodeId,
      ownerId: session.userId,
      nodeName: nodeName || `Node-${nodeId.slice(-4).toUpperCase()}`,
      nodeTokenHash: tokenHash,
      capacityBytes: BigInt(capacityNum) * BigInt(1024) * BigInt(1024) * BigInt(1024),
      storageDirectory: resolvedDir,
      endpoint: "http://localhost:3000",
    });

    const cliCommand = `node node-client/node-daemon.mjs --token "${rawToken}" --capacity ${capacityNum} --dir "${resolvedDir}"`;

    return NextResponse.json({
      success: true,
      node,
      token: rawToken,
      cliCommand,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to register node" }, { status: 500 });
  }
}
