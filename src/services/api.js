import { articlesData } from '../data/articlesData';

/**
 * Simulates an asynchronous database network fetch from a headless CMS.
 * @returns {Promise<Array>} Resolves with the news article feed list after a network lag delay.
 */
export const fetchCMSArticles = () => {
  return new Promise((resolve) => {
    // Mimic a standard 800ms internet connection round-trip latency
    setTimeout(() => {
      resolve(articlesData);
    }, 800);
  });
};

export const getArticles = async (filter = 'all') => {
  await new Promise(resolve => setTimeout(resolve, 500));

  const allContent = await getHomepageContent();
  let allArticles = [
    allContent.heroArticle,
    ...allContent.sideArticles,
    ...allContent.topStories
  ];

  // Apply filter
  if (filter !== 'all') {
    allArticles = allArticles.filter(article => article.status === filter);
  }

  return allArticles;
};

export const getArticleById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 400));

  // In real app: GET /articles/${id}
  const allContent = await getHomepageContent();
  const allArticles = [
    allContent.heroArticle,
    ...allContent.sideArticles,
    ...allContent.topStories
  ];

  return allArticles.find(article => article.id === id) || null;
};

export const saveArticle = async (articleData) => {
  await new Promise(resolve => setTimeout(resolve, 800));

  // In real app: POST/PUT /articles
  // For demo, just return the data with an ID
  return {
    ...articleData,
    id: articleData.id || `article-${Date.now()}`,
    slug: articleData.headline
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  };
};
