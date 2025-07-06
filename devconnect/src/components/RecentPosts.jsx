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
    <section className="bg-white rounded-3xl shadow-sm p-6 mt-8">
      <h2 className="text-xl font-bold mb-4 text-gray-900">Recent Posts & Projects</h2>
      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.title}
            className="p-4 rounded-xl border border-gray-100 hover:shadow-md transition"
          >
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-gray-800">
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