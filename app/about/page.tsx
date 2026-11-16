import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Sunny Bharne builds Azure landing zones in Helsinki. He previously built Java test frameworks.',
  alternates: { canonical: '/about/' },
  openGraph: {
    title: 'About — Sunny Bharne',
    description: 'Sunny Bharne builds Azure landing zones in Helsinki. He previously built Java test frameworks.',
    url: '/about/',
  },
};

export default function AboutPage() {
  return (
    <article className="page-shell">
      <header className="page-heading">
        <h1>Hello, I&apos;m Sunny.</h1>
        <p className="page-intro">Azure platform engineer. Based in Helsinki.</p>
      </header>

      <div className="prose-copy">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/profile.jpg"
          alt="Sunny Bharne"
          width={144}
          height={144}
          className="about-portrait"
        />
        <p>
          I build Azure landing zones with Terraform and Bicep. Before Azure, I wrote
          Java and Selenium frameworks for regression and integration tests.
        </p>
      </div>

      <section className="page-section prose-copy">
        <h2>Outside work</h2>
        <p>
          I tinker with AI agents, developer tools, and <a href="https://github.com/sunnybharne/nvim">Neovim</a>.
          I write up my Azure labs in the <Link href="/articles/">articles</Link>.
        </p>
      </section>

      <section className="page-section prose-copy">
        <h2>Find me</h2>
        <nav aria-label="Sunny's profiles and contact" className="project-links">
          <a className="text-link" href="https://github.com/sunnybharne">GitHub</a>
          <a className="text-link" href="https://www.linkedin.com/in/sunnybharne/">LinkedIn</a>
          <a className="text-link" href="https://www.youtube.com/@sunnybharne" rel="me">YouTube</a>
          <a className="text-link" href="mailto:sunny@papliba.com">Email</a>
        </nav>
      </section>
    </article>
  );
}
