import type { Metadata } from 'next';

export { default } from '@/app/articles/page';

export const metadata: Metadata = {
  title: 'Articles',
  description:
    'Articles and learning notes from Sunny Bharne on Azure platforms, infrastructure as code, developer tools, and AI agents.',
  alternates: {
    canonical: '/articles/',
  },
  openGraph: {
    title: 'Articles - Sunny Bharne',
    description:
      'Articles and learning notes on Azure platforms, infrastructure as code, developer tools, and AI agents.',
    url: '/articles/',
  },
};
