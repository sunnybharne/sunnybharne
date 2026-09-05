import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  formatLearningDate,
  getAllLearningLogSlugs,
  getLearningLogBySlug,
  getLearningRoadmap,
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
  const [entry, roadmap] = await Promise.all([
    getLearningLogBySlug(slug),
    getLearningRoadmap(),
  ]);

  if (!entry) notFound();

  const track = roadmap.tracks.find((item) => item.id === entry.track);
  const articleWidth = slug === 'asc-default-policy-guide'
    ? 'max-w-6xl learning-policy-guide'
    : 'max-w-3xl';

  return (
    <article className={`mx-auto w-full px-6 py-14 sm:py-20 ${articleWidth}`}>
      <Link
        href="/learning/"
        className="text-sm opacity-60 hover:opacity-100 hover:underline"
      >
        Back to learning journey
      </Link>

      <header className="mt-10 border-b border-black/10 pb-10 dark:border-white/15">
        <p className="text-xs font-medium uppercase opacity-50">
          {track?.title ?? entry.track}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs opacity-55">
          <time dateTime={entry.date}>{formatLearningDate(entry.date)}</time>
          <span aria-hidden="true">/</span>
          <span>{entry.provider}</span>
          {entry.minutes ? (
            <>
              <span aria-hidden="true">/</span>
              <span>{entry.minutes} minutes</span>
            </>
          ) : null}
          {entry.draft ? (
            <>
              <span aria-hidden="true">/</span>
              <span>Draft preview</span>
            </>
          ) : null}
        </div>
        <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
          {entry.title}
        </h1>
        <p className="mt-5 text-lg leading-8 opacity-75">
          {entry.description}
        </p>
        {entry.resourceUrl ? (
          <a
            href={entry.resourceUrl}
            className="mt-6 inline-block text-sm font-medium underline decoration-black/25 underline-offset-4 hover:decoration-black/70 dark:decoration-white/25 dark:hover:decoration-white/70"
          >
            {entry.resourceTitle ?? 'Open learning resource'}{' '}
            <span aria-hidden="true">↗</span>
          </a>
        ) : null}
        {entry.tags.length > 0 ? (
          <div className="mt-5 flex flex-wrap gap-x-3 gap-y-1 text-sm opacity-55">
            {entry.tags.map((tag) => (
              <span key={tag}>#{tag}</span>
            ))}
          </div>
        ) : null}
      </header>

      <div
        className="post-content"
        dangerouslySetInnerHTML={{ __html: entry.contentHtml }}
      />

      {entry.evidence.length > 0 ? (
        <section className="mt-14 border-t border-black/10 pt-8 dark:border-white/15">
          <h2 className="text-lg font-semibold">Evidence and references</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {entry.evidence.map((item) => (
              <li key={item.url}>
                <a
                  href={item.url}
                  className="font-medium underline decoration-black/25 underline-offset-4 hover:decoration-black/70 dark:decoration-white/25 dark:hover:decoration-white/70"
                >
                  {item.title}
                  {item.provider ? ` / ${item.provider}` : ''}{' '}
                  <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <footer className="mt-14 border-t border-black/10 pt-8 dark:border-white/15">
        <Link href="/learning/" className="text-sm font-medium hover:underline">
          View the roadmap and learning log
        </Link>
      </footer>
    </article>
  );
}
