// app/api/igdb/token/route.ts
import { NextResponse } from 'next/server';

const CLIENT_ID = 'dv3vxpe3dp0dgx7t4kh2dfv3glwdeo';
const CLIENT_SECRET = 'ваш_секретный_ключ'; 

export async function GET() {
  try {
    const response = await fetch(`https://id.twitch.tv/oauth2/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'client_credentials',
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Twitch token error (${response.status}):`, errorText);
      return NextResponse.json(
        { error: `Failed to refresh token: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error refreshing token:', error);
    return NextResponse.json(
      { error: 'Failed to refresh token' },
      { status: 500 }
    );
  }
}