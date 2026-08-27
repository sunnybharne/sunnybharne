import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
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

  return (
    <article className="mx-auto w-full max-w-3xl px-6 py-14 sm:py-20">
      <Link
        href="/posts/"
        className="text-sm opacity-60 hover:opacity-100 hover:underline"
      >
        Back to writing
      </Link>

      <header className="mt-10 border-b border-black/10 pb-10 dark:border-white/15">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs opacity-55">
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          <span aria-hidden="true">/</span>
          <span>{post.readingTimeMinutes} min read</span>
          {post.updated ? (
            <>
              <span aria-hidden="true">/</span>
              <span>Updated {formatPostDate(post.updated)}</span>
            </>
          ) : null}
          {post.draft ? (
            <>
              <span aria-hidden="true">/</span>
              <span>Draft preview</span>
            </>
          ) : null}
        </div>
        <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
          {post.title}
        </h1>
        <p className="mt-5 text-lg leading-8 opacity-75">
          {post.description}
        </p>
        {post.tags.length > 0 ? (
          <div className="mt-5 flex flex-wrap gap-x-3 gap-y-1 text-sm opacity-55">
            {post.tags.map((tag) => (
              <span key={tag}>#{tag}</span>
            ))}
          </div>
        ) : null}
      </header>

      <div
        className="post-content"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />

      <footer className="mt-16 border-t border-black/10 pt-8 dark:border-white/15">
        <Link href="/posts/" className="text-sm font-medium hover:underline">
          More writing
        </Link>
      </footer>
    </article>
  );
}
