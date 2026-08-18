import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import pool from '@/lib/db';
import { ensureSACTables } from '@/lib/db-setup';

export async function GET(req: NextRequest) {
  await ensureSACTables();
  const domain = req.nextUrl.searchParams.get('domain');

  try {
    const params: string[] = [];
    let domainClause = '';
    if (domain && domain !== 'all') {
      domainClause = 'AND ac.domain = ?';
      params.push(domain);
    }

    const [rows] = await pool.execute(`
      SELECT ac.code, ac.title, ac.description, ac.domain, ac.category,
             ac.sdc_credits, ac.activity_date, ac.venue, ac.max_seats,
             ac.difficulty, ac.level, ac.faculty_name, ac.poster_url,
             (SELECT COUNT(*) FROM activity_enrollments ae WHERE ae.activity_code = ac.code) as enrolledCount
      FROM activity_catalogue ac
      INNER JOIN website_approvals wa
        ON wa.content_type = 'activity' AND wa.content_id = ac.code
      WHERE wa.status = 'approved' ${domainClause}
      ORDER BY ac.activity_date DESC, ac.created_at DESC
    `, params);

    return NextResponse.json({ success: true, data: rows });
  } catch {
    return NextResponse.json({ success: false, data: [] });
  }
}
