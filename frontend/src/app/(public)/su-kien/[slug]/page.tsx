import { notFound } from 'next/navigation';
import PageHeader from '@/components/PageHeader';
import RichText from '@/components/RichText';
import { fetchEventBySlug } from '@/lib/api';
import { buildEventMetadata, buildEventJsonLd, buildBreadcrumbJsonLd } from '@/lib/seo';
import { formatDateRange } from '@/lib/utils';

interface EventPageProps {
  params: { slug: string };
}

export const revalidate = 1800;

export async function generateMetadata({ params }: EventPageProps) {
  const event = await fetchEventBySlug(params.slug);
  if (!event) return {};
  return buildEventMetadata(event);
}

export default async function EventPage({ params }: EventPageProps) {
  const event = await fetchEventBySlug(params.slug);
  if (!event) notFound();

  const breadcrumbs = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Sự kiện', href: '/su-kien' },
    { label: event.title, href: `/su-kien/${event.slug}` },
  ];

  const jsonLd = buildBreadcrumbJsonLd(breadcrumbs);
  const eventJsonLd = buildEventJsonLd(event);

  return (
    <article className="pb-16">
      <PageHeader
        title={event.title}
        description={event.description}
        breadcrumbs={breadcrumbs}
        actions={
          <p className="text-sm text-slate-500">{formatDateRange(event.startDate, event.endDate)}</p>
        }
      />
      <div className="container space-y-8 py-12">
        <RichText html={event.description} />
        {event.rsvpLink && (
          <a
            href={event.rsvpLink}
            className="inline-flex items-center rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-primary-700"
          >
            Đăng ký tham gia
          </a>
        )}
      </div>
      <script type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify(jsonLd)}
      </script>
      <script type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify(eventJsonLd)}
      </script>
    </article>
  );
}
