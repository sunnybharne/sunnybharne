import ArticleList from '@/app/components/ArticleList';
import NotebookMotion from '@/app/components/NotebookMotion';
import { getArticles } from '@/lib/articles';

export default async function HomePage() {
  const articles = await getArticles();
  return (
    <div className="page-shell home-page">
      <section className="home-intro" aria-label="Introduction">
        <p>I’m Sunny, an Azure platform engineer in Helsinki. This is where I dump my brain.</p>
        <NotebookMotion />
      </section>
      <section aria-labelledby="recent-title">
        <div className="section-heading">
          <h2 id="recent-title">Latest articles</h2>
        </div>
        <ArticleList articles={articles.slice(0, 6)} compact />
      </section>
    </div>
  );
}
