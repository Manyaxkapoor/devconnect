import React from "react";
import { ExternalLink, Github } from "lucide-react";

export default function ProjectCard({ project, onClick }) {
  return (
    <div
      className="bg-white rounded-2xl shadow p-5 flex flex-col gap-3 border border-gray-100 hover:shadow-lg transition cursor-pointer"
      onClick={onClick}
    >
      <img
        src={project.image}
        alt={project.title}
        className="rounded-xl w-full h-40 object-cover border mb-2"
      />
      <div className="font-bold text-lg text-gray-900 mb-1">{project.title}</div>
      <div className="text-gray-600 text-sm mb-2 line-clamp-2">{project.description}</div>
      <div className="flex flex-wrap gap-2 mb-2">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold border border-blue-100"
          >
            {tech}
          </span>
        ))}
      </div>
      <div className="flex gap-3 mt-auto">
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-blue-600 hover:underline text-sm"
            onClick={e => e.stopPropagation()}
          >
            <ExternalLink size={16} /> Demo
          </a>
        )}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-gray-700 hover:underline text-sm"
            onClick={e => e.stopPropagation()}
          >
            <Github size={16} /> GitHub
          </a>
        )}
      </div>
    </div>
  );
} 