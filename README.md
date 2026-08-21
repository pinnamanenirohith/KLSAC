# KL SAC Website — Developer Handoff

> **For Nischal** — everything you need to deploy this on `sac.kluniversity.in`

---

## What this is

The new KL SAC (Student Activity Center) website built with **Next.js**, replacing the old site at `sac.kluniversity.in`. It connects to a **Supabase** PostgreSQL database for clubs, activities, and events. The student dashboard (`sacactivities.kluniversity.in`) remains separate — this site links to it but doesn't replace it.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS |
| Database | Supabase (PostgreSQL) |
| Auth | JWT-based admin auth (custom) |
| Hosting | College server (Node.js) |

---

## Setup

### 1. Clone & Install

```bash
git clone https://github.com/pinnamanenirohith/KLSAC.git
cd KLSAC/NewSACWebsite/my-app
npm install
```

### 2. Environment Variables

Create a `.env.local` file in `my-app/` — get these values from Rohith:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_JWT_SECRET=
ADMIN_SETUP_KEY=KLSACsetup2026
NEXT_PUBLIC_BASE_URL=https://sac.kluniversity.in
```

### 3. Build & Run

```bash
npm run build
npm start
```

The app runs on `http://localhost:3000` by default. Point Nginx to that port.

### 4. Nginx Config (example)

```nginx
server {
    listen 80;
    server_name sac.kluniversity.in;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

> Add SSL via Let's Encrypt (`certbot`) to get HTTPS — required to remove the globe icon from the browser address bar.

---

## What's Already Built

### Public Pages
- `/` — Homepage
- `/about` — About SAC
- `/domains` — All 5 domains (TEC, LCH, ESO, HWB, IIE)
- `/domains/[slug]` — Individual domain page
- `/clubs` — All clubs listing
- `/clubs/[slug]` — Individual club page with all activities
- `/activities` — All activities with domain/club filter
- `/events` — Events calendar
- `/contact` — Contact page
- `/achievements`, `/stories`, `/news`, `/publications`, `/leadership`, `/collaborate` — Static pages

### Admin Panel (`/admin`)
- Login at `/admin/login`
- Manage clubs, activities, events
- Domain filter + club filter on activities page
- Upload club photos

### Domains & Clubs (25 clubs across 5 domains)
| Domain | Clubs |
|---|---|
| TEC | 8 clubs |
| LCH | 11 clubs |
| ESO | 3 clubs (SVR club pending data) |
| HWB | 3 clubs |
| IIE | — (activities pending) |

### Activities Seeded (for testing only — add fresh from admin after deploy)
- LCH: 210 activities across 11 clubs
- ESO: 60 activities across 3 clubs
- HWB: 30 activities across 3 clubs

---

## After Deployment — What to Add via Admin Panel

1. **Club details** — name, description, tagline, domain
2. **Club photos/logos** — upload from admin
3. **Activities** — add for each club (or use seed endpoints to bulk-load)
4. **Events** — any upcoming events with dates
5. **Leadership** — SAC leadership team details

---

## Seed Endpoints (Bulk Load Activities)

If you want to re-load the activity data quickly without entering one by one, hit these endpoints with the setup key header:

```bash
# LCH — 210 activities
curl -X POST https://sac.kluniversity.in/api/admin/seed/lch-activities \
  -H "x-setup-key: KLSACsetup2026"

# ESO — 60 activities
curl -X POST https://sac.kluniversity.in/api/admin/seed/eso-activities \
  -H "x-setup-key: KLSACsetup2026"

# HWB — 30 activities
curl -X POST https://sac.kluniversity.in/api/admin/seed/hwb-activities \
  -H "x-setup-key: KLSACsetup2026"
```

---

## Important Notes

- **No SDC credits** — all mentions removed site-wide intentionally
- **Student dashboard** — `sacactivities.kluniversity.in` is already linked everywhere, no changes needed
- **Admin login** — credentials are set in Supabase, ask Rohith
- **IIE activities** — not yet added, pending content from Rohith

---

## Built By

**First SAC Website** — Deepak Reddy Gathpa & Tadikonda Sai Manikanta

**Current Website** — Rohith Venkata Sai Pinnamaneni & Singana Nischal
