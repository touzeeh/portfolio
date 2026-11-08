import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { SITE_DATA } from '@/data/site';
import { ThemeProvider } from '@/components/ui/ThemeProvider';

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
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#070A14' },
    { media: '(prefers-color-scheme: light)', color: '#F7F6F2' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL('https://touzeeh.xyz'),
  title: `${SITE_DATA.personal.fullName} • ${SITE_DATA.personal.title}`,
  description: `${SITE_DATA.personal.headline} ${SITE_DATA.personal.supportingLine}`,
  authors: [{ name: SITE_DATA.personal.fullName, url: SITE_DATA.personal.github }],
  creator: SITE_DATA.personal.fullName,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://touzeeh.xyz',
    title: `${SITE_DATA.personal.fullName} • Portfolio`,
    description: SITE_DATA.personal.headline,
    siteName: `${SITE_DATA.personal.fullName} Portfolio`,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_DATA.personal.fullName} • Portfolio`,
    description: SITE_DATA.personal.headline,
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
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}>
      <head>
        {/* Synchronous inline script to prevent theme flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function() {
              try {
                var saved = localStorage.getItem('theme');
                var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                var theme = saved ? saved : (prefersDark ? 'dark' : 'light');
                document.documentElement.setAttribute('data-theme', theme);
                document.documentElement.style.colorScheme = theme;
              } catch(e) {}
            })();`,
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
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
