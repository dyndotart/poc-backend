export type ImageFormat = 'png' | 'jpeg';

export function getImageType(imageParam: string): ImageFormat | null {
  if (imageParam === 'png') {
    return 'png';
  }
  if (imageParam === 'jpeg' || imageParam === 'jpg') {
    return 'jpeg';
  }
  return null;
}

export function getMimeType(imageFormat: ImageFormat): string {
  const mimeTypeKeymap: Record<string, string> = {
    jpeg: 'image/jpeg',
    png: 'image/png',
  };
  return mimeTypeKeymap[imageFormat];
}
