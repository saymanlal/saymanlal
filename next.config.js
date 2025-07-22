/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'upload.wikimedia.org',
      'cdn.jsdelivr.net',
      'source.unsplash.com'
    ],
    // Alternatively, you can use remotePatterns for more security (Next.js 13+)
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'upload.wikimedia.org',
    //   },
    //   {
    //     protocol: 'https',
    //     hostname: 'cdn.jsdelivr.net',
    //   },
    // ],
  },
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff'
        },
        {
          key: 'X-Frame-Options',
          value: 'SAMEORIGIN'
        },
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=63072000; includeSubDomains; preload'
        }
      ]
    },
  ],
  transpilePackages: ['framer-motion'],
}

module.exports = nextConfig
module.exports = {
  // ... existing config
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  }
}
