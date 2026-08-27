import React from "react";

const posts = [
  {
    title: "Building a Modern Dev Platform",
    description: "How I designed and built DevConnect using React and Tailwind.",
    date: "2024-07-01",
  },
  {
    title: "Open Source Toolkit Release",
    description: "Announcing v1.0 of my open-source utilities for developers.",
    date: "2024-06-20",
  },
  {
    title: "My Portfolio Redesign",
    description: "A deep dive into the process and tools behind my new portfolio site.",
    date: "2024-06-10",
  },
];

export default function RecentPosts() {
  return (
    <section className="rounded-[2rem] border border-gray-200 bg-gray-50 p-6 sm:p-8">
      <div className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Latest notes</div>
      <div className="space-y-1">
        {posts.map((post) => (
          <div
            key={post.title}
            className="rounded-2xl p-4 transition hover:bg-white hover:shadow-soft"
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-900">
                {post.title}
              </span>
              <span className="text-xs text-gray-400 font-mono">
                {post.date}
              </span>
            </div>
            <p className="text-gray-600 mt-1 text-sm">{post.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
