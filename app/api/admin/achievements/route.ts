import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import { supabase } from '@/lib/supabase-admin';

export async function GET() {
  const { data } = await supabase.from('achievements').select('*').order('sort_order', { ascending: true }).order('year', { ascending: false });
  return NextResponse.json({ success: true, data: data ?? [] });
}

export async function POST(req: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return NextResponse.json({ error }, { status: 401 });

  const body = await req.json();
  const { data, error: e } = await supabase.from('achievements').insert({
    ...body,
    updated_at: new Date().toISOString(),
  }).select().single();
  if (e) return NextResponse.json({ error: e.message }, { status: 400 });

  revalidatePath('/achievements');
  revalidatePath('/');
  return NextResponse.json({ success: true, data });
}

export async function PUT(req: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return NextResponse.json({ error }, { status: 401 });

  const { id, ...rest } = await req.json();
  const { error: e } = await supabase.from('achievements')
    .update({ ...rest, updated_at: new Date().toISOString() }).eq('id', id);
  if (e) return NextResponse.json({ error: e.message }, { status: 400 });

  revalidatePath('/achievements');
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return NextResponse.json({ error }, { status: 401 });

  const { id } = await req.json();
  const { error: e } = await supabase.from('achievements').delete().eq('id', id);
  if (e) return NextResponse.json({ error: e.message }, { status: 400 });

  revalidatePath('/achievements');
  return NextResponse.json({ success: true });
}
