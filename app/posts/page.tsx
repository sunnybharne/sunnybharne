import type { Metadata } from 'next';
import Link from 'next/link';
import { formatPostDate, getAllPosts } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'Writing',
  description:
    'Notes from Sunny Bharne on Azure platforms, infrastructure as code, developer tools, and AI agents.',
  alternates: {
    canonical: '/posts/',
  },
  openGraph: {
    title: 'Writing - Sunny Bharne',
    description:
      'Notes on Azure platforms, infrastructure as code, developer tools, and AI agents.',
    url: '/posts/',
  },
};

export default async function PostsPage() {
  const posts = await getAllPosts();

  return (
    <section className="mx-auto w-full max-w-4xl px-6 py-16 sm:py-24">
      <p className="text-sm font-medium uppercase opacity-60">Writing</p>
      <h1 className="mt-4 text-4xl font-bold sm:text-5xl">
        Notes from the work.
      </h1>
      <p className="mt-5 max-w-2xl text-base leading-7 opacity-75">
        Azure platforms, infrastructure as code, developer tools, and the AI
        systems I am building and learning from.
      </p>

      {posts.length > 0 ? (
        <ol className="mt-14 border-t border-black/10 dark:border-white/15">
          {posts.map((post) => (
            <li
              key={post.slug}
              className="border-b border-black/10 dark:border-white/15"
            >
              <Link
                href={`/posts/${post.slug}/`}
                className="group block py-8 sm:py-10"
              >
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs opacity-55">
                  <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                  <span aria-hidden="true">/</span>
                  <span>{post.readingTimeMinutes} min read</span>
                  {post.draft ? (
                    <>
                      <span aria-hidden="true">/</span>
                      <span>Draft preview</span>
                    </>
                  ) : null}
                </div>
                <h2 className="mt-3 text-2xl font-semibold group-hover:underline">
                  {post.title}
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 opacity-75">
                  {post.description}
                </p>
                {post.tags.length > 0 ? (
                  <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs opacity-55">
                    {post.tags.map((tag) => (
                      <span key={tag}>#{tag}</span>
                    ))}
                  </div>
                ) : null}
              </Link>
            </li>
          ))}
        </ol>
      ) : (
        <div className="mt-14 border-y border-black/10 py-12 dark:border-white/15">
          <h2 className="text-xl font-semibold">The first note is coming.</h2>
          <p className="mt-2 text-sm opacity-65">
            This page will collect longer thoughts that deserve more room than
            a project update.
          </p>
        </div>
      )}
    </section>
  );
}
