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
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user || null));
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
    // Real-time subscription
    const channel = supabase.channel('public:posts')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'posts' }, () => {
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
        avatar: user.user_metadata?.avatar_url || "/avatar-placeholder.svg",
      },
    ]);
    if (!error) fetchPosts();
  };

  const paginatedPosts = posts.slice(0, page * PAGE_SIZE);
  const hasMore = posts.length > paginatedPosts.length;

  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-gray-100">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.24em] text-gray-500">
            <span className="h-2 w-2 rounded-full bg-blue-600" /> Community feed
          </div>
          <h1 className="font-display text-4xl font-bold tracking-[-0.04em] text-black sm:text-5xl">
            Ideas in <span className="font-normal italic text-gray-500">motion.</span>
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-gray-500">Small updates, useful discoveries, and honest notes from developers building every day.</p>
        </div>
      </section>
      <div className="mx-auto w-full max-w-2xl px-4 py-10 sm:px-6">
      {user ? (
        <CreatePost onPost={handlePost} user={user} />
      ) : (
        <div className="mb-8 rounded-3xl border border-dashed border-gray-300 px-6 py-8 text-center text-gray-500">Log in to join the conversation.</div>
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
                className="rounded-full bg-black px-6 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-gray-800"
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}
      </div>
    </main>
  );
}
