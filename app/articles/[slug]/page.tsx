import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ArticleContents from '@/app/components/ArticleContents';
import { getArticles } from '@/lib/articles';
import {
  formatLearningDate,
  getLearningLogBySlug,
  type LearningLog,
} from '@/lib/learning';
import { formatPostDate, getPostBySlug, type Post } from '@/lib/posts';

type Props = {
  params: Promise<{ slug: string }>;
};

type UnifiedArticle =
  | { kind: 'note'; article: LearningLog }
  | { kind: 'article'; article: Post };

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getArticles()).map(({ slug }) => ({ slug }));
}

async function getArticle(slug: string): Promise<UnifiedArticle | null> {
  const note = await getLearningLogBySlug(slug, { includeDrafts: false });
  if (note) return { kind: 'note', article: note };

  const post = await getPostBySlug(slug, { includeDrafts: false });
  return post ? { kind: 'article', article: post } : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const result = await getArticle(slug);
  if (!result) return {};

  const { article } = result;
  const updated = result.kind === 'article' ? result.article.updated : undefined;

  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/articles/${slug}/` },
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.description,
      url: `/articles/${slug}/`,
      publishedTime: `${article.date}T00:00:00Z`,
      modifiedTime: updated ? `${updated}T00:00:00Z` : undefined,
      tags: article.tags,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const result = await getArticle(slug);
  if (!result) notFound();

  const { article } = result;
  const note = result.kind === 'note' ? result.article : null;
  const post = result.kind === 'article' ? result.article : null;
  const related = (await getArticles())
    .filter((item) => item.slug !== slug)
    .sort((a, b) => {
      const overlap = (tags: string[]) =>
        tags.filter((tag) => article.tags.includes(tag)).length;
      return overlap(b.tags) - overlap(a.tags);
    })
    .slice(0, 2);
  const formattedDate = result.kind === 'note'
    ? formatLearningDate(article.date)
    : formatPostDate(article.date);

  return (
    <article className={`article-shell${slug === 'asc-default-policy-guide' ? ' learning-policy-guide' : ''}`}>
      <Link href="/articles/" className="article-backlink">← All articles</Link>

      <header className="article-header">
        <div className="article-meta">
          <time dateTime={article.date}>{formattedDate}</time>
          <span aria-hidden="true">·</span>
          <span>{article.readingTimeMinutes} min read</span>
          {post?.updated ? (
            <>
              <span aria-hidden="true">·</span>
              <span>Updated {formatPostDate(post.updated)}</span>
            </>
          ) : null}
        </div>
        <h1 className="article-title">{article.title}</h1>
        <p className="article-deck">{article.description}</p>
      </header>

      <div className="article-layout">
        <ArticleContents headings={article.headings} />
        <div
          className="article-body post-content"
          dangerouslySetInnerHTML={{ __html: article.contentHtml }}
        />
      </div>

      <footer className="article-footer">
        {note && (note.resourceUrl || note.evidence.length > 0) ? (
          <section className="article-references" aria-labelledby="article-references-heading">
            <h2 id="article-references-heading">Sources and further reading</h2>
            <ul>
              {note.resourceUrl ? (
                <li>
                  <a href={note.resourceUrl}>
                    {note.resourceTitle ?? note.provider}
                    <span aria-hidden="true"> ↗</span>
                  </a>
                </li>
              ) : null}
              {note.evidence.map((item) => (
                <li key={item.url}>
                  <a href={item.url}>{item.title}<span aria-hidden="true"> ↗</span></a>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {related.length > 0 ? (
          <section className="related-articles" aria-labelledby="related-articles-heading">
            <h2 id="related-articles-heading">Read next</h2>
            <ul>
              {related.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.title}</Link>
                  <p>{item.description}</p>
                  <span className="article-meta">{item.readingTimeMinutes} min read</span>
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
