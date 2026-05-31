import React from 'react';
import { Link } from 'react-router-dom';
import { prefetchArticleBySlug } from '../../services/mockApi';

export default function HeroCard({ article }) {
  if (!article) return null;
  const sectionLabel = article.section?.label?.toLowerCase() || 'news';
  const properSlug = article.slug || 'article';

  return (
    <Link 
      to={`/news/${sectionLabel}/${properSlug}`} 
      onMouseEnter={() => prefetchArticleBySlug(properSlug)} // ← TRIPPED SILENT PREFETCH HERE
      className="relative group block outline-none focus:ring-2 focus:ring-[#0063B1] rounded-lg"
    >
      <div role="article" aria-labelledby={`hero-headline-${article.id || '1'}`}>
        <div className="w-full aspect-[16/9] relative overflow-hidden rounded-lg bg-gray-900">
          <img
            src={article.heroMedia?.url}
            alt={article.heroMedia?.alt || `Illustration for ${article.headline}`}
            className="w-full h-full object-cover rounded-lg group-hover:scale-[1.01] transition-transform duration-300"
          />
          {article.section && (
            <div className="absolute top-4 left-4 bg-[#0063B1] text-white text-xs font-bold px-2 py-1 rounded shadow-sm uppercase">
              {article.section.label}
            </div>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 rounded-b-lg bg-gradient-to-t from-black/95 via-black/60 to-transparent">
          <h2 id={`hero-headline-${article.id || '1'}`} className="text-[clamp(22px,4vw,34px)] font-black text-white mb-2 leading-tight tracking-tight max-w-3xl">
            {article.headline}
          </h2>
          <p className="text-xs md:text-sm text-gray-200 line-clamp-2 max-w-2xl leading-relaxed">
            {article.standfirst}
          </p>
        </div>
      </div>
    </Link>
  );
}
