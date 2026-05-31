import React from 'react';

export default function HeroCard({ article }) {
  return (
    <div className="relative group">
      {/* FULL-BLEED IMAGE container using standard tailwind aspect ratio classes */}
      <div className="w-full aspect-[16/9] relative overflow-hidden rounded-lg">
        <img
          src={article.heroMedia?.url || 'https://unsplash.com'}
          alt={article.heroMedia?.alt || ''}
          className="w-full h-full object-cover rounded-lg group-hover:scale-[1.01] transition-transform duration-300"
        />
        {/* SECTION LABEL OVERLAY */}
        {article.section && (
          <div className="absolute top-4 left-4 bg-[#0063B1] text-white text-xs font-medium px-2 py-1 rounded shadow-sm">
            {article.section.label}
          </div>
        )}
      </div>

      {/* CONTENT OVERLAY CONTAINER */}
      <div className="absolute bottom-0 left-0 right-0 p-6 rounded-b-lg bg-gradient-to-t from-black/90 via-black/50 to-transparent">
        <h2 className="text-[clamp(24px,4vw,36px)] font-bold text-white mb-2 leading-tight tracking-tight max-w-3xl">
          {article.headline}
        </h2>
        <p className="text-sm md:text-base text-gray-200 line-clamp-2 max-w-2xl leading-relaxed">
          {article.standfirst}
        </p>
      </div>
    </div>
  );
}
