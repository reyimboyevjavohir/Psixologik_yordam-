import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export async function POST(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const token = (await cookies()).get('accessToken')?.value;
  if (!token) return NextResponse.json({ success: false, message: 'Avval tizimga kiring' }, { status: 401 });
  const { slug } = await params;
  const body = await req.json();
  const res = await fetch(`${API_URL}/tests/${slug}/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(body),
  });
  const json = await res.json();
  return NextResponse.json(json, { status: res.status });
}
