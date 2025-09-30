import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import { getMediaAlt, getMediaUrl } from '@/lib/image';
import { Media } from '@/lib/types';

type CardProps = {
  href: string;
  title: string;
  description?: string | null;
  media?: Media | null;
  meta?: string | null;
  className?: string;
};

export default function Card({ href, title, description, media, meta, className }: CardProps) {
  const imageUrl = getMediaUrl(media);
  return (
    <Link
      href={href}
      className={clsx(
        'group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg',
        className,
      )}
    >
      {imageUrl && (
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={getMediaAlt(media, title)}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(min-width: 1024px) 400px, 100vw"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-3 p-6">
        {meta && <span className="text-xs font-semibold uppercase tracking-wide text-primary-600">{meta}</span>}
        <h3 className="text-lg font-semibold text-slate-900 group-hover:text-primary-600">{title}</h3>
        {description && <p className="text-sm text-slate-600">{description}</p>}
      </div>
    </Link>
  );
}
