import MarkdownIt from 'markdown-it';
import { diagramIdForSrc } from './article-flow';

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

  markdown.core.ruler.after('inline', 'unwrap-article-diagrams', (state) => {
    const { tokens } = state;
    for (let index = 0; index < tokens.length - 2; index += 1) {
      if (tokens[index].type !== 'paragraph_open') continue;
      const inline = tokens[index + 1];
      const close = tokens[index + 2];
      if (inline?.type !== 'inline' || close?.type !== 'paragraph_close') continue;
      const children = inline.children ?? [];
      const meaningful = children.filter((child) => {
        if (['softbreak', 'hardbreak'].includes(child.type)) return false;
        return !(child.type === 'text' && !child.content.trim());
      });
      if (meaningful.length !== 1 || meaningful[0].type !== 'image') continue;
      const src = String(meaningful[0].attrGet('src') ?? '');
      const diagramId = diagramIdForSrc(src);
      if (!diagramId) continue;
      const html = new state.Token('html_block', '', 0);
      html.content = `<div data-article-diagram="${diagramId}"></div>\n`;
      tokens.splice(index, 3, html);
    }
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

  const renderImage = markdown.renderer.rules.image;
  markdown.renderer.rules.image = (tokens, index, options, env, self) => {
    const src = String(tokens[index].attrGet('src') ?? '');
    const diagramId = diagramIdForSrc(src);
    if (diagramId) return `<div data-article-diagram="${diagramId}"></div>\n`;
    return renderImage
      ? renderImage(tokens, index, options, env, self)
      : self.renderToken(tokens, index, options);
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
