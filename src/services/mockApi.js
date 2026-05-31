// In-memory runtime persistence dictionary and cache maps
let localDatabaseInstance = null;
const articleCache = {};

// Simulates fetching from a real CMS like Sanity.io
export const getHomepageContent = async () => {
  if (localDatabaseInstance) return localDatabaseInstance;

  await new Promise(resolve => setTimeout(resolve, 50));
  const fetchedTimeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  // FIXED: Switched to ultra-reliable, high-availability, direct pixel placeholders
  const placeholderA = "https://picsum.photos";
  const placeholderB = "https://picsum.photos";
  const placeholderC = "https://picsum.photos";
  const placeholderD = "https://picsum.photos";

  localDatabaseInstance = {
    lastUpdated: fetchedTimeString,
    breakingNews: { headline: 'Markets Surge on Tech Earnings Beat as Global Production Metrics Stabilize' },
    heroArticle: {
      id: 'hero-1',
      status: 'published',
      section: { label: 'technology' },
      headline: 'Quantum Computing Breakthrough Promises Revolution in Drug Discovery',
      slug: 'quantum-computing-breakthrough-drug-discovery',
      standfirst: 'Researchers demonstrate error-corrected quantum bits operating at 99.9% fidelity limits.',
      heroMedia: { url: placeholderA, alt: 'Quantum lab data visualization asset' },
      metadata: { author: { name: 'Dr. Elena Rodriguez' }, published: '2 hours ago' }
    },
    sideArticles: [
      {
        id: 'side-1',
        status: 'published',
        section: { label: 'world' },
        headline: 'Global Climate Summit Reaches Historic Agreement',
        slug: 'global-climate-summit-historic-agreement',
        heroMedia: { url: placeholderB, alt: 'Planet earth climate array data setting' },
        metadata: { author: { name: 'James Wilson' }, published: '5 hours ago' }
      }
    ],
    trendingStories: [],
    topStories: [
      {
        id: 'top-1',
        status: 'published',
        section: { label: 'science' },
        headline: 'New Telescope Reveals Distant Galaxy Formation',
        slug: 'new-telescope-reveals-galaxy-formation',
        heroMedia: { url: placeholderC, alt: 'Deep space abstract cosmic vector background' },
        metadata: { author: { name: 'Sarah Chen' }, published: '1 day ago' }
      },
      {
        id: 'top-2',
        status: 'published',
        section: { label: 'sport' },
        headline: 'Local Team Secures Playoff Spot in Overtime Victory',
        slug: 'local-team-secures-playoff-spot',
        heroMedia: { url: placeholderD, alt: 'Active sports stadium floodlight setup' },
        metadata: { author: { name: 'Alex Mercer' }, published: '6 hours ago' }
      }
    ]
  };

  return localDatabaseInstance;
};

// PREFETCH CACHE MANAGER
export const prefetchArticleBySlug = async (slug) => {
  if (articleCache[slug]) return;
  const allContent = await getHomepageContent();
  const allArticles = [allContent.heroArticle, ...allContent.sideArticles, ...allContent.trendingStories, ...allContent.topStories];
  const article = allArticles.find(a => a.slug === slug);
  if (article) articleCache[slug] = article;
};

// CHANNELS DETAILS ACQUISITION FETCH ENGINE
export const getArticleBySlug = async (section, slug) => {
  if (articleCache[slug]) return articleCache[slug];
  const db = await getHomepageContent();
  const all = [db.heroArticle, ...db.sideArticles, ...db.topStories];
  return all.find(a => a.slug === slug) || db.heroArticle;
};

// COMPOSITION MUTATION SAVE CONTROL FLOW
export const saveArticle = async (articleData) => {
  const db = await getHomepageContent();
  const slugified = articleData.headline.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  
  const formattedRecord = {
    ...articleData,
    id: articleData.id || `art-${Date.now()}`,
    slug: slugified,
    metadata: { author: { name: 'Editor Jane' }, published: 'Just now' }
  };

  if (formattedRecord.id === 'hero-1') {
    db.heroArticle = formattedRecord;
  } else {
    db.topStories = [formattedRecord, ...db.topStories.filter(a => a.id !== formattedRecord.id)];
  }

  return formattedRecord;
};

export const getArticlesByStatus = async (status) => {
  const allContent = await getHomepageContent();
  const allArticles = [allContent.heroArticle, ...allContent.sideArticles, ...allContent.trendingStories, ...allContent.topStories];
  return allArticles.filter(article => article.status === status);
};

// LIVE POLL RESPONSES
export const getLiveBlogUpdates = async (lastUpdateTime) => {
  return { hasNewUpdates: false, newPosts: [] };
};
