import { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { useNavigate } from 'react-router-dom';

const AuthModal = ({ open, onClose }) => {
  const [mode, setMode] = useState('login');
  const navigate = useNavigate();

  if (!open) return null;

  const handleSignupSuccess = () => {
    onClose();
    navigate('/');
  };

  const handleLoginSuccess = () => {
    onClose();
    navigate('/profile');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} aria-label="Close modal" tabIndex={-1} />
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full mx-4 p-0 animate-fade-in">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-black p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-black/30 z-10"
          onClick={onClose}
          aria-label="Close"
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <div className="px-8 pb-8 pt-8">
          {mode === 'login' ? (
            <LoginForm onSignupClick={() => setMode('signup')} onSuccess={handleLoginSuccess} />
          ) : (
            <SignupForm onLoginClick={() => setMode('login')} onSuccess={handleSignupSuccess} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal; 