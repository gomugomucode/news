import React from 'react';

// TYPE A: HERO CARD (Lead Story Layer)
export function CardTypeA({ article }) {
  if (!article) return null;
  return (
    <div className="group block cursor-pointer">
      <div className="section-label mb-2">
        {article.section?.label || 'NEWS'}
      </div>
      <h1 className="text-[28px] md:text-[36px] font-bold leading-tight tracking-tight text-gray-900 group-hover:text-[#0063B1] transition-colors mb-2">
        {article.headline}
      </h1>
      <p className="text-gray-700 text-base md:text-lg mb-4 leading-relaxed">
        {article.standfirst}
      </p>
      {article.heroMedia && (
        <figure className="relative overflow-hidden rounded-lg mb-2 bg-gray-100">
          <img
            src={article.heroMedia.url}
            alt={article.heroMedia.alt}
            className="w-full h-[300px] md:h-[400px] object-cover group-hover:scale-102 transition-transform duration-300 ease-in-out"
          />
        </figure>
      )}
      <div className="text-xs text-gray-500 font-medium">
        {article.published}
      </div>
    </div>
  );
}

// TYPE B: STANDARD CARD (Fixed Image Aspect & Two-Line Heading Clamp)
export function CardTypeB({ article }) {
  if (!article) return null;
  return (
    <div className="group flex flex-col md:flex-row gap-4 border-b border-gray-100 pb-4 cursor-pointer">
      {article.heroMedia && (
        <div className="w-full md:w-[240px] h-[135px] flex-shrink-0 overflow-hidden rounded bg-gray-100">
          <img
            src={article.heroMedia.url}
            alt={article.heroMedia.alt}
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
          />
        </div>
      )}
      <div className="flex flex-col justify-between py-1">
        <div>
          <span className="text-xs font-bold text-[#0063B1] tracking-wider uppercase block mb-1">
            {article.section?.label}
          </span>
          {/* Handles maximum 2 line truncations */}
          <h2 className="text-lg font-bold text-gray-900 group-hover:text-[#0063B1] transition-colors leading-snug line-clamp-2 mb-1">
            {article.headline}
          </h2>
          <p className="text-sm text-gray-600 line-clamp-2 hidden md:block">
            {article.standfirst}
          </p>
        </div>
        <span className="text-xs text-gray-500 block mt-1">
          {article.published}
        </span>
      </div>
    </div>
  );
}

// TYPE C: COMPACT CARD (No-Image Rank Row Selector)
export function CardTypeC({ article, index }) {
  if (!article) return null;
  return (
    <div className="group flex items-start gap-4 border-b border-gray-100 py-3 cursor-pointer">
      {index !== undefined && (
        <span className="text-3xl md:text-4xl font-extrabold text-gray-300 group-hover:text-[#BB1919] transition-colors leading-none pt-1">
          {index + 1}
        </span>
      )}
      <div>
        <h3 className="text-sm md:text-base font-bold text-gray-900 group-hover:text-[#0063B1] transition-colors leading-snug mb-1">
          {article.headline}
        </h3>
        <span className="text-xs text-gray-400">
          {article.published}
        </span>
      </div>
    </div>
  );
}
