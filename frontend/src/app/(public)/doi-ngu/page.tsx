import PageHeader from '@/components/PageHeader';
import Card from '@/components/Card';
import { fetchTeachers } from '@/lib/api';
import { buildSeoMetadata, buildBreadcrumbJsonLd } from '@/lib/seo';
import { Metadata } from 'next';

export const revalidate = 1800;

export const metadata: Metadata = buildSeoMetadata(
  {
    metaTitle: 'Đội ngũ - Trường THCS Xuân Cao',
    metaDescription: 'Gặp gỡ đội ngũ giáo viên và cán bộ tận tâm của Trường THCS Xuân Cao.',
  },
  {
    title: 'Đội ngũ - Trường THCS Xuân Cao',
    description: 'Gặp gỡ đội ngũ giáo viên và cán bộ tận tâm của Trường THCS Xuân Cao.',
  },
);

export default async function TeachersPage() {
  const teachersRes = await fetchTeachers();
  const breadcrumbs = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Đội ngũ', href: '/doi-ngu' },
  ];
  const jsonLd = buildBreadcrumbJsonLd(breadcrumbs);
  return (
    <div className="pb-16">
      <PageHeader
        title="Đội ngũ giáo viên"
        description="Những nhà giáo giàu kinh nghiệm, tận tâm đồng hành cùng học sinh."
        breadcrumbs={breadcrumbs}
      />
      <div className="container py-12">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {teachersRes.data.map((teacher) => (
            <Card
              key={teacher.id}
              href={`/doi-ngu/${teacher.slug}`}
              title={teacher.name}
              description={teacher.position}
              media={teacher.photo}
            />
          ))}
        </div>
      </div>
      <script type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify(jsonLd)}
      </script>
    </div>
  );
}
