import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import { ensureSACTables } from '@/lib/db-setup';

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return NextResponse.json({ error }, { status: 401 });
  await ensureSACTables();

  const [rows] = await pool.execute(
    'SELECT * FROM sac_announcements ORDER BY created_at DESC'
  );
  return NextResponse.json({ success: true, data: rows });
}

export async function POST(req: NextRequest) {
  const { session, error } = await requireAdmin();
  if (error) return NextResponse.json({ error }, { status: 401 });
  await ensureSACTables();

  const { title, content, type, expires_at } = await req.json();
  if (!title || !content) {
    return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
  }

  await pool.execute(
    'INSERT INTO sac_announcements (title, content, type, created_by, expires_at) VALUES (?, ?, ?, ?, ?)',
    [title, content, type ?? 'general', session!.username, expires_at ?? null]
  );
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return NextResponse.json({ error }, { status: 401 });

  const { id } = await req.json();
  await pool.execute('UPDATE sac_announcements SET is_active = FALSE WHERE id = ?', [id]);
  return NextResponse.json({ success: true });
}
