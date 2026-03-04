export function isValidExternalUrl(url: string | undefined): boolean {
  if (!url) return false;
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:image/')) {
    return true;
  }
  return false;
}
