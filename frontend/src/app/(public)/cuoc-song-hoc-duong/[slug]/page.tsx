import { notFound } from 'next/navigation';
import Image from 'next/image';
import PageHeader from '@/components/PageHeader';
import { fetchAlbumBySlug } from '@/lib/api';
import { buildSeoMetadata, buildBreadcrumbJsonLd } from '@/lib/seo';
import { getMediaAlt, getMediaUrl } from '@/lib/image';
import { Metadata } from 'next';

interface AlbumPageProps {
  params: { slug: string };
}

export const revalidate = 3600;

export async function generateMetadata({ params }: AlbumPageProps): Promise<Metadata> {
  const album = await fetchAlbumBySlug(params.slug);
  if (!album) return {};
  return buildSeoMetadata(album.seo, {
    title: `${album.title} - Đời sống học đường`,
    description: album.description ?? undefined,
  });
}

export default async function AlbumPage({ params }: AlbumPageProps) {
  const album = await fetchAlbumBySlug(params.slug);
  if (!album) notFound();

  const breadcrumbs = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Đời sống học đường', href: '/cuoc-song-hoc-duong' },
    { label: album.title, href: `/cuoc-song-hoc-duong/${album.slug}` },
  ];
  const jsonLd = buildBreadcrumbJsonLd(breadcrumbs);

  return (
    <article className="pb-16">
      <PageHeader
        title={album.title}
        description={album.description}
        breadcrumbs={breadcrumbs}
      />
      <div className="container py-12">
        <div className="grid gap-4 md:grid-cols-2">
          {album.media?.map((media) => {
            const url = getMediaUrl(media);
            if (!url) return null;
            return (
              <div key={media.id} className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                <Image
                  src={url}
                  alt={getMediaAlt(media, album.title)}
                  fill
                  className="object-cover"
                />
              </div>
            );
          })}
        </div>
      </div>
      <script type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify(jsonLd)}
      </script>
    </article>
  );
}
