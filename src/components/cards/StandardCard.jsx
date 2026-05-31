import React from 'react';
import { Link } from 'react-router-dom';
import { prefetchArticleBySlug } from '../../services/mockApi';

export default function StandardCard({ article, showBadge = false }) {
  if (!article) return null;
  const sectionLabel = article.section?.label?.toLowerCase() || 'news';
  const properSlug = article.slug || 'article';

  return (
    <Link 
      to={`/news/${sectionLabel}/${properSlug}`} 
      onMouseEnter={() => prefetchArticleBySlug(properSlug)} // ← TRIPPED SILENT PREFETCH HERE
      className="group block outline-none focus:ring-2 focus:ring-[#0063B1] rounded-lg p-2 transition-all"
    >
      <div className="flex flex-col sm:flex-row items-start gap-4">
        {article.heroMedia && (
          <div className="relative flex-shrink-0 w-full sm:w-[200px] h-[112px] bg-gray-900 rounded overflow-hidden">
            <img src={article.heroMedia.url} alt="" className="w-full h-full object-cover" />
            {showBadge && (
              <div className="absolute top-2 left-2 bg-[#BB1919] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-xs uppercase tracking-wider">
                LIVE
              </div>
            )}
          </div>
        )}
        <div className="flex-1">
          <span className="text-[10px] font-black text-[#0063B1] tracking-wider uppercase block mb-0.5">
            {article.section?.label || 'NEWS'}
          </span>
          <h3 className="text-base font-bold text-gray-900 leading-snug mb-1 group-hover:text-[#0063B1] transition-colors line-clamp-2">
            {article.headline}
          </h3>
          <span className="text-[11px] text-gray-400 font-medium">{article.metadata?.published || 'Recently'}</span>
        </div>
      </div>
    </Link>
  );
}
