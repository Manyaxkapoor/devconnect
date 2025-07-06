import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabaseClient';
import { useUser } from '../context/UserContext';

export function usePosts() {
  const { user } = useUser();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) setError(error.message);
    else setPosts(data || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchPosts();
    // Real-time updates
    const channel = supabase.channel('public:posts')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'posts' }, fetchPosts)
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchPosts]);

  // Optimistic create
  const createPost = async (content, image) => {
    if (!user) return;
    const optimistic = {
      id: Date.now(),
      content,
      image,
      user_id: user.id,
      name: user.user_metadata?.name || user.email,
      avatar: user.user_metadata?.avatar_url || '/avatar-placeholder.png',
      created_at: new Date().toISOString(),
    };
    setPosts([optimistic, ...posts]);
    const { error } = await supabase.from('posts').insert([
      {
        content,
        image,
        user_id: user.id,
        name: user.user_metadata?.name || user.email,
        avatar: user.user_metadata?.avatar_url || '/avatar-placeholder.png',
      },
    ]);
    if (error) setError(error.message);
    // fetchPosts will sync real data
  };

  // Optimistic update
  const updatePost = async (id, content) => {
    setPosts(posts => posts.map(p => p.id === id ? { ...p, content } : p));
    const { error } = await supabase.from('posts').update({ content }).eq('id', id);
    if (error) setError(error.message);
  };

  // Optimistic delete
  const deletePost = async (id) => {
    setPosts(posts => posts.filter(p => p.id !== id));
    const { error } = await supabase.from('posts').delete().eq('id', id);
    if (error) setError(error.message);
  };

  return { posts, loading, error, fetchPosts, createPost, updatePost, deletePost };
} 