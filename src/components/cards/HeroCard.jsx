import React from 'react';

export default function HeroCard({ article }) {
  if (!article) return null;
  return (
    <div 
      role="article"
      aria-labelledby={`hero-headline-${article.id || '1'}`}
      className="relative group"
    >
      {/* ASPECT MEDIA RATIO WINDOW CONTAINER */}
      <div className="w-full aspect-[16/9] relative overflow-hidden rounded-lg">
        <img
          src={article.heroMedia?.url || 'https://unsplash.com'}
          alt={article.heroMedia?.alt || `Illustration for ${article.headline}`}
          className="w-full h-full object-cover rounded-lg group-hover:scale-[1.01] transition-transform duration-300"
        />
        {/* SECTION CATEGORY OVERLAY */}
        {article.section && (
          <div className="absolute top-4 left-4 bg-[#0063B1] text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
            {article.section.label}
          </div>
        )}
      </div>

      {/* METRIC GRAPHICAL ACCESSIBILITY LABELED HEADLINE AND STANDFIRST CAPTIONS */}
      <div className="absolute bottom-0 left-0 right-0 p-6 rounded-b-lg bg-gradient-to-t from-black/95 via-black/60 to-transparent">
        <h2 
          id={`hero-headline-${article.id || '1'}`}
          className="text-[clamp(24px,4vw,36px)] font-bold text-white mb-2 leading-tight tracking-tight max-w-3xl"
        >
          {article.headline}
        </h2>
        <p className="text-sm md:text-base text-gray-200 line-clamp-2 max-w-2xl leading-relaxed">
          {article.standfirst}
        </p>
      </div>
    </div>
  );
}
