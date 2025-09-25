import { notFound } from 'next/navigation';
import PageHeader from '@/components/PageHeader';
import RichText from '@/components/RichText';
import { fetchAchievementBySlug } from '@/lib/api';
import { buildSeoMetadata, buildBreadcrumbJsonLd } from '@/lib/seo';
import { Metadata } from 'next';

interface AchievementPageProps {
  params: { slug: string };
}

export const revalidate = 3600;

export async function generateMetadata({ params }: AchievementPageProps): Promise<Metadata> {
  const achievement = await fetchAchievementBySlug(params.slug);
  if (!achievement) return {};
  return buildSeoMetadata(achievement.seo, {
    title: `${achievement.title} - Thành tích Xuân Cao`,
    description: achievement.description ?? undefined,
  });
}

export default async function AchievementPage({ params }: AchievementPageProps) {
  const achievement = await fetchAchievementBySlug(params.slug);
  if (!achievement) notFound();

  const breadcrumbs = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Thành tích', href: '/thanh-tich' },
    { label: achievement.title, href: `/thanh-tich/${achievement.slug}` },
  ];
  const jsonLd = buildBreadcrumbJsonLd(breadcrumbs);

  return (
    <article className="pb-16">
      <PageHeader
        title={achievement.title}
        description={achievement.level}
        breadcrumbs={breadcrumbs}
      />
      <div className="container space-y-6 py-12">
        {achievement.year && <p className="text-sm text-slate-500">Năm: {achievement.year}</p>}
        <RichText html={achievement.description} />
      </div>
      <script type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify(jsonLd)}
      </script>
    </article>
  );
}
