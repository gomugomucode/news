import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-8 text-center bg-gray-50">
      <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-8 max-w-md w-full">
        <h1 className="text-5xl font-black text-[#BB1919] tracking-tight mb-2">404</h1>
        <h2 className="text-xl font-bold text-gray-900 mb-2 uppercase">Page Not Found</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          The news item, data stream, or article page you are looking for has been moved, archived, or deleted.
        </p>
        <Link
          to="/"
          className="inline-block w-full bg-[#0063B1] text-white font-bold text-sm py-2.5 rounded-lg hover:bg-[#0063B1]/90 transition-colors shadow-xs"
        >
          Return to Portal Homepage
        </Link>
      </div>
    </div>
  );
}
