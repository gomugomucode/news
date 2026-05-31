import React, { useState, useEffect } from 'react';
import { getHomepageContent } from '../services/mockApi';
import StandardCard from './cards/StandardCard';

export default function RelatedArticles({ currentArticleId, currentSection }) {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSuggestions = async () => {
      try {
        setLoading(true);
        const data = await getHomepageContent();
        
        // Combine all available articles from our mock CMS payload
        const allArticles = [
          data.heroArticle,
          ...data.sideArticles,
          ...data.trendingStories,
          ...data.topStories
        ];

        // Filter: Match the same section category, but exclude the active article itself
        const filtered = allArticles.filter(article => 
          article && 
          article.id !== currentArticleId && 
          article.section?.label?.toLowerCase() === currentSection?.toLowerCase()
        );

        // Fallback: If no articles match the exact section, show other top stories instead
        if (filtered.length === 0) {
          const fallbacks = allArticles.filter(article => article && article.id !== currentArticleId);
          setSuggestions(fallbacks.slice(0, 3));
        } else {
          setSuggestions(filtered.slice(0, 3));
        }
      } catch (err) {
        console.error('Failed to resolve content suggestions:', err);
      } finally {
        setLoading(false);
      }
    };

    loadSuggestions();
  }, [currentArticleId, currentSection]);

  if (loading || suggestions.length === 0) return null;

  return (
    <section className="mt-16 pt-8 border-t border-gray-200">
      <h2 className="text-xl font-black text-gray-900 mb-6 tracking-tight uppercase border-b-2 border-[#0063B1] pb-1 inline-block">
        Related Content
      </h2>
      
      {/* 3-Column Responsive Recommendation Matrix Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {suggestions.map((article) => (
          <div key={article.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-2xs hover:shadow-xs transition-shadow duration-200">
            <StandardCard article={article} />
          </div>
        ))}
      </div>
    </section>
  );
}
