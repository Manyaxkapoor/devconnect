import React from "react";
import { ExternalLink, Github, X } from "lucide-react";

export default function ProjectDetailModal({ project, isOpen, onClose }) {
  if (!isOpen || !project) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-lg relative">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl"
          onClick={onClose}
          aria-label="Close"
        >
          <X size={28} />
        </button>
        <img
          src={project.image}
          alt={project.title}
          className="rounded-xl w-full h-56 object-cover border mb-4"
        />
        <h2 className="text-2xl font-bold mb-2 text-gray-900">{project.title}</h2>
        <div className="flex flex-wrap gap-2 mb-3">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold border border-blue-100"
            >
              {tech}
            </span>
          ))}
        </div>
        <p className="text-gray-700 mb-4 whitespace-pre-line">{project.description}</p>
        <div className="flex gap-4">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-blue-600 hover:underline text-base"
            >
              <ExternalLink size={18} /> Live Demo
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-gray-700 hover:underline text-base"
            >
              <Github size={18} /> GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
} 