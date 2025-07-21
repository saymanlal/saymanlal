import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/'],
    },
    sitemap: 'https://worksofsayman.vercel.app/sitemap.xml',
    host: 'https://worksofsayman.vercel.app'
  }
}
