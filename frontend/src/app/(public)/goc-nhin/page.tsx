import PageHeader from '@/components/PageHeader';
import Testimonials from '@/components/Testimonials';
import { fetchTestimonials } from '@/lib/api';
import { buildSeoMetadata, buildBreadcrumbJsonLd } from '@/lib/seo';
import { Metadata } from 'next';

export const revalidate = 3600;

export const metadata: Metadata = buildSeoMetadata(
  {
    metaTitle: 'Góc nhìn - Trường THCS Xuân Cao',
    metaDescription: 'Lắng nghe chia sẻ từ phụ huynh, học sinh và giáo viên Trường THCS Xuân Cao.',
  },
  {
    title: 'Góc nhìn - Trường THCS Xuân Cao',
    description: 'Lắng nghe chia sẻ từ phụ huynh, học sinh và giáo viên Trường THCS Xuân Cao.',
  },
);

export default async function TestimonialsPage() {
  const testimonials = await fetchTestimonials();
  const breadcrumbs = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Góc nhìn', href: '/goc-nhin' },
  ];
  const jsonLd = buildBreadcrumbJsonLd(breadcrumbs);
  return (
    <div className="pb-16">
      <PageHeader
        title="Góc nhìn từ cộng đồng"
        description="Những cảm nhận chân thành từ phụ huynh, học sinh và giáo viên Xuân Cao."
        breadcrumbs={breadcrumbs}
      />
      <div className="container py-12">
        <Testimonials testimonials={testimonials} />
      </div>
      <script type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify(jsonLd)}
      </script>
    </div>
  );
}
