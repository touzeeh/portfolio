/* oxlint-disable react/only-export-components */
import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { SITE_DATA } from '@/data/site';

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

export const viewport: Viewport = {
  themeColor: '#070A14',
  colorScheme: 'dark',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://touzeeh.xyz'),
  title: `${SITE_DATA.personal.fullName} • ${SITE_DATA.personal.title}`,
  description: `${SITE_DATA.personal.headline} ${SITE_DATA.personal.supportingLine}`,
  authors: [{ name: SITE_DATA.personal.fullName, url: SITE_DATA.personal.github }],
  creator: SITE_DATA.personal.fullName,
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://touzeeh.xyz',
    title: `${SITE_DATA.personal.fullName} • Portfolio`,
    description: SITE_DATA.personal.headline,
    siteName: `${SITE_DATA.personal.fullName} Portfolio`,
    images: [
      {
        url: 'https://touzeeh.xyz/og-image.png',
        width: 1200,
        height: 630,
        alt: `${SITE_DATA.personal.fullName} • ${SITE_DATA.personal.title}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_DATA.personal.fullName} • Portfolio`,
    description: SITE_DATA.personal.headline,
    images: ['https://touzeeh.xyz/og-image.png'],
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
    name: SITE_DATA.personal.fullName,
    alternateName: SITE_DATA.personal.shortName,
    jobTitle: SITE_DATA.personal.title,
    url: 'https://touzeeh.xyz',
    sameAs: [SITE_DATA.personal.github, SITE_DATA.personal.linkedin],
    description: SITE_DATA.personal.headline,
  };

  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable} dark scroll-smooth`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var m=window.matchMedia('(prefers-color-scheme: light)').matches;var light=t==='light'||(!t&&m);var d=document.documentElement;if(light){d.classList.add('light');d.classList.remove('dark');d.setAttribute('data-theme','light');}else{d.classList.add('dark');d.classList.remove('light');d.setAttribute('data-theme','dark');}}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased selection:bg-cyan-500/20 selection:text-cyan-300">
        {/* Skip to Content for Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2.5 focus:bg-[var(--surface)] focus:text-[var(--text)] focus:border focus:border-[var(--accent)] focus:rounded-lg focus:shadow-xl focus:outline-none text-sm font-semibold"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
