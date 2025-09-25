import PageHeader from '@/components/PageHeader';
import RichText from '@/components/RichText';
import { fetchAboutPage } from '@/lib/api';
import { buildSeoMetadata, buildBreadcrumbJsonLd } from '@/lib/seo';
import { Metadata } from 'next';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const about = await fetchAboutPage();
  return buildSeoMetadata(about.seo, {
    title: about.title ?? 'Giới thiệu',
    description: 'Thông tin về sứ mệnh, tầm nhìn và lịch sử Trường THCS Xuân Cao.',
  });
}

export default async function AboutPage() {
  const about = await fetchAboutPage();
  const breadcrumbs = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Giới thiệu', href: '/gioi-thieu' },
  ];
  const jsonLd = buildBreadcrumbJsonLd(breadcrumbs);
  return (
    <div className="pb-16">
      <PageHeader
        title={about.title ?? 'Giới thiệu'}
        description="Khám phá sứ mệnh, tầm nhìn và câu chuyện phát triển của Trường THCS Xuân Cao."
        breadcrumbs={breadcrumbs}
      />
      <div className="container space-y-12 py-12">
        <section className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Sứ mệnh</h2>
            <RichText html={about.mission} />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Tầm nhìn</h2>
            <RichText html={about.vision} />
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">Lịch sử hình thành</h2>
          <div className="mt-4">
            <RichText html={about.history} />
          </div>
        </section>
        {about.stats && about.stats.length > 0 && (
          <section className="rounded-3xl bg-primary-50 p-8">
            <h2 className="text-2xl font-semibold text-slate-900">Những con số nổi bật</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {about.stats.map((stat) => (
                <div key={stat.id} className="rounded-2xl bg-white p-6 shadow">
                  <p className="text-3xl font-bold text-primary-600">{stat.value}</p>
                  <p className="mt-2 text-sm text-slate-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
      <script type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify(jsonLd)}
      </script>
    </div>
  );
}
