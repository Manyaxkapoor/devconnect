import React, { useState } from "react";
import ProjectGrid from "./ProjectGrid";
import ProjectUploadForm from "./ProjectUploadForm";
import ProjectDetailModal from "./ProjectDetailModal";

const initialProjects = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
    title: "DevConnect Platform",
    description: "A modern developer platform for connecting and showcasing projects.",
    techStack: ["React", "Node.js", "Tailwind CSS"],
    demo: "https://devconnect.example.com",
    github: "https://github.com/yourusername/devconnect",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    title: "Portfolio Site",
    description: "Personal portfolio built with React and Tailwind CSS.",
    techStack: ["React", "Tailwind CSS"],
    demo: "https://portfolio.example.com",
    github: "https://github.com/yourusername/portfolio-site",
  },
];

export default function ProjectManager() {
  const [projects, setProjects] = useState(initialProjects);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [selected, setSelected] = useState(null);

  const handleAdd = (project) => {
    setProjects([
      { ...project, id: Date.now() },
      ...projects,
    ]);
    setShowForm(false);
  };

  const handleEdit = (project) => {
    setProjects(
      projects.map((p) => (p.id === editing.id ? { ...project, id: editing.id } : p))
    );
    setEditing(null);
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setProjects(projects.filter((p) => p.id !== id));
    setSelected(null);
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-2">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Projects</h1>
        <button
          className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold px-6 py-2 rounded-xl shadow hover:from-blue-600 hover:to-blue-800"
          onClick={() => {
            setShowForm(true);
            setEditing(null);
          }}
        >
          Add Project
        </button>
      </div>
      {showForm && (
        <ProjectUploadForm
          onSubmit={editing ? handleEdit : handleAdd}
          initial={editing || undefined}
          onCancel={() => {
            setShowForm(false);
            setEditing(null);
          }}
        />
      )}
      <ProjectGrid
        projects={projects}
        onProjectClick={(project) => setSelected(project)}
      />
      <ProjectDetailModal
        project={selected}
        isOpen={!!selected}
        onClose={() => setSelected(null)}
      />
      {selected && (
        <div className="fixed inset-0 z-50 flex items-end justify-center pointer-events-none">
          <div className="pointer-events-auto bg-white rounded-xl shadow-lg p-4 flex gap-2 mt-4">
            <button
              className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold"
              onClick={() => {
                setEditing(selected);
                setShowForm(true);
                setSelected(null);
              }}
            >
              Edit
            </button>
            <button
              className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold"
              onClick={() => handleDelete(selected.id)}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 