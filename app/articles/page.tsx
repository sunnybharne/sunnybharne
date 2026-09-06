import type { Metadata } from 'next';
import Link from 'next/link';
import ArticleList from '@/app/components/ArticleList';
import { getArticles } from '@/lib/articles';

export const metadata: Metadata = {
  title: 'Articles',
  description: 'Notes on Azure, automation and learning through real work.',
  alternates: { canonical: '/articles/' },
};

export default async function ArticlesPage() {
  const articles = await getArticles();
  return (
    <div className="page-shell">
      <header className="page-heading">
        <p className="eyebrow">The notebook</p>
        <h1>Articles</h1>
        <p className="page-intro">Things I have built, tested and learned. <Link className="text-link" href="/topics/">Browse by topic →</Link></p>
      </header>
      <ArticleList articles={articles} />
    </div>
  );
}
