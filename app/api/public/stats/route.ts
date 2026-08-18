import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { ensureSACTables } from '@/lib/db-setup';

export async function GET() {
  await ensureSACTables();
  try {
    const [[clubs], [students], [activities]] = await Promise.all([
      pool.execute('SELECT COUNT(*) as count FROM clubs'),
      pool.execute('SELECT COUNT(*) as count FROM students'),
      pool.execute(`
        SELECT COUNT(*) as count FROM activity_catalogue ac
        INNER JOIN website_approvals wa
          ON wa.content_type = 'activity' AND wa.content_id = ac.code
        WHERE wa.status = 'approved'
      `),
    ]);

    return NextResponse.json({
      clubs:      (clubs as any[])[0].count,
      students:   (students as any[])[0].count,
      activities: (activities as any[])[0].count,
    });
  } catch {
    return NextResponse.json({ clubs: 0, students: 0, activities: 0 });
  }
}
