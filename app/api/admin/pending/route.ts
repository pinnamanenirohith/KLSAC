import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import { ensureSACTables } from '@/lib/db-setup';

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return NextResponse.json({ error }, { status: 401 });

  await ensureSACTables();

  try {
    // Activities not yet in approvals table
    const [newActivities] = await pool.execute(`
      SELECT ac.code as id, ac.title, ac.domain, ac.category,
             ac.activity_date, ac.faculty_name, ac.created_at, 'activity' as content_type
      FROM activity_catalogue ac
      WHERE NOT EXISTS (
        SELECT 1 FROM website_approvals wa
        WHERE wa.content_type = 'activity' AND wa.content_id = ac.code
      )
      ORDER BY ac.created_at DESC
    `);

    // Clubs not yet in approvals
    const [newClubs] = await pool.execute(`
      SELECT c.id, c.name as title, c.domain, c.description, c.created_at, 'club' as content_type
      FROM clubs c
      WHERE NOT EXISTS (
        SELECT 1 FROM website_approvals wa
        WHERE wa.content_type = 'club' AND wa.content_id = CAST(c.id AS CHAR)
      )
      ORDER BY c.id DESC
    `);

    // Items explicitly set to pending
    const [pendingApprovals] = await pool.execute(`
      SELECT wa.*,
             CASE wa.content_type
               WHEN 'activity' THEN (SELECT title FROM activity_catalogue WHERE code = wa.content_id)
               WHEN 'club'     THEN (SELECT name  FROM clubs             WHERE id   = CAST(wa.content_id AS UNSIGNED))
             END as title
      FROM website_approvals wa
      WHERE wa.status = 'pending'
      ORDER BY wa.created_at DESC
    `);

    return NextResponse.json({
      success: true,
      newActivities,
      newClubs,
      pendingApprovals,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
