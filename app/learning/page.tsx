import type { Metadata } from 'next';
import Link from 'next/link';
import ArticleList from '@/app/components/ArticleList';
import { getArticles } from '@/lib/articles';
import {
  formatLearningDate,
  getLearningRoadmap,
  learningStatusLabel,
  type LearningResource,
  type LearningStatus,
} from '@/lib/learning';

export const metadata: Metadata = {
  title: 'Learning Roadmap',
  description:
    'Recent learning notes and Sunny Bharne\'s working roadmap for Azure platforms, AI agents, and developer tooling.',
  alternates: {
    canonical: '/learning/',
  },
  openGraph: {
    title: 'Learning Roadmap - Sunny Bharne',
    description:
      'Recent notes, current focus, and the subjects I am exploring next.',
    url: '/learning/',
  },
};

export default async function LearningPage() {
  const [roadmap, articles] = await Promise.all([
    getLearningRoadmap(),
    getArticles(),
  ]);
  const recentNotes = articles
    .filter((article) => article.kind === 'note')
    .slice(0, 6);

  return (
    <div className="page-shell">
      <header className="page-heading">
        <p className="eyebrow">Learning</p>
        <h1>Notes and a working roadmap.</h1>
        <p className="page-intro">
          What I am learning, trying, and putting into practice. My writing is
          collected in the{' '}
          <Link href="/articles/" className="text-link">articles archive</Link>.
        </p>
      </header>

      <section className="page-section" aria-labelledby="recent-learning-notes">
        <div className="section-heading">
          <h2 id="recent-learning-notes">Recent learning notes</h2>
          <Link href="/articles/" className="text-link">All articles</Link>
        </div>
        {recentNotes.length > 0 ? (
          <ArticleList articles={recentNotes} compact />
        ) : (
          <p className="page-intro">The first learning note is being prepared.</p>
        )}
      </section>

      <section className="page-section" aria-labelledby="current-focus">
        <div className="section-heading">
          <h2 id="current-focus">Current focus</h2>
        </div>
        <p className="page-intro">
          <strong>{roadmap.currentFocus.title}.</strong>{' '}
          {roadmap.currentFocus.description}
        </p>
        <p className="article-meta">
          Roadmap updated{' '}
          <time dateTime={roadmap.updated}>{formatLearningDate(roadmap.updated)}</time>
          {roadmap.currentFocus.started ? (
            <span> · Started {formatLearningDate(roadmap.currentFocus.started)}</span>
          ) : null}
          {roadmap.currentFocus.target ? (
            <span> · Target {formatLearningDate(roadmap.currentFocus.target)}</span>
          ) : null}
        </p>
      </section>

      <section className="page-section" aria-labelledby="learning-roadmap">
        <div className="section-heading">
          <h2 id="learning-roadmap">Roadmap</h2>
        </div>
        {roadmap.tracks.map((track) => (
          <details id={track.id} key={track.id} className="roadmap-track">
            <summary>{track.title}</summary>
            <p className="page-intro">{track.description}</p>
            <ol>
              {track.items.map((item) => (
                <li id={item.id} key={item.id} className="roadmap-item">
                  <div className="section-heading">
                    <h3>{item.title}</h3>
                    <Status status={item.status} />
                  </div>
                  <p>{item.outcome}</p>
                  {item.target ? (
                    <p className="article-meta">Target {formatLearningDate(item.target)}</p>
                  ) : null}
                  {item.resources.length > 0 ? (
                    <ul>
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
          </details>
        ))}
      </section>

      {roadmap.evidence.length > 0 ? (
        <section className="page-section" aria-labelledby="learning-applied">
          <div className="section-heading">
            <h2 id="learning-applied">Learning applied</h2>
          </div>
          <ul>
            {roadmap.evidence.map((item) => (
              <li key={item.url} className="roadmap-item">
                <ResourceLink resource={{ title: item.title, url: item.url }} />
                <p>{item.description}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}

function Status({ status }: { status: LearningStatus }) {
  return (
    <span className="roadmap-status" data-status={status}>
      {learningStatusLabel(status)}
    </span>
  );
}

function ResourceLink({ resource }: { resource: LearningResource }) {
  const label = resource.provider
    ? `${resource.title} / ${resource.provider}`
    : resource.title;

  if (resource.url.startsWith('/')) {
    return <Link href={resource.url} className="text-link">{label}</Link>;
  }

  return (
    <a href={resource.url} className="text-link">
      {label} <span aria-hidden="true">↗</span>
    </a>
  );
}
