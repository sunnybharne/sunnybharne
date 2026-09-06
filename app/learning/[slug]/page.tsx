import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ArticleContents from '@/app/components/ArticleContents';
import { getArticles } from '@/lib/articles';
import {
  formatLearningDate,
  getAllLearningLogSlugs,
  getLearningLogBySlug,
} from '@/lib/learning';

type LearningEntryPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getAllLearningLogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: LearningEntryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getLearningLogBySlug(slug);

  if (!entry) return {};

  return {
    title: entry.title,
    description: entry.description,
    alternates: {
      canonical: `/learning/${entry.slug}/`,
    },
    openGraph: {
      type: 'article',
      title: entry.title,
      description: entry.description,
      url: `/learning/${entry.slug}/`,
      publishedTime: `${entry.date}T00:00:00Z`,
      tags: entry.tags,
    },
  };
}

export default async function LearningEntryPage({
  params,
}: LearningEntryPageProps) {
  const { slug } = await params;
  const entry = await getLearningLogBySlug(slug);

  if (!entry) notFound();

  const related = (await getArticles())
    .filter((article) => article.href !== `/learning/${entry.slug}/`)
    .sort((a, b) => {
      const overlap = (tags: string[]) => tags.filter((tag) => entry.tags.includes(tag)).length;
      return overlap(b.tags) - overlap(a.tags);
    })
    .slice(0, 2);

  return (
    <article className={`article-shell${slug === 'asc-default-policy-guide' ? ' learning-policy-guide' : ''}`}>
      <Link href="/articles/" className="article-backlink">
        ← All articles
      </Link>

      <header className="article-header">
        <div className="article-meta">
          <time dateTime={entry.date}>{formatLearningDate(entry.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{entry.readingTimeMinutes} min read</span>
          {entry.draft ? <span>Draft preview</span> : null}
        </div>
        <h1 className="article-title">{entry.title}</h1>
        <p className="article-deck">{entry.description}</p>
      </header>

      <div className="article-layout">
        <ArticleContents headings={entry.headings} />
        <div
          className="article-body post-content"
          dangerouslySetInnerHTML={{ __html: entry.contentHtml }}
        />
      </div>

      <footer className="article-footer">
        {entry.resourceUrl || entry.evidence.length > 0 ? (
          <section className="article-references" aria-labelledby="article-references-heading">
            <h2 id="article-references-heading">Sources and further reading</h2>
            <ul>
              {entry.resourceUrl ? (
                <li>
                  <a href={entry.resourceUrl}>
                    {entry.resourceTitle ?? entry.provider}
                    <span aria-hidden="true"> ↗</span>
                  </a>
                </li>
              ) : null}
              {entry.evidence.map((item) => (
                <li key={item.url}>
                  <a href={item.url}>
                    {item.title}
                    <span aria-hidden="true"> ↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
        {related.length > 0 ? (
          <section className="related-articles" aria-labelledby="related-articles-heading">
            <h2 id="related-articles-heading">Read next</h2>
            <ul>
              {related.map((article) => (
                <li key={article.href}>
                  <Link href={article.href}>{article.title}</Link>
                  <p>{article.description}</p>
                  <span className="article-meta">{article.readingTimeMinutes} min read</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
        <Link href="/articles/" className="article-backlink">Browse all articles →</Link>
      </footer>
    </article>
  );
}
