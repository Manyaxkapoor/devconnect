import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Code2, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const AuthArtwork = () => (
  <div className="relative flex min-h-48 overflow-hidden bg-black p-7 text-white lg:min-h-[680px] lg:p-10">
    <div className="auth-orb auth-orb-one" aria-hidden="true" />
    <div className="auth-orb auth-orb-two" aria-hidden="true" />
    <svg className="absolute inset-0 h-full w-full opacity-90" viewBox="0 0 700 900" fill="none" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <path className="auth-wave auth-wave-one" d="M-80 180C90 40 205 330 385 192C535 77 595 94 780 245" stroke="white" strokeWidth="2" />
      <path className="auth-wave auth-wave-two" d="M-125 500C75 305 235 685 430 480C555 349 650 390 805 540" stroke="white" strokeWidth="92" strokeLinecap="round" />
      <path className="auth-wave auth-wave-three" d="M-70 735C115 560 265 870 455 695C590 570 690 610 800 720" stroke="white" strokeWidth="2" />
    </svg>
    <div className="relative z-10 flex w-full flex-col justify-between">
      <div className="flex items-center gap-2 font-display text-lg font-bold">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black"><Code2 size={17} /></span>
        DevConnect
      </div>
      <div className="hidden max-w-sm lg:block">
        <div className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-white/50">Build out loud</div>
        <h2 className="font-display text-5xl font-bold leading-[1.02] tracking-[-0.04em]">Your next idea starts with a connection.</h2>
        <p className="mt-5 max-w-xs text-sm leading-6 text-white/60">Show what you are making, share what you are learning, and meet people through the work.</p>
      </div>
      <div className="hidden items-center gap-2 text-sm font-semibold text-white/70 lg:flex">Made for people who make things <ArrowUpRight size={16} /></div>
    </div>
  </div>
);

const AuthModal = ({ open, onClose }) => {
  const [mode, setMode] = useState('login');
  const dialogRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', closeOnEscape);
    requestAnimationFrame(() => dialogRef.current?.focus());
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [open, onClose]);

  if (!open) return null;

  const finishAuth = (destination) => {
    onClose();
    navigate(destination);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/65 p-3 backdrop-blur-xl sm:p-6" role="presentation">
      <button className="absolute inset-0 cursor-default" onClick={onClose} aria-label="Close authentication window" tabIndex={-1} />
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-label={mode === 'login' ? 'Log in to DevConnect' : 'Create a DevConnect account'} tabIndex={-1} className="relative my-auto grid w-full max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-[0_32px_100px_rgba(0,0,0,0.4)] outline-none animate-scale-in lg:grid-cols-[0.9fr_1.1fr]">
        <button className="absolute right-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white/90 text-gray-600 shadow-sm backdrop-blur transition hover:rotate-90 hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-black/30" onClick={onClose} aria-label="Close">
          <X size={19} />
        </button>
        <AuthArtwork />
        <div className="max-h-[78vh] overflow-y-auto px-6 py-9 sm:px-10 lg:max-h-[680px] lg:px-14 lg:py-12">
          {mode === 'login' ? (
            <LoginForm onSignupClick={() => setMode('signup')} onSuccess={() => finishAuth('/profile')} />
          ) : (
            <SignupForm onLoginClick={() => setMode('login')} onSuccess={() => finishAuth('/')} />
          )}
        </div>
      </div>
      <style>{`
        @keyframes authDrift { 0%, 100% { transform: translate3d(0, 0, 0); } 50% { transform: translate3d(32px, -18px, 0); } }
        @keyframes authWave { 0%, 100% { transform: translateX(-18px); } 50% { transform: translateX(18px); } }
        .auth-orb { position: absolute; border-radius: 9999px; background: white; filter: blur(60px); opacity: .16; animation: authDrift 8s ease-in-out infinite; }
        .auth-orb-one { width: 15rem; height: 15rem; top: 8%; right: -20%; }
        .auth-orb-two { width: 11rem; height: 11rem; bottom: 4%; left: -15%; animation-delay: -4s; }
        .auth-wave { transform-origin: center; animation: authWave 7s ease-in-out infinite; }
        .auth-wave-two { opacity: .12; animation-duration: 10s; animation-direction: reverse; }
        .auth-wave-three { opacity: .45; animation-delay: -3s; }
        @media (prefers-reduced-motion: reduce) { .auth-orb, .auth-wave { animation: none; } }
      `}</style>
    </div>
  );
};

export default AuthModal;
