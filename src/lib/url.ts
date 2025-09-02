export function withParams(
  url: string,
  query?: Record<string, string | number | boolean | null | undefined>
) {
  if (!query) return url;
  const usp = new URLSearchParams();
  for (const [k, v] of Object.entries(query)) {
    if (v === undefined || v === null || v === "") continue;
    usp.append(k, String(v));
  }
  const qs = usp.toString();
  return qs ? `${url}?${qs}` : url;
}
