import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import { ensureSACTables } from '@/lib/db-setup';

export async function POST(req: NextRequest) {
  const { session, error } = await requireAdmin();
  if (error) return NextResponse.json({ error }, { status: 401 });

  await ensureSACTables();

  const { content_type, content_id, status, notes } = await req.json();

  if (!content_type || !content_id || !['approved', 'denied'].includes(status)) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  try {
    await pool.execute(`
      INSERT INTO website_approvals (content_type, content_id, status, approved_by, approved_at, notes)
      VALUES (?, ?, ?, ?, NOW(), ?)
      ON DUPLICATE KEY UPDATE
        status = VALUES(status),
        approved_by = VALUES(approved_by),
        approved_at = VALUES(approved_at),
        notes = VALUES(notes)
    `, [content_type, content_id, status, session!.username, notes ?? null]);

    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
