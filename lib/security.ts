export function isValidExternalUrl(url: string): boolean {
  if (typeof url !== 'string') return false;
  const lowerUrl = url.toLowerCase();
  return lowerUrl.startsWith('http://') ||
         lowerUrl.startsWith('https://') ||
         lowerUrl.startsWith('data:image/');
}
