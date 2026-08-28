import { useState } from 'react';
import { ArrowRight, KeyRound, Mail } from 'lucide-react';
import { supabase } from '../supabaseClient';
import { getAuthErrorMessage } from '../utils/authError';

const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
const inputClass = 'w-full rounded-2xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white focus:ring-4 focus:ring-gray-100';

const LoginForm = ({ onSignupClick, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetMsg, setResetMsg] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    if (!validateEmail(email)) return setError('Please enter a valid email address.');
    if (password.length < 6) return setError('Password must be at least 6 characters.');
    setLoading(true);
    try {
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
      if (authError) setError(getAuthErrorMessage(authError));
      else onSuccess?.();
    } catch (authError) {
      setError(getAuthErrorMessage(authError));
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (event) => {
    event.preventDefault();
    setResetMsg('');
    setError('');
    setLoading(true);
    try {
      const { error: authError } = await supabase.auth.resetPasswordForEmail(resetEmail, { redirectTo: `${window.location.origin}/` });
      if (authError) setError(getAuthErrorMessage(authError));
      else setResetMsg('Reset link sent. Check your inbox.');
    } catch (authError) {
      setError(getAuthErrorMessage(authError));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-md flex-col justify-center font-sans">
      <div className="mb-8">
        <div className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-gray-400">{showReset ? 'Account recovery' : 'Welcome back'}</div>
        <h1 className="font-display text-3xl font-bold tracking-[-0.04em] text-black sm:text-4xl">{showReset ? 'Reset your password.' : 'Pick up where you left off.'}</h1>
        <p className="mt-3 text-sm leading-6 text-gray-500">{showReset ? 'We will send a secure reset link to your email.' : 'Log in to manage your profile, projects, and conversations.'}</p>
      </div>
      {showReset ? (
        <form onSubmit={handleReset} className="space-y-5">
          <label className="block text-sm font-semibold text-gray-700" htmlFor="reset-email">Email address</label>
          <div className="relative"><Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} /><input id="reset-email" type="email" autoComplete="email" value={resetEmail} onChange={(event) => setResetEmail(event.target.value)} placeholder="you@email.com" className={inputClass} required /></div>
          {resetMsg && <div className="rounded-2xl bg-green-50 px-4 py-3 text-sm text-green-700" role="status">{resetMsg}</div>}
          {error && <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm leading-5 text-red-700" role="alert">{error}</div>}
          <div className="flex gap-3 pt-2"><button type="button" onClick={() => setShowReset(false)} className="flex-1 rounded-full border border-gray-200 py-3 font-semibold text-gray-700 hover:bg-gray-50">Back</button><button type="submit" disabled={loading} className="flex-1 rounded-full bg-black py-3 font-semibold text-white hover:bg-gray-800 disabled:opacity-50">{loading ? 'Sending…' : 'Send link'}</button></div>
        </form>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div><label htmlFor="email" className="mb-2 block text-sm font-semibold text-gray-700">Email address</label><div className="relative"><Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} /><input id="email" type="email" autoComplete="email" className={inputClass} placeholder="you@email.com" value={email} onChange={(event) => setEmail(event.target.value)} required aria-invalid={!!error} aria-describedby="login-error" /></div></div>
          <div><div className="mb-2 flex items-center justify-between"><label htmlFor="password" className="text-sm font-semibold text-gray-700">Password</label><button type="button" onClick={() => setShowReset(true)} className="text-xs font-semibold text-gray-500 hover:text-black">Forgot password?</button></div><div className="relative"><KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} /><input id="password" type="password" autoComplete="current-password" className={inputClass} placeholder="At least 6 characters" value={password} onChange={(event) => setPassword(event.target.value)} required minLength={6} aria-invalid={!!error} aria-describedby="login-error" /></div></div>
          {error && <div id="login-error" className="rounded-2xl bg-red-50 px-4 py-3 text-sm leading-5 text-red-700" role="alert">{error}</div>}
          <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-full bg-black py-3.5 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-gray-800 disabled:translate-y-0 disabled:opacity-50" disabled={loading}>{loading ? 'Logging in…' : <>Log in <ArrowRight size={17} /></>}</button>
        </form>
      )}
      <div className="mt-7 border-t border-gray-100 pt-6 text-center text-sm text-gray-500">New to DevConnect? <button type="button" className="font-semibold text-black hover:underline" onClick={onSignupClick}>Create an account</button></div>
    </div>
  );
};

export default LoginForm;
