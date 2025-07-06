import React, { useState } from "react";
import { Heart, MessageCircle, Share2 } from "lucide-react";

export default function PostCard({ post }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes || 0);

  const handleLike = () => {
    setLiked((prev) => !prev);
    setLikeCount((count) => count + (liked ? -1 : 1));
  };

  return (
    <div className="bg-white rounded-2xl shadow p-5 mb-6 flex flex-col gap-3 border border-gray-100">
      <div className="flex items-center gap-3">
        <img
          src={post.avatar || "/avatar-placeholder.png"}
          alt={post.name}
          className="w-10 h-10 rounded-full object-cover border"
        />
        <div>
          <div className="font-semibold text-gray-900">{post.name}</div>
          <div className="text-xs text-gray-400">{post.time}</div>
        </div>
      </div>
      <div className="text-gray-800 text-base whitespace-pre-line">{post.content}</div>
      {post.image && (
        <img
          src={post.image}
          alt="Post visual"
          className="rounded-xl mt-2 max-h-60 w-full object-cover border"
        />
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