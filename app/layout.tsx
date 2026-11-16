import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Link from 'next/link';
import './globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.sunnybharne.com'),
  title: { default: 'Sunny Bharne — Azure platform engineering', template: '%s — Sunny Bharne' },
  description: 'Azure Policy, networking, and infrastructure as code by Sunny Bharne.',
  openGraph: {
    title: 'Sunny Bharne — Azure platform engineering',
    description: 'Azure Policy, networking, and infrastructure as code by Sunny Bharne.',
    url: 'https://www.sunnybharne.com', siteName: 'Sunny Bharne', type: 'website',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" dir="ltr" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <header className="site-header">
          <div className="site-header-inner">
            <Link href="/" className="site-name">Sunny Bharne<span aria-hidden="true">.</span></Link>
            <nav aria-label="Main navigation">
              <Link href="/articles/">Articles</Link>
              <Link href="/learning/">Learning</Link>
              <a href="https://github.com/sunnybharne">GitHub</a>
              <Link href="/about/">About</Link>
            </nav>
          </div>
        </header>
        <main id="main-content">{children}</main>
        <footer className="site-footer">
          <div className="site-footer-inner">
            <p>© {new Date().getFullYear()} Sunny Bharne<span>Helsinki, Finland</span></p>
            <nav aria-label="Elsewhere">
              <a href="https://github.com/sunnybharne">GitHub</a>
              <a href="https://www.linkedin.com/in/sunnybharne/">LinkedIn</a>
              <a href="https://www.youtube.com/@sunnybharne" rel="me">YouTube</a>
              <a href="https://x.com/thesunnybharne" rel="me">X</a>
              <a href="mailto:sunny@papliba.com">Email</a>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
