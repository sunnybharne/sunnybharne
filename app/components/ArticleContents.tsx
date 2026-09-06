import type { ArticleHeading } from '@/lib/markdown';

export default function ArticleContents({
  headings,
}: {
  headings: ArticleHeading[];
}) {
  if (headings.length < 3) return null;

  return (
    <details className="article-contents">
      <summary>On this page</summary>
      <nav aria-label="Table of contents">
        <ol>
          {headings.map((heading) => (
            <li key={heading.id}>
              <a href={`#${heading.id}`}>{heading.title}</a>
            </li>
          ))}
        </ol>
      </nav>
    </details>
  );
}
