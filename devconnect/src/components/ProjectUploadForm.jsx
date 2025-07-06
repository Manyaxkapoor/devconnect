import React, { useState } from "react";
import { supabase } from "../supabaseClient";

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
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(form.image);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleTechChange = (e) => {
    setTechInput(e.target.value);
    setForm((f) => ({ ...f, techStack: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const { data, error } = await supabase.storage.from('project-images').upload(fileName, file);
    if (error) {
      alert('Image upload failed: ' + error.message);
      setUploading(false);
      return;
    }
    const { data: urlData } = supabase.storage.from('project-images').getPublicUrl(fileName);
    setForm((f) => ({ ...f, image: urlData.publicUrl }));
    setPreview(urlData.publicUrl);
    setUploading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) return;
    onSubmit({ ...form });
    setForm(initialState);
    setTechInput("");
    setPreview("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow p-5 mb-6 flex flex-col gap-3 border border-gray-100 max-w-lg mx-auto">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Project Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          disabled={uploading}
        />
        {preview && (
          <div className="relative mt-2">
            <img src={preview} alt="Preview" className="rounded-xl w-full max-h-48 object-cover border" />
            <button
              type="button"
              className="absolute top-2 right-2 bg-white bg-opacity-80 hover:bg-red-500 hover:text-white text-gray-700 rounded-full p-1 shadow transition"
              onClick={() => { setPreview(""); setForm(f => ({ ...f, image: "" })); }}
              aria-label="Remove image"
            >
              &times;
            </button>
          </div>
        )}
      </div>
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
          disabled={uploading}
        >
          {uploading ? 'Uploading...' : 'Save Project'}
        </button>
      </div>
    </form>
  );
} 