import React, { useState, useEffect } from 'react';

export default function CommentSection({ articleId }) {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [error, setError] = useState(null);

  // Storage Key linked uniquely to this article id profile context boundary
  const storageKey = `comments_archive_${articleId || 'default'}`;

  // Lifecycle Check: Sync from persistent local database records on mount
  useEffect(() => {
    const savedFeed = localStorage.getItem(storageKey);
    if (savedFeed) {
      try {
        setComments(JSON.parse(savedFeed));
      } catch (e) {
        console.error("Corrupted commentary structure detected:", e);
        localStorage.removeItem(storageKey);
      }
    } else {
      // Injected mock seed comments for a polished, out-of-the-box look
      const mockSeeds = [
        { id: 'c1', name: 'Sarah Connor', text: 'This computing threshold acceleration could shorten logistical modeling times completely.', timestamp: '1 hour ago' },
        { id: 'c2', name: 'Marcus Aurelius', text: 'Excellent ethical reporting constraints from Dr. Elena Rodriguez here.', timestamp: '34 mins ago' }
      ];
      setComments(mockSeeds);
      localStorage.setItem(storageKey, JSON.stringify(mockSeeds));
    }
  }, [storageKey]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !text.trim()) {
      setError('Please provide values for both your name and comment text boxes.');
      return;
    }

    const newCommentPayload = {
      id: `comm-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      name: name.trim(),
      text: text.trim(),
      timestamp: 'Just now'
    };

    const updatedFeedStack = [newCommentPayload, ...comments];
    setComments(updatedFeedStack);
    localStorage.setItem(storageKey, JSON.stringify(updatedFeedStack));

    // Clear text boxes on successful submission
    setText('');
  };

  return (
    <section className="mt-16 pt-8 border-t border-gray-200">
      <div className="border-b border-gray-100 pb-3 mb-6">
        <h2 className="text-lg font-black text-gray-900 tracking-tight uppercase flex items-center gap-2">
          🗣️ Reader Discussion Channel
        </h2>
        <p className="text-xs text-gray-400 font-medium mt-0.5">
          Join the conversation. Opinions expressed here do not reflect portal network positions.
        </p>
      </div>

      {/* DISCUSSIONS COMPOSITION FORM BOX */}
      <form onSubmit={handleCommentSubmit} className="bg-gray-50 border border-gray-200/60 p-4 md:p-6 rounded-xl space-y-4 mb-8 shadow-2xs">
        {error && (
          <div className="p-3 bg-red-50 border-l-4 border-[#BB1919] text-[#BB1919] text-xs font-bold rounded-r">
            ⚠️ {error}
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="sm:col-span-1">
            <label className="block text-[10px] font-black uppercase text-gray-400 mb-1">Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Jane Doe"
              className="w-full text-xs font-semibold text-gray-900 bg-white border border-gray-200 rounded-lg p-2.5 outline-none focus:border-[#0063B1] transition-colors"
            />
          </div>
          
          <div className="sm:col-span-2">
            <label className="block text-[10px] font-black uppercase text-gray-400 mb-1">Your Message</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Add your analytical critique rules..."
              className="w-full text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg p-2.5 outline-none focus:border-[#0063B1] transition-colors"
            />
          </div>
        </div>

        <div className="flex justify-end pt-1">
          <button
            type="submit"
            className="w-full sm:w-auto bg-[#0063B1] hover:bg-[#0063B1]/90 text-white text-xs font-black tracking-wider uppercase px-5 py-2 rounded-lg transition-colors cursor-pointer shadow-2xs"
          >
            Post Commentary →
          </button>
        </div>
      </form>

      {/* RENDER DISCUSSION TIMELINE STREAM ROWS */}
      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map((comm) => (
            <div 
              key={comm.id} 
              className="flex items-start gap-3 p-4 bg-white border border-gray-100 rounded-xl shadow-3xs transition-all hover:border-gray-200 animate-fadeIn"
            >
              {/* High-Contrast Graphic User Avatar Box Circle */}
              <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 text-xs font-black text-[#0063B1] flex items-center justify-center flex-shrink-0 uppercase">
                {comm.name ? comm.name.substring(0, 2) : 'NN'}
              </div>
              
              <div className="flex-1">
                <div className="flex items-baseline justify-between gap-2 mb-0.5">
                  <span className="text-xs font-black text-gray-900">{comm.name}</span>
                  <span className="text-[10px] text-gray-400 font-mono font-medium">{comm.timestamp}</span>
                </div>
                <p className="text-xs text-gray-600 font-medium leading-relaxed">
                  {comm.text}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-xs text-gray-400 italic text-center py-6">The feed board is currently silent. Be the first to start the discussion!</p>
        )}
      </div>
    </section>
  );
}
