import Link from 'next/link';
import { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import Card from '@/components/Card';
import { fetchPosts } from '@/lib/api';
import { formatDate } from '@/lib/utils';
import { buildSeoMetadata, buildBreadcrumbJsonLd } from '@/lib/seo';

export const revalidate = 1800;

export const metadata: Metadata = buildSeoMetadata(
  {
    metaTitle: 'Tin tức - Trường THCS Xuân Cao',
    metaDescription: 'Cập nhật tin tức mới nhất về các hoạt động, thành tích của Trường THCS Xuân Cao.',
  },
  {
    title: 'Tin tức - Trường THCS Xuân Cao',
    description: 'Cập nhật tin tức mới nhất về các hoạt động, thành tích của Trường THCS Xuân Cao.',
  },
);

type NewsPageProps = {
  searchParams: {
    page?: string;
  };
};

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const page = Number(searchParams.page ?? '1') || 1;
  const postsRes = await fetchPosts(page);
  const breadcrumbs = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Tin tức', href: '/tin-tuc' },
  ];

  const jsonLd = buildBreadcrumbJsonLd(breadcrumbs);

  return (
    <div className="pb-16">
      <PageHeader
        title="Tin tức"
        description="Những câu chuyện, hoạt động và thông tin mới nhất từ Trường THCS Xuân Cao."
        breadcrumbs={breadcrumbs}
      />
      <div className="container py-12">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {postsRes.data.map((post) => (
            <Card
              key={post.id}
              href={`/tin-tuc/${post.slug}`}
              title={post.title}
              description={post.excerpt}
              media={post.coverImage}
              meta={post.publishedAt ? formatDate(post.publishedAt) : undefined}
            />
          ))}
        </div>
        <Pagination
          currentPage={postsRes.pagination.page}
          totalPages={postsRes.pagination.pageCount}
          basePath="/tin-tuc"
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
