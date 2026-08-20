import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import { supabase } from '@/lib/supabase-admin';

export async function GET() {
  const { data } = await supabase.from('stories').select('*').order('sort_order', { ascending: true });
  return NextResponse.json({ success: true, data: data ?? [] });
}

export async function POST(req: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return NextResponse.json({ error }, { status: 401 });

  const body = await req.json();
  const { data, error: e } = await supabase.from('stories').insert(body).select().single();
  if (e) return NextResponse.json({ error: e.message }, { status: 400 });
  revalidatePath('/stories');
  revalidatePath('/');
  return NextResponse.json({ success: true, data });
}

export async function PUT(req: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return NextResponse.json({ error }, { status: 401 });

  const { slug, ...rest } = await req.json();
  const { error: e } = await supabase.from('stories')
    .update({ ...rest, updated_at: new Date().toISOString() }).eq('slug', slug);
  if (e) return NextResponse.json({ error: e.message }, { status: 400 });
  revalidatePath('/stories');
  revalidatePath(`/stories/${slug}`);
  revalidatePath('/');
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return NextResponse.json({ error }, { status: 401 });

  const { slug } = await req.json();
  const { error: e } = await supabase.from('stories').delete().eq('slug', slug);
  if (e) return NextResponse.json({ error: e.message }, { status: 400 });
  revalidatePath('/stories');
  revalidatePath('/');
  return NextResponse.json({ success: true });
}
