import { getAllLearningLogs } from './learning';
import { getAllPosts } from './posts';

export type ArticleSummary = {
  href: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTimeMinutes: number;
  kind: 'note' | 'article';
};

const subjects = [
  { slug: 'azure-policy', title: 'Azure Policy', description: 'Assignments, governance and rules that run in Azure.', tags: ['azure', 'azure-policy', 'policy', 'governance'] },
  { slug: 'windows', title: 'Windows', description: 'Settings, baselines and tests inside virtual machines.', tags: ['windows'] },
  { slug: 'machine-configuration', title: 'Machine Configuration', description: 'From checking a machine to applying its configuration.', tags: ['machine-configuration'] },
  { slug: 'security', title: 'Security', description: 'Understanding security checks and what they change.', tags: ['security'] },
];

export async function getArticles(): Promise<ArticleSummary[]> {
  const [notes, posts] = await Promise.all([
    getAllLearningLogs({ includeDrafts: false }),
    getAllPosts({ includeDrafts: false }),
  ]);
  return [
    ...notes.map((note): ArticleSummary => ({
      href: `/learning/${note.slug}/`,
      title: note.title,
      description: note.description,
      date: note.date,
      tags: note.tags,
      readingTimeMinutes: note.readingTimeMinutes,
      kind: 'note',
    })),
    ...posts.map((post): ArticleSummary => ({
      href: `/posts/${post.slug}/`,
      title: post.title,
      description: post.description,
      date: post.date,
      tags: post.tags,
      readingTimeMinutes: post.readingTimeMinutes,
      kind: 'article',
    })),
  ].sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
}

export function getArticleTopic(article: ArticleSummary) {
  return subjects.find((subject) => subject.tags.some((tag) => article.tags.includes(tag)));
}

export async function getTopics() {
  const articles = await getArticles();
  const known = new Set(subjects.flatMap((subject) => subject.tags));
  const additional = [...new Set(articles.flatMap((article) => article.tags))]
    .filter((tag) => !known.has(tag) && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(tag))
    .sort()
    .map((tag) => ({
      slug: tag,
      title: tag.split('-').map((word) => word[0].toUpperCase() + word.slice(1)).join(' '),
      description: '',
      tags: [tag],
    }));
  return [...subjects, ...additional].map((subject) => ({
    ...subject,
    articles: articles.filter((article) => subject.tags.some((tag) => article.tags.includes(tag))),
  })).filter((subject) => subject.articles.length > 0);
}

export function shortDate(date: string): string {
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })
    .format(new Date(`${date}T00:00:00Z`));
}
