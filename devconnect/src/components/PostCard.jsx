import React, { useState } from "react";
import { Heart, MessageCircle, Share2, Edit, Trash2, Check, X as Close } from "lucide-react";
import { supabase } from "../supabaseClient";

export default function PostCard({ post, currentUser }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes || 0);
  const [editing, setEditing] = useState(false);
  const [editContent, setEditContent] = useState(post.content);
  const [loading, setLoading] = useState(false);

  const handleLike = () => {
    setLiked((prev) => !prev);
    setLikeCount((count) => count + (liked ? -1 : 1));
  };

  // Format date
  const date = post.created_at ? new Date(post.created_at).toLocaleString() : "";

  const isOwner = currentUser && post.user_id === currentUser.id;

  const handleDelete = async () => {
    setLoading(true);
    await supabase.from("posts").delete().eq("id", post.id);
    setLoading(false);
    window.location.reload(); // For simplicity, reload to update feed
  };

  const handleEdit = async () => {
    setLoading(true);
    await supabase.from("posts").update({ content: editContent }).eq("id", post.id);
    setEditing(false);
    setLoading(false);
    window.location.reload(); // For simplicity, reload to update feed
  };

  return (
    <div className="bg-white rounded-2xl shadow p-5 mb-6 flex flex-col gap-3 border border-gray-100">
      <div className="flex items-center gap-3">
        <img
          src={post.avatar || "/avatar-placeholder.png"}
          alt={post.name || "User"}
          className="w-10 h-10 rounded-full object-cover border"
        />
        <div>
          <div className="font-semibold text-gray-900">{post.name || "Anonymous"}</div>
          <div className="text-xs text-gray-400">{date}</div>
        </div>
        {isOwner && !editing && (
          <div className="ml-auto flex gap-2">
            <button
              className="text-gray-400 hover:text-blue-600"
              onClick={() => setEditing(true)}
              title="Edit"
            >
              <Edit size={18} />
            </button>
            <button
              className="text-gray-400 hover:text-red-600"
              onClick={handleDelete}
              disabled={loading}
              title="Delete"
            >
              <Trash2 size={18} />
            </button>
          </div>
        )}
      </div>
      {editing ? (
        <div className="flex flex-col gap-2">
          <textarea
            className="w-full border rounded-xl px-3 py-2 resize-none focus:outline-none focus:ring"
            rows={3}
            value={editContent}
            onChange={e => setEditContent(e.target.value)}
          />
          <div className="flex gap-2 justify-end">
            <button
              className="px-3 py-1 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold"
              onClick={() => setEditing(false)}
              disabled={loading}
            >
              <Close size={16} /> Cancel
            </button>
            <button
              className="px-3 py-1 rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold shadow hover:from-blue-600 hover:to-blue-800"
              onClick={handleEdit}
              disabled={loading}
            >
              <Check size={16} /> Save
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="text-gray-800 text-base whitespace-pre-line">{post.content}</div>
          {post.image && (
            <img
              src={post.image}
              alt="Post visual"
              className="rounded-xl mt-2 max-h-60 w-full object-cover border"
            />
          )}
        </>
      )}
      <div className="flex items-center gap-6 mt-2 text-gray-500">
        <button
          className={`flex items-center gap-1 hover:text-red-500 transition ${liked ? "text-red-500" : ""}`}
          onClick={handleLike}
        >
          <Heart size={18} />
          <span className="text-sm">{likeCount}</span>
        </button>
        <button className="flex items-center gap-1 hover:text-blue-500 transition">
          <MessageCircle size={18} />
          <span className="text-sm">{post.comments || 0}</span>
        </button>
        <button className="flex items-center gap-1 hover:text-green-500 transition">
          <Share2 size={18} />
          <span className="text-sm">Share</span>
        </button>
      </div>
    </div>
  );
} 