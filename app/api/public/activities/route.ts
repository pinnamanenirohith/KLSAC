import { NextResponse, NextRequest } from 'next/server';
import { supabase } from '@/lib/supabase-admin';
import { ACTIVITIES } from '@/lib/content/activities';

export async function GET(req: NextRequest) {
  const domain = req.nextUrl.searchParams.get('domain');

  let query = supabase.from('activities').select('*').order('activity_date', { ascending: false });
  if (domain && domain !== 'all') query = query.eq('domain', domain);

  const { data, error } = await query;

  if (error || !data || data.length === 0) {
    const fallback = domain && domain !== 'all'
      ? ACTIVITIES.filter(a => a.domain === domain)
      : ACTIVITIES;
    return NextResponse.json({ success: true, data: fallback });
  }

  return NextResponse.json({ success: true, data });
}
