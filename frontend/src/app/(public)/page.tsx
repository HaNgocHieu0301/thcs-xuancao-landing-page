import { Metadata } from 'next';
import Hero from '@/components/Hero';
import NewsGrid from '@/components/NewsGrid';
import Gallery from '@/components/Gallery';
import Testimonials from '@/components/Testimonials';
import { fetchHomePage } from '@/lib/api';
import { buildHomeMetadata } from '@/lib/seo';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchHomePage();
  return buildHomeMetadata(data);
}

export default async function HomePage() {
  const data = await fetchHomePage();
  return (
    <div className="space-y-16 pb-16">
      <Hero data={data.hero} />
      <section className="container">
        <NewsGrid posts={data.news} />
      </section>
      <section className="container">
        <Gallery items={data.schoolLife} />
      </section>
      <section className="bg-primary-50 py-16">
        <div className="container">
          <Testimonials testimonials={data.testimonials} />
        </div>
      </section>
    </div>
  );
}
