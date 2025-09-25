import { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://thcs-abc.edu.vn';

export function GET(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: [`${SITE_URL}/sitemap.xml`],
    host: SITE_URL,
  };
}
