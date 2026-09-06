import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Side projects from Sunny Bharne: Azure infrastructure, Pi agent tools, and a personal Neovim setup.',
  alternates: { canonical: '/projects/' },
  openGraph: {
    title: 'Projects — Sunny Bharne',
    description: 'Experiments in infrastructure, AI agents, and developer tools.',
    url: '/projects/',
  },
};

const projects = [
  {
    name: 'Papliba',
    description:
      'An open-source, local interface for the Pi coding agent. The project starts with product docs and architecture, exploring ways to make agent activity visible and reviewable while Pi remains the runtime.',
    repository: 'https://github.com/sunnybharne/papliba',
    website: 'https://papliba.com',
  },
  {
    name: 'pi-agent.nvim',
    description:
      'A small Neovim plugin that opens a Pi Agent chat panel beside the editor and sends editor context with prompts.',
    repository: 'https://github.com/sunnybharne/pi-agent.nvim',
  },
  {
    name: 'azure-enterprise-platform',
    description:
      'My reference Azure platform: landing zones, management groups, and policy release design, defined as infrastructure code.',
    repository: 'https://github.com/sunnybharne/azure-enterprise-platform',
  },
  {
    name: 'sunny-agent',
    description:
      'An early-stage experiment with an AI agent that can act on my behalf. A long-running side project.',
    repository: 'https://github.com/sunnybharne/sunny-agent',
  },
  {
    name: 'My Neovim configuration',
    description: 'The editor setup I use and keep tinkering with.',
    repository: 'https://github.com/sunnybharne/nvim',
  },
];

export default function ProjectsPage() {
  return (
    <section className="page-shell">
      <header className="page-heading">
        <p className="eyebrow">Alongside the writing</p>
        <h1>Projects</h1>
        <p className="page-intro">
          Things I build and experiment with, from Azure infrastructure to the
          tools on my own machine.
        </p>
      </header>

      <ul className="project-list">
        {projects.map((project) => (
          <li key={project.repository} className="project-item">
            <h2>{project.name}</h2>
            <p>{project.description}</p>
            <div className="project-links">
              <a className="text-link" href={project.repository}>Source on GitHub</a>
              {project.website ? (
                <a className="text-link" href={project.website}>Website</a>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
