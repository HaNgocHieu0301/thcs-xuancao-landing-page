export type MediaFormat = {
  url: string;
  alternativeText?: string | null;
  width?: number | null;
  height?: number | null;
};

export type Media = {
  id: number | string;
  url: string;
  alternativeText?: string | null;
  formats?: Record<string, MediaFormat>;
};

export type Seo = {
  metaTitle?: string | null;
  metaDescription?: string | null;
  ogImage?: Media | null;
  canonicalURL?: string | null;
};

export type HeroSlide = {
  id?: number | string;
  headline: string;
  subheadline?: string | null;
  media?: Media | null;
  primaryCta?: CTA | null;
  secondaryCta?: CTA | null;
  linkUrl?: string | null;
};

export type HeroBlock = HeroSlide | HeroSlide[];

export type CTA = {
  label: string;
  url: string;
};

export type Post = {
  id: number | string;
  title: string;
  slug: string;
  excerpt?: string | null;
  content?: string | null;
  coverImage?: Media | null;
  gallery?: Media[];
  publishedAt?: string | null;
  seo?: Seo | null;
};

export type Event = {
  id: number | string;
  title: string;
  slug: string;
  description?: string | null;
  startDate: string;
  endDate?: string | null;
  location?: string | null;
  coverImage?: Media | null;
  gallery?: Media[];
  rsvpLink?: string | null;
  seo?: Seo | null;
};

export type Teacher = {
  id: number | string;
  name: string;
  slug: string;
  position?: string | null;
  bio?: string | null;
  photo?: Media | null;
  achievements?: Achievement[];
  seo?: Seo | null;
};

export type Achievement = {
  id: number | string;
  title: string;
  slug: string;
  year?: number | null;
  level?: string | null;
  description?: string | null;
  images?: Media[];
  seo?: Seo | null;
};

export type Testimonial = {
  id: number | string;
  name: string;
  role?: string | null;
  quote: string;
  avatar?: Media | null;
  featured?: boolean;
};

export type Album = {
  id: number | string;
  title: string;
  slug: string;
  description?: string | null;
  media: Media[];
  seo?: Seo | null;
};

export type Announcement = {
  id: number | string;
  title: string;
  slug: string;
  content: string;
  pinned?: boolean;
  startDate?: string | null;
  endDate?: string | null;
  seo?: Seo | null;
};

export type HomePageData = {
  hero: HeroBlock;
  news: Post[];
  events: Event[];
  schoolLife: Album[];
  testimonials: Testimonial[];
  seo?: Seo | null;
};

export type AboutPage = {
  title: string;
  mission?: string | null;
  vision?: string | null;
  history?: string | null;
  stats?: StatItem[];
  seo?: Seo | null;
};

export type StatItem = {
  id: number | string;
  label: string;
  value: string;
};

export type ContactPage = {
  title: string;
  description?: string | null;
  address?: string | null;
  email?: string | null;
  phone?: string | null;
  mapEmbed?: string | null;
  formEndpoint?: string | null;
  seo?: Seo | null;
};

export type OrganizationProfile = {
  legalName: string;
  logo?: Media | null;
  foundingDate?: string | null;
  sameAs?: string[];
  seo?: Seo | null;
};

export type PaginatedResponse<T> = {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
};

export type BreadcrumbItem = {
  label: string;
  href: string;
};
