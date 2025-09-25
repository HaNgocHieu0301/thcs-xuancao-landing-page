import 'server-only';

import type {
  Album,
  Event,
  HomePageData,
  PaginatedResponse,
  Post,
  Teacher,
  Testimonial,
  Achievement,
  Announcement,
  AboutPage,
  ContactPage,
  OrganizationProfile,
} from './types';

const STRAPI_API_URL = process.env.STRAPI_API_URL;
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

async function fetchFromStrapi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const normalized = endpoint.startsWith('/api')
    ? endpoint
    : `/api${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  if (!STRAPI_API_URL) {
    return fallbackData(normalized) as T;
  }

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (STRAPI_API_TOKEN) {
    headers.Authorization = `Bearer ${STRAPI_API_TOKEN}`;
  }

  const res = await fetch(`${STRAPI_API_URL}${normalized}`, {
    ...options,
    headers,
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    console.error(`Strapi request failed: ${res.status} ${res.statusText}`);
    return fallbackData(normalized) as T;
  }

  return res.json();
}

function fallbackData(endpoint: string): unknown {
  switch (true) {
    case endpoint.includes('/homepage'):
      return {
        hero: {
          headline: 'Khơi nguồn tri thức, nuôi dưỡng tương lai',
          subheadline:
            'Trường THCS Xuân Cao đồng hành cùng học sinh trên hành trình khám phá và phát triển toàn diện.',
          primaryCta: { label: 'Tìm hiểu thêm', url: '/gioi-thieu' },
          secondaryCta: { label: 'Đăng ký tham quan', url: '/lien-he' },
        },
        news: samplePosts,
        events: sampleEvents,
        schoolLife: sampleAlbums,
        testimonials: sampleTestimonials,
      } satisfies HomePageData;
    case endpoint.includes('/posts'):
      return {
        data: samplePosts,
        pagination: {
          page: 1,
          pageSize: samplePosts.length,
          pageCount: 1,
          total: samplePosts.length,
        },
      } satisfies PaginatedResponse<Post>;
    case endpoint.includes('/events'):
      return {
        data: sampleEvents,
        pagination: {
          page: 1,
          pageSize: sampleEvents.length,
          pageCount: 1,
          total: sampleEvents.length,
        },
      } satisfies PaginatedResponse<Event>;
    case endpoint.includes('/teachers'):
      return {
        data: sampleTeachers,
        pagination: {
          page: 1,
          pageSize: sampleTeachers.length,
          pageCount: 1,
          total: sampleTeachers.length,
        },
      } satisfies PaginatedResponse<Teacher>;
    case endpoint.includes('/achievements'):
      return {
        data: sampleAchievements,
        pagination: {
          page: 1,
          pageSize: sampleAchievements.length,
          pageCount: 1,
          total: sampleAchievements.length,
        },
      } satisfies PaginatedResponse<Achievement>;
    case endpoint.includes('/testimonials'):
      return {
        data: sampleTestimonials,
        pagination: {
          page: 1,
          pageSize: sampleTestimonials.length,
          pageCount: 1,
          total: sampleTestimonials.length,
        },
      } satisfies PaginatedResponse<Testimonial>;
    case endpoint.includes('/albums'):
      return {
        data: sampleAlbums,
        pagination: {
          page: 1,
          pageSize: sampleAlbums.length,
          pageCount: 1,
          total: sampleAlbums.length,
        },
      } satisfies PaginatedResponse<Album>;
    case endpoint.includes('/about'):
      return sampleAbout;
    case endpoint.includes('/contact'):
      return sampleContact;
    case endpoint.includes('/organization'):
      return sampleOrganization;
    default:
      return { data: [] };
  }
}

const samplePosts: Post[] = [
  {
    id: 1,
    title: 'Lễ khai giảng năm học 2024-2025',
    slug: 'le-khai-giang-2024-2025',
    excerpt: 'Không khí rộn ràng của lễ khai giảng tại Trường THCS Xuân Cao.',
    publishedAt: '2024-09-05T08:00:00.000Z',
  },
  {
    id: 2,
    title: 'Học sinh Xuân Cao đạt giải Nhất Toán học cấp tỉnh',
    slug: 'hoc-sinh-dat-giai-nhat-toan-cap-tinh',
    excerpt: 'Thành tích nổi bật của em Nguyễn Minh Anh trong kỳ thi HSG Toán.',
    publishedAt: '2024-04-12T08:00:00.000Z',
  },
  {
    id: 3,
    title: 'Chuỗi hoạt động trải nghiệm STEM 2024',
    slug: 'chuoi-hoat-dong-trai-nghiem-stem-2024',
    excerpt: 'Học sinh hào hứng tham gia các dự án STEM sáng tạo.',
    publishedAt: '2024-03-21T08:00:00.000Z',
  },
];

const sampleEvents: Event[] = [
  {
    id: 1,
    title: 'Ngày hội Khoa học Sáng tạo',
    slug: 'ngay-hoi-khoa-hoc-sang-tao',
    description:
      'Ngày hội trình diễn các dự án khoa học của học sinh toàn trường, kết nối phụ huynh và cộng đồng.',
    startDate: '2024-11-10T01:00:00.000Z',
    endDate: '2024-11-10T08:00:00.000Z',
    location: 'Khuôn viên trường THCS Xuân Cao',
  },
  {
    id: 2,
    title: 'Hội thảo định hướng nghề nghiệp',
    slug: 'hoi-thao-dinh-huong-nghe-nghiep',
    description:
      'Chuyên gia chia sẻ về kỹ năng tương lai và lựa chọn định hướng học tập cho học sinh lớp 9.',
    startDate: '2024-10-02T02:00:00.000Z',
    location: 'Phòng đa năng, Trường THCS Xuân Cao',
  },
];

const sampleAlbums: Album[] = [
  {
    id: 1,
    title: 'Khoảnh khắc Xuân Cao',
    slug: 'khoanh-khac-xuan-cao',
    description: 'Những hình ảnh đời sống học đường rực rỡ sắc màu.',
    media: [],
  },
];

const sampleTestimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Nguyễn Thu Hà',
    role: 'Phụ huynh học sinh lớp 8A1',
    quote:
      'Xuân Cao là môi trường học tập hiện đại, tận tâm giúp con tôi phát huy năng lực và tự tin.',
  },
];

const sampleTeachers: Teacher[] = [
  {
    id: 1,
    name: 'Thầy Trần Minh Quang',
    slug: 'tran-minh-quang',
    position: 'Hiệu trưởng',
    bio: 'Hơn 15 năm kinh nghiệm quản lý giáo dục với định hướng đổi mới sáng tạo.',
  },
];

const sampleAchievements: Achievement[] = [
  {
    id: 1,
    title: 'Giải Nhất Toán học cấp Tỉnh 2024',
    slug: 'giai-nhat-toan-cap-tinh-2024',
    year: 2024,
    level: 'Tỉnh',
    description: 'Học sinh Nguyễn Minh Anh đạt giải Nhất cuộc thi HSG Toán.',
  },
];

const sampleAbout: AboutPage = {
  title: 'Về Trường THCS Xuân Cao',
  mission:
    '<p>Sứ mệnh của chúng tôi là nuôi dưỡng thế hệ học sinh tự tin, sáng tạo và có trách nhiệm với cộng đồng.</p>',
  vision:
    '<p>Trở thành trường THCS dẫn đầu về đổi mới giáo dục, lấy học sinh làm trung tâm.</p>',
  history:
    '<p>Được thành lập từ năm 2005, Xuân Cao không ngừng phát triển, đầu tư cơ sở vật chất và nâng cao chất lượng giảng dạy.</p>',
  stats: [
    { id: 1, label: 'Học sinh đang theo học', value: '1.200+' },
    { id: 2, label: 'Giáo viên giàu kinh nghiệm', value: '80+' },
    { id: 3, label: 'Giải thưởng cấp tỉnh và quốc gia', value: '150+' },
  ],
};

const sampleContact: ContactPage = {
  title: 'Liên hệ',
  description: 'Hãy kết nối với chúng tôi để được tư vấn và hỗ trợ chi tiết.',
  address: 'Số 1 Xuân Cao, Thanh Hóa',
  email: 'info@thcs-abc.edu.vn',
  phone: '(024) 1234 5678',
  mapEmbed:
    '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.502!2d106.700!3d10.776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0:0x0!2zMTDCsDQ2JzMzLjgiTiAxMDbCsDQyJzAwLjAiRQ!5e0!3m2!1sen!2s!4v1616400000000" width="100%" height="360" style="border:0;" allowFullScreen loading="lazy"></iframe>',
};

const sampleOrganization: OrganizationProfile = {
  legalName: 'Trường Trung học Cơ sở Xuân Cao',
  foundingDate: '2005-09-01',
  sameAs: ['https://facebook.com', 'https://youtube.com'],
};

export async function fetchHomePage(): Promise<HomePageData> {
  const response = await fetchFromStrapi<{data: HomePageData}>('/homepage?populate=*');
  return response.data;
}

export async function fetchPosts(page = 1, pageSize = 12): Promise<PaginatedResponse<Post>> {
  return fetchFromStrapi<PaginatedResponse<Post>>(
    `/posts?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
  );
}

export async function fetchPostBySlug(slug: string): Promise<Post | null> {
  const res = await fetchFromStrapi<PaginatedResponse<Post>>(
    `/posts?filters[slug][$eq]=${slug}&populate=*`,
  );
  return res.data?.[0] ?? null;
}

export async function fetchEvents(page = 1, pageSize = 12): Promise<PaginatedResponse<Event>> {
  return fetchFromStrapi<PaginatedResponse<Event>>(
    `/events?populate=*&sort=startDate:asc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
  );
}

export async function fetchEventBySlug(slug: string): Promise<Event | null> {
  const res = await fetchFromStrapi<PaginatedResponse<Event>>(
    `/events?filters[slug][$eq]=${slug}&populate=*`,
  );
  return res.data?.[0] ?? null;
}

export async function fetchTeachers(): Promise<PaginatedResponse<Teacher>> {
  return fetchFromStrapi<PaginatedResponse<Teacher>>('/teachers?populate=*');
}

export async function fetchTeacherBySlug(slug: string): Promise<Teacher | null> {
  const res = await fetchFromStrapi<PaginatedResponse<Teacher>>(
    `/teachers?filters[slug][$eq]=${slug}&populate=*`,
  );
  return res.data?.[0] ?? null;
}

export async function fetchAchievements(): Promise<PaginatedResponse<Achievement>> {
  return fetchFromStrapi<PaginatedResponse<Achievement>>('/achievements?populate=*');
}

export async function fetchAchievementBySlug(slug: string): Promise<Achievement | null> {
  const res = await fetchFromStrapi<PaginatedResponse<Achievement>>(
    `/achievements?filters[slug][$eq]=${slug}&populate=*`,
  );
  return res.data?.[0] ?? null;
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  const res = await fetchFromStrapi<PaginatedResponse<Testimonial>>(
    `/testimonials?filters[featured][$eq]=true&populate=*`,
  );
  return res.data ?? [];
}

export async function fetchAlbums(): Promise<PaginatedResponse<Album>> {
  return fetchFromStrapi<PaginatedResponse<Album>>('/albums?populate=*');
}

export async function fetchAlbumBySlug(slug: string) {
  const res = await fetchFromStrapi<PaginatedResponse<Album>>(
    `/albums?filters[slug][$eq]=${slug}&populate=*`,
  );
  return res.data?.[0] ?? null;
}

export async function fetchAnnouncements(): Promise<PaginatedResponse<Announcement>> {
  const nowIso = new Date().toISOString();
  return fetchFromStrapi<PaginatedResponse<Announcement>>(
    `/announcements?filters[endDate][$gt]=${nowIso}&sort=pinned:desc,startDate:desc`,
  );
}

export async function fetchAboutPage(): Promise<AboutPage> {
  return fetchFromStrapi<AboutPage>('/about?populate=*');
}

export async function fetchContactPage(): Promise<ContactPage> {
  return fetchFromStrapi<ContactPage>('/contact?populate=*');
}

export async function fetchOrganizationProfile(): Promise<OrganizationProfile> {
  return fetchFromStrapi<OrganizationProfile>('/organization?populate=*');
}
