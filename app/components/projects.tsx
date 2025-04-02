'use client';

import { useEffect, useState } from 'react';

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
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <section className="py-10">
      <h2 className="text-3xl font-bold mb-6">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {repos.map((repo) => (
          <a
            key={repo.name}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <h3 className="text-xl font-semibold mb-2">{repo.name}</h3>
            <p className="text-gray-600 mb-4">{repo.description || 'No description available'}</p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{repo.language || 'No language specified'}</span>
              <span>Updated: {new Date(repo.updated_at).toLocaleDateString()}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
} 