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
      navigate('/editor/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid credentials provided');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white border border-gray-100 shadow-md rounded-2xl p-8">
        <h2 className="text-2xl font-black text-center text-gray-900 tracking-tight uppercase mb-6">
          📰 News Portal Editor
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-black uppercase text-gray-500 mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full text-sm bg-gray-50 border border-gray-200 rounded-lg p-2.5 outline-none focus:border-[#0063B1] focus:bg-white transition-colors"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase text-gray-500 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full text-sm bg-gray-50 border border-gray-200 rounded-lg p-2.5 outline-none focus:border-[#0063B1] focus:bg-white transition-colors"
              disabled={loading}
            />
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-[#BB1919] text-[#BB1919] text-xs font-bold p-3 rounded-r">
              ⚠️ {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0063B1] hover:bg-[#0063B1]/90 text-white font-bold text-sm py-2.5 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Authenticating Session...' : 'Sign In To Dashboard'}
          </button>

          <p className="text-center text-xs text-gray-400 pt-2 leading-relaxed">
            Demo credentials:<br/>
            <code className="bg-gray-100 px-1 text-gray-600 font-bold rounded">editor@newsportal.com</code> / <code className="bg-gray-100 px-1 text-gray-600 font-bold rounded">password123</code>
          </p>
        </form>
      </div>
    </div>
  );
}
