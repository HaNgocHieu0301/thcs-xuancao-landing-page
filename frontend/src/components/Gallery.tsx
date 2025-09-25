import Image from 'next/image';
import Link from 'next/link';
import type { Album } from '@/lib/types';
import { getMediaAlt, getMediaUrl } from '@/lib/image';

type GalleryProps = {
  items: Album[];
};

export default function Gallery({ items }: GalleryProps) {
  if (!items?.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 p-12 text-center text-slate-500">
        Bộ sưu tập hình ảnh đang được cập nhật.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-primary-600">Đời sống học đường</p>
          <h2 className="text-2xl font-bold text-slate-900">Khoảnh khắc Xuân Cao</h2>
        </div>
        <a className="text-sm font-semibold text-primary-600" href="/cuoc-song-hoc-duong">
          Xem tất cả →
        </a>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((album) => {
          const firstMedia = album.media?.[0];
          const imageUrl = getMediaUrl(firstMedia);
          return (
            <Link
              key={album.id}
              href={album.slug ? `/cuoc-song-hoc-duong/${album.slug}` : '/cuoc-song-hoc-duong'}
              className="group relative flex h-64 items-end overflow-hidden rounded-3xl bg-slate-200 p-6 text-white shadow-lg"
            >
              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt={getMediaAlt(firstMedia, album.title)}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-110"
                  sizes="(min-width: 1024px) 400px, 100vw"
                />
              )}
              <div className="relative z-10">
                <p className="text-lg font-semibold">{album.title}</p>
                {album.description && <p className="text-sm opacity-80">{album.description}</p>}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
