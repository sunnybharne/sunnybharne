import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ArticleContents from '@/app/components/ArticleContents';
import { getArticles } from '@/lib/articles';
import {
  formatPostDate,
  getAllPostSlugs,
  getPostBySlug,
} from '@/lib/posts';

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/posts/${post.slug}/`,
    },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      url: `/posts/${post.slug}/`,
      publishedTime: `${post.date}T00:00:00Z`,
      modifiedTime: post.updated
        ? `${post.updated}T00:00:00Z`
        : undefined,
      tags: post.tags,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const related = (await getArticles())
    .filter((article) => article.href !== `/posts/${post.slug}/`)
    .sort((a, b) => {
      const overlap = (tags: string[]) => tags.filter((tag) => post.tags.includes(tag)).length;
      return overlap(b.tags) - overlap(a.tags);
    })
    .slice(0, 2);

  return (
    <article className="article-shell">
      <Link href="/articles/" className="article-backlink">
        ← All articles
      </Link>

      <header className="article-header">
        <div className="article-meta">
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readingTimeMinutes} min read</span>
          {post.updated ? (
            <>
              <span aria-hidden="true">·</span>
              <span>Updated {formatPostDate(post.updated)}</span>
            </>
          ) : null}
          {post.draft ? <span>Draft preview</span> : null}
        </div>
        <h1 className="article-title">{post.title}</h1>
        <p className="article-deck">{post.description}</p>
      </header>

      <div className="article-layout">
        <ArticleContents headings={post.headings} />
        <div
          className="article-body post-content"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </div>

      <footer className="article-footer">
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
