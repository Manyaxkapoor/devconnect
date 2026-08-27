import React from "react";
import { ArrowUpRight, Github } from "lucide-react";

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
    <section className="rounded-[2rem] border border-gray-200 bg-white p-6 sm:p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gray-400"><Github size={14} /> Open source</div>
          <h2 className="font-display text-2xl font-bold tracking-tight text-gray-950">GitHub repositories</h2>
        </div>
        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-500">{repos.length}</span>
      </div>
      <div className="divide-y divide-gray-100">
        {repos.map((repo) => (
          <a
            key={repo.name}
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block py-5 first:pt-0 last:pb-0"
          >
            <div className="flex items-center justify-between">
              <span className="text-base font-semibold text-gray-900 transition group-hover:text-blue-700">
                {repo.name}
              </span>
              <ArrowUpRight size={17} className="text-gray-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-black" />
            </div>
            <p className="mt-1 text-sm leading-6 text-gray-500">{repo.description}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
