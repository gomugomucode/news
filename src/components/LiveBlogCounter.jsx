import React, { useState, useEffect } from 'react';
import { getLiveBlogUpdates } from '../services/mockApi';

export default function LiveBlogCounter({ liveBlogId }) {
  const [updateCount, setUpdateCount] = useState(0);
  const [lastCheckTime, setLastCheckTime] = useState(new Date().toLocaleTimeString());
  const [isChecking, setIsChecking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [livePosts, setLivePosts] = useState([]);

  useEffect(() => {
    // Prevent polling if the user has manually paused updates
    if (isPaused) return;

    const checkForUpdates = async () => {
      setIsChecking(true);
      try {
        const result = await getLiveBlogUpdates(Date.now());
        
        // Update check timestamp
        setLastCheckTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        
        if (result.hasNewUpdates) {
          // Task 3: Accumulate count
          setUpdateCount(prev => prev + result.updateCount);
          
          // Task 2: Prepend new posts to the live stream array
          setLivePosts(prevPosts => [...result.newPosts, ...prevPosts]);
        }
      } catch (err) {
        console.error('Failed to parse active polling updates:', err);
      } finally {
        setIsChecking(false);
      }
    };

    // Polls every 15 seconds (reduced from BBC fallback for testing)
    const interval = setInterval(checkForUpdates, 15000);
    checkForUpdates();

    return () => clearInterval(interval);
  }, [isPaused, liveBlogId]);

  // Task 3: Reset the badge counter to clear unread metrics
  const handleMarkAsRead = () => {
    setUpdateCount(0);
  };

  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-xs overflow-hidden">
      {/* HEADER CONTROL STRIP */}
      <div className="p-4 bg-[#0063B1]/5 flex flex-wrap items-center justify-between gap-3 border-b border-gray-100">
        <div className="flex items-center gap-3">
          {/* Pulsing state dot */}
          <div className={`w-2.5 h-2.5 rounded-full ${isPaused ? 'bg-gray-400' : 'bg-[#BB1919] animate-pulse'}`}></div>
          <span className="text-xs font-black text-gray-900 tracking-wider uppercase">
            {isPaused ? 'STREAM PAUSED' : 'LIVE ACCORD FEED'}
          </span>

          {/* Task 3: Dynamic Accumulator Badge */}
          {updateCount > 0 && (
            <span className="px-2 py-0.5 bg-[#BB1919]/10 text-[#BB1919] text-[11px] font-bold rounded-md animate-bounce">
              +{updateCount} new
            </span>
          )}
        </div>

        {/* INTERACTIVE COMPONENT UTILITY CONTROLS */}
        <div className="flex items-center gap-2">
          {updateCount > 0 && (
            <button
              onClick={handleMarkAsRead}
              className="text-[11px] font-bold text-gray-500 hover:text-gray-900 bg-white px-2 py-1 rounded border border-gray-200 cursor-pointer transition-colors"
            >
              Mark as Read
            </button>
          )}

          <button
            onClick={() => setIsPaused(!isPaused)}
            className={`text-[11px] font-bold px-2 py-1 rounded border transition-colors cursor-pointer ${
              isPaused 
                ? 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100' 
                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {isPaused ? '▶ Resume' : '⏸ Pause'}
          </button>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-[11px] font-bold text-gray-400 hover:text-gray-600 px-1 cursor-pointer"
          >
            {isCollapsed ? 'Expand ▼' : 'Collapse ▲'}
          </button>
        </div>
      </div>

      {/* RE-STREAM CONTAINER HOOKS */}
      {!isCollapsed && (
        <div className="p-4 bg-white space-y-4">
          {/* Task 1: Synced verification stamp metric display banner */}
          <div className="flex items-center justify-between text-[11px] text-gray-400 font-mono bg-gray-50 px-3 py-1.5 rounded-md border border-gray-100">
            <span>Network Status: {isChecking ? 'Polling data cloud...' : 'Idle'}</span>
            <span>Last Checked: {lastCheckTime}</span>
          </div>

          {/* Task 2: Live rendering channel for incoming background stream posts */}
          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
            {livePosts.length > 0 ? (
              livePosts.map((post) => (
                <div key={post.id} className="p-3 bg-red-50/20 border-l-4 border-[#BB1919] rounded-r-lg transition-all animate-fadeIn">
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <span className="text-[10px] font-black text-[#BB1919] tracking-wider uppercase bg-red-100/50 px-1.5 py-0.5 rounded">
                      NEW CORRESPONDENCE
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium font-mono">
                      {new Date(post.publishedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-gray-900 leading-relaxed">
                    {post.body[0].text}
                  </p>
                  <p className="text-[10px] text-gray-400 font-medium mt-1">
                    Via {post.metadata?.author?.name || 'Staff Anchor'}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-xs text-gray-400 italic text-center py-6">
                Waiting for incoming broadcasts from field correspondents...
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
