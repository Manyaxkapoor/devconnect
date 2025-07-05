import { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const AuthModal = ({ open, onClose }) => {
  const [mode, setMode] = useState('login');

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} aria-label="Close modal" tabIndex={-1} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 p-0 animate-fade-in">
        <div className="flex justify-between items-center border-b border-gray-100 px-8 pt-6 pb-2">
          <div className="flex gap-2">
            <button
              className={`px-4 py-2 rounded-t-lg font-semibold transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-black/30 ${mode === 'login' ? 'text-black border-b-2 border-black' : 'text-gray-400'}`}
              onClick={() => setMode('login')}
              aria-selected={mode === 'login'}
            >
              Login
            </button>
            <button
              className={`px-4 py-2 rounded-t-lg font-semibold transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-black/30 ${mode === 'signup' ? 'text-black border-b-2 border-black' : 'text-gray-400'}`}
              onClick={() => setMode('signup')}
              aria-selected={mode === 'signup'}
            >
              Sign Up
            </button>
          </div>
          <button
            className="text-gray-400 hover:text-black p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-black/30"
            onClick={onClose}
            aria-label="Close"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="px-8 pb-8 pt-2">
          {mode === 'login' ? <LoginForm /> : <SignupForm />}
        </div>
      </div>
    </div>
  );
};

export default AuthModal; 