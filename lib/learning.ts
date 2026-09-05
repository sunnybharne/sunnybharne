import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';
import { parse as parseYaml } from 'yaml';

const learningDirectory = path.join(process.cwd(), 'content', 'learning');
const learningLogDirectory = path.join(learningDirectory, 'log');
const roadmapPath = path.join(learningDirectory, 'roadmap.yml');
const learningFilePattern = /^[a-z0-9]+(?:-[a-z0-9]+)*\.md$/;
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const markdown = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: false,
});

const policyGuideMarkdown = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: false,
});

policyGuideMarkdown.renderer.rules.heading_open = (tokens, index, options, _env, self) => {
  const heading = tokens[index + 1].content;
  const id = heading
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
  tokens[index].attrSet('id', id);
  return self.renderToken(tokens, index, options);
};

policyGuideMarkdown.renderer.rules.table_open = () =>
  '<div class="learning-table-scroll" role="region" aria-label="Scrollable reference table" tabindex="0"><table>\n';
policyGuideMarkdown.renderer.rules.table_close = () => '</table></div>\n';

export const learningStatuses = [
  'planned',
  'in-progress',
  'paused',
  'completed',
] as const;

export type LearningStatus = (typeof learningStatuses)[number];

export type LearningResource = {
  title: string;
  provider?: string;
  url: string;
};

export type RoadmapItem = {
  id: string;
  title: string;
  outcome: string;
  status: LearningStatus;
  target?: string;
  resources: LearningResource[];
};

export type RoadmapTrack = {
  id: string;
  title: string;
  description: string;
  items: RoadmapItem[];
};

export type LearningRoadmap = {
  updated: string;
  currentFocus: {
    title: string;
    description: string;
    started?: string;
    target?: string;
  };
  tracks: RoadmapTrack[];
  evidence: Array<{
    title: string;
    description: string;
    url: string;
  }>;
};

export type LearningLogSummary = {
  slug: string;
  title: string;
  description: string;
  date: string;
  track: string;
  provider: string;
  resourceTitle?: string;
  resourceUrl?: string;
  minutes?: number;
  tags: string[];
  evidence: LearningResource[];
  draft: boolean;
};

export type LearningLog = LearningLogSummary & {
  contentHtml: string;
};

type LearningOptions = {
  includeDrafts?: boolean;
};

export async function getLearningRoadmap(): Promise<LearningRoadmap> {
  const source = await fs.readFile(roadmapPath, 'utf8');
  return parseRoadmap(parseYaml(source));
}

export async function getAllLearningLogs(
  options: LearningOptions = {},
): Promise<LearningLogSummary[]> {
  const includeDrafts = options.includeDrafts ?? isDevelopment();
  const filenames = await getLearningLogFilenames();
  const entries = await Promise.all(filenames.map(readLearningLogSummary));

  return entries
    .filter((entry) => includeDrafts || !entry.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function getLearningLogBySlug(
  slug: string,
  options: LearningOptions = {},
): Promise<LearningLog | null> {
  if (!slugPattern.test(slug)) return null;

  const includeDrafts = options.includeDrafts ?? isDevelopment();

  try {
    const source = await fs.readFile(
      path.join(learningLogDirectory, `${slug}.md`),
      'utf8',
    );
    const { data, content } = matter(source);
    const summary = parseLearningLogMetadata(slug, data);

    if (summary.draft && !includeDrafts) return null;

    return {
      ...summary,
      contentHtml: (slug === 'asc-default-policy-guide'
        ? policyGuideMarkdown
        : markdown
      ).render(content),
    };
  } catch (error) {
    if (isMissingFile(error)) return null;
    throw error;
  }
}

export async function getAllLearningLogSlugs(): Promise<string[]> {
  const entries = await getAllLearningLogs();
  return entries.map((entry) => entry.slug);
}

export function formatLearningDate(date: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00Z`));
}

export function learningStatusLabel(status: LearningStatus): string {
  const labels: Record<LearningStatus, string> = {
    planned: 'Planned',
    'in-progress': 'In progress',
    paused: 'Paused',
    completed: 'Completed',
  };
  return labels[status];
}

async function getLearningLogFilenames(): Promise<string[]> {
  try {
    const entries = await fs.readdir(learningLogDirectory, {
      withFileTypes: true,
    });
    return entries
      .filter(
        (entry) => entry.isFile() && learningFilePattern.test(entry.name),
      )
      .map((entry) => entry.name);
  } catch (error) {
    if (isMissingFile(error)) return [];
    throw error;
  }
}

async function readLearningLogSummary(
  filename: string,
): Promise<LearningLogSummary> {
  const slug = filename.replace(/\.md$/, '');
  const source = await fs.readFile(
    path.join(learningLogDirectory, filename),
    'utf8',
  );
  const { data } = matter(source);
  return parseLearningLogMetadata(slug, data);
}

function parseRoadmap(value: unknown): LearningRoadmap {
  const roadmap = requiredRecord(value, 'roadmap');
  const focus = requiredRecord(roadmap.currentFocus, 'currentFocus');
  const tracks = requiredArray(roadmap.tracks, 'tracks').map(
    (trackValue, trackIndex) => {
      const context = `tracks[${trackIndex}]`;
      const track = requiredRecord(trackValue, context);
      const id = requiredSlug(track.id, `${context}.id`);

      return {
        id,
        title: requiredString(track.title, `${context}.title`),
        description: requiredString(
          track.description,
          `${context}.description`,
        ),
        items: requiredArray(track.items, `${context}.items`).map(
          (itemValue, itemIndex) =>
            parseRoadmapItem(itemValue, `${context}.items[${itemIndex}]`),
        ),
      };
    },
  );

  assertUnique(tracks.map((track) => track.id), 'roadmap track IDs');
  assertUnique(
    tracks.flatMap((track) => track.items.map((item) => item.id)),
    'roadmap item IDs',
  );

  return {
    updated: requiredDate(roadmap.updated, 'updated'),
    currentFocus: {
      title: requiredString(focus.title, 'currentFocus.title'),
      description: requiredString(
        focus.description,
        'currentFocus.description',
      ),
      started: optionalDate(focus.started, 'currentFocus.started'),
      target: optionalDate(focus.target, 'currentFocus.target'),
    },
    tracks,
    evidence: optionalArray(roadmap.evidence, 'evidence').map(
      (itemValue, index) => {
        const context = `evidence[${index}]`;
        const item = requiredRecord(itemValue, context);
        return {
          title: requiredString(item.title, `${context}.title`),
          description: requiredString(
            item.description,
            `${context}.description`,
          ),
          url: requiredUrl(item.url, `${context}.url`),
        };
      },
    ),
  };
}

function parseRoadmapItem(value: unknown, context: string): RoadmapItem {
  const item = requiredRecord(value, context);
  const status = requiredString(item.status, `${context}.status`);

  if (!learningStatuses.includes(status as LearningStatus)) {
    throw new Error(
      `${context}.status must be one of: ${learningStatuses.join(', ')}.`,
    );
  }

  return {
    id: requiredSlug(item.id, `${context}.id`),
    title: requiredString(item.title, `${context}.title`),
    outcome: requiredString(item.outcome, `${context}.outcome`),
    status: status as LearningStatus,
    target: optionalDate(item.target, `${context}.target`),
    resources: optionalArray(item.resources, `${context}.resources`).map(
      (resource, index) =>
        parseResource(resource, `${context}.resources[${index}]`),
    ),
  };
}

function parseLearningLogMetadata(
  slug: string,
  data: Record<string, unknown>,
): LearningLogSummary {
  if (data.draft !== undefined && typeof data.draft !== 'boolean') {
    throw new Error(`Learning entry "${slug}" has a non-boolean draft value.`);
  }

  const minutes = optionalPositiveInteger(data.minutes, 'minutes', slug);
  const resourceUrl = optionalUrl(data.resourceUrl, 'resourceUrl', slug);

  return {
    slug,
    title: requiredEntryString(data.title, 'title', slug),
    description: requiredEntryString(data.description, 'description', slug),
    date: requiredEntryDate(data.date, 'date', slug),
    track: requiredSlug(data.track, `Learning entry "${slug}" track`),
    provider: requiredEntryString(data.provider, 'provider', slug),
    resourceTitle: optionalEntryString(data.resourceTitle, 'resourceTitle', slug),
    resourceUrl,
    minutes,
    tags: parseTags(data.tags, slug),
    evidence: optionalArray(data.evidence, `Learning entry "${slug}" evidence`).map(
      (resource, index) =>
        parseResource(
          resource,
          `Learning entry "${slug}" evidence[${index}]`,
        ),
    ),
    draft: data.draft === true,
  };
}

function parseResource(value: unknown, context: string): LearningResource {
  const resource = requiredRecord(value, context);
  return {
    title: requiredString(resource.title, `${context}.title`),
    provider: optionalString(resource.provider, `${context}.provider`),
    url: requiredUrl(resource.url, `${context}.url`),
  };
}

function requiredRecord(
  value: unknown,
  context: string,
): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error(`${context} must be an object.`);
  }
  return value as Record<string, unknown>;
}

function requiredArray(value: unknown, context: string): unknown[] {
  if (!Array.isArray(value)) {
    throw new Error(`${context} must be a list.`);
  }
  return value;
}

function optionalArray(value: unknown, context: string): unknown[] {
  if (value === undefined) return [];
  return requiredArray(value, context);
}

function requiredString(value: unknown, context: string): string {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`${context} must be a non-empty string.`);
  }
  return value.trim();
}

function optionalString(value: unknown, context: string): string | undefined {
  if (value === undefined) return undefined;
  return requiredString(value, context);
}

function requiredSlug(value: unknown, context: string): string {
  const slug = requiredString(value, context);
  if (!slugPattern.test(slug)) {
    throw new Error(`${context} must be lowercase and hyphenated.`);
  }
  return slug;
}

function requiredDate(value: unknown, context: string): string {
  const date = normalizeDate(value);
  if (!date) {
    throw new Error(`${context} must use a valid YYYY-MM-DD date.`);
  }
  return date;
}

function optionalDate(value: unknown, context: string): string | undefined {
  if (value === undefined) return undefined;
  return requiredDate(value, context);
}

function normalizeDate(value: unknown): string | null {
  const raw =
    value instanceof Date
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

function requiredUrl(value: unknown, context: string): string {
  const url = requiredString(value, context);
  if (url.startsWith('/')) return url;

  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
      throw new Error();
    }
    return url;
  } catch {
    throw new Error(`${context} must be an absolute HTTP(S) or site URL.`);
  }
}

function optionalUrl(
  value: unknown,
  field: string,
  slug: string,
): string | undefined {
  if (value === undefined) return undefined;
  return requiredUrl(value, `Learning entry "${slug}" ${field}`);
}

function requiredEntryString(
  value: unknown,
  field: string,
  slug: string,
): string {
  return requiredString(value, `Learning entry "${slug}" ${field}`);
}

function optionalEntryString(
  value: unknown,
  field: string,
  slug: string,
): string | undefined {
  return optionalString(value, `Learning entry "${slug}" ${field}`);
}

function requiredEntryDate(
  value: unknown,
  field: string,
  slug: string,
): string {
  return requiredDate(value, `Learning entry "${slug}" ${field}`);
}

function optionalPositiveInteger(
  value: unknown,
  field: string,
  slug: string,
): number | undefined {
  if (value === undefined) return undefined;
  if (!Number.isInteger(value) || (value as number) <= 0) {
    throw new Error(
      `Learning entry "${slug}" ${field} must be a positive integer.`,
    );
  }
  return value as number;
}

function parseTags(value: unknown, slug: string): string[] {
  if (value === undefined) return [];
  if (!Array.isArray(value) || value.some((tag) => typeof tag !== 'string')) {
    throw new Error(
      `Learning entry "${slug}" tags must be a list of strings.`,
    );
  }
  return value.map((tag) => tag.trim()).filter(Boolean);
}

function assertUnique(values: string[], context: string): void {
  if (new Set(values).size !== values.length) {
    throw new Error(`${context} must be unique.`);
  }
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
