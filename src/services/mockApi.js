// In-memory data cache dictionary to store prefetched articles
const articleCache = {};

// Simulates fetching from a real CMS like Sanity.io
export const getHomepageContent = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const fetchedTimeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  const placeholderA = "data:image/svg+xml;utf8,<svg xmlns='http://w3.org' width='800' height='450' viewBox='0 0 800 450'><rect width='100%' height='100%' fill='%231f2937'/><text x='50%' y='50%' font-family='sans-serif' font-size='24' font-weight='bold' fill='%239ca3af' dominant-baseline='middle' text-anchor='middle'>LEAD IMAGE</text></svg>";
  const placeholderB = "data:image/svg+xml;utf8,<svg xmlns='http://w3.org' width='800' height='450' viewBox='0 0 800 450'><rect width='100%' height='100%' fill='%23374151'/><text x='50%' y='50%' font-family='sans-serif' font-size='24' font-weight='bold' fill='%239ca3af' dominant-baseline='middle' text-anchor='middle'>WORLD MATTERS</text></svg>";
  const placeholderC = "data:image/svg+xml;utf8,<svg xmlns='http://w3.org' width='800' height='450' viewBox='0 0 800 450'><rect width='100%' height='100%' fill='%234b5563'/><text x='50%' y='50%' font-family='sans-serif' font-size='24' font-weight='bold' fill='%239ca3af' dominant-baseline='middle' text-anchor='middle'>COSMIC TELEMETRY</text></svg>";
  const placeholderD = "data:image/svg+xml;utf8,<svg xmlns='http://w3.org' width='800' height='450' viewBox='0 0 800 450'><rect width='100%' height='100%' fill='%23111827'/><text x='50%' y='50%' font-family='sans-serif' font-size='24' font-weight='bold' fill='%239ca3af' dominant-baseline='middle' text-anchor='middle'>ARENA HIGHLIGHTS</text></svg>";

  return {
    lastUpdated: fetchedTimeString,
    breakingNews: {
      headline: 'Markets Surge on Tech Earnings Beat as Global Production Metrics Stabilize',
      url: '/business/markets-surge'
    },
    heroArticle: {
      id: 'hero-1',
      status: 'published',
      section: { label: 'technology', url: '/tech' },
      headline: 'Quantum Computing Breakthrough Promises Revolution in Drug Discovery',
      slug: 'quantum-computing-breakthrough-drug-discovery',
      standfirst: 'Researchers demonstrate error-corrected quantum bits operating at 99.9% fidelity limits.',
      heroMedia: { url: placeholderA, alt: 'Quantum lab setup visualization' },
      metadata: { author: { name: 'Dr. Elena Rodriguez' }, published: '2 hours ago' },
      topics: [{ label: 'Quantum Computing' }, { label: 'Drug Discovery' }]
    },
    sideArticles: [
      {
        id: 'side-1',
        status: 'published',
        section: { label: 'world', url: '/world' },
        headline: 'Global Climate Summit Reaches Historic Agreement',
        slug: 'global-climate-summit-historic-agreement',
        heroMedia: { url: placeholderB, alt: 'Planet earth climate setting' },
        metadata: { author: { name: 'James Wilson' }, published: '5 hours ago' },
        topics: [{ label: 'Environment' }, { label: 'Global Policy' }]
      }
    ],
    trendingStories: [
      { 
        id: 'tr-1', 
        status: 'published', 
        section: { label: 'business' }, 
        headline: 'Tech Giant Announces Major $10B Infrastructure Investment Fund', 
        slug: 'tech-giant-announces-10b-ai-investment',
        metadata: { published: '20m ago' }, 
        topics: [{ label: 'Finance' }] 
      }
    ],
    topStories: [
      {
        id: 'top-1',
        status: 'published',
        section: { label: 'science', url: '/science' },
        headline: 'New Telescope Reveals Distant Galaxy Formation',
        slug: 'new-telescope-reveals-galaxy-formation',
        heroMedia: { url: placeholderC, alt: 'Deep space cosmic array' },
        metadata: { author: { name: 'Sarah Chen' }, published: '1 day ago' },
        topics: [{ label: 'Space' }, { label: 'Cosmology' }]
      },
      {
        id: 'top-2',
        status: 'published',
        section: { label: 'sport', url: '/sport' },
        headline: 'Local Team Secures Playoff Spot in Overtime Victory',
        slug: 'local-team-secures-playoff-spot',
        heroMedia: { url: placeholderD, alt: 'Stadium lights setup' },
        metadata: { author: { name: 'Alex Mercer' }, published: '6 hours ago' },
        topics: [{ label: 'Football' }, { label: 'Playoffs' }]
      }
    ]
  };
};

// PREFETCH DISPATCH ENGINE: Pre-loads data silently into the cache map
export const prefetchArticleBySlug = async (slug) => {
  if (articleCache[slug]) return;
  const allContent = await getHomepageContent();
  const allArticles = [allContent.heroArticle, ...allContent.sideArticles, ...allContent.trendingStories, ...allContent.topStories];
  const article = allArticles.find(a => a.slug === slug);
  if (article) articleCache[slug] = article;
};

// FETCH CORE: Prioritizes pulling instantly from cache before triggering a loading lag state
export const getArticleBySlug = async (section, slug) => {
  if (articleCache[slug]) return articleCache[slug];
  await new Promise(resolve => setTimeout(resolve, 400));
  const allContent = await getHomepageContent();
  const allArticles = [allContent.heroArticle, ...allContent.sideArticles, ...allContent.trendingStories, ...allContent.topStories];
  return allArticles.find(a => a.slug === slug) || allContent.heroArticle;
};

// WORKFLOW GETTER HELPER
export const getArticlesByStatus = async (status) => {
  const allContent = await getHomepageContent();
  const allArticles = [allContent.heroArticle, ...allContent.sideArticles, ...allContent.trendingStories, ...allContent.topStories];
  return allArticles.filter(article => article.status === status);
};

// FIXED: RESTORED LIVE UPDATES FOR POLLED BLOCKS
export const getLiveBlogUpdates = async (lastUpdateTime) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const newUpdates = Math.floor(Math.random() * 3); // Returns 0 to 2 new updates randomly

  return {
    hasNewUpdates: newUpdates > 0,
    updateCount: newUpdates,
    timestamp: Date.now(),
    newPosts: Array.from({ length: newUpdates }, (_, i) => ({
      id: `live-${Date.now()}-${i}`,
      publishedAt: Date.now(),
      body: {
        text: `Live update ${i + 1}: Dynamic broadcast development updated from field correspondents.`
      }
    }))
  };
};
