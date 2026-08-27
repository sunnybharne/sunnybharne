import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';

const postsDirectory = path.join(process.cwd(), 'content', 'posts');
const postFilePattern = /^[a-z0-9]+(?:-[a-z0-9]+)*\.md$/;
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const markdown = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: false,
});

export type PostSummary = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  tags: string[];
  draft: boolean;
  readingTimeMinutes: number;
};

export type Post = PostSummary & {
  contentHtml: string;
};

type PostOptions = {
  includeDrafts?: boolean;
};

export async function getAllPosts(
  options: PostOptions = {},
): Promise<PostSummary[]> {
  const includeDrafts = options.includeDrafts ?? isDevelopment();
  const filenames = await getPostFilenames();
  const posts = await Promise.all(filenames.map(readPostSummary));

  return posts
    .filter((post) => includeDrafts || !post.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPostBySlug(
  slug: string,
  options: PostOptions = {},
): Promise<Post | null> {
  if (!slugPattern.test(slug)) return null;

  const includeDrafts = options.includeDrafts ?? isDevelopment();

  try {
    const source = await fs.readFile(
      path.join(postsDirectory, `${slug}.md`),
      'utf8',
    );
    const { data, content } = matter(source);
    const summary = parsePostMetadata(slug, data, content);

    if (summary.draft && !includeDrafts) return null;

    return {
      ...summary,
      contentHtml: markdown.render(content),
    };
  } catch (error) {
    if (isMissingFile(error)) return null;
    throw error;
  }
}

export async function getAllPostSlugs(): Promise<string[]> {
  const filenames = await getPostFilenames();
  return filenames.map((filename) => filename.replace(/\.md$/, ''));
}

export function formatPostDate(date: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00Z`));
}

async function getPostFilenames(): Promise<string[]> {
  try {
    const entries = await fs.readdir(postsDirectory, { withFileTypes: true });
    return entries
      .filter((entry) => entry.isFile() && postFilePattern.test(entry.name))
      .map((entry) => entry.name);
  } catch (error) {
    if (isMissingFile(error)) return [];
    throw error;
  }
}

async function readPostSummary(filename: string): Promise<PostSummary> {
  const slug = filename.replace(/\.md$/, '');
  const source = await fs.readFile(path.join(postsDirectory, filename), 'utf8');
  const { data, content } = matter(source);
  return parsePostMetadata(slug, data, content);
}

function parsePostMetadata(
  slug: string,
  data: Record<string, unknown>,
  content: string,
): PostSummary {
  const title = requiredString(data.title, 'title', slug);
  const description = requiredString(data.description, 'description', slug);
  const date = requiredDate(data.date, 'date', slug);
  const updated = optionalDate(data.updated, 'updated', slug);
  const tags = parseTags(data.tags, slug);

  if (data.draft !== undefined && typeof data.draft !== 'boolean') {
    throw new Error(`Post "${slug}" has a non-boolean draft value.`);
  }

  return {
    slug,
    title,
    description,
    date,
    updated,
    tags,
    draft: data.draft === true,
    readingTimeMinutes: estimateReadingTime(content),
  };
}

function requiredString(
  value: unknown,
  field: string,
  slug: string,
): string {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`Post "${slug}" is missing a valid ${field}.`);
  }
  return value.trim();
}

function requiredDate(value: unknown, field: string, slug: string): string {
  const normalized = normalizeDate(value);
  if (!normalized) {
    throw new Error(
      `Post "${slug}" is missing a valid ${field} in YYYY-MM-DD format.`,
    );
  }
  return normalized;
}

function optionalDate(
  value: unknown,
  field: string,
  slug: string,
): string | undefined {
  if (value === undefined) return undefined;
  return requiredDate(value, field, slug);
}

function normalizeDate(value: unknown): string | null {
  const raw = value instanceof Date
    ? value.toISOString().slice(0, 10)
    : typeof value === 'string'
      ? value
      : '';

  if (!/^\d{4}-\d{2}-\d{2}$/.test(raw)) return null;
  const parsed = new Date(`${raw}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime()) &&
    parsed.toISOString().slice(0, 10) === raw
    ? raw
    : null;
}

function parseTags(value: unknown, slug: string): string[] {
  if (value === undefined) return [];
  if (!Array.isArray(value) || value.some((tag) => typeof tag !== 'string')) {
    throw new Error(`Post "${slug}" has invalid tags; use a list of strings.`);
  }
  return value.map((tag) => tag.trim()).filter(Boolean);
}

function estimateReadingTime(content: string): number {
  const words = content
    .replace(/```[\s\S]*?```/g, ' code ')
    .replace(/[^\p{L}\p{N}'-]+/gu, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 220));
}

function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development';
}

function isMissingFile(error: unknown): boolean {
  return (
    error instanceof Error &&
    'code' in error &&
    (error as NodeJS.ErrnoException).code === 'ENOENT'
  );
}
