import React, { useState } from "react";

export default function EditProfileModal({ isOpen, onClose, profile, onSave }) {
  const [form, setForm] = useState(profile);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSkillsChange = (e) => {
    setForm((f) => ({ ...f, skills: e.target.value.split(",").map((s) => s.trim()) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md relative">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col items-center">
            <img
              src={form.avatar || "/avatar-placeholder.png"}
              alt="Avatar"
              className="w-20 h-20 rounded-full object-cover mb-2 border"
            />
            <input
              type="text"
              name="avatar"
              value={form.avatar}
              onChange={handleChange}
              placeholder="Avatar URL"
              className="w-full mt-1 px-3 py-2 border rounded-xl focus:outline-none focus:ring"
            />
          </div>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring"
            required
          />
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            placeholder="Bio"
            className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring"
            rows={3}
          />
          <input
            type="text"
            name="skills"
            value={form.skills.join(", ")}
            onChange={handleSkillsChange}
            placeholder="Skills (comma separated)"
            className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring"
          />
          <div className="flex gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold shadow hover:from-blue-600 hover:to-blue-800"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 