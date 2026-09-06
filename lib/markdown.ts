import MarkdownIt from 'markdown-it';

type MarkdownRenderer = InstanceType<typeof MarkdownIt>;
const readingTimeMarkdown = new MarkdownIt({ html: false });

export type ArticleHeading = {
  id: string;
  title: string;
};

export function addHeadingAnchors(markdown: MarkdownRenderer): MarkdownRenderer {
  markdown.core.ruler.push('article-headings', (state) => {
    const usedIds = new Set<string>();
    const headings: ArticleHeading[] = [];

    state.tokens.forEach((token, index) => {
      if (token.type !== 'heading_open') return;

      const inline = state.tokens[index + 1];
      const title = (inline.children ?? [])
        .map((child) => {
          if (['text', 'code_inline', 'image'].includes(child.type)) {
            return child.content;
          }
          return ['softbreak', 'hardbreak'].includes(child.type) ? ' ' : '';
        })
        .join('')
        .trim() || inline.content;
      // Keep the existing ASC guide's published anchors.
      const base = title.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-') || 'section';
      let id = base;
      let suffix = 2;

      while (usedIds.has(id)) id = `${base}-${suffix++}`;
      usedIds.add(id);
      token.attrSet('id', id);

      if (token.tag === 'h2') headings.push({ id, title });
    });

    state.env.headings = headings;
  });

  for (const rule of ['fence', 'code_block']) {
    const renderCode = markdown.renderer.rules[rule];
    if (!renderCode) continue;
    markdown.renderer.rules[rule] = (tokens, index, options, env, self) =>
      renderCode(tokens, index, options, env, self).replace(
        /^<pre(?=[ >])/,
        '<pre tabindex="0" aria-label="Scrollable code example"',
      );
  }

  markdown.renderer.rules.table_open = (tokens, index, options, _env, self) => {
    tokens[index].attrSet('tabindex', '0');
    tokens[index].attrSet('aria-label', 'Scrollable table');
    return self.renderToken(tokens, index, options);
  };

  return markdown;
}

export function renderMarkdown(markdown: MarkdownRenderer, content: string) {
  const environment = { headings: [] as ArticleHeading[] };
  const contentHtml = markdown.render(content, environment);
  return { contentHtml, headings: environment.headings };
}

export function estimateReadingTime(content: string): number {
  const text = readingTimeMarkdown.parse(content, {})
    .map((token) => {
      if (['fence', 'code_block'].includes(token.type)) return ' code ';
      if (token.type !== 'inline') return '';
      return (token.children ?? []).map((child) => {
        if (['text', 'code_inline', 'image'].includes(child.type)) {
          return child.content;
        }
        return ['softbreak', 'hardbreak'].includes(child.type) ? ' ' : '';
      }).join('');
    })
    .join(' ');
  const words = text
    .replace(/https?:\/\/[^\s<>]+/gi, ' ')
    .replace(/[^\p{L}\p{N}'-]+/gu, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 220));
}
