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
