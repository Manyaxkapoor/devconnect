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
      className="mb-8 flex flex-col gap-4 rounded-[2rem] border border-gray-200 bg-white p-5 shadow-soft sm:p-6"
    >
      <textarea
        className="w-full resize-none border-0 px-1 py-2 text-lg text-gray-900 outline-none placeholder:text-gray-400 focus:ring-0"
        rows={3}
        placeholder="What's happening?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <input
        type="text"
        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
        placeholder="Image URL (optional)"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <div className="flex justify-end">
        <button
          type="submit"
          className="rounded-full bg-black px-6 py-2.5 font-semibold text-white transition hover:bg-gray-800"
        >
          Post
        </button>
      </div>
    </form>
  );
}
