'use client';

import { useEffect, useState } from 'react';
import { FaGithub, FaExternalLinkAlt, FaCode } from 'react-icons/fa';

interface Repository {
  name: string;
  description: string;
  language: string;
  updated_at: string;
  html_url: string;
}

export default function Projects() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/sunnybharne/repos');
        const data = await response.json();
        setRepos(data);
      } catch (error) {
        console.error('Error fetching repositories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  if (loading) {
    return (
      <section className="py-16 w-full max-w-6xl mx-auto px-4">
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-16 w-full max-w-6xl mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Projects
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          A collection of my recent work and ongoing projects
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {repos.map((repo) => (
          <a
            key={repo.name}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative bg-gray-900/50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-800"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-200 group-hover:text-blue-400 transition-colors duration-200">
                  {repo.name}
                </h3>
                <FaGithub className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors duration-200" />
              </div>
              <p className="text-gray-400 mb-4 line-clamp-2">
                {repo.description || 'No description available'}
              </p>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <FaCode className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-400">{repo.language || 'No language specified'}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400 group-hover:text-blue-400 transition-colors duration-200">
                  <span>View Project</span>
                  <FaExternalLinkAlt className="w-4 h-4" />
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
} 