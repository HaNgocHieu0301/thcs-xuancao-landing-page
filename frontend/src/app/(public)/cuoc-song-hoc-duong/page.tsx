import PageHeader from '@/components/PageHeader';
import Gallery from '@/components/Gallery';
import { fetchAlbums } from '@/lib/api';
import { buildSeoMetadata, buildBreadcrumbJsonLd } from '@/lib/seo';
import { Metadata } from 'next';

export const revalidate = 1800;

export const metadata: Metadata = buildSeoMetadata(
  {
    metaTitle: 'Đời sống học đường - Trường THCS Xuân Cao',
    metaDescription: 'Hình ảnh, video ghi lại khoảnh khắc đáng nhớ của học sinh Trường THCS Xuân Cao.',
  },
  {
    title: 'Đời sống học đường - Trường THCS Xuân Cao',
    description: 'Hình ảnh, video ghi lại khoảnh khắc đáng nhớ của học sinh Trường THCS Xuân Cao.',
  },
);

export default async function SchoolLifePage() {
  const albumsRes = await fetchAlbums();
  const breadcrumbs = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Đời sống học đường', href: '/cuoc-song-hoc-duong' },
  ];
  const jsonLd = buildBreadcrumbJsonLd(breadcrumbs);
  return (
    <div className="pb-16">
      <PageHeader
        title="Đời sống học đường"
        description="Những khoảnh khắc đáng nhớ trong hành trình học tập và rèn luyện của học sinh."
        breadcrumbs={breadcrumbs}
      />
      <div className="container py-12">
        <Gallery items={albumsRes.data} />
      </div>
      <script type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify(jsonLd)}
      </script>
    </div>
  );
}
