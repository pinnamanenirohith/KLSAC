import { NextResponse } from 'next/server';
import { DEMO_CLUBS } from '@/lib/demo-data';

export async function GET() {
  return NextResponse.json({ success: true, data: DEMO_CLUBS });
}
