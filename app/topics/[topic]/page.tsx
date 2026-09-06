import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ArticleList from '@/app/components/ArticleList';
import { getTopics } from '@/lib/articles';

type Props = { params: Promise<{ topic: string }> };
export const dynamicParams = false;
export async function generateStaticParams() { return (await getTopics()).map(({ slug }) => ({ topic: slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topic: slug } = await params;
  const topic = (await getTopics()).find((item) => item.slug === slug);
  return topic ? { title: topic.title, description: topic.description || `Articles about ${topic.title}.`, alternates: { canonical: `/topics/${slug}/` } } : {};
}
export default async function TopicPage({ params }: Props) {
  const { topic: slug } = await params;
  const topic = (await getTopics()).find((item) => item.slug === slug);
  if (!topic) notFound();
  return (
    <div className="page-shell">
      <header className="page-heading">
        <Link href="/topics/" className="back-link">← All topics</Link>
        <h1>{topic.title}</h1>
        {topic.description ? <p className="page-intro">{topic.description}</p> : null}
      </header>
      <ArticleList articles={topic.articles} />
    </div>
  );
}
