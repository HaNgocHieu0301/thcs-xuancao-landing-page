import { notFound } from 'next/navigation';
import PageHeader from '@/components/PageHeader';
import RichText from '@/components/RichText';
import { fetchTeacherBySlug } from '@/lib/api';
import { buildSeoMetadata, buildBreadcrumbJsonLd } from '@/lib/seo';
import { Metadata } from 'next';

interface TeacherPageProps {
  params: { slug: string };
}

export const revalidate = 3600;

export async function generateMetadata({ params }: TeacherPageProps): Promise<Metadata> {
  const teacher = await fetchTeacherBySlug(params.slug);
  if (!teacher) return {};
  return buildSeoMetadata(teacher.seo, {
    title: `${teacher.name} - Đội ngũ Xuân Cao`,
    description: teacher.position ?? undefined,
  });
}

export default async function TeacherPage({ params }: TeacherPageProps) {
  const teacher = await fetchTeacherBySlug(params.slug);
  if (!teacher) notFound();

  const breadcrumbs = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Đội ngũ', href: '/doi-ngu' },
    { label: teacher.name, href: `/doi-ngu/${teacher.slug}` },
  ];
  const jsonLd = buildBreadcrumbJsonLd(breadcrumbs);

  return (
    <article className="pb-16">
      <PageHeader
        title={teacher.name}
        description={teacher.position}
        breadcrumbs={breadcrumbs}
      />
      <div className="container space-y-12 py-12">
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">Giới thiệu</h2>
          <div className="mt-4">
            <RichText html={teacher.bio} />
          </div>
        </section>
        {teacher.achievements && teacher.achievements.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold text-slate-900">Thành tích tiêu biểu</h2>
            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              {teacher.achievements.map((achievement) => (
                <div key={achievement.id} className="rounded-2xl border border-slate-200 p-6">
                  <h3 className="text-lg font-semibold text-primary-700">{achievement.title}</h3>
                  {achievement.year && (
                    <p className="text-sm text-slate-500">Năm: {achievement.year}</p>
                  )}
                  {achievement.level && (
                    <p className="text-sm text-slate-500">Cấp độ: {achievement.level}</p>
                  )}
                  {achievement.description && (
                    <p className="mt-2 text-sm text-slate-600">{achievement.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
      <script type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify(jsonLd)}
      </script>
    </article>
  );
}
