import type { Metadata } from 'next';
import ArticleContents from '@/app/components/ArticleContents';
import { formatLearningDate, getLearningPlan } from '@/lib/learning';

export async function generateMetadata(): Promise<Metadata> {
  const plan = await getLearningPlan();
  return {
    title: plan.title,
    description: plan.description,
    alternates: { canonical: '/learning/' },
    openGraph: {
      title: plan.title,
      description: plan.description,
      url: '/learning/',
    },
  };
}

export default async function LearningPage() {
  const plan = await getLearningPlan();
  return (
    <article className="page-shell">
      <header className="page-heading">
        <p className="eyebrow">Learning</p>
        <h1>{plan.title}</h1>
        <p className="page-intro">{plan.description}</p>
        <p className="article-meta">
          Updated <time dateTime={plan.updated}>{formatLearningDate(plan.updated)}</time>
        </p>
      </header>
      <ArticleContents headings={plan.headings} />
      <div
        className="article-body post-content"
        dangerouslySetInnerHTML={{ __html: plan.contentHtml }}
      />
    </article>
  );
}
