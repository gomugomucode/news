import React from 'react';
import { Link } from 'react-router-dom';

export default function Header({ activeCategory, setActiveCategory, searchQuery, setSearchQuery }) {
  const categories = ['all', 'technology', 'world', 'science', 'business', 'sport'];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-xs">
      <div className="container mx-auto max-w-7xl">
        
        {/* LOGO BRAND BAR + INTEGRATED SEARCH CONTROL INPUT AREA */}
        <div className="px-4 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Link to="/" onClick={() => { setActiveCategory?.('all'); setSearchQuery?.(''); }} className="flex items-center gap-2">
            <span className="bg-[#BB1919] text-white font-black text-xl px-3 py-1 tracking-tighter uppercase font-serif rounded-sm">
              NEWS
            </span>
            <span className="text-xl font-black text-gray-900 tracking-tight uppercase hidden sm:inline">
              PORTAL
            </span>
          </Link>

          {/* DYNAMIC SEARCH INPUT ELEMENT COMPONENT TRACK */}
          {setSearchQuery && (
            <div className="relative w-full sm:w-72">
              <input
                type="search"
                value={searchQuery || ''}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles by keyword..."
                aria-label="Search news portal database"
                className="w-full text-xs font-medium bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 pl-8 outline-none focus:border-[#0063B1] focus:bg-white transition-colors"
              />
              {/* SVG Magnifying Glass Decorative Accent Vector */}
              <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21-21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </div>
          )}
        </div>

        {/* HORIZONTAL SELECTION CATEGORY TABS */}
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
