import React from 'react';

export default function SkeletonCard() {
  return (
    <div className="w-full space-y-4 animate-pulse p-4 bg-white rounded-xl border border-gray-100">
      {/* Structural media rectangle box fallback mask */}
      <div className="w-full aspect-[16/9] bg-gray-200 rounded-lg"></div>
      
      {/* Small badge line placeholder */}
      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      
      {/* Title heading lines placeholders */}
      <div className="space-y-2">
        <div className="h-6 bg-gray-200 rounded w-full"></div>
        <div className="h-6 bg-gray-200 rounded w-5/6"></div>
      </div>
      
      {/* Description blurb line placeholder */}
      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
    </div>
  );
}
