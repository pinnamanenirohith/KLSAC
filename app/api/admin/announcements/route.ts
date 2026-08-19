import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { supabase } from '@/lib/supabase-admin';

export async function GET() {
  const { data } = await supabase.from('sac_announcements').select('*').order('created_at', { ascending: false });
  return NextResponse.json({ success: true, data: data ?? [] });
}

export async function POST(req: NextRequest) {
  const { error, session } = await requireAdmin();
  if (error) return NextResponse.json({ error }, { status: 401 });

  const body = await req.json();
  const { data, error: e } = await supabase.from('sac_announcements')
    .insert({ ...body, created_by: (session as any).username })
    .select().single();
  if (e) return NextResponse.json({ error: e.message }, { status: 400 });
  return NextResponse.json({ success: true, data });
}

export async function DELETE(req: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return NextResponse.json({ error }, { status: 401 });

  const { id } = await req.json();
  await supabase.from('sac_announcements').update({ is_active: false }).eq('id', id);
  return NextResponse.json({ success: true });
}
