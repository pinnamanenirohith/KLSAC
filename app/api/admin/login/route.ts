import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { signToken } from '@/lib/jwt';
import { ensureSACTables } from '@/lib/db-setup';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  await ensureSACTables();
  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
  }

  try {
    const [rows]: any = await pool.execute(
      'SELECT * FROM sac_admins WHERE username = ?', [username]
    );

    const admin = rows[0];
    if (!admin) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, admin.password_hash);
    if (!valid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = await signToken({ username: admin.username, name: admin.name, role: 'sac_admin' });

    const res = NextResponse.json({ success: true, name: admin.name });
    res.cookies.set('sac_admin', token, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 12,
      path: '/',
    });
    return res;
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
