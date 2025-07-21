import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title')

  return new ImageResponse(
    (
      <div style={{ background: 'black', width: '100%', height: '100%', display: 'flex' }}>
        <img 
          src={`${process.env.NEXT_PUBLIC_SITE_URL}/logos/sitelogo.png`} 
          style={{ width: 256, height: 256 }}
        />
        <h1 style={{ color: 'white', fontSize: 60 }}>{title}</h1>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}