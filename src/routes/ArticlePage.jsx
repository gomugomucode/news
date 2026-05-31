import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getHomepageContent } from '../services/mockApi';
import Seo from '../components/Seo.jsx';
import RelatedArticles from '../components/RelatedArticles.jsx'; // ← INJECTED SUGGESTION FILTER

export default function ArticlePage() {
  const { section, slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        setLoading(true);
        const data = await getHomepageContent();
        if (data && data.heroArticle) {
          setArticle(data.heroArticle);
          setError(null);
        } else {
          setError('Article not found');
        }
      } catch (err) {
        setError('Failed to load article');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadArticle();
  }, [section, slug]);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-gray-50">
        <Seo title="Loading..." />
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-2 border-[#0063B1] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-2 text-[#3F3F42] font-semibold">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-gray-50">
        <Seo title="Not Found" />
        <div className="text-center p-8 bg-white border border-gray-100 shadow-xs rounded-xl max-w-sm mx-4">
          <h2 className="text-[#BB1919] font-black text-xl mb-2">Article Not Found</h2>
          <p className="text-[#3F3F42] text-sm mb-4">We couldn't find the article you are looking for.</p>
          <Link to="/" className="inline-block bg-[#0063B1] text-white text-sm font-bold px-6 py-2 rounded-lg hover:bg-[#0063B1]/80 transition-colors">
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Seo 
        title={article.headline} 
        description={article.standfirst} 
        image={article.heroMedia?.url} 
      />

      <div className="max-w-[720px] mx-auto px-4 py-12">
        <article>
          <header className="mb-8">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span className="inline-block bg-[#0063B1] text-white text-xs font-bold px-3 py-1 rounded">
                {article.section?.label || 'NEWS'}
              </span>
              <time className="text-[#3F3F42]/60 text-xs font-medium">
                {article.metadata?.published || 'Recently'}
              </time>
            </div>
            <h1 className="text-[28px] md:text-[38px] font-black leading-tight tracking-tight text-gray-900 mb-4">
              {article.headline}
            </h1>
            <p className="text-lg md:text-xl text-[#3F3F42] leading-relaxed font-medium mb-6">
              {article.standfirst}
            </p>
          </header>

          {article.heroMedia && (
            <figure className="mb-8 relative overflow-hidden rounded-xl bg-gray-100 border border-gray-100">
              <img src={article.heroMedia.url} alt="" className="w-full h-[240px] sm:h-[400px] object-cover" />
            </figure>
          )}

          <section className="text-gray-800 text-base md:text-lg leading-relaxed space-y-6 mb-10">
            <p>In a landmark study published today, engineering partnerships demonstrated scalable calculation matrix processing bounds that could fundamentally shift current technology paradigms.</p>
            <p>The team successfully suppressed core noise interference fields during experimental benchmarks, clearing the way for production field implementations next year.</p>
          </section>

          <footer className="border-t border-gray-200 pt-8 mt-12">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-sm text-[#0063B1]">ER</div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">Dr. Elena Rodriguez</p>
                  <p className="text-gray-400 text-xs">Senior Tech Correspondent</p>
                </div>
              </div>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link copied to clipboard!');
                }}
                className="w-full sm:w-auto text-center bg-gray-100 border border-gray-200 text-gray-700 font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
              >
                Share Article Link
              </button>
              <Link to="/" className="w-full sm:w-auto text-center bg-[#0063B1] text-white font-bold text-sm px-5 py-2.5 rounded-lg hover:bg-[#0063B1]/90 transition-colors shadow-2xs">
                Return to Homepage
              </Link>
            </div>
          </footer>
        </article>

        {/* DAY 7 EXTENSION MODULE: INJECT RELATED ARCHITECTURES BELOW FOOTER UTILITIES */}
        <RelatedArticles 
          currentArticleId={article.id} 
          currentSection={article.section?.label} 
        />
      </div>
    </>
  );
}
