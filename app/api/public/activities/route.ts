import { NextResponse, NextRequest } from 'next/server';
import { supabase } from '@/lib/supabase-admin';

export async function GET(req: NextRequest) {
  const domain = req.nextUrl.searchParams.get('domain');

  let query = supabase.from('activities').select('*').order('activity_date', { ascending: false });
  if (domain && domain !== 'all') query = query.eq('domain', domain);

  const { data, error } = await query;

  if (error) return NextResponse.json({ success: false, data: [] }, { status: 500 });
  return NextResponse.json({ success: true, data: data ?? [] });
}
