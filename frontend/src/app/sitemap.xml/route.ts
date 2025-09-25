import { MetadataRoute } from 'next';
import {
  fetchPosts,
  fetchEvents,
  fetchTeachers,
  fetchAchievements,
  fetchAlbums,
} from '@/lib/api';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://thcs-abc.edu.vn';

export async function GET(): Promise<MetadataRoute.Sitemap> {
  const [posts, events, teachers, achievements, albums] = await Promise.all([
    fetchPosts(1, 100),
    fetchEvents(1, 100),
    fetchTeachers(),
    fetchAchievements(),
    fetchAlbums(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/tin-tuc',
    '/su-kien',
    '/gioi-thieu',
    '/doi-ngu',
    '/thanh-tich',
    '/cuoc-song-hoc-duong',
    '/goc-nhin',
    '/lien-he',
  ].map((path) => ({ url: `${SITE_URL}${path}`, lastModified: new Date() }));

  const dynamicRoutes: MetadataRoute.Sitemap = [
    ...posts.data.map((post) => ({
      url: `${SITE_URL}/tin-tuc/${post.slug}`,
      lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
    })),
    ...events.data.map((event) => ({
      url: `${SITE_URL}/su-kien/${event.slug}`,
      lastModified: event.startDate ? new Date(event.startDate) : new Date(),
    })),
    ...teachers.data.map((teacher) => ({
      url: `${SITE_URL}/doi-ngu/${teacher.slug}`,
      lastModified: new Date(),
    })),
    ...achievements.data.map((achievement) => ({
      url: `${SITE_URL}/thanh-tich/${achievement.slug}`,
      lastModified: achievement.year ? new Date(`${achievement.year}-01-01`) : new Date(),
    })),
    ...albums.data.map((album) => ({
      url: `${SITE_URL}/cuoc-song-hoc-duong/${album.slug}`,
      lastModified: new Date(),
    })),
  ];

  return [...staticRoutes, ...dynamicRoutes];
}
