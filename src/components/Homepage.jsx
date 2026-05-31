import React, { useState, useEffect, useCallback } from 'react';
import HeroCard from './cards/HeroCard';
import StandardCard from './cards/StandardCard';
import CompactCard from './cards/CompactCard';
import PublishingWorkflow from './PublishingWorkflow';
import LiveBlogCounter from './LiveBlogCounter';
import { getHomepageContent } from '../services/mockApi';

export default function Homepage() {
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
          <p className="mt-4 font-bold text-gray-900 tracking-tight">Syncing Headless CMS Channels...</p>
          <p className="text-xs text-gray-400 mt-1">Simulating satellite lag latency</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-xs border border-gray-100 max-w-sm">
          <h2 className="text-[#BB1919] font-black text-xl mb-1">Stream Error</h2>
          <p className="text-gray-500 text-sm mb-4">{error}</p>
          <button
            onClick={loadPortalData}
            className="w-full bg-[#0063B1] text-white text-sm font-bold py-2.5 rounded-lg hover:bg-[#0063B1]/90 transition-colors cursor-pointer"
          >
            Re-Connect Stream Channels
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 pb-12">
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

      {/* FIXED ID BOUNDARY TAG ADDED TO MAIN OBJECT BELOW FOR KEYBOARD ACCESSIBILITY SKIP ROUTING */}
      <main id="main-content" tabindex="-1" className="container mx-auto px-4 py-8 max-w-7xl outline-none">
        
        {/* TIER 2: PRIMARY LEAD + SIDE TRENDING STACK */}
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr] border-b border-gray-200 pb-8">
          {/* LEFT HERO ELEMENT */}
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
            <HeroCard article={content.heroArticle} />
          </div>

          {/* RIGHT SIDEBAR COMPACT MOST-READ INDEX */}
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-xs flex flex-col justify-between">
            <div>
              <h2 className="text-base font-black text-gray-900 border-b-2 border-[#BB1919] pb-1.5 mb-2 tracking-wider uppercase">
                Most Read Stories
              </h2>
              <div className="divide-y divide-gray-100">
                {content.trendingStories?.map((article, index) => {
                  const runningRank = index + 1;
                  return (
                    <CompactCard 
                      key={article.id || index} 
                      article={article} 
                      rank={runningRank === 1 ? `★ ${runningRank}` : runningRank} 
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* TIER 3: EDITORIAL FEED LISTINGS */}
        <div className="mt-10 border-b border-gray-200 pb-8">
          <h2 className="text-xl font-black text-gray-900 mb-6 tracking-tight uppercase border-b-2 border-[#0063B1] pb-1 inline-block">
            Top Global Stories
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {content.topStories?.map((article) => (
              <div key={article.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
                <StandardCard article={article} />
              </div>
            ))}
            {content.sideArticles?.map((article) => (
              <div key={article.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
                <StandardCard article={article} />
              </div>
            ))}
          </div>
        </div>

        {/* LIVE BLOG SECTION */}
        <div className="mt-12 bg-white p-6 rounded-2xl border border-gray-100 shadow-xs">
          <h2 className="text-lg font-black text-gray-900 mb-4 tracking-tight uppercase flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#BB1919] rounded-full animate-ping"></span>
            Live Deployment Track: Global Tech Infrastructure Accord
          </h2>
          
          <div className="space-y-4">
            <LiveBlogCounter liveBlogId="ongoing-event-1" />

            <div className="space-y-3">
              <div className="p-4 bg-gray-50 border-l-4 border-[#0063B1] rounded-r-lg">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#BB1919] rounded-full mt-1.5 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 mb-0.5">Major technical breakthrough verified across clean-rooms</p>
                    <p className="text-[11px] text-gray-400 font-medium">Just now • Live Blog Editor</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* EDITORIAL WORKFLOW PANEL */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <PublishingWorkflow />
        </div>

      </main>
    </div>
  );
}
