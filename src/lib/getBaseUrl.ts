export function getBaseUrl() {
  if (typeof window !== "undefined") return ""; // client → relative
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  const port = process.env.PORT ?? "3001";     // dev default
  return `http://localhost:${port}`;
}
