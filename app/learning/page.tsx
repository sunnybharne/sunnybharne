import type { Metadata } from 'next';
import Link from 'next/link';
import {
  formatLearningDate,
  getAllLearningLogs,
  getLearningRoadmap,
  learningStatusLabel,
  type LearningResource,
  type LearningStatus,
} from '@/lib/learning';

export const metadata: Metadata = {
  title: 'Learning Journey',
  description:
    'Sunny Bharne\'s public learning roadmap, working notes, practical experiments, and evidence of applied learning.',
  alternates: {
    canonical: '/learning/',
  },
  openGraph: {
    title: 'Learning Journey - Sunny Bharne',
    description:
      'A public roadmap and learning log covering Azure platforms, AI agents, and developer tooling.',
    url: '/learning/',
  },
};

const statusStyles: Record<LearningStatus, string> = {
  planned:
    'border-black/15 text-black/60 dark:border-white/20 dark:text-white/65',
  'in-progress':
    'border-sky-600/30 bg-sky-500/8 text-sky-800 dark:border-sky-400/35 dark:text-sky-300',
  paused:
    'border-amber-600/30 bg-amber-500/8 text-amber-800 dark:border-amber-400/35 dark:text-amber-300',
  completed:
    'border-emerald-600/30 bg-emerald-500/8 text-emerald-800 dark:border-emerald-400/35 dark:text-emerald-300',
};

export default async function LearningPage() {
  const [roadmap, entries] = await Promise.all([
    getLearningRoadmap(),
    getAllLearningLogs(),
  ]);
  const trackTitles = new Map(
    roadmap.tracks.map((track) => [track.id, track.title]),
  );
  const items = roadmap.tracks.flatMap((track) => track.items);
  const activeCount = items.filter(
    (item) => item.status === 'in-progress',
  ).length;
  const completedCount = items.filter(
    (item) => item.status === 'completed',
  ).length;

  return (
    <>
      <section className="mx-auto w-full max-w-5xl px-6 py-16 sm:py-24">
        <p className="text-sm font-medium uppercase opacity-60">
          Learning journey
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight sm:text-6xl">
          Learning in public, one useful step at a time.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-7 opacity-75">
          A working roadmap for the subjects I am exploring, the experiments I
          run, and the evidence that turns study into practical engineering.
        </p>

        <dl className="mt-12 grid border-y border-black/10 py-6 text-sm dark:border-white/15 sm:grid-cols-3">
          <div className="py-2 sm:py-0">
            <dt className="text-xs uppercase opacity-50">Active milestones</dt>
            <dd className="mt-1 text-xl font-semibold">{activeCount}</dd>
          </div>
          <div className="border-black/10 py-2 dark:border-white/15 sm:border-l sm:px-6 sm:py-0">
            <dt className="text-xs uppercase opacity-50">Completed</dt>
            <dd className="mt-1 text-xl font-semibold">{completedCount}</dd>
          </div>
          <div className="border-black/10 py-2 dark:border-white/15 sm:border-l sm:pl-6 sm:py-0">
            <dt className="text-xs uppercase opacity-50">Learning entries</dt>
            <dd className="mt-1 text-xl font-semibold">{entries.length}</dd>
          </div>
        </dl>
      </section>

      <section className="border-t border-black/5 dark:border-white/10">
        <div className="mx-auto grid max-w-5xl gap-8 px-6 py-16 sm:py-20 md:grid-cols-[12rem_1fr] md:gap-12">
          <div>
            <p className="text-sm font-medium uppercase opacity-60">
              Current focus
            </p>
            <p className="mt-3 text-xs opacity-50">
              Roadmap updated {formatLearningDate(roadmap.updated)}
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-semibold leading-tight">
              {roadmap.currentFocus.title}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 opacity-75">
              {roadmap.currentFocus.description}
            </p>
            {roadmap.currentFocus.started || roadmap.currentFocus.target ? (
              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-xs opacity-55">
                {roadmap.currentFocus.started ? (
                  <span>
                    Started {formatLearningDate(roadmap.currentFocus.started)}
                  </span>
                ) : null}
                {roadmap.currentFocus.target ? (
                  <span>
                    Target {formatLearningDate(roadmap.currentFocus.target)}
                  </span>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="border-t border-black/5 dark:border-white/10">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
          <p className="text-sm font-medium uppercase opacity-60">Roadmap</p>
          <h2 className="mt-3 text-3xl font-semibold">What comes next</h2>

          <div className="mt-12 border-t border-black/10 dark:border-white/15">
            {roadmap.tracks.map((track) => (
              <section
                id={track.id}
                key={track.id}
                className="grid gap-8 border-b border-black/10 py-10 dark:border-white/15 md:grid-cols-[12rem_1fr] md:gap-12"
              >
                <header>
                  <h3 className="text-lg font-semibold">{track.title}</h3>
                  <p className="mt-2 text-sm leading-6 opacity-65">
                    {track.description}
                  </p>
                </header>

                <ol className="border-l border-black/15 pl-6 dark:border-white/20">
                  {track.items.map((item, index) => (
                    <li
                      id={item.id}
                      key={item.id}
                      className={
                        index > 0
                          ? 'border-t border-black/10 pt-8 pb-1 dark:border-white/15'
                          : 'pb-8'
                      }
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <h4 className="text-lg font-semibold">{item.title}</h4>
                        <Status status={item.status} />
                      </div>
                      <p className="mt-3 max-w-2xl text-sm leading-6 opacity-75">
                        {item.outcome}
                      </p>
                      {item.target ? (
                        <p className="mt-3 text-xs opacity-50">
                          Target {formatLearningDate(item.target)}
                        </p>
                      ) : null}
                      {item.resources.length > 0 ? (
                        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                          {item.resources.map((resource) => (
                            <li key={`${item.id}-${resource.url}`}>
                              <ResourceLink resource={resource} />
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </li>
                  ))}
                </ol>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-black/5 dark:border-white/10">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
          <p className="text-sm font-medium uppercase opacity-60">
            Learning log
          </p>
          <h2 className="mt-3 text-3xl font-semibold">Notes from the journey</h2>

          {entries.length > 0 ? (
            <ol className="mt-10 border-t border-black/10 dark:border-white/15">
              {entries.map((entry) => (
                <li
                  key={entry.slug}
                  className="border-b border-black/10 dark:border-white/15"
                >
                  <Link
                    href={`/learning/${entry.slug}/`}
                    className="group grid gap-4 py-8 sm:grid-cols-[12rem_1fr] sm:gap-8"
                  >
                    <div className="text-xs opacity-55">
                      <time dateTime={entry.date}>
                        {formatLearningDate(entry.date)}
                      </time>
                      <span className="mt-1 block">
                        {entry.provider}
                        {entry.minutes ? ` / ${entry.minutes} min` : ''}
                        {entry.draft ? ' / Draft preview' : ''}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase opacity-50">
                        {trackTitles.get(entry.track) ?? entry.track}
                      </p>
                      <h3 className="mt-2 text-xl font-semibold group-hover:underline">
                        {entry.title}
                      </h3>
                      <p className="mt-3 max-w-2xl text-sm leading-6 opacity-75">
                        {entry.description}
                      </p>
                      {entry.tags.length > 0 ? (
                        <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs opacity-50">
                          {entry.tags.map((tag) => (
                            <span key={tag}>#{tag}</span>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </Link>
                </li>
              ))}
            </ol>
          ) : (
            <div className="mt-10 border-y border-black/10 py-10 dark:border-white/15">
              <p className="text-sm opacity-65">
                The first learning note is being prepared.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="border-t border-black/5 dark:border-white/10">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
          <p className="text-sm font-medium uppercase opacity-60">Evidence</p>
          <h2 className="mt-3 text-3xl font-semibold">Learning applied</h2>
          <ul className="mt-10 grid gap-x-10 gap-y-8 border-t border-black/10 pt-8 dark:border-white/15 sm:grid-cols-3">
            {roadmap.evidence.map((item) => (
              <li key={item.url}>
                <ResourceLink
                  resource={{ title: item.title, url: item.url }}
                  className="text-base font-semibold"
                />
                <p className="mt-2 text-sm leading-6 opacity-70">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

function Status({ status }: { status: LearningStatus }) {
  return (
    <span
      className={`shrink-0 rounded-sm border px-2 py-1 text-xs font-medium ${statusStyles[status]}`}
    >
      {learningStatusLabel(status)}
    </span>
  );
}

function ResourceLink({
  resource,
  className = 'font-medium underline decoration-black/20 underline-offset-4 hover:decoration-black/70 dark:decoration-white/25 dark:hover:decoration-white/70',
}: {
  resource: LearningResource;
  className?: string;
}) {
  const label = resource.provider
    ? `${resource.title} / ${resource.provider}`
    : resource.title;

  if (resource.url.startsWith('/')) {
    return (
      <Link href={resource.url} className={className}>
        {label}
      </Link>
    );
  }

  return (
    <a href={resource.url} className={className}>
      {label} <span aria-hidden="true">↗</span>
    </a>
  );
}
