import ArticleList from '@/app/components/ArticleList';
import HomePlatformDiagram from '@/app/components/HomePlatformDiagram';
import Link from 'next/link';
import { getArticles } from '@/lib/articles';

export default async function HomePage() {
  const articles = await getArticles();
  return (
    <div className="page-shell home-page">
      <section className="home-intro" aria-label="Introduction">
        <h1>I’m Sunny. I do all things Azure.</h1>
        <p className="home-intro-lead">
          I’m an Azure platform engineer with a decade of experience, based in Helsinki, Finland.
        </p>
        <HomePlatformDiagram />
        <h2>What I work on</h2>
        <ul>
          <li>
            <strong>Azure DevOps:</strong> pipelines, self-hosted agents, repos, and service connections.
          </li>
          <li>
            <strong>Infrastructure as code:</strong> Terraform and Bicep for subscriptions,
            management groups, and platform, standard, and shared landing zones.
          </li>
          <li>
            <strong>Platform governance:</strong> Azure Policy provisioning and staged releases,
            guided by the Cloud Adoption Framework and my own architectural experience.
          </li>
          <li>
            <strong>Change management and testing:</strong> ServiceNow, Pester, and Terraform testing tools.
          </li>
        </ul>
        <p>
          Before Azure, I worked in Java, building Selenium automation and test frameworks
          for regression and integration testing. I also use{' '}
          <a href="https://github.com/sunnybharne/nvim">Vim</a>—judge me!
        </p>
        <p>
          This is where I dump my brain: practical notes, what I’m building with{' '}
          <Link href="/articles/papliba/">Papliba</Link>, and{' '}
          <Link href="/learning/">what I’m learning</Link>.
        </p>
        <nav className="project-links" aria-label="Introduction profiles and contact">
          <a className="text-link" href="https://github.com/sunnybharne">GitHub</a>
          <a className="text-link" href="https://www.linkedin.com/in/sunnybharne/">LinkedIn</a>
          <a className="text-link" href="mailto:sunny@papliba.com">Email</a>
        </nav>
      </section>
      <section aria-labelledby="recent-title">
        <div className="section-heading">
          <h2 id="recent-title">Articles</h2>
        </div>
        <ArticleList articles={articles.slice(0, 6)} compact />
      </section>
    </div>
  );
}
