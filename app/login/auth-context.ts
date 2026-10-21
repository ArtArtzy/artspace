// The local Book reading page is the mock destination until its home URL is configured.
export function authContext(params: Record<string, string | string[] | undefined>) {
  const source = params.from === "arnbook" ? "arnbook" : "arnspace";
  const fallback = source === "arnbook" ? process.env.ARNBOOK_HOME_URL || "/read" : "/";
  const requested = typeof params.returnTo === "string" ? params.returnTo : "";
  // Only allow local paths; external product homes are deployment configuration.
  const home = /^\/(?![\/\\])/.test(requested) && !/[\\\x00-\x20]/.test(requested) && !requested.split("?")[0].startsWith("/login") ? requested : fallback;
  return { source, home } as const;
}
