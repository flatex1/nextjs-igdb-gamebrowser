import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { endpoint, query } = await request.json();

    if (!endpoint || !query) {
      return NextResponse.json(
        { error: 'Missing endpoint or query parameter' },
        { status: 400 }
      );
    }
    
    if (!process.env.IGDB_CLIENT_ID || !process.env.IGDB_ACCESS_TOKEN || !process.env.IGDB_PUBLIC_API_URL) {
      return NextResponse.json(
        { error: 'Missing envirenment variables' },
        { status: 500 }
      );
    }

    const response = await fetch(`${process.env.IGDB_PUBLIC_API_URL}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Client-ID': process.env.IGDB_CLIENT_ID,
        'Authorization': `Bearer ${process.env.IGDB_ACCESS_TOKEN}`,
        'Content-Type': 'text/plain',
      },
      body: query,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`IGDB API error (${response.status}):`, errorText);
      return NextResponse.json(
        { error: `IGDB API error: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in IGDB API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data from IGDB' },
      { status: 500 }
    );
  }
}