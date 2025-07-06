import React, { useState } from "react";

export default function CreatePost({ onPost }) {
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    onPost({ content, image });
    setContent("");
    setImage("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow p-5 mb-6 flex flex-col gap-3 border border-gray-100"
    >
      <textarea
        className="w-full border rounded-xl px-3 py-2 resize-none focus:outline-none focus:ring"
        rows={3}
        placeholder="What's happening?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <input
        type="text"
        className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring"
        placeholder="Image URL (optional)"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold px-6 py-2 rounded-xl shadow hover:from-blue-600 hover:to-blue-800 transition"
        >
          Post
        </button>
      </div>
    </form>
  );
} 