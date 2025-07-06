import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import ProfilePage from './pages/ProfilePage'
import FeedPage from './pages/FeedPage'
import ProjectsPage from './pages/ProjectsPage'
import { useState, useEffect } from 'react'
import AuthModal from './components/AuthModal'
import { useNavigate } from 'react-router-dom'
import { supabase } from './supabaseClient'

function App() {
  const [authOpen, setAuthOpen] = useState(false)
  const navigate = useNavigate();
  useEffect(() => {
    const handler = () => setAuthOpen(true)
    window.addEventListener('open-auth-modal', handler)
    return () => window.removeEventListener('open-auth-modal', handler)
  }, [])

  // Handle email confirmation redirect
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get('access_token');
    const refreshToken = params.get('refresh_token');
    if (accessToken && refreshToken) {
      supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken })
        .then(() => {
          navigate('/profile', { replace: true });
        });
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
    </div>
  )
}

export default App
