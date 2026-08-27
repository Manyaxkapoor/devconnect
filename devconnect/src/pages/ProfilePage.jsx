import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { useToast } from "../context/ToastContext";
import ProfileHeader from "../components/ProfileHeader";
import SkillsSection from "../components/SkillsSection";
import GithubRepos from "../components/GithubRepos";
import RecentPosts from "../components/RecentPosts";
import EditProfileModal from "../components/EditProfileModal";
import { supabase } from "../supabaseClient";
import { ArrowUpRight, Pencil } from "lucide-react";

export default function ProfilePage() {
  const { user } = useUser();
  const toast = useToast();
  const [profile, setProfile] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch user profile from Supabase
  useEffect(() => {
    if (!user) return;
    const fetchProfile = async () => {
      setLoading(true);
      const { data } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();
      if (data) setProfile(data);
      else setProfile({
        avatar: user.user_metadata?.avatar_url || "/avatar-placeholder.svg",
        name: user.user_metadata?.name || user.email,
        bio: "",
        skills: [],
      });
      setLoading(false);
      // Do NOT open edit modal automatically
    };
    fetchProfile();
  }, [user]);

  // Save profile to Supabase
  const handleSave = async (newProfile) => {
    if (!user) return;
    setProfile(newProfile);
    await supabase.from("users").upsert({
      id: user.id,
      ...newProfile,
    });
    toast.showToast("Profile updated!", "success");
    // Optionally, refetch profile from Supabase for latest data
    // const { data } = await supabase.from("users").select("*").eq("id", user.id).single();
    // if (data) setProfile(data);
  };

  if (!user) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-white px-4">
        <div className="max-w-xl text-center">
          <div className="mx-auto mb-6 h-2 w-2 rounded-full bg-blue-600" />
          <h1 className="font-display text-4xl font-bold tracking-[-0.04em] text-black sm:text-5xl">Your work deserves a home.</h1>
          <p className="mx-auto mt-5 max-w-md leading-7 text-gray-500">Log in to shape your developer profile, collect your work, and tell the story behind what you build.</p>
          <button onClick={() => window.dispatchEvent(new CustomEvent("open-auth-modal"))} className="mt-8 inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-gray-800">
            Get started <ArrowUpRight size={18} />
          </button>
        </div>
      </main>
    );
  }
  if (loading || !profile) {
    return <div className="text-center py-20 text-gray-400">Loading profile...</div>;
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mb-8 flex items-center justify-between border-b border-gray-100 pb-6">
          <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.24em] text-gray-500">
            <span className="h-2 w-2 rounded-full bg-blue-600" /> Developer profile
          </div>
          <button className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-gray-300 hover:bg-gray-50" onClick={() => setEditOpen(true)}>
            <Pencil size={15} /> Edit profile
          </button>
        </div>
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <aside className="rounded-[2rem] bg-black p-7 text-white sm:p-9">
            <ProfileHeader avatarUrl={profile.avatar || "/avatar-placeholder.svg"} name={profile.name} bio={profile.bio} />
            <SkillsSection skills={profile.skills} />
          </aside>
          <div className="space-y-6">
            <GithubRepos />
            <RecentPosts />
          </div>
        </div>
      </div>
      <EditProfileModal
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        profile={profile}
        onSave={handleSave}
      />
    </main>
  );
}
