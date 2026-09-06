import Link from 'next/link';
import { getArticleTopic, shortDate, type ArticleSummary } from '@/lib/articles';

export default function ArticleList({ articles, compact = false }: { articles: ArticleSummary[]; compact?: boolean }) {
  if (articles.length === 0) return <p className="page-intro">No articles here yet.</p>;
  return (
    <ol className={`article-list${compact ? ' article-list-compact' : ''}`}>
      {articles.map((article) => {
        const topic = getArticleTopic(article);
        return (
          <li className="article-list-item" key={article.href}>
            <div className="article-list-date">
              <time dateTime={article.date}>{shortDate(article.date)}</time>
              <span>{article.readingTimeMinutes} min read</span>
            </div>
            <div className="article-list-copy">
              {topic ? <Link href={`/topics/${topic.slug}/`} className="article-topic">{topic.title}</Link> : null}
              <h2><Link href={article.href}>{article.title}</Link></h2>
              <p>{article.description}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
