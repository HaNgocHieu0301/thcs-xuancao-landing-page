import type { Testimonial } from '@/lib/types';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  if (!testimonials?.length) {
    return (
      <div className="rounded-2xl border border-dashed border-primary-200 bg-white p-12 text-center text-slate-500">
        Góc nhìn từ phụ huynh và học sinh đang được cập nhật.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-primary-600">Góc nhìn</p>
          <h2 className="text-2xl font-bold text-slate-900">Chia sẻ từ cộng đồng</h2>
        </div>
        <a className="text-sm font-semibold text-primary-600" href="/goc-nhin">
          Xem tất cả →
        </a>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {testimonials.map((testimonial) => (
          <article
            key={testimonial.id}
            className="h-full rounded-3xl border border-white bg-white p-8 shadow-lg shadow-primary-200/40"
          >
            <p className="text-lg font-medium text-slate-900">“{testimonial.quote}”</p>
            <div className="mt-6">
              <p className="text-sm font-semibold text-primary-700">{testimonial.name}</p>
              {testimonial.role && <p className="text-sm text-slate-500">{testimonial.role}</p>}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
