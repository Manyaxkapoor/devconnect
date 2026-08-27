import React, { useState } from "react";
import { ArrowUpRight, Plus } from "lucide-react";
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
    <main className="min-h-screen bg-white">
      <section className="border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <div className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.24em] text-gray-500">
                <span className="h-2 w-2 rounded-full bg-blue-600" /> Project library
              </div>
              <h1 className="font-display text-4xl font-bold tracking-[-0.04em] text-black sm:text-5xl lg:text-6xl">
                Work worth <span className="font-normal italic text-gray-500">sharing.</span>
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-gray-500 sm:text-lg">
                A focused collection of experiments, products, and ideas built in public.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-500">
                {projects.length.toString().padStart(2, "0")} projects
              </span>
              <button
                className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black/30"
                onClick={() => {
                  setShowForm(true);
                  setEditing(null);
                }}
              >
                <Plus size={18} /> Add project
              </button>
            </div>
          </div>
        </div>
      </section>
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
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
        {!showForm && projects.length > 0 && (
          <div className="mt-12 flex items-center justify-end gap-2 text-sm font-semibold text-gray-500">
            Explore the collection <ArrowUpRight size={16} />
          </div>
        )}
      </div>
    </main>
  );
}
