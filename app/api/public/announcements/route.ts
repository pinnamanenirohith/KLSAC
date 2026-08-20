import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase-admin';

export async function GET() {
  const { data, error } = await supabase
    .from('sac_announcements')
    .select('*')
    .eq('is_active', true)
    .or('expires_at.is.null,expires_at.gt.now()')
    .order('created_at', { ascending: false });
  if (error) return NextResponse.json({ success: false, data: [] }, { status: 500 });
  return NextResponse.json({ success: true, data: data ?? [] });
}
