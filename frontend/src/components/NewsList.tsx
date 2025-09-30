import Link from 'next/link';
import Image from 'next/image';
import type { Post } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { getMediaUrl } from '@/lib/image';

type NewsListProps = {
  posts: Post[];
};

export default function NewsList({ posts }: NewsListProps) {
  if (!posts?.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 p-12 text-center text-slate-500">
        Chưa có bài viết nào được xuất bản.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => {
        const imageUrl = getMediaUrl(post.coverImage);

        return (
          <Link
            key={post.id}
            href={`/tin-tuc/${post.slug}`}
            className="flex gap-4 p-4 rounded-lg border border-slate-200 hover:border-primary-300 hover:shadow-md transition-all group bg-white"
          >
            {/* Thumbnail */}
            <div className="flex-shrink-0 w-32 h-24 md:w-40 md:h-28 relative rounded overflow-hidden bg-slate-100">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 128px, 160px"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-slate-400 text-xs">
                  Không có ảnh
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 flex flex-col">
              <h3 className="text-base md:text-lg font-semibold text-slate-900 group-hover:text-primary-600 transition-colors line-clamp-2 mb-1">
                {post.title}
              </h3>

              {/* Meta info */}
              <p className="text-xs text-slate-500 mb-2">
                Đăng lúc:
                {post.publishedAt && (
                  <>
                    {formatDate(post.publishedAt)}
                  </>
                )}
                {post.excerpt && (
                  <>
                    {' | '}
                    <span className="font-medium">{post.excerpt.split(' ').length} Lượt xem</span>
                  </>
                )}
              </p>

              {/* Content Preview */}
              {(post.content || post.excerpt) && (
                <p className="text-sm text-slate-600 line-clamp-2 mb-2 flex-1">
                  {post.content ?
                    post.content.replace(/<[^>]*>/g, '').substring(0, 200) :
                    post.excerpt
                  }
                </p>
              )}

              {/* Read more link */}
              <div className="flex justify-end">
                <span className="text-sm text-primary-600 font-medium hover:underline">
                  [Xem thêm]
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}