import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  const { data } = await supabase.from('sac_stats').select('*');
  if (!data?.length) return NextResponse.json({ success: false, data: null });
  const stats: Record<string, number> = {};
  data.forEach((r: any) => { stats[r.key] = r.value; });
  return NextResponse.json({ success: true, data: stats });
}
