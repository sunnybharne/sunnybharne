import ArticleList from '@/app/components/ArticleList';
import HomePlatformDiagram from '@/app/components/HomePlatformDiagram';
import Link from 'next/link';
import { getArticles } from '@/lib/articles';

export default async function HomePage() {
  const articles = await getArticles();
  return (
    <div className="page-shell home-page">
      <section className="home-intro" aria-label="Introduction">
        <h1>I’m Sunny. I build Azure landing zones.</h1>
        <p className="home-intro-lead">
          Helsinki, Finland · Ten years in engineering.
        </p>
        <HomePlatformDiagram />
        <p>
          I’m building <Link href="/articles/papliba/">Papliba</Link> to trace network connections and check Azure Policy results.
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
