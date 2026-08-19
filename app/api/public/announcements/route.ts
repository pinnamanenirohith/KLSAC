import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { DEMO_ANNOUNCEMENTS } from '@/lib/demo-data';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('sac_announcements')
      .select('*')
      .eq('is_active', true)
      .or('expires_at.is.null,expires_at.gt.now()')
      .order('created_at', { ascending: false });
    if (error || !data?.length) throw new Error('fallback');
    return NextResponse.json({ success: true, data });
  } catch {
    return NextResponse.json({ success: true, data: DEMO_ANNOUNCEMENTS });
  }
}
