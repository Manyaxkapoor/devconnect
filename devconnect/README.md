# DevConnect

A modern frontend developer portfolio platform to **showcase your projects**, **build your profile**, and make an impression in the dev world.

This is a frontend-only project built with React + TailwindCSS, featuring **authentication and storage powered by Supabase**. Designed fully in Figma, the UI is clean, responsive, and production-ready — ideal for a personal portfolio or developer showcase site.

---

## ✨ Features

- 🎨 **Responsive, modern landing page** based on my own Figma design
- 👤 **Developer profile system** with avatar upload, bio, skills, and GitHub link
- 🧑‍💻 **Project showcase section** – add project details, tech stack, GitHub/live links
- 📦 **Supabase integration** for:
  - Email/password authentication
  - Public storage buckets for avatars & project screenshots
  - Database schema for users and projects
- 🌙 **Dark/light mode ready UI** (Tailwind + Inter font)
- 🔐 Authentication flow (signup, login, logout) handled via Supabase
- ✅ Fully responsive design, works on desktop and mobile

> ⚠️ Note: This is a **frontend-only prototype**. No real-time collaboration or social features between users have been implemented.

---

## 🧰 Tech Stack

- **Frontend**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [Lucide Icons](https://lucide.dev/)
- **Backend Services**: [Supabase](https://supabase.com/)
  - Auth
  - Postgres DB
  - Public Storage Buckets
- **Design**: [Figma](https://figma.com) (Custom UI layout)

---

## 🧱 Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com/)
2. Add your API keys to a `.env` file:
