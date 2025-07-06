import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import ProfileHeader from "../components/ProfileHeader";
import SkillsSection from "../components/SkillsSection";
import GithubRepos from "../components/GithubRepos";
import RecentPosts from "../components/RecentPosts";
import EditProfileModal from "../components/EditProfileModal";
import { supabase } from "../supabaseClient";

export default function ProfilePage() {
  const { user } = useUser();
  const [profile, setProfile] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch user profile from Supabase
  useEffect(() => {
    if (!user) return;
    const fetchProfile = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();
      if (data) setProfile(data);
      else setProfile({
        avatar: user.user_metadata?.avatar_url || "/avatar-placeholder.png",
        name: user.user_metadata?.name || user.email,
        bio: "",
        skills: [],
      });
      setLoading(false);
      setEditOpen(true); // Open edit modal on first load after login
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
  };

  if (!user) {
    return <div className="text-center py-20 text-gray-500">Please log in to view your profile.</div>;
  }
  if (loading || !profile) {
    return <div className="text-center py-20 text-gray-400">Loading profile...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-2 flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <div className="relative">
          <ProfileHeader avatarUrl={profile.avatar || "/avatar-placeholder.png"} name={profile.name} bio={profile.bio} />
          <button
            className="absolute top-0 right-0 mt-4 mr-4 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold shadow hover:from-blue-600 hover:to-blue-800"
            onClick={() => setEditOpen(true)}
          >
            Edit Profile
          </button>
        </div>
        <SkillsSection skills={profile.skills} />
        <GithubRepos />
        <RecentPosts />
      </div>
      <EditProfileModal
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        profile={profile}
        onSave={handleSave}
      />
    </div>
  );
} 