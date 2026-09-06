import type { Metadata } from 'next';
import Link from 'next/link';
import { getTopics } from '@/lib/articles';

export const metadata: Metadata = { title: 'Topics', description: 'Browse the notebook by subject.', alternates: { canonical: '/topics/' } };

export default async function TopicsPage() {
  const topics = await getTopics();
  return (
    <div className="page-shell">
      <header className="page-heading">
        <p className="eyebrow">Find something to read</p>
        <h1>Topics</h1>
        <p className="page-intro">A few subjects I keep coming back to.</p>
      </header>
      <ul className="topic-list">
        {topics.map((topic) => (
          <li key={topic.slug}>
            <div><h2><Link href={`/topics/${topic.slug}/`}>{topic.title}</Link></h2>{topic.description ? <p>{topic.description}</p> : null}</div>
            <span className="article-meta">{topic.articles.length} {topic.articles.length === 1 ? 'article' : 'articles'}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
