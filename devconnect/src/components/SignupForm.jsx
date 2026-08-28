import { useState } from 'react';
import { ArrowRight, KeyRound, Mail, UserRound } from 'lucide-react';
import { supabase } from '../supabaseClient';
import { useToast } from '../context/ToastContext';
import { getAuthErrorMessage } from '../utils/authError';

const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
const inputClass = 'w-full rounded-2xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white focus:ring-4 focus:ring-gray-100';

const SignupForm = ({ onLoginClick, onSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    if (!name.trim()) return setError('Name is required.');
    if (!validateEmail(email)) return setError('Please enter a valid email address.');
    if (password.length < 6) return setError('Password must be at least 6 characters.');
    setLoading(true);
    try {
      const { error: authError } = await supabase.auth.signUp({ email, password, options: { data: { name: name.trim() } } });
      if (authError) setError(getAuthErrorMessage(authError));
      else {
        toast.showToast('Check your email and verify your account to log in.', 'success');
        onSuccess?.();
      }
    } catch (authError) {
      setError(getAuthErrorMessage(authError));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-md flex-col justify-center font-sans">
      <div className="mb-7"><div className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-gray-400">Start building in public</div><h1 className="font-display text-3xl font-bold tracking-[-0.04em] text-black sm:text-4xl">Make your work discoverable.</h1><p className="mt-3 text-sm leading-6 text-gray-500">Create your profile and give every project, idea, and lesson a place to live.</p></div>
      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <div><label htmlFor="name" className="mb-2 block text-sm font-semibold text-gray-700">Name</label><div className="relative"><UserRound className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} /><input id="name" type="text" autoComplete="name" className={inputClass} placeholder="Your name" value={name} onChange={(event) => setName(event.target.value)} required aria-invalid={!!error} aria-describedby="signup-error" /></div></div>
        <div><label htmlFor="signup-email" className="mb-2 block text-sm font-semibold text-gray-700">Email address</label><div className="relative"><Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} /><input id="signup-email" type="email" autoComplete="email" className={inputClass} placeholder="you@email.com" value={email} onChange={(event) => setEmail(event.target.value)} required aria-invalid={!!error} aria-describedby="signup-error" /></div></div>
        <div><label htmlFor="signup-password" className="mb-2 block text-sm font-semibold text-gray-700">Password</label><div className="relative"><KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} /><input id="signup-password" type="password" autoComplete="new-password" className={inputClass} placeholder="At least 6 characters" value={password} onChange={(event) => setPassword(event.target.value)} required minLength={6} aria-invalid={!!error} aria-describedby="signup-error" /></div></div>
        {error && <div id="signup-error" className="rounded-2xl bg-red-50 px-4 py-3 text-sm leading-5 text-red-700" role="alert">{error}</div>}
        <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-full bg-black py-3.5 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-gray-800 disabled:translate-y-0 disabled:opacity-50" disabled={loading}>{loading ? 'Creating account…' : <>Create account <ArrowRight size={17} /></>}</button>
      </form>
      <div className="mt-6 border-t border-gray-100 pt-5 text-center text-sm text-gray-500">Already have an account? <button type="button" className="font-semibold text-black hover:underline" onClick={onLoginClick}>Log in</button></div>
    </div>
  );
};

export default SignupForm;
