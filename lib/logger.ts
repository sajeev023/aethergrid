/**
 * AetherGrid Structured Production Logger
 * Enforces automatic secret and personal data redaction
 */

const REDACTED_KEYS = new Set([
  "password",
  "passwordhash",
  "password_hash",
  "token",
  "secret",
  "nodetoken",
  "node_token",
  "authorization",
  "cookie",
  "aether_session",
  "key",
  "privatekey",
  "creditcard",
]);

function redact(val: unknown, depth = 0): unknown {
  if (depth > 5 || val === null || val === undefined) return val;
  if (typeof val === "string") {
    // If it looks like a bearer token or secret
    if (val.startsWith("Bearer ") || val.startsWith("aeth_") || val.length > 64) {
      return `${val.substring(0, 8)}...[REDACTED]`;
    }
    return val;
  }
  if (Array.isArray(val)) {
    return val.map((item) => redact(item, depth + 1));
  }
  if (typeof val === "object") {
    const clean: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(val)) {
      const lower = k.toLowerCase().replace(/[-_]/g, "");
      if (REDACTED_KEYS.has(lower) || lower.includes("token") || lower.includes("secret") || lower.includes("pass")) {
        clean[k] = "[REDACTED]";
      } else {
        clean[k] = redact(v, depth + 1);
      }
    }
    return clean;
  }
  return val;
}

export const logger = {
  info: (message: string, context?: Record<string, unknown>) => {
    const entry = {
      timestamp: new Date().toISOString(),
      level: "INFO",
      message,
      ...(context ? { context: redact(context) } : {}),
    };
    console.log(JSON.stringify(entry));
  },
  warn: (message: string, context?: Record<string, unknown>) => {
    const entry = {
      timestamp: new Date().toISOString(),
      level: "WARN",
      message,
      ...(context ? { context: redact(context) } : {}),
    };
    console.warn(JSON.stringify(entry));
  },
  error: (message: string, context?: Record<string, unknown>) => {
    const entry = {
      timestamp: new Date().toISOString(),
      level: "ERROR",
      message,
      ...(context ? { context: redact(context) } : {}),
    };
    console.error(JSON.stringify(entry));
  },
  security: (event: string, context?: Record<string, unknown>) => {
    const entry = {
      timestamp: new Date().toISOString(),
      level: "SECURITY_ALERT",
      event,
      ...(context ? { context: redact(context) } : {}),
    };
    console.warn(JSON.stringify(entry));
  },
};
