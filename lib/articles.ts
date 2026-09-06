import { getAllLearningLogs } from './learning';
import { getAllPosts } from './posts';

export type ArticleSummary = {
  slug: string;
  href: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTimeMinutes: number;
  kind: 'note' | 'article';
};

export async function getArticles(): Promise<ArticleSummary[]> {
  const [notes, posts] = await Promise.all([
    getAllLearningLogs({ includeDrafts: false }),
    getAllPosts({ includeDrafts: false }),
  ]);
  return [
    ...notes.map((note): ArticleSummary => ({
      slug: note.slug,
      href: `/articles/${note.slug}/`,
      title: note.title,
      description: note.description,
      date: note.date,
      tags: note.tags,
      readingTimeMinutes: note.readingTimeMinutes,
      kind: 'note',
    })),
    ...posts.map((post): ArticleSummary => ({
      slug: post.slug,
      href: `/articles/${post.slug}/`,
      title: post.title,
      description: post.description,
      date: post.date,
      tags: post.tags,
      readingTimeMinutes: post.readingTimeMinutes,
      kind: 'article',
    })),
  ].sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
}

export function shortDate(date: string): string {
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })
    .format(new Date(`${date}T00:00:00Z`));
}
