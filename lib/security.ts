// Security utilities

/**
 * Validates if an external URL is safe to fetch or process.
 * Prevents SSRF and malicious protocol injections.
 * Allowed protocols: http, https, data
 *
 * @param url The URL string to validate
 * @returns boolean True if the URL is considered safe
 */
export function isValidExternalUrl(url: string | undefined | null): boolean {
  if (!url || typeof url !== 'string') {
    return false;
  }

  // Quick check for allowed protocols
  const isHttp = url.startsWith('http://');
  const isHttps = url.startsWith('https://');
  const isDataImage = url.startsWith('data:image/');

  if (!isHttp && !isHttps && !isDataImage) {
    return false;
  }

  // For HTTP/HTTPS, parse the URL to perform more checks if needed
  if (isHttp || isHttps) {
    try {
      const parsedUrl = new URL(url);

      // Ensure protocol is exactly http: or https:
      if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
        return false;
      }

      // Basic protection against localhost/internal SSRF
      // NOTE: In a full production app, you might want to resolve IPs and block private ranges (10.x, 192.168.x, 127.x)
      const hostname = parsedUrl.hostname.toLowerCase();
      if (
        hostname === 'localhost' ||
        hostname === '127.0.0.1' ||
        hostname === '::1' ||
        hostname.endsWith('.local') ||
        hostname.includes('internal')
      ) {
        return false;
      }

      return true;
    } catch {
      // If URL parsing fails, it's malformed
      return false;
    }
  }

  // If it's a data URI, it must be data:image/
  return isDataImage;
}
