import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // never prerender
export const runtime = 'nodejs'; // ensure Node runtime

const ALLOWED_HOSTS = new Set([
  'hizliresim.com',
  'www.hizliresim.com',
  'i.hizliresim.com',
]);

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url');
  if (!url) return NextResponse.json({ error: 'Missing url' }, { status: 400 });

  let target: URL;
  try {
    target = new URL(url);
  } catch {
    return NextResponse.json({ error: 'Bad url' }, { status: 400 });
  }

  if (!ALLOWED_HOSTS.has(target.hostname)) {
    return NextResponse.json({ error: 'Host not allowed' }, { status: 400 });
  }

  const res = await fetch(target.toString(), {
    // some hosts require explicit headers to allow hotlink
    headers: {
      Referer: 'https://hizliresim.com/',
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
      Accept: 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: `Upstream fetch failed (${res.status})` },
      { status: res.status }
    );
  }

  const contentType = res.headers.get('content-type') ?? 'image/jpeg';
  const arrayBuffer = await res.arrayBuffer();

  return new NextResponse(arrayBuffer, {
    headers: {
      'content-type': contentType,
      'cache-control': 'public, max-age=3600, stale-while-revalidate=86400',
      'access-control-allow-origin': '*',
    },
  });
}
