import { useState } from 'react';
import { Mail, Lock, Github, UserPlus, User } from 'lucide-react';

const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

const SignupForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Simulate signup success
      alert('Account created!');
    }, 1200);
  };

  return (
    <div className="max-w-md w-full mx-auto bg-white rounded-2xl shadow-xl p-8 font-sans">
      <h2 className="text-2xl font-bold text-black mb-6 flex items-center gap-2">
        <UserPlus size={22} className="text-primary-600" /> Sign up for DevConnect
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <User size={18} />
            </span>
            <input
              id="name"
              type="text"
              autoComplete="name"
              className="w-full pl-10 pr-3 py-3 rounded-full border border-gray-200 bg-gray-50 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 hover:ring-2 hover:ring-primary-100 outline-none text-black transition placeholder-gray-400 shadow-sm"
              placeholder="Your name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              aria-invalid={!!error}
              aria-describedby="signup-error"
            />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Mail size={18} />
            </span>
            <input
              id="email"
              type="email"
              autoComplete="email"
              className="w-full pl-10 pr-3 py-3 rounded-full border border-gray-200 bg-gray-50 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 hover:ring-2 hover:ring-primary-100 outline-none text-black transition placeholder-gray-400 shadow-sm"
              placeholder="you@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              aria-invalid={!!error}
              aria-describedby="signup-error"
            />
          </div>
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Lock size={18} />
            </span>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              className="w-full pl-10 pr-3 py-3 rounded-full border border-gray-200 bg-gray-50 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 hover:ring-2 hover:ring-primary-100 outline-none text-black transition placeholder-gray-400 shadow-sm"
              placeholder="Create a password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              minLength={6}
              aria-invalid={!!error}
              aria-describedby="signup-error"
            />
          </div>
        </div>
        {error && <div id="signup-error" className="text-red-600 text-sm font-medium">{error}</div>}
        <button
          type="submit"
          className="w-full bg-black text-white font-semibold py-3 rounded-lg shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black/50 transition-all duration-200 flex items-center justify-center gap-2"
          disabled={loading}
        >
          {loading ? 'Signing up...' : <><UserPlus size={18} /> Sign Up</>}
        </button>
      </form>
      <div className="my-6 flex items-center gap-2 text-gray-400">
        <span className="flex-1 h-px bg-gray-200" />
        <span className="text-xs">or continue with</span>
        <span className="flex-1 h-px bg-gray-200" />
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black/30" type="button" aria-label="Sign up with Google">
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
          Google
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black/30" type="button" aria-label="Sign up with GitHub">
          <Github size={18} />
          GitHub
        </button>
      </div>
      <div className="mt-6 text-center text-sm text-gray-500">
        Already have an account? <a href="#login" className="text-primary-600 font-medium hover:underline">Login</a>
      </div>
    </div>
  );
};

export default SignupForm; 