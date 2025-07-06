import React, { useState } from "react";
import PostCard from "./PostCard";
import CreatePost from "./CreatePost";

const initialPosts = [
  {
    id: 1,
    name: "Alex Developer",
    avatar: "/avatar-placeholder.png",
    time: "2h ago",
    content: "Excited to launch DevConnect! 🚀",
    likes: 12,
    comments: 3,
    image: "",
  },
  {
    id: 2,
    name: "Sam Coder",
    avatar: "/avatar-placeholder.png",
    time: "1h ago",
    content: "Just finished a new open-source project. Check it out!",
    likes: 7,
    comments: 1,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    name: "Jamie Dev",
    avatar: "/avatar-placeholder.png",
    time: "30m ago",
    content: "Working on a new blog post about React and Tailwind CSS.",
    likes: 5,
    comments: 0,
    image: "",
  },
  // Add more posts as needed
];

const PAGE_SIZE = 3;

export default function Feed() {
  const [posts, setPosts] = useState(initialPosts);
  const [page, setPage] = useState(1);

  const handlePost = (newPost) => {
    setPosts([
      {
        id: Date.now(),
        name: "Alex Developer",
        avatar: "/avatar-placeholder.png",
        time: "Just now",
        likes: 0,
        comments: 0,
        ...newPost,
      },
      ...posts,
    ]);
  };

  const paginatedPosts = posts.slice(0, page * PAGE_SIZE);
  const hasMore = posts.length > paginatedPosts.length;

  return (
    <div className="w-full max-w-xl mx-auto py-8 px-2">
      <CreatePost onPost={handlePost} />
      <div className="grid grid-cols-1 gap-4">
        {paginatedPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      {hasMore && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setPage(page + 1)}
            className="px-6 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold shadow hover:from-blue-600 hover:to-blue-800"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
} 