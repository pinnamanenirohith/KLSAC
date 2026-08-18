import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { ensureSACTables } from '@/lib/db-setup';

export async function GET() {
  await ensureSACTables();
  try {
    const [rows] = await pool.execute(`
      SELECT id, title, content, type, created_at, expires_at
      FROM sac_announcements
      WHERE is_active = TRUE
        AND (expires_at IS NULL OR expires_at > NOW())
      ORDER BY
        CASE type WHEN 'urgent' THEN 0 WHEN 'event' THEN 1 ELSE 2 END,
        created_at DESC
      LIMIT 20
    `);
    return NextResponse.json({ success: true, data: rows });
  } catch {
    return NextResponse.json({ success: false, data: [] });
  }
}
