import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { saveArticle, getArticleBySlug } from '../../services/mockApi';

export default function ArticleForm({ articleId }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [article, setArticle] = useState({
    headline: '',
    standfirst: '',
    body: [{ type: 'paragraph', text: '' }],
    section: { label: 'TECHNOLOGY' },
    heroMedia: { url: '', alt: '', credit: '' },
    metadata: {
      author: { name: user?.name || 'Editor Jane', avatar: '' },
      published: '',
      readTime: ''
    },
    status: 'draft',
    topics: []
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (articleId && articleId !== 'new') {
      const loadArticle = async () => {
        setLoading(true);
        try {
          // Fallback to fetch data directly from slug/id fields safely
          const data = await getArticleBySlug('', articleId);
          if (data) setArticle(data);
        } catch (err) {
          setError('Failed to load article details.');
        } finally {
          setLoading(false);
        }
      };
      loadArticle();
    }
  }, [articleId]);

  const handleActionSubmit = async (e, targetStatus) => {
    e.preventDefault();
    if (!article.headline || !article.standfirst) {
      setError('Please provide values for both the headline and summary fields.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const savedArticle = await saveArticle({
        ...article,
        status: targetStatus,
        updatedAt: new Date().toISOString()
      });

      // Navigate cleanly using client router path hooks
      if (targetStatus === 'published') {
        navigate(`/news/${savedArticle.section.label.toLowerCase()}/${savedArticle.slug}`);
      } else {
        navigate('/editor/dashboard');
      }
    } catch (err) {
      setError('Failed to save article workspace data.');
      console.error('Save error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (field, value) => {
    setArticle(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (loading && !article.headline) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-2 border-[#0063B1] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-2 text-xs font-bold text-gray-500">Loading editor parameters...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/40 pb-12">
      {/* HEADER ROW */}
      <header className="bg-white border-b border-gray-200 shadow-xs mb-8">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <h2 className="text-base font-black text-gray-900 tracking-tight uppercase">
            {articleId === 'new' ? '📝 Author New Content' : '✍️ Edit Existing Content'}
          </h2>
          <button
            type="button"
            onClick={() => navigate('/editor/dashboard')}
            className="text-xs font-bold text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
          >
            ← Back to Dashboard
          </button>
        </div>
      </header>

      {/* FORM INPUT STAGES */}
      <main className="max-w-4xl mx-auto px-4">
        <div className="bg-white border border-gray-100 p-6 md:p-8 rounded-2xl shadow-xs">
          <form className="space-y-6">
            {error && (
              <div className="bg-red-50 border-l-4 border-[#BB1919] text-[#BB1919] text-xs font-bold p-3 rounded-r">
                ⚠️ {error}
              </div>
            )}

            <div>
              <label htmlFor="headline" className="block text-xs font-black uppercase text-gray-500 mb-1">
                Headline Title
              </label>
              <input
                type="text"
                id="headline"
                value={article.headline}
                onChange={(e) => handleFieldChange('headline', e.target.value)}
                required
                maxLength="200"
                className="w-full text-sm font-bold text-gray-900 bg-gray-50 border border-gray-200 rounded-lg p-3 outline-none focus:border-[#0063B1] focus:bg-white transition-colors"
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="standfirst" className="block text-xs font-black uppercase text-gray-500 mb-1">
                Standfirst (Summary Blurb)
              </label>
              <textarea
                id="standfirst"
                value={article.standfirst}
                onChange={(e) => handleFieldChange('standfirst', e.target.value)}
                rows="3"
                className="w-full text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-lg p-3 outline-none focus:border-[#0063B1] focus:bg-white transition-colors leading-relaxed"
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="section" className="block text-xs font-black uppercase text-gray-500 mb-1">
                Category Section
              </label>
              <select
                id="section"
                value={article.section.label.toUpperCase()}
                onChange={(e) => handleFieldChange('section', { label: e.target.value })}
                className="w-full text-xs font-bold bg-gray-50 border border-gray-200 rounded-lg p-3 outline-none focus:border-[#0063B1] focus:bg-white transition-all"
                disabled={loading}
              >
                <option value="TECHNOLOGY">Technology</option>
                <option value="WORLD">World</option>
                <option value="SCIENCE">Science</option>
                <option value="BUSINESS">Business</option>
                <option value="SPORT">Sport</option>
              </select>
            </div>

            {/* LIFECYCLE INTERACTION ACTIONS FOOTER BUTTONS */}
            <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center gap-4">
              <div className="flex items-center gap-2 self-start sm:self-auto min-w-[100px]">
                <span className="text-xs text-gray-400 font-bold uppercase">Status:</span>
                <span className={`inline-block px-2 py-0.5 text-[10px] font-black tracking-wide uppercase rounded ${
                  article.status === 'published' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                }`}>
                  {article.status}
                </span>
              </div>

              <div className="flex-1 w-full flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={(e) => handleActionSubmit(e, 'draft')}
                  disabled={loading}
                  className="flex-1 bg-gray-100 text-gray-700 font-bold text-xs py-2.5 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  Save as Draft Copy
                </button>

                <button
                  type="button"
                  onClick={(e) => handleActionSubmit(e, 'published')}
                  disabled={loading || !article.headline || !article.standfirst}
                  className="flex-1 bg-[#0063B1] text-white font-bold text-xs py-2.5 rounded-lg hover:bg-[#0063B1]/90 transition-colors cursor-pointer shadow-2xs disabled:opacity-40"
                >
                  {loading ? 'Publishing Content...' : '🚀 Release Live to Site'}
                </button>
              </div>
            </div>

          </form>
        </div>
      </main>
    </div>
  );
}
