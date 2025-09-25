# Product Backlog

This backlog translates the provided epics, user stories, and acceptance criteria into actionable tickets for the project.

## EPIC A — Hạ tầng & Strapi

### A1. Khởi tạo Strapi + DB
- **User Story**: Là quản trị viên hệ thống, tôi cần triển khai Strapi với cơ sở dữ liệu cấu hình đầy đủ để đội nội dung có thể đăng nhập và quản lý dữ liệu an toàn.
- **Tasks**:
  1. Khởi tạo dự án Strapi với kết nối cơ sở dữ liệu theo biến môi trường.
  2. Cấu hình CORS cho domain frontend.
  3. Tạo API Token readonly dùng cho frontend.
  4. Thiết lập quy trình backup thủ công ban đầu.
- **Acceptance Criteria**:
  - Strapi hoạt động trên môi trường staging bằng URL định trước.
  - Tài khoản admin có thể đăng nhập và quản trị.
  - API token readonly truy cập được dữ liệu công khai.
  - Quy trình backup thủ công đã được thử nghiệm thành công.

### A2. Content Types & Components
- **User Story**: Là biên tập viên, tôi muốn có đầy đủ content type và component theo mô hình đã đề xuất để dễ dàng nhập liệu, quản lý SEO và kể câu chuyện thương hiệu.
- **Tasks**:
  1. Tạo các collection type: Post, Event, Teacher, Achievement, Testimonial, Album, Announcement, Category, Tag.
  2. Tạo các single type: About, HomePage, Contact, Organization.
  3. Tạo component: Seo, CTA, StatItem, Achievement, Hero (và component con cần thiết).
  4. Thiết lập quan hệ giữa các content type theo mô tả.
- **Acceptance Criteria**:
  - Có thể tạo bản ghi Post/Event/Teacher với slug tự sinh từ title.
  - SEO component hiển thị trên admin cho mọi content type.
  - Quan hệ Category/Tag hoạt động đúng, cho phép gắn nhiều thẻ.
  - Các trường media (coverImage, gallery) hoạt động đúng trên admin.

### A3. Media & Upload
- **User Story**: Là quản trị viên nội dung, tôi muốn upload media tối ưu và sử dụng CDN để đảm bảo hiệu năng hiển thị.
- **Tasks**:
  1. Tích hợp Cloudinary (hoặc provider được chọn) với Strapi.
  2. Cấu hình kích thước/định dạng ảnh mặc định (WebP/AVIF ưu tiên).
  3. Kiểm tra upload ảnh/video và hiển thị preview trong admin.
- **Acceptance Criteria**:
  - Upload media thành công và lưu trữ qua provider.
  - Ảnh được trả về với URL CDN.
  - Frontend sử dụng được media URL từ Strapi/CDN.

## EPIC B — Frontend Next.js

### B1. Khởi tạo FE + Tailwind
- **User Story**: Là developer frontend, tôi cần một nền tảng Next.js 14 với Tailwind để xây dựng giao diện nhanh chóng.
- **Tasks**:
  1. Khởi tạo dự án Next.js App Router, cấu hình TypeScript và ESLint.
  2. Thiết lập Tailwind CSS, fonts, và global styles.
  3. Tạo layout cơ bản, navigation, footer placeholder.
- **Acceptance Criteria**:
  - Dự án build thành công trên môi trường CI/Vercel.
  - Trang chủ mặc định hiển thị layout trống (không lỗi JS/console).
  - Tailwind hoạt động, có thể áp dụng utility class trong trang mẫu.

### B2. Trang chủ & Hero
- **User Story**: Là học sinh/phụ huynh truy cập, tôi muốn xem hero bắt mắt và các khối nội dung chính ngay trang chủ.
- **Tasks**:
  1. Xây dựng component Hero với ảnh/video, CTA chính/phụ.
  2. Tạo các block NewsGrid, EventsList, SchoolLife Gallery, Testimonials.
  3. Kết nối dữ liệu từ Strapi (SSG + ISR) cho các block.
- **Acceptance Criteria**:
  - Lighthouse Mobile score ≥ 85 cho trang chủ.
  - LCP < 2.5s, CLS < 0.1 theo PageSpeed Insights.
  - Các block hiển thị dữ liệu mới nhất từ Strapi.

### B3. Danh sách/chi tiết Tin tức
- **User Story**: Là phụ huynh, tôi muốn xem danh sách tin tức và bài viết chi tiết với SEO chuẩn.
- **Tasks**:
  1. Tạo route `/tin-tuc` (SSG + ISR) với pagination.
  2. Xây dựng trang chi tiết `/tin-tuc/[slug]` với nội dung rich text, related posts, share metadata.
  3. Thiết lập JSON-LD Article/NewsArticle, OG tags, breadcrumbs.
- **Acceptance Criteria**:
  - Trang chi tiết vượt qua kiểm tra Rich Results cho Article.
  - Breadcrumb xuất hiện trên giao diện và qua JSON-LD.
  - Liên kết bài viết liên quan hiển thị hợp lý (≥3 bài nếu có).

### B4. Sự kiện
- **User Story**: Là phụ huynh/học sinh, tôi muốn xem danh sách sự kiện và chi tiết với thông tin địa điểm, thời gian.
- **Tasks**:
  1. Tạo route `/su-kien` với filter sự kiện sắp tới và đã diễn ra.
  2. Trang chi tiết `/su-kien/[slug]` hiển thị date range, location, gallery, CTA.
  3. Tạo JSON-LD Event với đầy đủ startDate, endDate, location.
- **Acceptance Criteria**:
  - Rich Results Test cho Event pass.
  - Event list hiển thị trạng thái (sắp diễn ra/đã diễn ra).
  - Breadcrumb và meta đầy đủ.

### B5. Trang Giới thiệu, Đội ngũ, Thành tích, School Life, Góc nhìn, Liên hệ
- **User Story**: Là người dùng mới, tôi muốn khám phá thông tin về trường, đội ngũ, thành tích và có thể đăng ký tham quan.
- **Tasks**:
  1. Tạo các route tĩnh tương ứng lấy dữ liệu từ single/collection types.
  2. Xây dựng form “Đăng ký tham quan” gửi về email/webhook.
  3. Đảm bảo mỗi trang có H1, meta, breadcrumb chuẩn SEO.
- **Acceptance Criteria**:
  - Form gửi thành công (webhook/email nhận được payload demo).
  - Nội dung hiển thị đúng cấu trúc heading, alt text đầy đủ.
  - Breadcrumb JSON-LD chính xác trên tất cả trang này.

## EPIC C — SEO & Tối ưu

### C1. Sitemap & Robots
- **User Story**: Là quản trị SEO, tôi cần sitemap động và robots.txt để Google index site hiệu quả.
- **Tasks**:
  1. Tạo route `/sitemap.xml` sinh động từ API Strapi.
  2. Tạo `/robots.txt` với đường dẫn sitemap và directive phù hợp.
  3. Kiểm tra sitemap trên Google Search Console (staging).
- **Acceptance Criteria**:
  - `/sitemap.xml` liệt kê ≥ 90% URL công khai.
  - GSC fetch sitemap thành công, không lỗi cú pháp.
  - Robots.txt cho phép crawl các trang công khai.

### C2. Schema & Meta
- **User Story**: Là chuyên viên SEO, tôi muốn công cụ seo.ts tạo đầy đủ meta và structured data cho từng trang.
- **Tasks**:
  1. Xây dựng helper `seo.ts` để sinh title, metaDescription, canonical, OG.
  2. Hỗ trợ JSON-LD cho Organization, Article, Event, BreadcrumbList.
  3. Tích hợp helper vào tất cả page components.
- **Acceptance Criteria**:
  - Structured data được validate qua Rich Results Test.
  - Meta title/description mỗi trang đúng với dữ liệu Strapi.
  - canonical rel được render chính xác.

### C3. Hiệu năng
- **User Story**: Là quản trị sản phẩm, tôi muốn site đạt Core Web Vitals tốt để trải nghiệm người dùng cao.
- **Tasks**:
  1. Audit PageSpeed trên các trang chính (home, tin tức, sự kiện, trang chi tiết).
  2. Tối ưu ảnh (WebP/AVIF), lazy load, ưu tiên hero.
  3. Thực hiện code splitting, giảm bundle size nếu cần.
- **Acceptance Criteria**:
  - PageSpeed Mobile ≥ 85 cho các trang mục tiêu.
  - LCP < 2.5s, CLS < 0.1, INP < 200ms trong báo cáo Lighthouse.
  - Chỉ số Web Vitals được theo dõi qua GA4 hoặc tương đương.

## EPIC D — Vận hành

### D1. GA4 & GSC
- **User Story**: Là quản trị marketing, tôi cần theo dõi hiệu quả site qua GA4 và đảm bảo Google index nội dung.
- **Tasks**:
  1. Tích hợp GA4 vào frontend, cấu hình sự kiện tùy chỉnh (CTA click, gallery view).
  2. Submit domain và sitemap vào Google Search Console.
  3. Theo dõi báo cáo index và xử lý lỗi.
- **Acceptance Criteria**:
  - GA4 nhận được sự kiện (kiểm tra Realtime và DebugView).
  - Sitemap được GSC chấp nhận, không lỗi nghiêm trọng.
  - Báo cáo index hiển thị trang mới trong vòng 48h sau publish.

### D2. Tài liệu & Training
- **User Story**: Là đội nội dung, tôi cần tài liệu và đào tạo để nhập liệu đúng quy trình và chuẩn SEO.
- **Tasks**:
  1. Viết tài liệu hướng dẫn nhập liệu, quy trình duyệt, checklist SEO.
  2. Tổ chức buổi training 1 giờ cho đội nội dung.
  3. Bàn giao tài liệu ở định dạng PDF/Notion.
- **Acceptance Criteria**:
  - Tài liệu được lưu trữ trong thư mục chung (hoặc Notion) và dễ truy cập.
  - Đội nội dung xác nhận nắm quy trình sau buổi training.
  - Checklist SEO được áp dụng trong ít nhất 1 phiên nhập liệu thử.
