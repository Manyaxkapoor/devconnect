import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export default function EditProfileModal({ isOpen, onClose, profile, onSave }) {
  const [form, setForm] = useState(profile);
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(form.avatar);

  useEffect(() => {
    setForm(profile);
    setAvatarPreview(profile.avatar);
  }, [profile, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSkillsChange = (e) => {
    setForm((f) => ({ ...f, skills: e.target.value.split(",").map((s) => s.trim()) }));
  };

  const handleAvatarFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setAvatarUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const { data, error } = await supabase.storage.from('avatars').upload(fileName, file);
    if (error) {
      alert('Avatar upload failed: ' + error.message);
      setAvatarUploading(false);
      return;
    }
    const { data: urlData } = supabase.storage.from('avatars').getPublicUrl(fileName);
    setForm((f) => ({ ...f, avatar: urlData.publicUrl }));
    setAvatarPreview(urlData.publicUrl);
    setAvatarUploading(false);
  };

  const handleRemoveAvatar = () => {
    setForm((f) => ({ ...f, avatar: "" }));
    setAvatarPreview("");
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
            <div className="relative mb-2">
              <img
                src={avatarPreview || "/avatar-placeholder.png"}
                alt="Avatar"
                className="w-20 h-20 rounded-full object-cover border"
              />
              {avatarPreview && (
                <button
                  type="button"
                  className="absolute top-0 right-0 bg-white bg-opacity-80 hover:bg-red-500 hover:text-white text-gray-700 rounded-full p-1 shadow transition"
                  onClick={handleRemoveAvatar}
                  aria-label="Remove avatar"
                >
                  &times;
                </button>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarFile}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              disabled={avatarUploading}
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
              disabled={avatarUploading}
            >
              {avatarUploading ? 'Uploading...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 