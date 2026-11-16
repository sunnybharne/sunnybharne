import type { Metadata } from 'next';
import ArticleList from '@/app/components/ArticleList';
import { getArticles } from '@/lib/articles';

export const metadata: Metadata = {
  title: 'Articles',
  description: 'Azure labs on policy, networking, VM configuration, and Logic Apps.',
  alternates: { canonical: '/articles/' },
};

export default async function ArticlesPage() {
  const articles = await getArticles();
  return (
    <div className="page-shell">
      <ArticleList articles={articles} />
    </div>
  );
}
