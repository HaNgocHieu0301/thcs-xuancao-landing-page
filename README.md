# THCS Xuân Cao Website

Triển khai dự án Website giới thiệu và cổng thông tin chính thức cho Trường THCS Xuân Cao bao gồm hai phần chính:

- **frontend/** – Ứng dụng Next.js 14 (App Router) dựng UI, SEO, sitemap và kết nối Strapi qua REST.
- **cms/** – Cấu hình Strapi v5 với mô hình nội dung, component và các biến môi trường khuyến nghị.

## Cấu trúc

```
frontend/            # Next.js 14 + Tailwind (App Router)
  src/
    app/(public)/    # Các trang SSG/ISR theo sitemap đã thống nhất
    components/      # Hero, Card, Gallery, Testimonials, PageHeader, ...
    lib/             # api.ts, seo.ts, utils.ts, image.ts
    styles/          # Tailwind globals
  .env.example       # Biến môi trường cho FE
cms/                 # Strapi v5 schema, config
  src/api/           # Content types (Post, Event, Teacher, ...)
  src/components/    # Component Seo, CTA, StatItem, ...
  .env.example       # Biến môi trường Strapi
```

## Thiết lập nhanh

### Frontend

1. Cài đặt dependency (yarn/pnpm tùy chọn):
   ```bash
   cd frontend
   pnpm install # hoặc npm install / yarn install
   ```
2. Cấu hình `.env.local` dựa trên `.env.example`.
3. Khởi chạy dev:
   ```bash
   pnpm dev
   ```

Ứng dụng sử dụng SSG + ISR mặc định. Khi chưa có CMS, `lib/api.ts` trả về dữ liệu mock giúp phát triển UI.

### Strapi CMS

1. Cài đặt dependency:
   ```bash
   cd cms
   pnpm install # hoặc npm install / yarn install
   ```
2. Tạo file `.env` theo `.env.example`.
3. Chạy Strapi:
   ```bash
   pnpm develop
   ```

Strapi đã khai báo đầy đủ collection types, single types, component SEO/CTA/... theo kế hoạch. Kích hoạt CORS cho domain Next.js và tạo API Token readonly cho FE.

## Kiểm tra & SEO

- Sitemap động tại `/sitemap.xml`, robots tại `/robots.txt`.
- `seo.ts` hỗ trợ JSON-LD (Article, Event, Breadcrumb, Organization).
- Các trang list/detail đều chèn breadcrumbs, meta canonical và dữ liệu cấu trúc.

## Tiếp theo

Kết nối Cloudflare R2 bằng cách khai báo `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET`, `R2_ENDPOINT` (tùy chọn thêm `R2_REGION`, `R2_BUCKET_PREFIX`, `R2_PUBLIC_BASE_URL`) trong CMS.
- Thiết lập GA4 theo `NEXT_PUBLIC_GA_ID`.
- Tạo workflows biên tập trên Strapi (Author → Editor → Publish).
