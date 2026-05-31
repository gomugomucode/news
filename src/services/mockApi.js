// In-memory runtime persistence database container arrays
let localDatabaseInstance = null;
const articleCache = {};

// Simulates fetching from a real CMS like Sanity.io
export const getHomepageContent = async () => {
  if (localDatabaseInstance) return localDatabaseInstance;

  await new Promise(resolve => setTimeout(resolve, 100));
  const fetchedTimeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

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
      heroMedia: { url: placeholderA },
      metadata: { author: { name: 'Dr. Elena Rodriguez' }, published: '2 hours ago' }
    },
    sideArticles: [
      {
        id: 'side-1',
        status: 'published',
        section: { label: 'world' },
        headline: 'Global Climate Summit Reaches Historic Agreement',
        slug: 'global-climate-summit-historic-agreement',
        heroMedia: { url: placeholderB },
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
        heroMedia: { url: placeholderC },
        metadata: { author: { name: 'Sarah Chen' }, published: '1 day ago' }
      },
      {
        id: 'top-2',
        status: 'published',
        section: { label: 'sport' },
        headline: 'Local Team Secures Playoff Spot in Overtime Victory',
        slug: 'local-team-secures-playoff-spot',
        heroMedia: { url: placeholderD },
        metadata: { author: { name: 'Alex Mercer' }, published: '6 hours ago' }
      }
    ]
  };

  return localDatabaseInstance;
};

// EDITOR SELECTION FEED FUNCTIONS
export const getArticles = async (filter = 'all') => {
  const allContent = await getHomepageContent();
  let allArticles = [allContent.heroArticle, ...allContent.sideArticles, ...allContent.topStories];
  if (filter !== 'all') allArticles = allArticles.filter(article => article.status === filter);
  return allArticles;
};

export const getArticleById = async (id) => {
  const allContent = await getHomepageContent();
  const allArticles = [allContent.heroArticle, ...allContent.sideArticles, ...allContent.topStories];
  return allArticles.find(article => article.id === id) || null;
};

// FIXED: RESTORED THE HELPER EXPORT THAT WAS CRASHING PUBLISHINGWORKFLOW
export const getArticlesByStatus = async (status) => {
  const allContent = await getHomepageContent();
  const allArticles = [allContent.heroArticle, ...allContent.sideArticles, ...allContent.topStories];
  return allArticles.filter(article => article.status === status);
};

// SAVE COMPOSITION MUTATION MUTATOR
export const saveArticle = async (articleData) => {
  await new Promise(resolve => setTimeout(resolve, 400));
  const db = await getHomepageContent();
  const generatedSlug = articleData.headline.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

  const formattedRecord = {
    ...articleData,
    id: articleData.id || `article-${Date.now()}`,
    slug: generatedSlug,
    metadata: { author: { name: 'Editor Jane' }, published: 'Just now' },
    heroMedia: { url: "https://picsum.photos" }
  };

  if (formattedRecord.id === 'hero-1') {
    db.heroArticle = formattedRecord;
  } else {
    db.topStories = [formattedRecord, ...db.topStories.filter(a => a.id !== formattedRecord.id)];
  }
  return formattedRecord;
};

// OPTIMIZATION SILENT CACHE CORES
export const prefetchArticleBySlug = async (slug) => {
  if (articleCache[slug]) return;
  const allContent = await getHomepageContent();
  const allArticles = [allContent.heroArticle, ...allContent.sideArticles, ...allContent.topStories];
  const article = allArticles.find(a => a.slug === slug);
  if (article) articleCache[slug] = article;
};

export const getArticleBySlug = async (section, slug) => {
  if (articleCache[slug]) return articleCache[slug];
  const db = await getHomepageContent();
  const all = [db.heroArticle, ...db.sideArticles, ...db.topStories];
  return all.find(a => a.slug === slug) || db.heroArticle;
};

export const getLiveBlogUpdates = async () => {
  return { hasNewUpdates: false, newPosts: [] };
};
