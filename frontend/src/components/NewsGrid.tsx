import Card from './Card';
import type { Post } from '@/lib/types';
import { formatDate } from '@/lib/utils';

type NewsGridProps = {
  posts: Post[];
};

export default function NewsGrid({ posts }: NewsGridProps) {
  if (!posts?.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 p-12 text-center text-slate-500">
        Chưa có bài viết nào được xuất bản.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-primary-600">Tin tức</p>
          <h2 className="text-2xl font-bold text-slate-900">Nhịp sống Xuân Cao</h2>
        </div>
        <a className="text-sm font-semibold text-primary-600" href="/tin-tuc">
          Xem tất cả →
        </a>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => (
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
    </div>
  );
}
