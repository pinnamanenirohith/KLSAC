import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { ensureSACTables } from '@/lib/db-setup';
import bcrypt from 'bcryptjs';

// One-time setup endpoint — creates the first admin account.
// Disable or remove this route after initial setup.
export async function POST(req: NextRequest) {
  const setupKey = req.headers.get('x-setup-key');
  if (setupKey !== process.env.ADMIN_SETUP_PASSWORD) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  await ensureSACTables();
  const { username, password, name } = await req.json();

  if (!username || !password) {
    return NextResponse.json({ error: 'username and password required' }, { status: 400 });
  }

  const hash = await bcrypt.hash(password, 12);
  try {
    await pool.execute(
      'INSERT INTO sac_admins (username, password_hash, name) VALUES (?, ?, ?)',
      [username, hash, name ?? username]
    );
    return NextResponse.json({ success: true, message: 'Admin created. Remove this route now.' });
  } catch (e: any) {
    if (e.code === 'ER_DUP_ENTRY') {
      return NextResponse.json({ error: 'Username already exists' }, { status: 400 });
    }
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
