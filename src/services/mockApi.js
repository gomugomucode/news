// Simulates fetching from a real CMS like Sanity.io
export const getHomepageContent = async () => {
  // Simulated network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const fetchedTimeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return {
    lastUpdated: fetchedTimeString,
    breakingNews: {
      headline: 'Markets Surge on Tech Earnings Beat as Global Production Metrics Stabilize',
      url: '/business/markets-surge'
    },
    heroArticle: {
      id: 'hero-1',
      status: 'published', // draft | in_review | approved | scheduled | published | archived
      isBreaking: false,
      isScheduled: false,
      scheduledFor: null,
      section: { label: 'TECHNOLOGY', url: '/tech' },
      headline: 'Quantum Computing Breakthrough Promises Revolution in Drug Discovery',
      standfirst: 'Researchers demonstrate error-corrected quantum bits operating at 99.9% fidelity limits.',
      heroMedia: {
        url: 'https://unsplash.com',
        alt: 'Scientist in quantum lab'
      },
      metadata: {
        author: { name: 'Dr. Elena Rodriguez' },
        published: '2 hours ago'
      }
    },
    sideArticles: [
      {
        id: 'side-1',
        status: 'published',
        isBreaking: false,
        isScheduled: false,
        section: { label: 'WORLD', url: '/world' },
        headline: 'Global Climate Summit Reaches Historic Agreement',
        metadata: { author: { name: 'James Wilson' }, published: '5 hours ago' }
      },
      {
        id: 'side-2',
        status: 'in_review', // Populates the "In Review" dashboard stage
        isBreaking: false,
        isScheduled: false,
        section: { label: 'SPORT', url: '/sport' },
        headline: 'Local Team Secures Playoff Spot in Overtime Victory',
        metadata: { author: { name: 'Alex Mercer' }, published: '6 hours ago' }
      }
    ],
    trendingStories: [
      { id: 'tr-1', status: 'published', section: { label: 'BUSINESS' }, headline: 'Tech Giant Announces Major $10B Infrastructure Investment Fund', metadata: { published: '20m ago' } }
    ],
    topStories: [
      {
        id: 'top-1',
        status: 'published',
        section: { label: 'SCIENCE', url: '/science' },
        headline: 'New Telescope Reveals Distant Galaxy Formation',
        heroMedia: { url: 'https://unsplash.com' },
        metadata: { author: { name: 'Sarah Chen' }, published: '1 day ago' }
      },
      {
        id: 'top-2',
        status: 'draft', // Populates the "Draft" dashboard stage
        section: { label: 'HEALTH', url: '/health' },
        headline: 'Breakthrough Therapeutic Trials Show Promise for Cognitive Restoration',
        heroMedia: { url: 'https://unsplash.com' },
        metadata: { author: { name: 'Marcus Vance' }, published: 'Drafting' }
      }
    ]
  };
};

// HELPER FILTER QUERY LOOP
export const getArticlesByStatus = async (status) => {
  await new Promise(resolve => setTimeout(resolve, 100));
  const allContent = await getHomepageContent();
  
  const allArticles = [
    allContent.heroArticle,
    ...allContent.sideArticles,
    ...allContent.trendingStories,
    ...allContent.topStories
  ];

  return allArticles.filter(article => article.status === status);
};
