import type { Metadata } from 'next';

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
        <h1>Sunny Bharne</h1>
        <p className="page-intro">Azure platform engineer in Helsinki.</p>
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
          I deploy landing zones with Terraform and Bicep, test them with Pester, and roll out Azure Policy in stages.
          Before Azure, I built test frameworks with Java and Selenium.
        </p>
        <p>
          Outside work, I tinker with AI agents and <a href="https://github.com/sunnybharne/nvim">Neovim</a>.
        </p>
      </div>

      <section className="page-section prose-copy">
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
