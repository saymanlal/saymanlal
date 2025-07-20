import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/lib/theme-context';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import MatrixRain from '@/components/ui/matrix-rain';
import personalInfo from '@/lib/data/personal-info.json';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sayman Lal - AI Developer & Entrepreneur',
  description: 'AI & Web3 Developer, Author, Founder of AIALCHEMIST & VASILIADES. Building the future with intelligent solutions.',
  keywords: ['AI Developer', 'Web3', 'Blockchain', 'Machine Learning', 'TypeScript', 'Python', 'Entrepreneur'],
  authors: [{ name: 'Sayman Lal', url: 'https://sayman.dev' }],
  creator: 'Sayman Lal',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sayman.dev',
    title: 'Sayman Lal - AI Developer & Entrepreneur',
    description: 'AI & Web3 Developer, Author, Founder of AIALCHEMIST & VASILIADES',
    siteName: 'Sayman Lal Portfolio',
    images: [
      {
        url: 'https://sayman.dev/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Sayman Lal - AI Developer & Entrepreneur',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sayman Lal - AI Developer & Entrepreneur',
    description: 'AI & Web3 Developer, Author, Founder of AIALCHEMIST & VASILIADES',
    creator: '@codechemist',
    images: ['https://sayman.dev/og-image.jpg'],
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
  verification: {
    google: 'your-google-verification-code',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: personalInfo.name,
  alternateName: personalInfo.alias,
  jobTitle: personalInfo.title,
  description: personalInfo.bio,
  url: personalInfo.website,
  email: personalInfo.email,
  image: personalInfo.imageUrl,
  sameAs: personalInfo.socials.map(social => social.url),
  address: {
    '@type': 'PostalAddress',
    addressLocality: personalInfo.location,
  },
  worksFor: [
    {
      '@type': 'Organization',
      name: 'AIALCHEMIST',
      url: 'https://aialchemist.dev',
    },
    {
      '@type': 'Organization',
      name: 'VASILIADES',
      url: 'https://vasiliades.dev',
    },
  ],
  knowsAbout: [
    'Artificial Intelligence',
    'Machine Learning',
    'Web3',
    'Blockchain',
    'Smart Contracts',
    'TypeScript',
    'Python',
    'React',
    'Next.js',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            <MatrixRain />
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}