# KL SAC Website

The official website for **KL University's Student Activity Council** — built from scratch as a modern, CMS-driven platform for clubs, domains, achievements, stories, and news.

**Live:** [klsac.in](https://klsac.in) · **Official repo:** [github.com/KL-SAC](https://github.com/KL-SAC)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Database | Supabase (PostgreSQL) |
| Auth | JWT-based custom admin auth |
| Hosting | Vercel |

---

## Features

### Public Site
- Homepage with live stats, domain cards, and latest news
- 5 domains — TEC, LCH, ESO, HWB, IIE — each with dedicated pages
- 25+ clubs with full pages: about, activities, gallery, leadership
- Achievements, student stories, news articles, leadership directory
- Contact and collaboration pages

### Admin Panel (`/admin`)
- Secure login — JWT auth with middleware protection
- Full CMS for clubs, domains, achievements, stories, news, leadership, and stats
- Image upload to Supabase Storage
- Revalidation on every write — public pages always reflect latest data

---

## Local Setup

```bash
git clone https://github.com/pinnamanenirohith/KLSAC.git
cd KLSAC
npm install
```

Create `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_JWT_SECRET=
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

```bash
npm run dev
```

---

## Built By

**Rohith Venkata Sai Pinnamaneni** · [pinnamanenirohith](https://github.com/pinnamanenirohith)

---

*This is the personal development repository. The production-ready version is maintained in the KL SAC GitHub organisation.*
