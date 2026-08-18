import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { ensureSACTables } from '@/lib/db-setup';

export async function GET() {
  await ensureSACTables();
  try {
    const [rows] = await pool.execute(`
      SELECT c.*,
             COUNT(s.username) as memberCount
      FROM clubs c
      INNER JOIN website_approvals wa
        ON wa.content_type = 'club' AND wa.content_id = CAST(c.id AS CHAR)
      LEFT JOIN students s ON s.clubId = c.id
      WHERE wa.status = 'approved'
      GROUP BY c.id
      ORDER BY c.name ASC
    `);
    return NextResponse.json({ success: true, data: rows });
  } catch {
    return NextResponse.json({ success: false, data: [] });
  }
}
