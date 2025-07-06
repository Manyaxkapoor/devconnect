import React, { useState } from "react";
import ProfileHeader from "../components/ProfileHeader";
import SkillsSection from "../components/SkillsSection";
import GithubRepos from "../components/GithubRepos";
import RecentPosts from "../components/RecentPosts";
import EditProfileModal from "../components/EditProfileModal";

const initialProfile = {
  avatar: "/avatar-placeholder.png",
  name: "Alex Developer",
  bio: "Full Stack Developer. Building modern web experiences.",
  skills: ["React", "Node.js", "Tailwind CSS", "TypeScript"],
};

export default function ProfilePage() {
  const [profile, setProfile] = useState(initialProfile);
  const [editOpen, setEditOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-2 flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <div className="relative">
          <ProfileHeader avatar={profile.avatar} name={profile.name} bio={profile.bio} />
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
        onSave={setProfile}
      />
    </div>
  );
} 