import type { Metadata } from 'next';
import { Post, Seo, HomePageData, BreadcrumbItem } from './types';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://thcs-abc.edu.vn';

export function buildSeoMetadata(
  seo: Seo | null | undefined,
  defaults: Partial<Metadata> = {},
): Metadata {
  const metaTitle = seo?.metaTitle ?? (defaults.title as string | undefined);
  const metaDescription = seo?.metaDescription ??
    (typeof defaults.description === 'string' ? defaults.description : undefined);

  const images = seo?.ogImage?.url
    ? [{ url: absoluteUrl(seo.ogImage.url), alt: seo.ogImage.alternativeText ?? metaTitle }]
    : undefined;

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: {
      canonical: seo?.canonicalURL ?? defaults.alternates?.canonical ?? SITE_URL,
    },
    openGraph: {
      type: 'website',
      title: metaTitle,
      description: metaDescription,
      url: seo?.canonicalURL ?? defaults?.openGraph?.url ?? SITE_URL,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle ?? undefined,
      description: metaDescription ?? undefined,
      images,
    },
  } satisfies Metadata;
}

export function buildArticleMetadata(post: Post): Metadata {
  return {
    ...buildSeoMetadata(post.seo, {
      title: post.title,
      description: post.excerpt ?? undefined,
      openGraph: {
        type: 'article',
        url: `${SITE_URL}/tin-tuc/${post.slug}`,
      },
    }),
    other: {
      'script:type': 'application/ld+json',
    },
  } satisfies Metadata;
}

export function buildHomeMetadata(home: HomePageData): Metadata {
  return buildSeoMetadata(home.seo, {
    title: 'Trường THCS Xuân Cao',
    description: 'Website chính thức của Trường THCS Xuân Cao.',
  });
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: absoluteUrl(item.href),
    })),
  };
}

export function buildArticleJsonLd(post: Post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: post.title,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    image: post.coverImage?.url ? [absoluteUrl(post.coverImage.url)] : undefined,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/tin-tuc/${post.slug}`,
    },
  };
}

export function absoluteUrl(path: string) {
  if (!path) return SITE_URL;
  if (path.startsWith('http')) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}
