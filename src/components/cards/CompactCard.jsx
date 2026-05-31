import React from 'react';

export default function CompactCard({ article, rank }) {
  return (
    <div className="flex items-start gap-4 py-3 border-b border-gray-100 last:border-0 group cursor-pointer">
      {/* RANK NUMBER */}
      <div className="flex-shrink-0 min-w-[2.5rem]">
        <span className="text-[32px] md:text-[36px] font-black text-gray-300 group-hover:text-[#BB1919] transition-colors leading-none block pt-1">
          {rank}
        </span>
      </div>

      {/* CONTENT */}
      <div className="flex-1">
        <div className="mb-1">
          <span className="inline-block bg-[#0063B1]/10 text-[#0063B1] text-[10px] font-bold px-2 py-0.5 rounded tracking-wide uppercase">
            {article.section?.label || 'NEWS'}
          </span>
        </div>
        <h4 className="text-[15px] md:text-[16px] font-bold text-gray-900 group-hover:text-[#0063B1] transition-colors leading-snug mb-1 line-clamp-2">
          {article.headline}
        </h4>
        <p className="text-[12px] text-gray-500 font-medium">
          {article.metadata?.published || 'Recently'}
        </p>
      </div>
    </div>
  );
}
