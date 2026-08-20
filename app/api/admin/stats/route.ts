import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import { supabase } from '@/lib/supabase-admin';

export async function GET() {
  const { data } = await supabase.from('sac_stats').select('*').order('key');
  return NextResponse.json({ success: true, data: data ?? [] });
}

export async function PUT(req: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return NextResponse.json({ error }, { status: 401 });

  const updates: { key: string; value: number }[] = await req.json();
  for (const u of updates) {
    await supabase.from('sac_stats')
      .upsert({ key: u.key, value: u.value, updated_at: new Date().toISOString() }, { onConflict: 'key' });
  }
  revalidatePath('/');
  revalidatePath('/', 'layout');
  return NextResponse.json({ success: true });
}
