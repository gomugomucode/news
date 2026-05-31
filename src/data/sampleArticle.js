export const sampleArticle = {
  id: '1',
  section: { label: 'TECHNOLOGY', url: '/tech' },
  headline: 'Quantum Computing Breakthrough Promises Revolution in Drug Discovery',
  standfirst: 'Researchers demonstrate error-corrected quantum bits that could accelerate pharmaceutical development by years.',
  body: [
    { type: 'paragraph', text: 'In a landmark study published today...' },
    { type: 'paragraph', text: 'The team achieved 99.9% fidelity in quantum operations...' },
    { type: 'paragraph', text: 'This development could reduce drug discovery timelines from decade to months.' }
  ],
  metadata: {
    author: { name: 'Dr. Elena Rodriguez', avatar: 'https://i.pravatar.cc/40?img=3' },
    published: '2 hours ago',
    readTime: '4 min read'
  },
  heroMedia: {
    url: 'https://images.unsplash.com/photo-1581092433376-4ecba89961bf?w=800',
    alt: 'Scientist working in quantum lab',
    credit: 'Quantum Lab / MIT'
  }
};
