import PageHeader from '@/components/PageHeader';
import Card from '@/components/Card';
import { fetchAchievements } from '@/lib/api';
import { buildSeoMetadata, buildBreadcrumbJsonLd } from '@/lib/seo';
import { Metadata } from 'next';

export const revalidate = 3600;

export const metadata: Metadata = buildSeoMetadata(
  {
    metaTitle: 'Thành tích - Trường THCS Xuân Cao',
    metaDescription: 'Tự hào thành tích học sinh và giáo viên Trường THCS Xuân Cao.',
  },
  {
    title: 'Thành tích - Trường THCS Xuân Cao',
    description: 'Tự hào thành tích học sinh và giáo viên Trường THCS Xuân Cao.',
  },
);

export default async function AchievementsPage() {
  const achievementsRes = await fetchAchievements();
  const breadcrumbs = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Thành tích', href: '/thanh-tich' },
  ];
  const jsonLd = buildBreadcrumbJsonLd(breadcrumbs);
  return (
    <div className="pb-16">
      <PageHeader
        title="Thành tích nổi bật"
        description="Ghi dấu những thành tựu học thuật và hoạt động của thầy trò Xuân Cao."
        breadcrumbs={breadcrumbs}
      />
      <div className="container py-12">
        <div className="grid gap-6 md:grid-cols-2">
          {achievementsRes.data.map((achievement) => (
            <Card
              key={achievement.id}
              href={`/thanh-tich/${achievement.slug}`}
              title={achievement.title}
              description={achievement.description}
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
