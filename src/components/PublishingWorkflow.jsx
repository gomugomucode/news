import React, { useState, useEffect } from 'react';
import { getArticlesByStatus } from '../services/mockApi';

export default function PublishingWorkflow() {
  const [articlesByStatus, setArticlesByStatus] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAllStatuses = async () => {
      const statuses = ['draft', 'in_review', 'approved', 'scheduled', 'published', 'archived'];
      const statusData = {};

      for (const status of statuses) {
        const articles = await getArticlesByStatus(status);
        statusData[status] = articles;
      }

      setArticlesByStatus(statusData);
      setLoading(false);
    };

    loadAllStatuses();
  }, []);

  if (loading) {
    return (
      <div className="p-12 text-center text-sm font-bold text-gray-500 animate-pulse">
        Loading CMS Workflow Columns...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-2xl border border-gray-100 shadow-sm mt-8">
      <div className="border-b border-gray-100 pb-4 mb-6">
        <h2 className="text-xl font-black text-gray-900 tracking-tight uppercase">
          📰 Editorial Workflow Simulator
        </h2>
        <p className="text-xs text-gray-500 font-medium mt-0.5">
          See how copy travels through production pipelines before hitting the live layout.
        </p>
      </div>

      {/* METRIC WORKFLOW COLUMNS CONTAINER */}
      <div className="grid gap-6 md:grid-cols-3">
        
        {/* DRAFT COLUMN */}
        <div className="p-4 bg-gray-50/50 border border-gray-100 rounded-xl flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-black text-gray-900 mb-3 flex items-center justify-between border-b border-gray-200/60 pb-2">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-gray-400 rounded-full"></span>
                Drafts
              </span>
              <span className="bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full font-bold">
                {articlesByStatus.draft?.length || 0}
              </span>
            </h3>
            <div className="space-y-3 min-h-[160px]">
              {articlesByStatus.draft?.length > 0 ? (
                articlesByStatus.draft.map(article => (
                  <div key={article.id} className="p-3 bg-white border border-gray-100 rounded-lg shadow-2xs">
                    <h4 className="text-xs font-bold text-gray-900 leading-snug mb-1">{article.headline}</h4>
                    <p className="text-[10px] text-gray-400 font-medium">By {article.metadata?.author?.name || 'Staff Writer'}</p>
                    <button
                      onClick={() => alert(`Moving "${article.headline}" to editorial review stage.`)}
                      className="w-full mt-3 text-[11px] font-bold bg-[#0063B1] text-white py-1 rounded-md hover:bg-[#0063B1]/90 cursor-pointer"
                    >
                      Submit to Review →
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-xs text-gray-400 italic text-center pt-8">No current drafts</p>
              )}
            </div>
          </div>
        </div>

        {/* IN REVIEW COLUMN */}
        <div className="p-4 bg-gray-50/50 border border-gray-100 rounded-xl flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-black text-gray-900 mb-3 flex items-center justify-between border-b border-gray-200/60 pb-2">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-amber-400 rounded-full animate-pulse"></span>
                Under Review
              </span>
              <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full font-bold">
                {articlesByStatus.in_review?.length || 0}
              </span>
            </h3>
            <div className="space-y-3 min-h-[160px]">
              {articlesByStatus.in_review?.length > 0 ? (
                articlesByStatus.in_review.map(article => (
                  <div key={article.id} className="p-3 bg-white border border-gray-100 rounded-lg shadow-2xs">
                    <h4 className="text-xs font-bold text-gray-900 leading-snug mb-1">{article.headline}</h4>
                    <p className="text-[10px] text-gray-400 font-medium">By {article.metadata?.author?.name || 'Staff'}</p>
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => alert(`Approved "${article.headline}" for site schedule.`)}
                        className="flex-1 text-[11px] font-bold bg-emerald-600 text-white py-1 rounded-md hover:bg-emerald-700 cursor-pointer"
                      >
                        ✓ Approve
                      </button>
                      <button
                        onClick={() => alert(`Changes requested for "${article.headline}"`)}
                        className="flex-1 text-[11px] font-bold bg-[#BB1919] text-white py-1 rounded-md hover:bg-[#BB1919]/90 cursor-pointer"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-gray-400 italic text-center pt-8">Queue empty</p>
              )}
            </div>
          </div>
        </div>

        {/* PUBLISHED COLUMN */}
        <div className="p-4 bg-gray-50/50 border border-gray-100 rounded-xl flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-black text-gray-900 mb-3 flex items-center justify-between border-b border-gray-200/60 pb-2">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></span>
                Published Live
              </span>
              <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-0.5 rounded-full font-bold">
                {articlesByStatus.published?.length || 0}
              </span>
            </h3>
            <div className="space-y-3 min-h-[160px]">
              {articlesByStatus.published?.length > 0 ? (
                articlesByStatus.published.map(article => (
                  <div key={article.id} className="p-3 bg-white border border-gray-100 rounded-lg shadow-2xs">
                    <h4 className="text-xs font-bold text-gray-900 leading-snug mb-1">{article.headline}</h4>
                    <p className="text-[10px] text-gray-400 font-medium">Live • {article.metadata?.published || 'Just now'}</p>
                    <button
                      onClick={() => alert(`Scheduling automated content patch rules for "${article.headline}"`)}
                      className="w-full mt-3 text-[11px] font-bold border border-gray-200 text-gray-600 py-1 rounded-md bg-gray-50 hover:bg-gray-100 cursor-pointer"
                    >
                      ⏰ Schedule Update
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-xs text-gray-400 italic text-center pt-8">No live entries</p>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* FOOTER METRIC ANALYSIS TIPS */}
      <div className="mt-6 p-4 bg-sky-50/60 rounded-xl border border-sky-100/50 text-xs text-sky-800 leading-relaxed">
        <strong>💡 CMS Architecture Tip:</strong> Production platforms hide items flagged as <code className="bg-sky-100 px-1 rounded">draft</code> or <code className="bg-sky-100 px-1 rounded">in_review</code> from the root index components, fetching them only inside secure staff dashboards like this workflow grid!
      </div>
    </div>
  );
}
