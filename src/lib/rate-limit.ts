/**
 * In-memory rate limiter (per-instance).
 * Use for API routes to throttle by IP. For multi-instance/serverless, consider Upstash Redis.
 */

type RateLimitEntry = { count: number; windowEnd: number }
const store = new Map<string, RateLimitEntry>()

/** Default: 5 requests per 15 minutes per key (e.g. per IP) */
const DEFAULT_MAX = 5
const DEFAULT_WINDOW_MS = 15 * 60 * 1000

/** Remove expired entries occasionally to avoid unbounded growth */
const CLEANUP_INTERVAL_MS = 60 * 1000
let lastCleanup = Date.now()

function maybeCleanup() {
  const now = Date.now()
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return
  lastCleanup = now
  for (const [key, data] of store.entries()) {
    if (data.windowEnd < now) store.delete(key)
  }
}

/**
 * Returns true if the request should be rate limited (caller should respond with 429).
 * Returns false if the request is allowed (and records this request).
 */
export function isRateLimited(
  key: string,
  options: { max?: number; windowMs?: number } = {}
): boolean {
  const max = options.max ?? DEFAULT_MAX
  const windowMs = options.windowMs ?? DEFAULT_WINDOW_MS
  const now = Date.now()

  maybeCleanup()

  let entry = store.get(key)
  if (!entry || now >= entry.windowEnd) {
    entry = { count: 1, windowEnd: now + windowMs }
    store.set(key, entry)
    return false
  }

  entry.count += 1
  if (entry.count > max) return true
  return false
}

/** Get client IP from request (Vercel/proxies set x-forwarded-for, x-real-ip). */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim()
    if (first) return first
  }
  const realIp = request.headers.get('x-real-ip')
  if (realIp) return realIp
  return 'unknown'
}
