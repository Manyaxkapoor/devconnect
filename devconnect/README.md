# DevConnect

A modern developer platform to showcase your work, connect with others, and build your professional presence.

## Features

- 🚀 Beautiful landing page with animated hero made from my figma design 
- 👤 Modern authentication (login, signup, password reset) with Supabase Auth
- 📝 Developer profile with avatar upload, skills, GitHub repos, and recent posts
- 🏷️ Project showcase with image upload, tech stack, live demo, and GitHub links
- 📰 Twitter-like main feed with posts, likes, comments, and real-time updates
- ⚡ Responsive, clean, and accessible UI (Tailwind CSS + Inter font)


## Tech Stack

- [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.com/) (Auth, Database, Storage)
- [Lucide Icons](https://lucide.dev/)


## Supabase Setup
- Create a Supabase project and get your API keys.
- Set up Auth providers (email, OAuth, etc.).
- Create tables: `users`, `posts`, `projects` 
- Create public storage buckets: `avatars`, `project-images`.


## Folder Structure
```
devconnect/
├── src/
│   ├── components/      # UI components
│   ├── context/         # React context (User, Toast)
│   ├── hooks/           # Custom hooks (usePosts, etc.)
│   ├── pages/           # Page components
│   ├── assets/          # Images, mockups
│   └── ...
├── index.html
├── package.json
├── README.md
└── ...
```

## Customization
- Update branding, colors, and images in `/src/components` and `/src/assets`.
- Edit profile, project, and feed logic in `/src/hooks` and `/src/pages`.


