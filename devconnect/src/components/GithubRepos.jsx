import React from "react";

const repos = [
  {
    name: "devconnect",
    description: "A modern developer platform for connecting and showcasing projects.",
    url: "https://github.com/yourusername/devconnect",
  },
  {
    name: "portfolio-site",
    description: "Personal portfolio built with React and Tailwind CSS.",
    url: "https://github.com/yourusername/portfolio-site",
  },
  {
    name: "open-source-toolkit",
    description: "A set of open-source utilities for developers.",
    url: "https://github.com/yourusername/open-source-toolkit",
  },
];

export default function GithubRepos() {
  return (
    <section className="bg-white rounded-3xl shadow-sm p-6 mt-8">
      <h2 className="text-xl font-bold mb-4 text-gray-900">GitHub Repositories</h2>
      <div className="space-y-4">
        {repos.map((repo) => (
          <a
            key={repo.name}
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 rounded-xl border border-gray-100 hover:shadow-md transition group"
          >
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-blue-700 group-hover:underline">
                {repo.name}
              </span>
              <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </div>
            <p className="text-gray-600 mt-1 text-sm">{repo.description}</p>
          </a>
        ))}
      </div>
    </section>
  );
} 