export function isValidExternalUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url);
    return ['http:', 'https:', 'data:'].includes(parsedUrl.protocol);
  } catch {
    return false;
  }
}
