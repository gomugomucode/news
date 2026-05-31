import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { getHomepageContent } from '../services/mockApi.js';
import StandardCard from '../components/cards/StandardCard.jsx';

export default function EditorDashboard() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  // Redirect if not authenticated using client-side navigate hooks
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
          setArticles(allArticles.filter(a => a.status === filter || a.section?.label?.toLowerCase() === filter.toLowerCase()));
        }
      } catch (err) {
        console.error('Failed to load dashboard index listings feed:', err);
      } {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      loadArticles();
    }
  }, [filter, isAuthenticated]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-2 border-[#0063B1] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-2 text-xs font-bold text-gray-400">Loading editor dashboard database room...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <div className="p-4 text-center text-xs text-gray-400 font-medium">Redirecting to session verification access links...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50/50 pb-12">
      {/* HEADER CONTROLS BAR */}
      <header className="bg-white border-b border-gray-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-4 self-start sm:self-auto">
              <h1 className="text-xl font-black text-gray-900 uppercase tracking-tight text-[#0063B1]">
                Editor Dashboard
              </h1>
              <div className="text-xs bg-gray-100 border border-gray-200 text-gray-500 font-bold px-2 py-0.5 rounded-md">
                Welcome, {user?.name}
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border border-gray-200 bg-white rounded-lg text-xs font-bold px-3 py-2 outline-none focus:border-[#0063B1] cursor-pointer"
              >
                <option value="all">All Articles</option>
                <option value="published">Published Live</option>
                <option value="draft">Drafts</option>
              </select>

              <button
                onClick={() => navigate('/editor/articles/new')}
                className="bg-[#0063B1] text-white text-xs font-black tracking-wider uppercase px-4 py-2 rounded-lg hover:bg-[#0063B1]/90 transition-colors shadow-2xs cursor-pointer"
              >
                + New Article
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN LAYOUT STORY CARDS GRID */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-2 border-[#0063B1] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
            <p className="text-sm text-gray-400 italic font-medium">No articles found matching active filter states.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map(article => (
              <div key={article.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-2xs flex flex-col justify-between">
                <div>
                  <StandardCard article={article} />
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider ${
                    article.status === 'published' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                  }`}>
                    {article.status || 'published'}
                  </span>
                  <div className="flex gap-3 text-xs font-bold">
                    <button 
                      onClick={() => alert(`Management functions are ready for deployment tracking link id: ${article.id}`)}
                      className="text-[#0063B1] hover:underline cursor-pointer"
                    >
                      Manage
                    </button>
                    <button 
                      onClick={() => {
                        if (window.confirm(`Are you sure you want to delete "${article.headline}"?`)) {
                          alert('Mock CMS API Action: Article removed successfully from memory maps.');
                        }
                      }}
                      className="text-[#BB1919] hover:underline cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* FOOTER ACCENT BAR */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-xs font-medium text-gray-400">
          News Portal Editor Console • © 2026 • Built with React Client Router
        </div>
      </footer>
    </div>
  );
}
