import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx'; // ← IMPORTED AUTH HOOKS

export default function Header({ activeCategory, setActiveCategory, searchQuery, setSearchQuery }) {
  const categories = ['all', 'technology', 'world', 'science', 'business', 'sport'];
  const { user, logout } = useAuth(); // ← EXTRACTED SEED STRINGS

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-xs">
      <div className="container mx-auto max-w-7xl">
        
        <div className="px-4 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center justify-between w-full sm:w-auto">
            <Link to="/" onClick={() => { setActiveCategory?.('all'); setSearchQuery?.(''); }} className="flex items-center gap-2">
              <span className="bg-size bg-[#BB1919] text-white font-black text-xl px-3 py-1 tracking-tighter uppercase font-serif rounded-sm">
                NEWS
              </span>
              <span className="text-xl font-black text-gray-900 tracking-tight uppercase hidden sm:inline">
                PORTAL
              </span>
            </Link>

            {/* RESPONSIVE SUB-PORTAL USER MANAGEMENT BAR FOR RESPONSIVE MODES */}
            <div className="sm:hidden text-xs font-bold">
              {user ? (
                <button onClick={logout} className="text-[#BB1919]">Exit ({user.name.split(' ')[0]})</button>
              ) : (
                <Link to="/editor/login" className="text-gray-400">Staff Portal</Link>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            {setSearchQuery && (
              <div className="relative w-full sm:w-60">
                <input
                  type="search"
                  value={searchQuery || ''}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles..."
                  className="w-full text-xs font-medium bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 pl-8 outline-none focus:border-[#0063B1] focus:bg-white transition-colors"
                />
                <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21-21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </div>
            )}

            {/* DESKTOP SESSION CONTROLLER BLOCKS */}
            <div className="hidden sm:block text-xs font-medium">
              {user ? (
                <div className="flex items-center gap-3">
                  <span className="text-gray-600">✍️ <span className="font-bold text-gray-900">{user.name}</span> ({user.role})</span>
                  <button onClick={logout} className="text-[#BB1919] font-bold hover:underline cursor-pointer">Log Out</button>
                </div>
              ) : (
                <Link to="/editor/login" className="text-gray-500 hover:text-gray-900 font-bold border border-gray-200 rounded-lg px-3 py-1.5 bg-gray-50 hover:bg-gray-100 transition-colors">
                  Staff Login
                </Link>
              )}
            </div>
          </div>
        </div>

        <nav className="px-4 flex overflow-x-auto space-x-1 scrollbar-none border-t border-gray-100/60">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory?.(cat)}
              className={`py-2.5 px-3 text-xs font-black tracking-wider uppercase border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === cat ? 'border-b-2 border-[#BB1919] text-[#BB1919]' : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
