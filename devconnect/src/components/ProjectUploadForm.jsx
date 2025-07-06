import React, { useState } from "react";

const initialState = {
  image: "",
  title: "",
  description: "",
  techStack: [],
  demo: "",
  github: "",
};

export default function ProjectUploadForm({ onSubmit, initial = initialState, onCancel }) {
  const [form, setForm] = useState(initial);
  const [techInput, setTechInput] = useState(form.techStack.join(", "));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleTechChange = (e) => {
    setTechInput(e.target.value);
    setForm((f) => ({ ...f, techStack: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) return;
    onSubmit({ ...form });
    setForm(initialState);
    setTechInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow p-5 mb-6 flex flex-col gap-3 border border-gray-100 max-w-lg mx-auto">
      <input
        type="text"
        name="image"
        value={form.image}
        onChange={handleChange}
        placeholder="Image URL"
        className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring"
      />
      <input
        type="text"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Project Title"
        className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring"
        required
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Project Description"
        className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring"
        rows={3}
        required
      />
      <input
        type="text"
        name="techStack"
        value={techInput}
        onChange={handleTechChange}
        placeholder="Tech Stack (comma separated)"
        className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring"
      />
      <input
        type="text"
        name="demo"
        value={form.demo}
        onChange={handleChange}
        placeholder="Live Demo URL"
        className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring"
      />
      <input
        type="text"
        name="github"
        value={form.github}
        onChange={handleChange}
        placeholder="GitHub URL"
        className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring"
      />
      <div className="flex gap-2 mt-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="flex-1 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold shadow hover:from-blue-600 hover:to-blue-800"
        >
          Save Project
        </button>
      </div>
    </form>
  );
} 