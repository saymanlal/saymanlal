import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { GeistSans, GeistMono } from 'geist/font';
import { ThemeProvider } from '../lib/theme-context';
import Header from '../components/layout/header';
import Footer from '../components/layout/footer';
import MatrixRain from '../components/ui/matrix-rain';
import personalInfo from '../lib/data/personal-info.json';
import SupabaseProvider from './providers';
import './globals.css';

// Configuration
const SITE_DATA = {
  title: "Sayman Lal | Portfolio",
  description: "Developer | Author | Entrepreneur, Founded AIALCHEMIST and built AI & Web3 based full stack projects, written 'Might Not The First, But Last'",
  url: "https://worksofsayman.vercel.app",
  logoPath: "/logos/sitelogo.webp",
  author: "Sayman Lal",
  social: {
    twitter: "@worksofsayman",
    github: "worksofsayman",
    linkedin: "in/worksofsayman"
  }
};

// Font setup
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

// Enhanced Metadata
export const metadata: Metadata = {
  title: {
    default: SITE_DATA.title,
    template: `%s | ${SITE_DATA.author}`
  },
  description: SITE_DATA.description,
  metadataBase: new URL(SITE_DATA.url),
  alternates: {
    canonical: "/",
  },
  keywords: [
    'AI Developer', 'Web3', 'Blockchain', 'Machine Learning',
    'TypeScript', 'Python', 'Entrepreneur', 'Founder',
    'Next.js', 'React', 'Full Stack Developer', 'Jabalpur',
    'AIALCHEMIST', 'Hackathon Winner', 'AIML Student'
  ],
  authors: [{
    name: SITE_DATA.author,
    url: SITE_DATA.url
  }],
  creator: SITE_DATA.author,
  publisher: SITE_DATA.author,
  verification: {
    google: "GtDRX3ONvRXYgr6Gxfgy4zf1Cml79WpXWbHNIvIoTwE",
    yandex: "51368645d58b6a5c", // Add your Yandex code here
    other: {
      "msvalidate.01": "BING_VERIFICATION_CODE", // Add Bing code here
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: SITE_DATA.logoPath, sizes: '512x512', type: 'image/webp' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
      { url: SITE_DATA.logoPath, sizes: '512x512', type: 'image/webp' },
    ],
    shortcut: [SITE_DATA.logoPath],
  },
  openGraph: {
    title: SITE_DATA.title,
    description: SITE_DATA.description,
    url: SITE_DATA.url,
    type: "website",
    siteName: `${SITE_DATA.author} Portfolio`,
    locale: 'en_IN',
    images: [
      {
        url: SITE_DATA.logoPath,
        width: 512,
        height: 512,
        alt: `${SITE_DATA.author} Logo`,
      },
      {
        url: '/sayman.png', // Add your image here
        width: 1200,
        height: 630,
        alt: `${SITE_DATA.author} Profile`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_DATA.title,
    description: SITE_DATA.description,
    creator: SITE_DATA.social.twitter,
    site: SITE_DATA.social.twitter,
    images: [
      SITE_DATA.logoPath,
      '/images/sayman.png' // Add your image here
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    "geo.placename": "Jabalpur",
    "geo.position": "23.1815; 79.9864", // Simplified format
    "geo.region": "IN-MP",
    "ICBM": "23.1815, 79.9864",
    "dc.language": "en",
    "dc.source": SITE_DATA.url,
    "twitter:dnt": "on",
    "fb:app_id": "worksofsayman", // Add if you have FB app
    "fb:pages": "aialchemistorg", // Add if you have FB page
    "ahrefs-site-verification": "", // Add if using ahrefs
    "p:domain_verify": "", // Add Pinterest verification
    "msapplication-TileColor": "#000000",
    "theme-color": "#000000"
  }
};

// Enhanced JSON-LD structured data
const generateStructuredData = () => {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_DATA.url}/#person`,
    name: personalInfo.name,
    url: SITE_DATA.url,
    image: `${SITE_DATA.url}${SITE_DATA.logoPath}`,
    jobTitle: personalInfo.title,
    description: personalInfo.bio,
    gender: "Male",
    nationality: {
      "@type": "Country",
      name: "India"
    },
    worksFor: {
      "@type": "Organization",
      name: "AIALCHEMIST",
      url: "https://aialchemist.vercel.app" // Add your org URL if available
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Gyan Ganga Institute of Technology and Sciences (GGITS)",
      url: "https://ggits.org", // Add school URL if available
      sameAs: "https://en.wikipedia.org/wiki/Gyan_Ganga_Institute_of_Technology_and_Sciences"
    },
    sameAs: [
      ...personalInfo.socials.map(social => social.url),
      `https://twitter.com/${SITE_DATA.social.twitter.replace('@', '')}`,
      `https://github.com/${SITE_DATA.social.github}`,
      `https://linkedin.com/${SITE_DATA.social.linkedin}`
    ],
    birthPlace: {
      "@type": "Place",
      name: "Jabalpur, Madhya Pradesh, India",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Jabalpur",
        addressRegion: "Madhya Pradesh",
        postalCode: "482001",
        addressCountry: "IN"
      }
    },
    birthDate: "2007-01-07",
    knowsLanguage: ["English", "Hindi"],
    knowsAbout: [
      "Web Development",
      "Hackathons",
      "Startup Innovation",
      "Artificial Intelligence",
      "Machine Learning",
      "Web3",
      "Blockchain",
      "MERN Stack",
      "AWS Cloud",
      "Technical Writing"
    ],
    hasOccupation: {
      "@type": "Occupation",
      name: "AI Developer",
      description: "Building AI-powered solutions and web applications"
    },
    memberOf: {
      "@type": "Organization",
      name: "AIALCHEMIST",
      description: "AI development company"
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": SITE_DATA.url
    },
    brand: {
      "@type": "Brand",
      "logo": `${SITE_DATA.url}${SITE_DATA.logoPath}`,
      "name": "AIALCHEMIST",
      "description": "AI development and consulting"
    },
    award: {
      "@type": "Award",
      "name": "Hackathon Winner",
      "awardedFor": "Visualization Platform",
      "dateReceived": "2024" // Add actual date if available
    },
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      "name": "Bachelor in Artificial Intelligence and Machine Learning",
      "educationalLevel": "Undergraduate",
      "credentialCategory": "Degree"
    },
    potentialAction: {
      "@type": "SearchAction",
      "target": `${SITE_DATA.url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  return data;
};

// Enhanced PWA manifest
const generateManifest = () => ({
  name: SITE_DATA.title,
  short_name: SITE_DATA.author,
  description: SITE_DATA.description,
  start_url: "/",
  display: "standalone",
  orientation: "portrait",
  background_color: "#000000",
  theme_color: "#000000",
  icons: [
    {
      src: SITE_DATA.logoPath,
      sizes: "512x512",
      type: "image/webp",
      purpose: "any maskable"
    },
    {
      src: "/icons/icon-192x192.png",
      sizes: "192x192",
      type: "image/png"
    },
    {
      src: "/icons/icon-512x512.png",
      sizes: "512x512",
      type: "image/png"
    }
  ],
  related_applications: [
    {
      platform: "web",
      url: SITE_DATA.url
    }
    // Add Play Store/App Store links if you have mobile apps
  ],
  prefer_related_applications: false,
  categories: ["technology", "education", "portfolio"],
  screenshots: [
    // Add screenshots of your site for app stores
  ]
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const structuredData = generateStructuredData()
  const manifestContent = generateManifest()

  return (
    <html 
      lang="en" 
      suppressHydrationWarning 
      className={`${GeistSans.variable} ${GeistMono.variable} ${inter.variable}`}
    >
      <head>
        {/* Favicon and PWA tags */}
        <link rel="manifest" href={`data:application/json;charset=utf-8,${encodeURIComponent(JSON.stringify(manifestContent))}`} />
        <meta name="theme-color" content="#000000" />

        {/* Verification codes */}
        <meta name="yandex-verification" content="YANDEX_VERIFICATION_CODE" />
        <meta name="msvalidate.01" content="BING_VERIFICATION_CODE" />

        {/* Additional SEO meta tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content={SITE_DATA.author} />
        <meta name="application-name" content={SITE_DATA.author} />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="antialiased bg-background text-foreground">
        <SupabaseProvider>
          <ThemeProvider>
            <div className="min-h-screen flex flex-col relative overflow-hidden">
              <MatrixRain />
              <Header logoUrl={SITE_DATA.logoPath} />
              <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
              </main>
              <Footer />
            </div>
          </ThemeProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}