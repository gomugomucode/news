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
    if (isPaused) return;

    const checkForUpdates = async () => {
      setIsChecking(true);
      try {
        const result = await getLiveBlogUpdates(Date.now());
        setLastCheckTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        
        if (result.hasNewUpdates) {
          setUpdateCount(prev => prev + result.updateCount);
          setLivePosts(prevPosts => [...result.newPosts, ...prevPosts]);
        }
      } catch (err) {
        console.error('Failed to parse active polling updates:', err);
      } finally {
        setIsChecking(false);
      }
    };

    const interval = setInterval(checkForUpdates, 15000);
    checkForUpdates();

    return () => clearInterval(interval);
  }, [isPaused, liveBlogId]);

  const handleMarkAsRead = () => {
    setUpdateCount(0);
  };

  return (
    <div 
      role="region" 
      aria-live="polite" 
      aria-label="Live blog updates"
      className="bg-white border border-gray-100 rounded-xl shadow-xs overflow-hidden"
    >
      {updateCount > 0 && (
        <div className="sr-only" aria-live="assertive">
          Notice: {updateCount} new coverage update posts are available in the live tracking feed.
        </div>
      )}

      <div className="p-4 bg-[#0063B1]/5 flex flex-wrap items-center justify-between gap-3 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div 
            className={`w-2.5 h-2.5 rounded-full ${isPaused ? 'bg-gray-400' : 'bg-[#BB1919] animate-pulse'}`}
            role="img"
            aria-label={isPaused ? "Live coverage feed stream paused status indicator" : "Live stream currently broadcasting active tracking channels"}
          />
          <span className="text-xs font-black text-gray-900 tracking-wider uppercase">
            {isPaused ? 'STREAM PAUSED' : 'LIVE ACCORD FEED'}
          </span>

          {updateCount > 0 && (
            <span className="px-2 py-0.5 bg-[#BB1919]/10 text-[#BB1919] text-[11px] font-bold rounded-md">
              +{updateCount} unread
            </span>
          )}
        </div>

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
            className="text-[11px] font-bold px-2 py-1 rounded border bg-white border-gray-200 text-gray-600 hover:bg-gray-50 cursor-pointer transition-colors"
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

      {!isCollapsed && (
        <div className="p-4 bg-white space-y-4">
          <div className="flex items-center justify-between text-[11px] text-gray-400 font-mono bg-gray-50 px-3 py-1.5 rounded-md border border-gray-100">
            <span>Status: {isChecking ? 'Polling...' : 'Active Connection'}</span>
            <span>Last Sync: {lastCheckTime}</span>
          </div>

          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
            {livePosts.length > 0 ? (
              // FIXED: Added combined uniquely identifying suffix strings to key values below
              livePosts.map((post, index) => (
                <div key={`${post.id}-${index}-${Math.random()}`} className="p-3 bg-red-50/20 border-l-4 border-[#BB1919] rounded-r-lg transition-all">
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <span className="text-[10px] font-black text-[#BB1919] tracking-wider uppercase bg-red-100/50 px-1.5 py-0.5 rounded">
                      UPDATE POST
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">
                      {new Date(post.publishedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-gray-900 leading-relaxed">
                    {post.body?.text || 'Incoming field transmission text...'}
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
