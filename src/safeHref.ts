const SAFE_PROTOCOLS = new Set(["http:", "https:", "mailto:", "tel:"]);

/**
 * Returns the href if it uses a safe protocol or is a relative/fragment path,
 * otherwise returns `undefined`. In development, logs a warning for blocked
 * URLs so consumers can catch misuse early.
 */
export function safeHref(href: string): string | undefined {
  if (
    href.startsWith("#") ||
    href.startsWith("/") ||
    href.startsWith("./") ||
    href.startsWith("../")
  ) {
    return href;
  }

  try {
    const url = new URL(href, "http://x");
    if (SAFE_PROTOCOLS.has(url.protocol)) {
      return href;
    }
  } catch {
    // Malformed URL — block it.
  }

  if (import.meta.env?.DEV) {
    console.warn(
      `[@swecc/ui] Blocked unsafe href="${href}". ` +
        `Only http, https, mailto, tel, relative paths, and fragment links are allowed.`,
    );
  }
  return undefined;
}

/**
 * Returns rel with "noopener noreferrer" added when target="_blank" and no
 * rel was provided. Preserves any rel the consumer passes.
 */
export function safeRel(
  target: string | undefined,
  rel: string | undefined,
): string | undefined {
  if (target === "_blank" && rel === undefined) {
    return "noopener noreferrer";
  }
  return rel;
}
