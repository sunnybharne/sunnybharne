import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Link from 'next/link';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://sunnybharne.dev'),
  title: {
    default: 'Sunny Bharne — I do all things Azure.',
    template: '%s — Sunny Bharne',
  },
  description:
    'Sunny Bharne — Azure Platform Engineer based in Helsinki, Finland. A decade of experience across Azure DevOps, Infrastructure as Code (Bicep, Terraform), Landing Zones, and Azure Policy.',
  openGraph: {
    title: 'Sunny Bharne — I do all things Azure.',
    description:
      'Azure Platform Engineer in Helsinki. Azure DevOps, IaC (Bicep + Terraform), Landing Zones, Azure Policy.',
    url: 'https://sunnybharne.dev',
    siteName: 'Sunny Bharne',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground">
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}

function SiteHeader() {
  return (
    <header className="border-b border-black/5 dark:border-white/10">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-bold tracking-widest">
          SUNNY BHARNE
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <a
            href="https://github.com/sunnybharne"
            className="opacity-70 hover:opacity-100"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/sunnybharne/"
            className="opacity-70 hover:opacity-100"
          >
            LinkedIn
          </a>
          <a
            href="mailto:sunny.bharne@outlook.com"
            className="opacity-70 hover:opacity-100"
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-black/5 dark:border-white/10">
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-2 px-6 py-6 text-sm opacity-70 sm:flex-row sm:items-center">
        <span>© {new Date().getFullYear()} Sunny Bharne. Helsinki, Finland.</span>
        <span className="opacity-60">I use VIM. Judge me.</span>
      </div>
    </footer>
  );
}
