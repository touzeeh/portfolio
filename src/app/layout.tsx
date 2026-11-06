import type { Metadata } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { PERSONAL_INFO } from '@/data/portfolioData';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://touzeehverse.xyz'),
  title: `${PERSONAL_INFO.fullName} • ${PERSONAL_INFO.title}`,
  description: `${PERSONAL_INFO.headline} 2nd-year BTech CSE student at LNCT Bhopal specializing in full-stack web platforms, 3D spatial experiences, and intelligent AI tools.`,
  keywords: [
    'Mohammed Touzeeh Ahmed',
    'Touzeeh Ahmed',
    'Touzeeh',
    'BTech CSE',
    'LNCT Bhopal',
    'Full-Stack Developer',
    'Three.js',
    'Next.js',
    'React',
    'FastAPI',
    'Flutter',
    'InnerSight',
    'KarigarKart',
    'RouteGuard',
  ],
  authors: [{ name: PERSONAL_INFO.fullName, url: PERSONAL_INFO.github }],
  creator: PERSONAL_INFO.fullName,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://touzeehverse.xyz',
    title: `${PERSONAL_INFO.fullName} • Portfolio`,
    description: PERSONAL_INFO.headline,
    siteName: `${PERSONAL_INFO.fullName} Portfolio`,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: `${PERSONAL_INFO.fullName} Portfolio Preview`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${PERSONAL_INFO.fullName} • Portfolio`,
    description: PERSONAL_INFO.headline,
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: PERSONAL_INFO.fullName,
    alternateName: PERSONAL_INFO.shortName,
    jobTitle: 'Full-Stack Developer & Student',
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: PERSONAL_INFO.institution,
    },
    url: 'https://touzeehverse.xyz',
    sameAs: [PERSONAL_INFO.github, PERSONAL_INFO.linkedin],
    description: PERSONAL_INFO.headline,
  };

  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} scroll-smooth dark`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#030712] text-slate-100 antialiased selection:bg-violet-600/30 selection:text-violet-200">
        {/* Skip to Content for Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-violet-600 focus:text-white focus:rounded-xl focus:shadow-xl focus:outline-none"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
