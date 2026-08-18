import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { ensureSACTables } from '@/lib/db-setup';

export async function GET() {
  await ensureSACTables();
  try {
    const [rows] = await pool.execute(`
      SELECT ac.code, ac.title, ac.description, ac.domain, ac.activity_date,
             ac.venue, ac.start_time, ac.end_time, ac.faculty_name, ac.poster_url,
             ac.max_seats,
             (SELECT COUNT(*) FROM activity_enrollments ae WHERE ae.activity_code = ac.code) as enrolledCount
      FROM activity_catalogue ac
      INNER JOIN website_approvals wa
        ON wa.content_type = 'activity' AND wa.content_id = ac.code
      WHERE wa.status = 'approved'
        AND ac.activity_date IS NOT NULL
      ORDER BY
        CASE WHEN ac.activity_date >= CURDATE() THEN 0 ELSE 1 END,
        ac.activity_date ASC
      LIMIT 50
    `);
    return NextResponse.json({ success: true, data: rows });
  } catch {
    return NextResponse.json({ success: false, data: [] });
  }
}
