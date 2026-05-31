import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveArticle } from '../../services/mockApi';

export default function ArticleForm({ initialArticle = null }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [headline, setHeadline] = useState(initialArticle?.headline || '');
  const [standfirst, setStandfirst] = useState(initialArticle?.standfirst || '');
  const [section, setSection] = useState(initialArticle?.section?.label || 'TECHNOLOGY');

  const handleActionSubmit = async (targetStatus) => {
    if (!headline || !standfirst) {
      setError('Please provide values for both the headline and standfirst text boxes.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const saved = await saveArticle({
        id: initialArticle?.id || null,
        headline,
        standfirst,
        section: { label: section.toLowerCase() },
        status: targetStatus,
        heroMedia: { url: "data:image/svg+xml;utf8,<svg xmlns='http://w3.org' width='800' height='450' viewBox='0 0 800 450'><rect width='100%' height='100%' fill='%23111827'/><text x='50%' y='50%' font-family='sans-serif' font-size='20' font-weight='bold' fill='%239ca3af' dominant-baseline='middle' text-anchor='middle'>EDITED CONTENT IMAGE</text></svg>" }
      });

      if (targetStatus === 'published') {
        navigate(`/news/${saved.section.label}/${saved.slug}`);
      } else {
        navigate('/editor/dashboard');
      }
    } catch (err) {
      setError('An anomaly interrupted content publication processes.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 pb-12">
      <header className="bg-white border-b border-gray-200 shadow-xs mb-8">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-base font-black text-gray-900 tracking-tight uppercase">
            {initialArticle ? '✍️ Modify Content Parameters' : '📝 Author New Production Release'}
          </h1>
          <button onClick={() => navigate('/editor/dashboard')} className="text-xs font-bold text-gray-500 hover:text-gray-900 cursor-pointer">
            ← Back to Room
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4">
        <div className="bg-white border border-gray-100 p-6 md:p-8 rounded-2xl shadow-xs space-y-6">
          {error && <div className="p-3 bg-red-50 border-l-4 border-[#BB1919] text-[#BB1919] text-xs font-bold rounded-r">{error}</div>}

          <div>
            <label className="block text-xs font-black uppercase text-gray-500 mb-1">Article Headline Title</label>
            <input
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="e.g., Breakthrough Matrix Computing Structures Finalized Successfully"
              className="w-full font-bold text-gray-900 bg-gray-50 border border-gray-200 rounded-lg p-3 outline-none focus:border-[#0063B1] focus:bg-white transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase text-gray-500 mb-1">Standfirst Summary Blurb</label>
            <textarea
              rows={4}
              value={standfirst}
              onChange={(e) => setStandfirst(e.target.value)}
              placeholder="Provide a two-sentence technical editorial lead description summary..."
              className="w-full text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-lg p-3 outline-none focus:border-[#0063B1] focus:bg-white transition-colors leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase text-gray-500 mb-1">Target Distribution Genre Section</label>
            <select
              value={section}
              onChange={(e) => setSection(e.target.value)}
              className="w-full text-xs font-bold bg-gray-50 border border-gray-200 rounded-lg p-3 outline-none focus:border-[#0063B1] focus:bg-white transition-all"
            >
              <option value="TECHNOLOGY">Technology</option>
              <option value="WORLD">World</option>
              <option value="SCIENCE">Science</option>
              <option value="BUSINESS">Business</option>
              <option value="SPORT">Sport</option>
            </select>
          </div>

          <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => handleActionSubmit('draft')}
              disabled={loading}
              className="flex-1 bg-gray-100 text-gray-700 font-bold text-xs py-2.5 rounded-lg hover:bg-gray-200 cursor-pointer transition-colors"
            >
              Save Working Copy as Draft
            </button>
            <button
              onClick={() => handleActionSubmit('published')}
              disabled={loading}
              className="flex-1 bg-[#0063B1] text-white font-bold text-xs py-2.5 rounded-lg hover:bg-[#0063B1]/90 cursor-pointer transition-colors shadow-2xs"
            >
              {loading ? 'Processing Release...' : '🚀 Release Live to Portal'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
