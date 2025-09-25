'use client';

import Image from 'next/image';
import Link from 'next/link';
import { HeroBlock } from '@/lib/types';
import { getMediaUrl, getMediaAlt } from '@/lib/image';

type HeroProps = {
  data: HeroBlock;
};

export default function Hero({ data }: HeroProps) {
  const mediaUrl = getMediaUrl(data.media);
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-white">
      <div className="container grid gap-10 py-16 md:grid-cols-2 md:items-center lg:py-24">
        <div className="space-y-6">
          <span className="inline-flex items-center rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-700">
            Ngôi trường hạnh phúc
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            {data.headline}
          </h1>
          {data.subheadline && <p className="text-lg text-slate-600">{data.subheadline}</p>}
          <div className="flex flex-wrap gap-4">
            {data.primaryCta && (
              <Link
                href={data.primaryCta.url}
                className="rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-600/40 transition hover:bg-primary-700"
              >
                {data.primaryCta.label}
              </Link>
            )}
            {data.secondaryCta && (
              <Link
                href={data.secondaryCta.url}
                className="rounded-full border border-primary-600 px-6 py-3 text-sm font-semibold text-primary-600 transition hover:bg-primary-50"
              >
                {data.secondaryCta.label}
              </Link>
            )}
          </div>
        </div>
        <div className="relative">
          {mediaUrl ? (
            <Image
              src={mediaUrl}
              alt={getMediaAlt(data.media, data.headline)}
              width={640}
              height={640}
              className="w-full rounded-3xl object-cover shadow-xl"
              priority
            />
          ) : (
            <div className="flex h-full min-h-[320px] items-center justify-center rounded-3xl bg-primary-100 text-primary-700">
              <p className="text-lg font-semibold">Hình ảnh Trường THCS Xuân Cao</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
