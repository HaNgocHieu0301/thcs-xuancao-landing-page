import PageHeader from '@/components/PageHeader';
import ContactForm from '@/components/forms/ContactForm';
import RichText from '@/components/RichText';
import { fetchContactPage } from '@/lib/api';
import { buildSeoMetadata, buildBreadcrumbJsonLd } from '@/lib/seo';
import { Metadata } from 'next';

export const revalidate = 1800;

export async function generateMetadata(): Promise<Metadata> {
  const contact = await fetchContactPage();
  return buildSeoMetadata(contact.seo, {
    title: contact.title ?? 'Liên hệ',
    description: contact.description ?? undefined,
  });
}

export default async function ContactPage() {
  const contact = await fetchContactPage();
  const breadcrumbs = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Liên hệ', href: '/lien-he' },
  ];
  const jsonLd = buildBreadcrumbJsonLd(breadcrumbs);

  return (
    <div className="pb-16">
      <PageHeader
        title={contact.title ?? 'Liên hệ'}
        description={contact.description ?? 'Chúng tôi sẵn sàng đồng hành cùng bạn.'}
        breadcrumbs={breadcrumbs}
      />
      <div className="container grid gap-12 py-12 lg:grid-cols-[2fr,3fr]">
        <div className="space-y-6 rounded-3xl bg-primary-50 p-8">
          <h2 className="text-xl font-semibold text-slate-900">Thông tin liên hệ</h2>
          <ul className="space-y-3 text-sm text-slate-600">
            {contact.address && (
              <li>
                <span className="font-semibold text-slate-900">Địa chỉ:</span> {contact.address}
              </li>
            )}
            {contact.email && (
              <li>
                <span className="font-semibold text-slate-900">Email:</span>{' '}
                <a className="text-primary-600" href={`mailto:${contact.email}`}>
                  {contact.email}
                </a>
              </li>
            )}
            {contact.phone && (
              <li>
                <span className="font-semibold text-slate-900">Điện thoại:</span>{' '}
                <a className="text-primary-600" href={`tel:${contact.phone}`}>
                  {contact.phone}
                </a>
              </li>
            )}
          </ul>
          {contact.mapEmbed && <RichText html={contact.mapEmbed} />}
        </div>
        <ContactForm endpoint={contact.formEndpoint} />
      </div>
      <script type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify(jsonLd)}
      </script>
    </div>
  );
}
