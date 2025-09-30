import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import clsx from 'clsx';
import { fetchOrganizationProfile } from '@/lib/api';
import { absoluteUrl } from '@/lib/seo';

const font = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Trường THCS Xuân Cao',
  description:
    'Website chính thức của Trường THCS Xuân Cao - cập nhật tin tức, sự kiện và thành tích nổi bật.',
  metadataBase: new URL('https://thcs-abc.edu.vn'),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organization = await fetchOrganizationProfile();
  const organizationJsonLd = organization
    ? {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: organization.legalName,
        legalName: organization.legalName,
        url: absoluteUrl('/'),
        logo: organization.logo?.url ? absoluteUrl(organization.logo.url) : undefined,
        foundingDate: organization.foundingDate ?? undefined,
        sameAs: organization.sameAs ?? undefined,
      }
    : null;
  return (
    <html lang="vi" className={font.variable}>
      <body className={clsx(font.className, 'bg-slate-50 text-slate-900')}>
        <div className="flex min-h-screen flex-col">
          <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
            <div className="container flex h-16 items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-500 font-semibold text-white">
                  TH
                </span>
                <div>
                  <p className="text-sm font-medium uppercase tracking-wide text-primary-600">
                    Trường THCS
                  </p>
                  <p className="text-lg font-semibold text-slate-900">Xuân Cao</p>
                </div>
              </div>
              <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
                <a href="/">Trang chủ</a>
                <a href="/tin-tuc">Tin tức</a>
                <a href="/gioi-thieu">Giới thiệu</a>
                <a href="/doi-ngu">Đội ngũ</a>
                <a href="/thanh-tich">Thành tích</a>
                <a href="/cuoc-song-hoc-duong">Đời sống</a>
                <a href="/goc-nhin">Góc nhìn</a>
                <a href="/lien-he">Liên hệ</a>
              </nav>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t border-slate-200 bg-white py-12">
            <div className="container grid gap-8 md:grid-cols-3">
              <div>
                <p className="text-lg font-semibold text-slate-900">Trường THCS Xuân Cao</p>
                <p className="mt-2 text-sm text-slate-600">
                  Nơi nuôi dưỡng tri thức, phát triển toàn diện cho học sinh THCS.
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Liên hệ
                </p>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li>Email: info@thcs-abc.edu.vn</li>
                  <li>Điện thoại: (024) 1234 5678</li>
                  <li>Địa chỉ: Số 1 Xuân Cao, Thanh Hóa</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Kết nối
                </p>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li>
                    <a href="https://facebook.com" target="_blank" rel="noreferrer">
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a href="https://youtube.com" target="_blank" rel="noreferrer">
                      YouTube
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="container mt-8 border-t border-slate-200 pt-6 text-xs text-slate-500">
              © {new Date().getFullYear()} Trường THCS Xuân Cao. Bảo lưu mọi quyền.
            </div>
          </footer>
        </div>
        {organizationJsonLd && (
          <script type="application/ld+json" suppressHydrationWarning>
            {JSON.stringify(organizationJsonLd)}
          </script>
        )}
      </body>
    </html>
  );
}
