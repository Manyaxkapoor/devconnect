import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';

const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

const LoginForm = ({ onSignupClick, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetMsg, setResetMsg] = useState('');
  const navigate = useNavigate();
  const toast = useToast();
  const [magicEmail, setMagicEmail] = useState('');
  const [magicMsg, setMagicMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      if (onSuccess) onSuccess();
      navigate('/profile');
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setResetMsg('');
    setError('');
    const { error } = await supabase.auth.resetPasswordForEmail(resetEmail);
    if (error) setError(error.message);
    else setResetMsg('Password reset email sent! Check your inbox.');
  };

  const handleMagicLink = async (e) => {
    e.preventDefault();
    setMagicMsg('');
    if (!validateEmail(magicEmail)) {
      setMagicMsg('Please enter a valid email address.');
      return;
    }
    const { error } = await supabase.auth.signInWithOtp({ email: magicEmail });
    if (error) {
      setMagicMsg(error.message);
    } else {
      setMagicMsg('A sign-in link has been sent to your email. Please check your inbox.');
      toast.showToast('A sign-in link has been sent to your email. Please check your inbox.', 'success');
    }
  };

  return (
    <div className="max-w-md w-full min-h-[520px] mx-auto bg-white rounded-3xl shadow-2xl p-8 font-sans flex flex-col items-center justify-center">
      {/* Logo */}
      <div className="mb-6">
        <div className="w-auto px-6 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
          <span className="text-white text-2xl font-bold tracking-wide font-display">DevConnect</span>
        </div>
      </div>
      <h2 className="text-2xl font-bold text-black mb-8 text-center">Sign in</h2>
      {showReset ? (
        <form onSubmit={handleReset} className="space-y-4 w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto">
          <input
            type="email"
            value={resetEmail}
            onChange={e => setResetEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring text-base"
            required
          />
          {resetMsg && <div className="text-green-600 text-sm mb-2">{resetMsg}</div>}
          {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
          <div className="flex flex-row gap-3 justify-between mt-2 w-full">
            <button type="button" onClick={() => setShowReset(false)} className="flex-1 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold">Back</button>
            <button type="submit" className="flex-1 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold shadow hover:from-blue-600 hover:to-blue-800">Send Reset Link</button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleSubmit} className="w-full space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              className="w-full px-4 py-3 rounded-full border border-gray-200 bg-gray-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-black transition placeholder-gray-400 shadow-sm"
              placeholder="you@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              aria-invalid={!!error}
              aria-describedby="login-error"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              className="w-full px-4 py-3 rounded-full border border-gray-200 bg-gray-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-black transition placeholder-gray-400 shadow-sm"
              placeholder="Your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              minLength={6}
              aria-invalid={!!error}
              aria-describedby="login-error"
            />
          </div>
          {error && <div id="login-error" className="text-red-600 text-sm font-medium">{error}</div>}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-3 rounded-full shadow-sm hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200 text-lg mt-2"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <div className="text-center mt-4">
            <button type="button" onClick={() => setShowReset(true)} className="text-blue-600 hover:underline text-sm">Forgot your password?</button>
          </div>
        </form>
      )}
      {/* Magic Link Sign In */}
      <form onSubmit={handleMagicLink} className="w-full space-y-4 mb-6">
        <input
          type="email"
          value={magicEmail}
          onChange={e => setMagicEmail(e.target.value)}
          placeholder="Sign in with magic link (email only)"
          className="w-full px-4 py-3 rounded-full border border-gray-200 bg-gray-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-black transition placeholder-gray-400 shadow-sm"
          required
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold py-3 rounded-full shadow-sm hover:from-green-600 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-green-300 transition-all duration-200 text-lg"
        >
          Send Magic Link
        </button>
        {magicMsg && <div className={`text-sm font-medium ${magicMsg.startsWith('A sign-in link') ? 'text-green-600' : 'text-red-600'}`}>{magicMsg}</div>}
      </form>
      <div className="w-full flex flex-col items-center mt-6 space-y-2">
        <div className="text-sm text-gray-500">Don&apos;t have an account? <button type="button" className="text-blue-600 font-medium hover:underline" onClick={onSignupClick}>Sign up</button></div>
      </div>
    </div>
  );
};

export default LoginForm; 