import { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import Card from '@/components/Card';
import { fetchEvents } from '@/lib/api';
import { formatDateRange } from '@/lib/utils';
import { buildSeoMetadata, buildBreadcrumbJsonLd } from '@/lib/seo';

export const revalidate = 1800;

export const metadata: Metadata = buildSeoMetadata(
  {
    metaTitle: 'Sự kiện - Trường THCS Xuân Cao',
    metaDescription: 'Theo dõi các sự kiện nổi bật tại Trường THCS Xuân Cao.',
  },
  {
    title: 'Sự kiện - Trường THCS Xuân Cao',
    description: 'Theo dõi các sự kiện nổi bật tại Trường THCS Xuân Cao.',
  },
);

type EventsPageProps = {
  searchParams: {
    page?: string;
  };
};

export default async function EventsPage({ searchParams }: EventsPageProps) {
  const page = Number(searchParams.page ?? '1') || 1;
  const eventsRes = await fetchEvents(page);
  const breadcrumbs = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Sự kiện', href: '/su-kien' },
  ];
  const jsonLd = buildBreadcrumbJsonLd(breadcrumbs);

  return (
    <div className="pb-16">
      <PageHeader
        title="Sự kiện"
        description="Lịch hoạt động, chương trình và sự kiện quan trọng của Trường THCS Xuân Cao."
        breadcrumbs={breadcrumbs}
      />
      <div className="container py-12">
        <div className="grid gap-6 md:grid-cols-2">
          {eventsRes.data.map((event) => (
            <Card
              key={event.id}
              href={`/su-kien/${event.slug}`}
              title={event.title}
              description={event.description}
              media={event.coverImage}
              meta={formatDateRange(event.startDate, event.endDate)}
            />
          ))}
        </div>
        <Pagination
          currentPage={eventsRes.meta.pagination?.page || 1}
          totalPages={eventsRes.meta.pagination?.pageCount || 1}
          basePath="/su-kien"
        />
      </div>
      <script type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify(jsonLd)}
      </script>
    </div>
  );
}

function Pagination({
  currentPage,
  totalPages,
  basePath,
}: {
  currentPage: number;
  totalPages: number;
  basePath: string;
}) {
  if (totalPages <= 1) return null;
  return (
    <div className="mt-12 flex items-center justify-center gap-4">
      {currentPage > 1 ? (
        <Link
          href={`${basePath}?page=${currentPage - 1}`}
          className="rounded-full border border-slate-300 px-4 py-2 text-sm text-slate-600 hover:border-primary-500 hover:text-primary-600"
        >
          ← Trang trước
        </Link>
      ) : (
        <span className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-400">← Trang trước</span>
      )}
      <span className="text-sm text-slate-600">
        Trang {currentPage} / {totalPages}
      </span>
      {currentPage < totalPages ? (
        <Link
          href={`${basePath}?page=${currentPage + 1}`}
          className="rounded-full border border-slate-300 px-4 py-2 text-sm text-slate-600 hover:border-primary-500 hover:text-primary-600"
        >
          Trang tiếp →
        </Link>
      ) : (
        <span className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-400">Trang tiếp →</span>
      )}
    </div>
  );
}
