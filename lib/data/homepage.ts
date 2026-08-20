const BASE =
  process.env.NEXT_PUBLIC_BASE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

async function safeFetch(path: string) {
  try {
    const res = await fetch(`${BASE}${path}`, { cache: 'no-store' });
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
  return items
    .filter((e: any) => e.activity_date >= today)
    .sort((a: any, b: any) => a.activity_date.localeCompare(b.activity_date))
    .slice(0, limit);
}

export async function getHomepageStats() {
  const json = await safeFetch('/api/public/stats');
  return {
    clubs:      json?.data?.clubs      ?? 0,
    domains:    json?.data?.domains    ?? 0,
    students:   json?.data?.students   ?? 0,
    activities: json?.data?.activities ?? 0,
  };
}

export async function getHomepageAnnouncements(limit = 3) {
  const json  = await safeFetch('/api/public/announcements');
  const items: any[] = json?.data ?? [];
  return items.slice(0, limit);
}
