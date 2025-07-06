import React, { useState, useEffect } from "react";
import PostCard from "./PostCard";
import CreatePost from "./CreatePost";
import { supabase } from "../supabaseClient";

const PAGE_SIZE = 3;

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);
    setError("");
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) setError(error.message);
    else setPosts(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
    const session = supabase.auth.getSession().then(({ data }) => setUser(data.session?.user || null));
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
    // Real-time subscription
    const channel = supabase.channel('public:posts')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'posts' }, (payload) => {
        fetchPosts();
      })
      .subscribe();
    return () => {
      authListener.subscription.unsubscribe();
      supabase.removeChannel(channel);
    };
  }, []);

  const handlePost = async (newPost) => {
    if (!user) return;
    const { error } = await supabase.from("posts").insert([
      {
        content: newPost.content,
        image: newPost.image,
        user_id: user.id,
        name: user.user_metadata?.name || user.email,
        avatar: user.user_metadata?.avatar_url || "/avatar-placeholder.png",
      },
    ]);
    if (!error) fetchPosts();
  };

  const paginatedPosts = posts.slice(0, page * PAGE_SIZE);
  const hasMore = posts.length > paginatedPosts.length;

  return (
    <div className="w-full max-w-xl mx-auto py-8 px-2">
      {user ? (
        <CreatePost onPost={handlePost} user={user} />
      ) : (
        <div className="text-center text-gray-500 mb-6">Please log in to create a post.</div>
      )}
      {loading ? (
        <div className="text-center py-10 text-gray-400">Loading posts...</div>
      ) : error ? (
        <div className="text-center py-10 text-red-500">{error}</div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4">
            {paginatedPosts.map((post) => (
              <PostCard key={post.id} post={post} currentUser={user} />
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
        </>
      )}
    </div>
  );
} 