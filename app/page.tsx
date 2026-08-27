import Link from 'next/link';
import videosData from '../data/videos.json';
import {
  formatPostDate,
  getAllPosts,
  type PostSummary,
} from '@/lib/posts';
import {
  formatLearningDate,
  getAllLearningLogs,
  getLearningRoadmap,
  type LearningLogSummary,
  type LearningRoadmap,
} from '@/lib/learning';

type Video = {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  views: string | null;
  published: string | null;
};

export default async function HomePage() {
  const [posts, learningRoadmap, learningEntries] = await Promise.all([
    getAllPosts(),
    getLearningRoadmap(),
    getAllLearningLogs(),
  ]);

  return (
    <>
      <Hero />
      <Expertise />
      <FeaturedProduct />
      <LearningPreview
        roadmap={learningRoadmap}
        entries={learningEntries.slice(0, 2)}
      />
      <RecentWriting posts={posts.slice(0, 3)} />
      <LatestVideos />
      <Projects />
      <PastLife />
      <CTA />
    </>
  );
}

function LearningPreview({
  roadmap,
  entries,
}: {
  roadmap: LearningRoadmap;
  entries: LearningLogSummary[];
}) {
  const activeItems = roadmap.tracks.flatMap((track) =>
    track.items
      .filter((item) => item.status === 'in-progress')
      .map((item) => ({ ...item, trackTitle: track.title })),
  );

  return (
    <section className="border-t border-black/5 dark:border-white/10">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-medium uppercase opacity-60">
              Learning journey
            </p>
            <h2 className="text-3xl font-semibold">What I am learning now</h2>
          </div>
          <Link
            href="/learning/"
            className="text-sm opacity-70 hover:opacity-100 hover:underline"
          >
            View the roadmap
          </Link>
        </div>

        <div className="mt-10 grid gap-10 border-y border-black/10 py-8 dark:border-white/15 md:grid-cols-[1fr_1.2fr] md:gap-14">
          <div>
            <p className="text-xs uppercase opacity-50">Current focus</p>
            <h3 className="mt-3 text-2xl font-semibold leading-tight">
              {roadmap.currentFocus.title}
            </h3>
            <p className="mt-3 text-sm leading-6 opacity-70">
              {roadmap.currentFocus.description}
            </p>
          </div>

          <ol className="border-l border-black/15 pl-6 dark:border-white/20">
            {activeItems.map((item, index) => (
              <li
                key={item.id}
                className={
                  index > 0
                    ? 'border-t border-black/10 pt-5 pb-1 dark:border-white/15'
                    : 'pb-5'
                }
              >
                <p className="text-xs uppercase opacity-50">
                  {item.trackTitle}
                </p>
                <p className="mt-1 font-semibold">{item.title}</p>
              </li>
            ))}
          </ol>
        </div>

        {entries.length > 0 ? (
          <div className="mt-8 grid gap-4 sm:grid-cols-[12rem_1fr] sm:gap-8">
            <div>
              <p className="text-xs uppercase opacity-50">Latest log</p>
              <time
                dateTime={entries[0].date}
                className="mt-2 block text-xs opacity-55"
              >
                {formatLearningDate(entries[0].date)}
              </time>
            </div>
            <Link
              href={`/learning/${entries[0].slug}/`}
              className="group max-w-2xl"
            >
              <h3 className="font-semibold group-hover:underline">
                {entries[0].title}
              </h3>
              <p className="mt-2 text-sm leading-6 opacity-70">
                {entries[0].description}
              </p>
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function RecentWriting({ posts }: { posts: PostSummary[] }) {
  return (
    <section className="border-t border-black/5 dark:border-white/10">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-medium uppercase opacity-60">
              Writing
            </p>
            <h2 className="text-3xl font-semibold">Notes from the work</h2>
          </div>
          <Link
            href="/posts/"
            className="text-sm opacity-70 hover:opacity-100 hover:underline"
          >
            Browse all writing
          </Link>
        </div>

        {posts.length > 0 ? (
          <ol className="mt-10 border-t border-black/10 dark:border-white/15">
            {posts.map((post) => (
              <li
                key={post.slug}
                className="border-b border-black/10 dark:border-white/15"
              >
                <Link
                  href={`/posts/${post.slug}/`}
                  className="group grid gap-3 py-7 sm:grid-cols-[10rem_1fr] sm:gap-8"
                >
                  <div className="text-xs opacity-55">
                    <time dateTime={post.date}>
                      {formatPostDate(post.date)}
                    </time>
                    <span className="mt-1 block">
                      {post.readingTimeMinutes} min read
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold group-hover:underline">
                      {post.title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm leading-6 opacity-70">
                      {post.description}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        ) : (
          <div className="mt-10 border-y border-black/10 py-8 dark:border-white/15">
            <p className="text-sm opacity-65">The first note is coming soon.</p>
          </div>
        )}
      </div>
    </section>
  );
}

function Hero() {
  return (
    <section className="mx-auto max-w-5xl px-6 pt-20 pb-16 sm:pt-32">
      <div className="flex flex-col-reverse items-start gap-10 md:flex-row md:items-center md:gap-12">
        <div className="flex-1">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest opacity-60">
            Helsinki, Finland · Azure Platform Engineer · A decade in
          </p>
          <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
            I do all things
            <br />
            <span className="opacity-60">Azure.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg opacity-80">
            Platform engineer with ten years of experience. I build Azure
            landing zones, write the IaC (Bicep + Terraform) that provisions
            them, design the Azure Policy that governs them, and wire up the
            pipelines that ship them.
          </p>
        </div>
        <div className="shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/profile.jpg"
            alt="Sunny Bharne"
            width={224}
            height={224}
            className="h-40 w-40 rounded-full object-cover ring-1 ring-black/10 dark:ring-white/15 shadow-sm sm:h-56 sm:w-56"
          />
        </div>
      </div>
      <div className="mt-10 flex flex-wrap items-center gap-3">
        <a
          href="https://github.com/sunnybharne"
          className="rounded-md bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:opacity-90"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/sunnybharne/"
          className="rounded-md bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:opacity-90"
        >
          LinkedIn
        </a>
        <a
          href="https://www.youtube.com/@sunnybharne"
          rel="me"
          className="rounded-md border border-foreground/15 px-5 py-2.5 text-sm font-medium hover:bg-foreground/5"
        >
          YouTube @sunnybharne
        </a>
        <a
          href="https://x.com/thesunnybharne"
          rel="me"
          className="rounded-md border border-foreground/15 px-5 py-2.5 text-sm font-medium hover:bg-foreground/5"
        >
          X @thesunnybharne
        </a>
        <a
          href="mailto:sunny.bharne@outlook.com"
          className="rounded-md border border-foreground/15 px-5 py-2.5 text-sm font-medium hover:bg-foreground/5"
        >
          Email me →
        </a>
      </div>
      <p className="mt-3 text-xs opacity-50">
        Take the &quot;expert&quot; label with a pinch of salt — but I&apos;ve
        been in the Azure platform space long enough to have strong opinions.
      </p>
    </section>
  );
}

function Expertise() {
  const items = [
    {
      title: 'Azure DevOps',
      body: 'Pipelines, self-hosted agents, Repos, service connections — the whole stack. If it touches Azure DevOps, I&apos;ve probably broken and fixed it.',
    },
    {
      title: 'IaC: Bicep + Terraform',
      body: 'Mostly HCL Terraform, with a healthy amount of Bicep. Catching up on cdktf. Real production landing zones, not just demo modules.',
    },
    {
      title: 'Landing Zones',
      body: 'Platform, Standard, and Shared landing zone provisioning end-to-end. Management group structures aligned to CAF, with opinionated tweaks.',
    },
    {
      title: 'Azure Policy',
      body: 'Policy authoring and release design with multiple release cycles. The kind of governance that doesn&apos;t make app teams hate you.',
    },
    {
      title: 'Change Management',
      body: 'Azure platform change management integrated with ServiceNow. Auditable, automated, and not painful for the humans involved.',
    },
    {
      title: 'Test Automation',
      body: 'Pester for Azure platform tests and Terraform-native testing tools. If it ships to prod, it has a test gate in front of it.',
    },
  ];
  return (
    <section className="border-t border-black/5 dark:border-white/10">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="text-3xl font-semibold tracking-tight">What I do</h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {items.map((item) => (
            <div key={item.title}>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p
                className="mt-2 text-sm opacity-75"
                dangerouslySetInnerHTML={{ __html: item.body }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedProduct() {
  const features = [
    {
      title: 'Visible agent work',
      body: 'A planned visual timeline for prompts, tool calls, file changes, errors, and agent decisions.',
    },
    {
      title: 'Human checkpoints',
      body: 'Review and approval moments placed where consequential actions happen, not hidden in terminal noise.',
    },
    {
      title: 'Local by default',
      body: 'Workspace access, process control, credentials, and session data stay on the user machine unless configured otherwise.',
    },
    {
      title: 'Pi remains Pi',
      body: 'Papliba is designed as another surface for Pi, using the Pi RPC boundary instead of rebuilding the agent runtime.',
    },
  ];
  return (
    <section className="border-t border-black/5 dark:border-white/10">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest opacity-60">
          Current focus · Papliba · Pi agent UX
        </p>
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Papliba — a window{' '}
          <span className="opacity-60">into your Pi agent.</span>
        </h2>
        <p className="mt-6 max-w-2xl text-base opacity-80">
          Papliba is an open-source, local-first control surface for the Pi
          coding agent. The goal is to make agent activity visible, reviewable,
          and easier to shape while Pi remains the underlying runtime.
        </p>

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {features.map((item) => (
            <div key={item.title}>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm opacity-75">{item.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href="https://papliba.com"
            className="rounded-md bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:opacity-90"
          >
            Visit papliba.com
          </a>
          <a
            href="https://github.com/sunnybharne/papliba"
            className="rounded-md border border-foreground/15 px-5 py-2.5 text-sm font-medium hover:bg-foreground/5"
          >
            View the repo →
          </a>
        </div>
      </div>
    </section>
  );
}

function LatestVideos() {
  const videos = (videosData.videos as Video[]).slice(0, 6);
  if (videos.length === 0) return null;
  return (
    <section className="border-t border-black/5 dark:border-white/10">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <p className="mb-2 text-sm font-medium uppercase tracking-widest opacity-60">
              YouTube · @sunnybharne
            </p>
            <h2 className="text-3xl font-semibold tracking-tight">
              Latest videos
            </h2>
          </div>
          <a
            href="https://www.youtube.com/@sunnybharne"
            className="text-sm opacity-70 hover:opacity-100"
          >
            Visit the channel →
          </a>
        </div>
        <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((v) => (
            <li key={v.id} className="group">
              <a href={v.url} className="block">
                <div className="overflow-hidden rounded-md border border-black/5 dark:border-white/10 bg-foreground/5 aspect-video">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={v.thumbnail}
                    alt={v.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition group-hover:scale-[1.02]"
                  />
                </div>
                <h3 className="mt-3 text-sm font-semibold leading-snug group-hover:underline">
                  {v.title}
                </h3>
                <p className="mt-1 text-xs opacity-60">
                  {[v.views, v.published].filter(Boolean).join(' · ')}
                </p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Projects() {
  const projects = [
    {
      num: '01',
      title: 'papliba',
      body: 'An open-source, local-first control surface for the Pi coding agent, starting with product docs and architecture.',
      href: 'https://github.com/sunnybharne/papliba',
    },
    {
      num: '02',
      title: 'pi-agent.nvim',
      body: 'A small Neovim plugin that opens a right-side Pi Agent chat panel and sends editor context with prompts.',
      href: 'https://github.com/sunnybharne/pi-agent.nvim',
    },
    {
      num: '03',
      title: 'azure-enterprise-platform',
      body: 'My reference Azure platform: landing zones, management group structure, policy release design — IaC end-to-end.',
      href: 'https://github.com/sunnybharne/azure-enterprise-platform',
    },
    {
      num: '04',
      title: 'sunny-agent',
      body: 'An AI agent built to act on my behalf. Early stage — the long-running side project.',
      href: 'https://github.com/sunnybharne/sunny-agent',
    },
    {
      num: '05',
      title: 'nvim — my Neovim config',
      body: 'My personal Neovim setup. I use VIM. Judge me.',
      href: 'https://github.com/sunnybharne/nvim',
    },
  ];
  return (
    <section className="border-t border-black/5 dark:border-white/10">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="text-3xl font-semibold tracking-tight">Projects</h2>
        <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <li key={p.num}>
              <div className="font-mono text-sm opacity-50">{p.num}</div>
              <a
                href={p.href}
                className="mt-2 inline-block text-lg font-semibold hover:underline"
              >
                {p.title}
              </a>
              <p className="mt-1 text-sm opacity-75">{p.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function PastLife() {
  return (
    <section className="border-t border-black/5 dark:border-white/10">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="text-3xl font-semibold tracking-tight">Past life</h2>
        <p className="mt-6 max-w-2xl text-sm opacity-75">
          Before the platform-engineering years I was deep in test automation:
          Selenium with Java, building test frameworks from scratch, and all
          the SDLC plumbing around regression, integration, and unit testing.
          Everything I did was Java — so yes, I know Java quite well.
        </p>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="border-t border-black/5 dark:border-white/10">
      <div className="mx-auto max-w-5xl px-6 py-20 text-center">
        <h2 className="text-3xl font-semibold tracking-tight">
          Want to talk Azure?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm opacity-75">
          I&apos;m always happy to swap notes on landing zones, policy design,
          or how to keep an Azure platform from collapsing under its own
          weight. Drop me a line.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="mailto:sunny.bharne@outlook.com"
            className="rounded-md bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:opacity-90"
          >
            Email me
          </a>
          <a
            href="https://www.linkedin.com/in/sunnybharne/"
            className="rounded-md border border-foreground/15 px-5 py-2.5 text-sm font-medium hover:bg-foreground/5"
          >
            Connect on LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
