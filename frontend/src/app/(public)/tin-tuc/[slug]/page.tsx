import { notFound } from 'next/navigation';
import PageHeader from '@/components/PageHeader';
import RichText from '@/components/RichText';
import { fetchPostBySlug } from '@/lib/api';
import { buildArticleJsonLd, buildArticleMetadata, buildBreadcrumbJsonLd } from '@/lib/seo';
import { formatDate } from '@/lib/utils';

interface PostPageProps {
  params: { slug: string };
}

export const revalidate = 3600;

export async function generateMetadata({ params }: PostPageProps) {
  const post = await fetchPostBySlug(params.slug);
  if (!post) return {};
  return buildArticleMetadata(post);
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await fetchPostBySlug(params.slug);
  if (!post) notFound();

  const breadcrumbs = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Tin tức', href: '/tin-tuc' },
    { label: post.title, href: `/tin-tuc/${post.slug}` },
  ];

  const jsonLd = buildBreadcrumbJsonLd(breadcrumbs);
  const articleJsonLd = buildArticleJsonLd(post);

  return (
    <article className="pb-16">
      <PageHeader
        title={post.title}
        description={post.excerpt}
        breadcrumbs={breadcrumbs}
        actions={
          post.publishedAt && (
            <p className="text-sm text-slate-500">Cập nhật: {formatDate(post.publishedAt)}</p>
          )
        }
      />
      <div className="container py-12">
        <RichText html={post.content} />
      </div>
      <script type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify(jsonLd)}
      </script>
      <script type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify(articleJsonLd)}
      </script>
    </article>
  );
}
