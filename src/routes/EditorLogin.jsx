import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function EditorLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      await login(email, password);
      navigate('/'); // Redirect back to homepage after successful login
    } catch (err) {
      setError(err.message || 'Login attempt failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-md w-full bg-white border border-gray-100 shadow-md rounded-2xl p-8">
        <div className="text-center mb-6">
          <span className="bg-[#BB1919] text-white text-xs font-black px-2.5 py-1 rounded-sm uppercase tracking-wider mb-2 inline-block">
            CMS ACCESS CONTROL
          </span>
          <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Staff Login</h1>
          <p className="text-xs text-gray-400 mt-1">Provide credentials to enter editing panels.</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border-l-4 border-[#BB1919] text-xs font-bold text-[#BB1919] rounded-r-md">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-black uppercase text-gray-500 mb-1">Email Address</label>
            <input
              type="email"
              required
              placeholder="editor@newsportal.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-sm bg-gray-50 border border-gray-200 rounded-lg p-2.5 outline-none focus:border-[#0063B1] focus:bg-white transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase text-gray-500 mb-1">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-sm bg-gray-50 border border-gray-200 rounded-lg p-2.5 outline-none focus:border-[#0063B1] focus:bg-white transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#0063B1] hover:bg-[#0063B1]/90 text-white font-bold text-sm py-2.5 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
          >
            {submitting ? 'Verifying Staff Session...' : 'Authenticate Access →'}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-gray-100 text-[11px] text-gray-400 text-center leading-relaxed">
          Demo: Use <code className="bg-gray-100 px-1 font-bold text-gray-600 rounded">editor@newsportal.com</code> & <code className="bg-gray-100 px-1 font-bold text-gray-600 rounded">password123</code>
        </div>
      </div>
    </div>
  );
}
