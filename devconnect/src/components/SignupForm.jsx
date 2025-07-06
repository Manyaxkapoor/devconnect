import { useState } from 'react';

const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

const SignupForm = ({ onLoginClick }) => {
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
      alert('Account created!');
    }, 1200);
  };

  return (
    <div className="max-w-md w-full min-h-[520px] mx-auto bg-white rounded-3xl shadow-2xl p-8 font-sans flex flex-col items-center justify-center">
      {/* Logo */}
      <div className="mb-6">
        <div className="w-auto px-6 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
          <span className="text-white text-2xl font-bold tracking-wide font-display">DevConnect</span>
        </div>
      </div>
      <h2 className="text-2xl font-bold text-black mb-8 text-center">Sign up for DevConnect</h2>
      <form onSubmit={handleSubmit} className="w-full space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            className="w-full px-4 py-3 rounded-full border border-gray-200 bg-gray-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-black transition placeholder-gray-400 shadow-sm"
            placeholder="Your name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            aria-invalid={!!error}
            aria-describedby="signup-error"
          />
        </div>
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
            aria-describedby="signup-error"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            className="w-full px-4 py-3 rounded-full border border-gray-200 bg-gray-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-black transition placeholder-gray-400 shadow-sm"
            placeholder="Create a password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            minLength={6}
            aria-invalid={!!error}
            aria-describedby="signup-error"
          />
        </div>
        {error && <div id="signup-error" className="text-red-600 text-sm font-medium">{error}</div>}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-3 rounded-full shadow-sm hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200 text-lg mt-2"
          disabled={loading}
        >
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>
      <div className="w-full flex flex-col items-center mt-6 space-y-2">
        <div className="text-sm text-gray-500">Already have an account? <button type="button" className="text-blue-600 font-medium hover:underline" onClick={onLoginClick}>Login</button></div>
      </div>
    </div>
  );
};

export default SignupForm; 