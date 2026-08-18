import { DEMO_ACTIVITIES, DEMO_ANNOUNCEMENTS } from '@/lib/demo-data';

const BASE =
  process.env.NEXT_PUBLIC_BASE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

async function safeFetch(path: string) {
  try {
    const res = await fetch(`${BASE}${path}`, { next: { revalidate: 300 } });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function getHomepageEvents(limit = 4) {
  const today = new Date().toISOString().split('T')[0];
  const json  = await safeFetch('/api/public/activities');
  const items: any[] = json?.data ?? [];
  const upcoming = items.filter((e: any) => e.activity_date >= today)
                        .sort((a: any, b: any) => a.activity_date.localeCompare(b.activity_date))
                        .slice(0, limit);
  if (upcoming.length) return upcoming;
  return DEMO_ACTIVITIES.filter(a => a.activity_date >= today).slice(0, limit);
}

export async function getHomepageStats() {
  const json = await safeFetch('/api/public/stats');
  return {
    clubs:      json?.data?.clubs      ?? 36,
    domains:    json?.data?.domains    ?? 5,
    students:   json?.data?.students   ?? 3661,
    activities: json?.data?.activities ?? null,
  };
}

export async function getHomepageAnnouncements(limit = 3) {
  const json  = await safeFetch('/api/public/announcements');
  const items: any[] = json?.data ?? [];
  if (items.length) return items.slice(0, limit);
  return DEMO_ANNOUNCEMENTS.slice(0, limit);
}
