import React from "react";
import { ExternalLink, Github } from "lucide-react";

export default function ProjectCard({ project, onClick }) {
  return (
    <article
      className="group flex cursor-pointer flex-col overflow-hidden rounded-[2rem] border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-large"
      onClick={onClick}
      tabIndex={0}
      role="button"
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") onClick();
      }}
    >
      <div className="overflow-hidden bg-gray-100">
        <img src={project.image} alt={project.title} className="h-64 w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="mb-3 flex items-start justify-between gap-4">
          <h2 className="font-display text-2xl font-bold tracking-tight text-gray-950">{project.title}</h2>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-200 transition group-hover:bg-black group-hover:text-white">
            <ExternalLink size={16} />
          </span>
        </div>
        <p className="mb-5 line-clamp-2 text-sm leading-6 text-gray-500">{project.description}</p>
        <div className="mb-6 flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600"
          >
            {tech}
          </span>
        ))}
      </div>
        <div className="mt-auto flex gap-4 border-t border-gray-100 pt-5">
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-semibold text-black hover:text-blue-700"
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
            className="flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-black"
            onClick={e => e.stopPropagation()}
          >
            <Github size={16} /> GitHub
          </a>
        )}
        </div>
      </div>
    </article>
  );
}
