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
          I build Azure platforms in Helsinki. I’ve worked in engineering for ten years.
        </p>
        <HomePlatformDiagram />
        <h2>What I work on</h2>
        <ul>
          <li>I build landing zones, subscriptions, and management groups with Terraform and Bicep.</li>
          <li>I run Azure DevOps pipelines on self-hosted agents and manage repos and service connections.</li>
          <li>I roll out Azure Policy in stages, test infrastructure with Pester and Terraform, and track changes in ServiceNow.</li>
        </ul>
        <p>
          I’m building <Link href="/articles/papliba/">Papliba</Link> to inspect Azure networks and policy results.
          Here’s my <Link href="/learning/">Azure certification plan</Link>.
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
