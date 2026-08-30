type RateLimitEntry = { count: number; resetsAt: number };

const globalForRateLimit = globalThis as typeof globalThis & {
  memoriesGalleryRateLimits?: Map<string, RateLimitEntry>;
};

const rateLimits = globalForRateLimit.memoriesGalleryRateLimits ??= new Map<string, RateLimitEntry>();

export function getClientAddress(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-real-ip")?.trim()
    || "local";
}

export function consumeRateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const current = rateLimits.get(key);
  if (!current || current.resetsAt <= now) {
    rateLimits.set(key, { count: 1, resetsAt: now + windowMs });
    return { allowed: true, retryAfter: 0 };
  }
  if (current.count >= limit) {
    return { allowed: false, retryAfter: Math.ceil((current.resetsAt - now) / 1000) };
  }
  current.count += 1;
  return { allowed: true, retryAfter: 0 };
}
