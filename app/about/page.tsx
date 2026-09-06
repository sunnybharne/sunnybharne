import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Sunny Bharne, an Azure platform engineer in Helsinki. A little about my work, background, and what I am learning.',
  alternates: { canonical: '/about/' },
  openGraph: {
    title: 'About — Sunny Bharne',
    description: 'Azure platform engineering, learning, and side projects from Helsinki.',
    url: '/about/',
  },
};

export default function AboutPage() {
  return (
    <article className="page-shell">
      <header className="page-heading">
        <p className="eyebrow">About</p>
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
          I have spent about a decade in engineering. These days I build Azure
          landing zones, write infrastructure with Terraform and Bicep, and work
          on the policies, pipelines, and tests that keep a platform running.
        </p>
        <p>
          Before that, I worked in Java and test automation: Selenium, test
          frameworks, and the plumbing around regression and integration tests.
          That background still shapes how I approach infrastructure.
        </p>
        <p>
          This blog is where I keep practical notes from that work and from
          things I am learning. I write down the steps, the behaviour I observe,
          and the references that help explain it.
        </p>
      </div>

      <section className="page-section prose-copy">
        <h2>Outside the day job</h2>
        <p>
          I tinker with AI agents, developer tools, and my Neovim setup. My{' '}
          <a href="https://github.com/sunnybharne">projects are on GitHub</a>, and
          I write about what I learn in the <Link href="/articles/">articles</Link>.
        </p>
      </section>

      <section className="page-section prose-copy">
        <h2>Find me elsewhere</h2>
        <p>
          I share code on GitHub and walkthroughs on YouTube. Email is welcome
          if you want to compare notes.
        </p>
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
