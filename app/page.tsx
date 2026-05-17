import videosData from '../data/videos.json';

type Video = {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  views: string | null;
  published: string | null;
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Expertise />
      <FeaturedProduct />
      <LatestVideos />
      <Projects />
      <PastLife />
      <CTA />
    </>
  );
}

function Hero() {
  return (
    <section className="mx-auto max-w-5xl px-6 pt-20 pb-16 sm:pt-32">
      <p className="mb-4 text-sm font-medium uppercase tracking-widest opacity-60">
        Helsinki, Finland · Azure Platform Engineer · A decade in
      </p>
      <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
        I do all things
        <br />
        <span className="opacity-60">Azure.</span>
      </h1>
      <p className="mt-6 max-w-xl text-lg opacity-80">
        Platform engineer with ten years of experience. I build Azure landing
        zones, write the IaC (Bicep + Terraform) that provisions them, design
        the Azure Policy that governs them, and wire up the pipelines that
        ship them.
      </p>
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
      title: 'Push-to-talk',
      body: 'Hold a global hotkey, speak, release. No clicks, no UI to manage. Out of your way until you need it.',
    },
    {
      title: 'Offline by default',
      body: 'Transcription runs locally via Whisper. Audio never leaves your machine — no cloud, no account, no network wait.',
    },
    {
      title: 'Appears in any app',
      body: 'Your words land where the cursor is. Slack, Notion, terminal, IDE — it all just works.',
    },
    {
      title: 'Mac + Windows',
      body: 'Single C# / .NET codebase on Avalonia. Same behavior on both platforms, none of the Electron weight.',
    },
  ];
  return (
    <section className="border-t border-black/5 dark:border-white/10">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest opacity-60">
          Featured product · Free · macOS · Windows · runs offline
        </p>
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
          stjs — Stop typing.{' '}
          <span className="opacity-60">Just speak.</span>
        </h2>
        <p className="mt-6 max-w-2xl text-base opacity-80">
          A cross-platform desktop utility I&apos;m building in public on
          YouTube. Hold a hotkey, talk, release — the transcribed text appears
          in whatever app you&apos;re in. Slack, Notion, your editor, anywhere.
          Audio never leaves your machine, and the whole thing is free to
          download and use.
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
            href="https://stjs.app"
            className="rounded-md bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:opacity-90"
          >
            Visit stjs.app
          </a>
          <a
            href="https://github.com/sunnybharne/stjs"
            className="rounded-md border border-foreground/15 px-5 py-2.5 text-sm font-medium hover:bg-foreground/5"
          >
            Source on GitHub →
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
              YouTube · @SunnySideCode
            </p>
            <h2 className="text-3xl font-semibold tracking-tight">
              Latest videos
            </h2>
          </div>
          <a
            href="https://www.youtube.com/@SunnySideCode"
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
      title: 'azure-enterprise-platform',
      body: 'My reference Azure platform: landing zones, management group structure, policy release design — IaC end-to-end.',
      href: 'https://github.com/sunnybharne/azure-enterprise-platform',
    },
    {
      num: '02',
      title: 'sunny-agent',
      body: 'An AI agent built to act on my behalf. Early stage — the long-running side project.',
      href: 'https://github.com/sunnybharne/sunny-agent',
    },
    {
      num: '03',
      title: 'nvim — my Neovim config',
      body: 'My personal Neovim setup. I use VIM. Judge me.',
      href: 'https://github.com/sunnybharne/nvim',
    },
  ];
  return (
    <section className="border-t border-black/5 dark:border-white/10">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="text-3xl font-semibold tracking-tight">Projects</h2>
        <ol className="mt-10 grid gap-8 sm:grid-cols-3">
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
