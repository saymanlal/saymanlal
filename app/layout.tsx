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
  description: "'Developer | Author | Entrepreneur, Founded AIALCHEMIST and built AI & Web3 based full stack projects, written \"Might Not The First, But Last\"'",
  url: "https://worksofsayman.vercel.app",
  logoPath: "/logos/sitelogo.png", // Single high-res logo (512x512 recommended)
  author: "Sayman Lal",
  social: {
    twitter: "@worksofsayman"
  }
};

// Font setup
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

// Generate all metadata
export const metadata: Metadata = {
  title: SITE_DATA.title,
  description: SITE_DATA.description,
  metadataBase: new URL(SITE_DATA.url),
  alternates: {
    canonical: "/",
  },
  keywords: ['AI Developer', 'Web3', 'Blockchain', 'Machine Learning', 'TypeScript', 'Python', 'Entrepreneur', 'Founder'],
  authors: [{ name: SITE_DATA.author, url: SITE_DATA.url }],
  creator: SITE_DATA.author,
  verification: {
    google: "GtDRX3ONvRXYgr6Gxfgy4zf1Cml79WpXWbHNIvIoTwE",
  },
  icons: {
    icon: SITE_DATA.logoPath,
    apple: SITE_DATA.logoPath,
    shortcut: SITE_DATA.logoPath,
  },
  openGraph: {
    title: SITE_DATA.title,
    description: SITE_DATA.description,
    url: SITE_DATA.url,
    type: "website",
    siteName: `${SITE_DATA.author} Portfolio`,
    images: [
      {
        url: SITE_DATA.logoPath,
        width: 512,
        height: 512,
        alt: `${SITE_DATA.author} Logo`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_DATA.title,
    description: SITE_DATA.description,
    creator: SITE_DATA.social.twitter,
    images: SITE_DATA.logoPath,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    "geo.placename": "Jabalpur",
    "geo.position": "23.1815° N, 79.9864° E",
    "geo.region": "IN-MP",
    "ICBM": "23.1815, 79.9864"
  }
};

// Generate JSON-LD structured data
const generateStructuredData = () => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_DATA.url}/#person`,
  name: personalInfo.name,
  url: SITE_DATA.url,
  image: `${SITE_DATA.url}${SITE_DATA.logoPath}`,
  jobTitle: personalInfo.title,
  description: personalInfo.bio,
  worksFor: {
    "@type": "Organization",
    name: "AIALCHEMIST"
  },
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "Gyan Ganga Institute of Technology and Sciences (GGITS), Batch AIML-2028"
  },
  sameAs: personalInfo.socials.map(social => social.url),
  birthPlace: {
    "@type": "Place",
    name: "Jabalpur, Madhya Pradesh, India - 482001"
  },
  birthDate: "2007-01-07",
  knowsLanguage: ["English", "Hindi"],
  knowsAbout: [
    "Web Development",
    "Hackathons",
    "Startup Innovation",
    "AI, Machine Learning, Web3, Blockchain, MERN Stack, AWS Cloud",
    "Book & Article Writing"
  ],
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": SITE_DATA.url
  },
  brand: {
    "@type": "Brand",
    "logo": `${SITE_DATA.url}${SITE_DATA.logoPath}`,
    "name": "AIALCHEMIST"
  },
  award: "Hackathon Winner x1",
  "hasCredential": {
    "@type": "EducationalOccupationalCredential",
    "name": "Bachelor in AIML"
  }
});

// Generate PWA manifest content
const generateManifest = () => ({
  name: SITE_DATA.title,
  short_name: SITE_DATA.author,
  icons: [{
    src: SITE_DATA.logoPath,
    sizes: "512x512",
    type: "image/png"
  }],
  theme_color: "#000000",
  background_color: "#000000",
  display: "standalone"
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = generateStructuredData();
  const manifestContent = generateManifest();

  return (
    <html lang="en" suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable} ${inter.variable}`}>
      <head>
        {/* Favicon and PWA tags */}
        <link rel="manifest" href={`data:application/json;charset=utf-8,${encodeURIComponent(JSON.stringify(manifestContent))}`} />
        <meta name="theme-color" content="#000000" />
        
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
  );
}