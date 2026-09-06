import Link from 'next/link';
import { shortDate, type ArticleSummary } from '@/lib/articles';

export default function ArticleList({ articles, compact = false }: { articles: ArticleSummary[]; compact?: boolean }) {
  if (articles.length === 0) return <p className="page-intro">No articles here yet.</p>;
  return (
    <ol className={`article-list${compact ? ' article-list-compact' : ''}`}>
      {articles.map((article) => {
        return (
          <li className="article-list-item" key={article.href}>
            <div className="article-list-date">
              <time dateTime={article.date}>{shortDate(article.date)}</time>
              {!compact ? <span>{article.readingTimeMinutes} min read</span> : null}
            </div>
            <div className="article-list-copy">
              <h2><Link href={article.href}>{article.title}</Link></h2>
              {!compact ? <p>{article.description}</p> : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
