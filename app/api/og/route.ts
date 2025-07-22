import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'
import React from 'react'

// Configuration constants
const config = {
  size: {
    width: 1200,
    height: 630,
  },
  runtime: 'edge' as const,
  contentType: 'image/png' as const,
}

// Font loader utility
async function loadFont(siteUrl: string): Promise<ArrayBuffer | null> {
  try {
    const fontUrl = new URL('/fonts/Inter-SemiBold.ttf', siteUrl).toString()
    const response = await fetch(fontUrl)
    return await response.arrayBuffer()
  } catch {
    return null
  }
}

// Style definitions
const containerStyle = {
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #1a1a1a 0%, #000000 100%)',
  color: 'white',
  fontFamily: 'Inter, sans-serif',
  padding: '0 80px',
  textAlign: 'center',
}

const logoStyle = {
  width: 120,
  height: 120,
  marginBottom: 40,
  borderRadius: '50%',
  objectFit: 'cover',
  border: '4px solid rgba(255,255,255,0.1)'
}

const titleStyle = {
  fontSize: 72,
  fontWeight: 700,
  margin: '0 0 20px 0',
  lineHeight: 1.2,
  background: 'linear-gradient(to right, #ffffff, #dddddd)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  color: 'transparent',
}

const descriptionStyle = {
  fontSize: 32,
  opacity: 0.8,
  margin: 0,
  maxWidth: '80%',
}

export async function GET(request: NextRequest) {
  try {
    // Validate environment
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
    if (!siteUrl) throw new Error('Missing site URL configuration')

    // Parse request parameters
    const { searchParams } = new URL(request.url)
    const title = searchParams.get('title') || 'My Portfolio'
    const description = searchParams.get('description') || ''

    // Load assets
    const [fontData, logoUrl] = await Promise.all([
      loadFont(siteUrl),
      new URL('/logos/sitelogo.png', siteUrl).toString()
    ])

    // Image generation using React.createElement instead of JSX
    return new ImageResponse(
      React.createElement(
        'div',
        { style: containerStyle },
        [
          React.createElement('img', {
            src: logoUrl,
            alt: "Site Logo",
            style: logoStyle
          }),
          React.createElement('h1', {
            style: titleStyle
          }, title),
          description && React.createElement('p', {
            style: descriptionStyle
          }, description)
        ].filter(Boolean) // Remove falsy values (like when description is empty)
      ),
      {
        ...config.size,
        fonts: fontData ? [{
          name: 'Inter',
          data: fontData,
          style: 'normal',
          weight: 700,
        }] : undefined,
      }
    )
  } catch (error: unknown) {
    console.error('OG Image Generation Error:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Failed to generate image',
        message: error instanceof Error ? error.message : 'Unknown error'
      }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' } 
      }
    )
  }
}