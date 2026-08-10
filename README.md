# استخر صدف کرج — وب‌سایت آماده تحویل

وب‌سایت کامل مجموعه ورزشی «استخر صدف کرج» — آماده انتشار روی GitHub Pages.

## 🌐 پیش‌نمایش زنده

https://wikifront.github.io/sadafpool/

## 📄 صفحات سایت (۱۴ صفحه + ۶ مقاله بلاگ)

| صفحه | آدرس |
|---|---|
| صفحه اصلی | `/` |
| درباره ما | `/about/` |
| کلاس‌های شنا | `/classes/` |
| مربیان | `/coaches/` |
| امکانات | `/facilities/` |
| برنامه سانس‌ها | `/schedule/` |
| تعرفه‌ها | `/pricing/` |
| رزرو | `/reservation/` |
| گالری | `/gallery/` |
| وبلاگ (۶ مقاله کامل) | `/blog/` |
| سوالات متداول | `/faq/` |
| تماس با ما | `/contact/` |
| حریم خصوصی | `/privacy/` |
| قوانین | `/terms/` |

## 🔧 تغییر اطلاعات مجموعه (مهم!)

**همه اطلاعات قابل‌تنظیم در یک فایل قرار دارد:** `site-data.json`

| فیلد | توضیح |
|---|---|
| `name` | نام مجموعه (پیش‌فرض: استخر صدف کرج) |
| `phone` / `phone_tel` | شماره تلفن ثابت مجموعه |
| `mobile` / `mobile_tel` | شماره موبایل / واتساپ |
| `address.street` | آدرس دقیق |
| `address.postal_code` | کد پستی |
| `geo` | مختصات جغرافیایی (برای نقشه) |
| `hours` | ساعات کاری |
| `social` | لینک اینستاگرام، تلگرام، واتساپ |
| `email` | ایمیل مجموعه |
| `stats` | آمار نمایشی (سال سابقه، تعداد هنرجو و…) |

> ⚠️ بعد از تغییر `site-data.json`، تغییرات فقط با **بازسازی دستی** در صفحات اعمال می‌شود. چون سایت استاتیک است، در حال حاضر مقادیر مستقیم داخل HTML درج شده‌اند.

### بعد از تغییر اطلاعات، این موارد را هم به‌روز کنید:

1. **نقشه در صفحه تماس** (`contact/index.html`) — بخش کامنت‌شده OSM را با نقشه آدرس واقعی فعال کنید
2. **تصاویر مربیان** (`assets/images/coach-*.webp`) — با عکس واقعی مربیان جایگزین کنید
3. **گالری** (`assets/images/gallery-*.webp`) — با عکس‌های واقعی مجموعه
4. **مقالات بلاگ** — متن‌های فعلی پیش‌نویس کامل هستند

## 🚀 انتشار روی GitHub Pages

```bash
git add -A
git commit -m "update"
git push origin main
```

پس از چند دقیقه سایت در `https://<username>.github.io/sadafpool/` به‌روزرسانی می‌شود.

## 🏗 ساختار پروژه

```
sadafpool/
├── index.html            ← صفحه اصلی
├── about/                ← درباره ما
├── blog/                 ← بلاگ (ایندکس + ۶ مقاله)
├── classes/              ← کلاس‌ها
├── coaches/              ← مربیان
├── contact/              ← تماس
├── facilities/           ← امکانات
├── faq/                  ← سوالات متداول
├── gallery/              ← گالری
├── pricing/              ← تعرفه‌ها
├── privacy/              ← حریم خصوصی
├── reservation/          ← رزرو
├── schedule/             ← برنامه سانس‌ها
├── terms/                ← قوانین
├── assets/               ← CSS، JS، تصاویر
├── site-data.json        ← اطلاعات مرکزی مجموعه
├── sitemap.xml           ← نقشه سایت برای گوگل
└── robots.txt            ← دستورالعمل خزنده‌ها
```

## 🎯 سئو (بهینه‌سازی برای گوگل)

- **Schema.org محلی**: هر صفحه شامل `SportsActivityLocation` + `LocalBusiness` با آدرس کرج، تلفن و ساعات کاری است
- **کلمات کلیدی محلی**: «استخر کرج»، «آموزش شنا کرج»، «کلاس شنا کرج» در عنوان و توضیحات همه صفحات
- **سایت‌مپ**: `sitemap.xml` آماده ثبت در Google Search Console
- **robots.txt**: اجازه خزش کامل
- **Open Graph + Twitter Card**: اشتراک‌گذاری حرفه‌ای در شبکه‌های اجتماعی

### گام‌های بعدی برای سئو (پس از دامنه اختصاصی):

1. ثبت سایت در [Google Search Console](https://search.google.com/search-console)
2. ثبت `sitemap.xml`
3. ثبت در [Google Business Profile](https://business.google.com/) با آدرس واقعی
4. دریافت بک‌لینک از دایرکتوری‌های محلی کرج (بلد، نشان، نماوا)

## 🛠 توسعه

برای تست محلی:

```bash
cd sadafpool
python -m http.server 8765
# باز کردن http://localhost:8765/sadafpool/
```

برای توسعه جدید صفحات، قالب‌های مرجع در `_head_template.html`، `_header_template.html` و `_footer_template.html` هستند.

---

© استخر صدف کرج — ساخته‌شده برای تحویل به مشتری
