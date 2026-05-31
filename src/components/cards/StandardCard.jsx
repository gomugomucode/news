import React from 'react';

export default function StandardCard({ article, showBadge = false }) {
  return (
    <div className="flex flex-col sm:flex-row items-start gap-4">
      {/* FIXED SIZE IMAGE SIDE CONTAINER WITH POSITIONING FOR LIVE BADGE */}
      <div className="relative flex-shrink-0 w-full sm:w-[320px] h-[180px]">
        <img
          src={article.heroMedia?.url || 'https://unsplash.com'}
          alt={article.heroMedia?.alt || ''}
          className="w-full h-full object-cover rounded"
        />
        {/* OPTIONAL BADGE */}
        {showBadge && (
          <div className="absolute top-2 left-2 bg-[#BB1919] text-white text-[10px] font-bold px-2 py-0.5 rounded-sm tracking-wider shadow-sm">
            LIVE
          </div>
        )}
      </div>

      {/* TEXT CONTENT WRAPPER */}
      <div className="flex-1">
        <div className="mb-1">
          <span className="inline-block bg-[#0063B1]/10 text-[#0063B1] text-[11px] font-bold px-2 py-0.5 rounded">
            {article.section?.label || 'NEWS'}
          </span>
        </div>
        <h3 className="text-[18px] md:text-[20px] font-bold text-gray-900 leading-snug mb-1 line-clamp-2 hover:text-[#0063B1] cursor-pointer transition-colors">
          {article.headline}
        </h3>
        <p className="text-[14px] md:text-[15px] text-[#3F3F42] line-clamp-2 leading-relaxed">
          {article.body?.[0]?.text || article.standfirst || ''}
        </p>
        <div className="mt-2 flex items-center gap-2 text-[12px] text-gray-500 font-medium">
          {article.metadata?.author?.name && <span>By {article.metadata.author.name}</span>}
          {article.metadata?.author?.name && <span className="text-gray-300">•</span>}
          <span>{article.metadata?.published || 'Just now'}</span>
        </div>
      </div>
    </div>
  );
}
