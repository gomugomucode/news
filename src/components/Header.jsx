import React from 'react';
import { Link } from 'react-router-dom';

export default function Header({ activeCategory, setActiveCategory }) {
  const categories = ['all', 'technology', 'world', 'science', 'business', 'sport'];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-xs">
      <div className="container mx-auto max-w-7xl">
        {/* BRAND LOGO MAIN TRACK */}
        <div className="px-4 py-4 flex items-center justify-between">
          <Link to="/" onClick={() => setActiveCategory?.('all')} className="flex items-center gap-2">
            <span className="bg-[#BB1919] text-white font-black text-xl px-3 py-1 tracking-tighter uppercase font-serif rounded-sm">
              NEWS
            </span>
            <span className="text-xl font-black text-gray-900 tracking-tight uppercase hidden sm:inline">
              PORTAL
            </span>
          </Link>
          <div className="text-[11px] text-gray-400 font-mono font-medium border border-gray-100 rounded px-2 py-0.5 bg-gray-50">
            v2.1.0 • ROUTED
          </div>
        </div>

        {/* HORIZONTAL CATEGORY NAVIGATION BAR TABS */}
        <nav className="px-4 flex overflow-x-auto space-x-1 scrollbar-none border-t border-gray-100/60" aria-label="News categories">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory?.(cat)}
                className={`py-2.5 px-3 text-xs font-black tracking-wider uppercase border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  isActive 
                    ? 'border-[#BB1919] text-[#BB1919]' 
                    : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
