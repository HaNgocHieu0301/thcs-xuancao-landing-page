import { Media } from './types';

export function getMediaUrl(media?: Media | null) {
  if (!media) return undefined;
  const baseUrl = process.env.NEXT_PUBLIC_CDN_URL ?? process.env.STRAPI_API_URL ?? '';
  if (media.url.startsWith('http')) return media.url;
  return `${baseUrl}${media.url}`;
}

export function getMediaAlt(media?: Media | null, fallback?: string) {
  if (!media) return fallback ?? '';
  return media.alternativeText ?? fallback ?? '';
}
