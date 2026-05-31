import React, { useState, useEffect } from 'react';
import { getLiveBlogUpdates } from '../services/mockApi';

export default function LiveBlogCounter({ liveBlogId }) {
  const [updateCount, setUpdateCount] = useState(0);
  const [lastUpdateTime, setLastUpdateTime] = useState(Date.now());
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    const checkForUpdates = async () => {
      setIsChecking(true);
      try {
        const result = await getLiveBlogUpdates(lastUpdateTime);
        if (result.hasNewUpdates) {
          setUpdateCount(prev => prev + result.updateCount);
          setLastUpdateTime(result.timestamp);
        }
      } catch (err) {
        console.error('Failed to parse active polling updates:', err);
      } finally {
        setIsChecking(false);
      }
    };

    // Polls every 15 seconds matching BBC production system fallbacks
    const interval = setInterval(checkForUpdates, 15000);
    checkForUpdates();

    return () => clearInterval(interval);
  }, [lastUpdateTime, liveBlogId]);

  return (
    <div className="p-4 bg-[#0063B1]/5 border-l-4 border-[#0063B1] rounded-r-xl my-4">
      <div className="flex items-center gap-3">
        {/* LIVE RECORD PULSING DOT METRIC */}
        <div className="w-2.5 h-2.5 bg-[#BB1919] rounded-full animate-pulse"></div>
        <span className="text-xs font-black text-gray-900 tracking-wider uppercase">
          LIVE UPDATES
        </span>

        {/* REUSE INCREMENT BADGES */}
        {updateCount > 0 && (
          <span className="px-2 py-0.5 bg-[#BB1919]/10 text-[#BB1919] text-[11px] font-bold rounded-md animate-bounce">
            +{updateCount} new posts
          </span>
        )}

        {/* LOG SYSTEM INDICATOR CHECKS */}
        <span className="ml-auto text-[11px] font-medium text-gray-400">
          {isChecking ? 'Syncing stream...' : 'Synced'}
        </span>
      </div>

      {/* RENDER DYNAMIC RECENT ENTRIES LIST */}
      {updateCount > 0 && (
        <div className="mt-3 p-3 bg-white border border-gray-100 rounded-lg shadow-2xs">
          <p className="text-xs font-bold text-gray-700 mb-2">Recent developments:</p>
          <div className="space-y-1.5 text-xs text-gray-600 font-medium">
            <p className="flex items-start gap-1.5">• <span>Correspondent dispatched to briefing center</span></p>
            <p className="flex items-start gap-1.5">• <span>Official consensus documentation uploaded</span></p>
          </div>
        </div>
      )}
    </div>
  );
}
