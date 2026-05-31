import React, { useState, useEffect, useCallback } from 'react';
import { useOutletContext } from 'react-router-dom';
import HeroCard from './cards/HeroCard';
import StandardCard from './cards/StandardCard';
import CompactCard from './cards/CompactCard';
import PublishingWorkflow from './PublishingWorkflow';
import LiveBlogCounter from './LiveBlogCounter';
import { getHomepageContent } from '../services/mockApi';

export default function Homepage() {
  const { activeCategory } = useOutletContext(); // ← ACCESSED SELECTION TABS FROM CONTEXT
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadPortalData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getHomepageContent();
      setContent(data);
    } catch (err) {
      setError('Failed to establish a clear sync stream connection.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPortalData();
  }, [loadPortalData]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-6 bg-white border border-gray-100 shadow-sm rounded-xl max-w-xs">
          <div className="inline-block w-10 h-10 border-4 border-[#0063B1] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 font-bold text-gray-900 tracking-tight">Syncing CMS Channels...</p>
        </div>
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-xs border border-gray-100 max-w-sm">
          <h2 className="text-[#BB1919] font-black text-xl mb-1">Stream Error</h2>
          <button onClick={loadPortalData} className="w-full bg-[#0063B1] text-white text-sm font-bold py-2.5 rounded-lg hover:bg-[#0063B1]/90">
            Re-Connect Stream
          </button>
        </div>
      </div>
    );
  }

  // CORE FILTER LOGIC: Filters card arrays based on the active header tab category selection
  const filterByCat = (art) => {
    if (!art) return false;
    if (activeCategory === 'all') return true;
    return art.section?.label?.toLowerCase() === activeCategory?.toLowerCase();
  };

  const displayTopStories = content.topStories?.filter(filterByCat) || [];
  const displaySideArticles = content.sideArticles?.filter(filterByCat) || [];
  const isHeroVisible = filterByCat(content.heroArticle);

  const hasAnyStories = isHeroVisible || displayTopStories.length > 0 || displaySideArticles.length > 0;

  return (
    <div className="pb-12">
      {/* BREAKING NEWS AND TIMESTAMP INDICATOR HEADER STRIP */}
      {content.breakingNews && (
        <div className="bg-[#BB1919] text-white px-4 py-2 text-sm font-bold flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-xs">
          <div className="animate-pulse">
            <strong>BREAKING:</strong> {content.breakingNews.headline}
          </div>
          <div className="text-xs font-mono bg-black/20 px-2 py-0.5 rounded border border-white/10 self-start sm:self-auto">
            SYNCED: {content.lastUpdated}
          </div>
        </div>
      )}

      {/* MAIN CONTENT DISPLAY GRID */}
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        
        {/* RENDER FALLBACK MESSAGES IF FILTER COMPILATION IS BLANK */}
        {!hasAnyStories ? (
          <div className="text-center py-20 bg-white border border-gray-100 rounded-2xl shadow-2xs">
            <p className="text-gray-400 text-sm font-medium italic">No live broadcast listings matched your filter: "{activeCategory.toUpperCase()}"</p>
          </div>
        ) : (
          <>
            {/* TIER 2 SECTION LAYER BOXES */}
            <div className="grid gap-8 lg:grid-cols-[2fr_1fr] border-b border-gray-200 pb-8">
              {/* LEFT HERO ELEMENT */}
              <div className={`bg-white p-4 rounded-xl border border-gray-100 shadow-xs ${!isHeroVisible ? 'hidden lg:block lg:opacity-10 lg:pointer-events-none' : ''}`}>
                {isHeroVisible ? <HeroCard article={content.heroArticle} /> : <div className="text-center py-20 text-gray-300 italic text-xs">Hero hidden by active filter</div>}
              </div>

              {/* RIGHT TRENDING LOG SLOTS */}
              <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-xs">
                <h2 className="text-base font-black text-gray-900 border-b-2 border-[#BB1919] pb-1.5 mb-2 tracking-wider uppercase">
                  Most Read Stories
                </h2>
                <div className="divide-y divide-gray-100">
                  {content.trendingStories?.map((article, index) => (
                    <CompactCard key={article.id || index} article={article} rank={index + 1} />
                  ))}
                </div>
              </div>
            </div>

            {/* TIER 3: GRID LAYOUT FEED SECTION BLOCKS */}
            {(displayTopStories.length > 0 || displaySideArticles.length > 0) && (
              <div className="mt-10 border-b border-gray-200 pb-8">
                <h2 className="text-xl font-black text-gray-900 mb-6 tracking-tight uppercase border-b-2 border-[#0063B1] pb-1 inline-block">
                  Stream Feed Listings
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {displayTopStories.map((article) => (
                    <div key={article.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
                      <StandardCard article={article} />
                    </div>
                  ))}
                  {displaySideArticles.map((article) => (
                    <div key={article.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
                      <StandardCard article={article} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* REAL-TIME COVERAGE BLOCK SECTION */}
        <div className="mt-12 bg-white p-6 rounded-2xl border border-gray-100 shadow-xs">
          <h2 className="text-lg font-black text-gray-900 mb-4 tracking-tight uppercase flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#BB1919] rounded-full animate-ping"></span>
            Live Deployment Track: Global Tech Infrastructure Accord
          </h2>
          <div className="space-y-4">
            <LiveBlogCounter liveBlogId="ongoing-event-1" />
          </div>
        </div>

        {/* EDITORIAL ADMINISTRATIVE BACKEND WORKFLOW COLUMNS PANEL */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <PublishingWorkflow />
        </div>

      </main>
    </div>
  );
}
