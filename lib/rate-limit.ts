/**
 * AetherGrid Sliding-Window Rate Limiter
 * Provides abuse and brute-force mitigation without external dependencies.
 */

interface RateLimitRecord {
  timestamps: number[];
}

const rateLimitStore = new Map<string, RateLimitRecord>();

// Periodically clean up stale records every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of rateLimitStore.entries()) {
    record.timestamps = record.timestamps.filter((t) => now - t < 300000);
    if (record.timestamps.length === 0) {
      rateLimitStore.delete(key);
    }
  }
}, 300000);

export function checkRateLimit(
  identifier: string,
  maxRequests: number,
  windowSeconds: number
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const windowMs = windowSeconds * 1000;
  const threshold = now - windowMs;

  let record = rateLimitStore.get(identifier);
  if (!record) {
    record = { timestamps: [] };
    rateLimitStore.set(identifier, record);
  }

  // Remove timestamps outside the sliding window
  record.timestamps = record.timestamps.filter((t) => t > threshold);

  if (record.timestamps.length >= maxRequests) {
    const oldest = record.timestamps[0];
    const resetTime = Math.ceil((oldest + windowMs - now) / 1000);
    return {
      allowed: false,
      remaining: 0,
      resetTime: Math.max(1, resetTime),
    };
  }

  record.timestamps.push(now);
  return {
    allowed: true,
    remaining: maxRequests - record.timestamps.length,
    resetTime: windowSeconds,
  };
}
