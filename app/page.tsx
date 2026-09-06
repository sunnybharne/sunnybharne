import Link from 'next/link';
import ArticleList from '@/app/components/ArticleList';
import { getArticles } from '@/lib/articles';

export default async function HomePage() {
  const articles = await getArticles();
  return (
    <div className="page-shell home-page">
      <section className="home-intro" aria-label="Introduction">
        <p>I’m Sunny, an Azure platform engineer in Helsinki. This is where I dump my brain.</p>
        <Link href="/about/" className="text-link">A little about me →</Link>
      </section>
      <section aria-labelledby="recent-title">
        <div className="section-heading">
          <h2 id="recent-title">Latest articles</h2>
          <Link href="/articles/" className="text-link">All articles →</Link>
        </div>
        <ArticleList articles={articles.slice(0, 6)} />
      </section>
      <aside className="home-endnote">
        <p>Some things are easier to show.</p>
        <div><a href="https://www.youtube.com/@sunnybharne" className="text-link">Watch the videos ↗</a><Link href="/projects/" className="text-link">Explore my projects →</Link></div>
      </aside>
    </div>
  );
}
