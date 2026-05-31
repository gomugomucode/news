import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function EditorLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await login(email, password);
      // Redirect cleanly to your new client-side dashboard path on success
      navigate('/editor/dashboard');
    } catch (err) {
      setError('Invalid email or password credentials.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm space-y-6 p-8 bg-white rounded-2xl border border-gray-100 shadow-md">
        <h2 className="text-2xl font-black text-center text-[#0063B1] tracking-tight uppercase">
          News Portal Editor
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-xs font-black uppercase text-gray-500 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full text-sm bg-gray-50 border border-gray-200 rounded-lg p-2.5 outline-none focus:border-[#0063B1] focus:bg-white transition-colors"
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-black uppercase text-gray-500 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full text-sm bg-gray-50 border border-gray-200 rounded-lg p-2.5 outline-none focus:border-[#0063B1] focus:bg-white transition-colors"
              disabled={loading}
            />
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-[#BB1919] text-[#BB1919] text-xs font-bold p-3 rounded-r">
               {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0063B1] hover:bg-[#0063B1]/90 text-white font-bold text-sm py-2.5 rounded-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-2xs"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          <p className="text-center text-xs text-gray-400 pt-2 leading-relaxed">
            Demo credentials:<br/>
            <code className="bg-gray-100 px-1 text-gray-600 font-mono font-bold rounded">
              editor@newsportal.com / password123
            </code>
          </p>
        </form>
      </div>
    </div>
  );
}
