import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { getHomepageContent } from '../services/mockApi.js';
import StandardCard from '../components/cards/StandardCard.jsx';

export default function EditorDashboard() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/editor/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  useEffect(() => {
    const loadArticles = async () => {
      setLoading(true);
      try {
        const data = await getHomepageContent();
        const allArticles = [
          data.heroArticle,
          ...data.sideArticles,
          ...data.topStories
        ];
        
        if (filter === 'all') {
          setArticles(allArticles);
        } else {
          setArticles(allArticles.filter(a => a.status === filter || a.section?.label === filter));
        }
      } catch (err) {
        console.error('Failed to query dashboard index list feed:', err);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) loadArticles();
  }, [filter, isAuthenticated]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-2 border-[#0063B1] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-2 text-xs font-bold text-gray-500">Syncing dashboard variables...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-gray-50/50 pb-12">
      <header className="bg-white border-b border-gray-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex flex-wrap justify-between items-center gap-4">
          <div>
            <h1 className="text-lg font-black text-gray-900 uppercase tracking-tight">Editor Control Room</h1>
            <p className="text-xs text-gray-400 font-medium">Welcome back, {user?.name}</p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-200 bg-white rounded-lg text-xs font-bold px-3 py-2 outline-none focus:border-[#0063B1]"
            >
              <option value="all">All Items</option>
              <option value="published">Published</option>
              <option value="draft">Drafts</option>
            </select>

            <button 
              onClick={() => logout()}
              className="bg-[#BB1919] hover:bg-[#BB1919]/90 text-white font-bold text-xs px-4 py-2 rounded-lg cursor-pointer transition-colors shadow-2xs"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-2 border-[#0063B1] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : articles.length === 0 ? (
          <p className="text-sm text-gray-400 italic text-center py-12">No current records matched index filters.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map(article => (
              <div key={article.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-2xs">
                <StandardCard article={article} />
                <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase ${article.status === 'published' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                    {article.status || 'published'}
                  </span>
                  <button onClick={() => alert(`Edit panel under construction for id: ${article.id}`)} className="text-xs font-bold text-[#0063B1] hover:underline cursor-pointer">
                    Manage Item →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
