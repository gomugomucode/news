import React from 'react';
import { Link } from 'react-router-dom';
import { prefetchArticleBySlug } from '../../services/mockApi';

export default function CompactCard({ article, rank }) {
  if (!article) return null;
  const sectionLabel = article.section?.label?.toLowerCase() || 'news';
  const properSlug = article.slug || 'article';

  return (
    <Link 
      to={`/news/${sectionLabel}/${properSlug}`} 
      onMouseEnter={() => prefetchArticleBySlug(properSlug)} // ← TRIPPED SILENT PREFETCH HERE
      className="group flex items-start gap-4 py-3 border-b border-gray-100 last:border-0 outline-none focus:ring-2 focus:ring-[#0063B1] rounded px-1"
    >
      <div className="flex-shrink-0 min-w-[2rem]">
        <span className="text-2xl font-black text-gray-300 group-hover:text-[#BB1919] transition-colors leading-none block pt-0.5">
          {rank}
        </span>
      </div>
      <div className="flex-1">
        <span className="text-[9px] font-black text-[#0063B1] tracking-wider uppercase block mb-0.5">
          {article.section?.label || 'TRENDING'}
        </span>
        <h4 className="text-sm font-bold text-gray-900 group-hover:text-[#0063B1] transition-colors leading-snug line-clamp-2">
          {article.headline}
        </h4>
      </div>
    </Link>
  );
}
