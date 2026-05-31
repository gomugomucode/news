import React from 'react';

export default function VideoCard({ article, duration = "02:15" }) {
  return (
    <div className="relative group cursor-pointer overflow-hidden rounded-lg shadow-sm border border-gray-100 bg-white">
      {/* MEDIA WRAPPER WITH CENTERED PLAY ICON OVERLAY */}
      <div className="w-full aspect-[16/9] relative overflow-hidden bg-black">
        <img
          src={article.heroMedia?.url || 'https://unsplash.com'}
          alt={article.heroMedia?.alt || ''}
          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 opacity-90"
        />
        
        {/* SEMI-TRANSPARENT VIDEO TINY HOVER CONTROLS */}
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/40 transition-colors">
          <div className="w-14 h-14 bg-[#BB1919] text-white rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
            <svg xmlns="http://w3.org" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6 translate-x-[2px]">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* TIMESTAMP BADGE */}
        <span className="absolute bottom-3 right-3 bg-black/80 text-white font-mono text-[11px] px-2 py-0.5 rounded font-bold tracking-wider">
          {duration}
        </span>
      </div>

      {/* VIDEO BODY CAPTION */}
      <div className="p-4">
        <span className="text-[11px] font-black text-[#BB1919] tracking-wider uppercase block mb-1">
          WATCH NOW
        </span>
        <h3 className="text-base font-bold text-gray-900 group-hover:text-[#0063B1] transition-colors leading-snug line-clamp-2">
          {article.headline}
        </h3>
      </div>
    </div>
  );
}
