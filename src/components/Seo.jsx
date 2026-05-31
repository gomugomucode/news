import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function Seo({ title, description, image }) {
  const siteTitle = title ? `${title} | News Portal` : 'News Portal Starter';
  const siteDesc = description || 'Latest breakthrough tech news and in-depth analytical reporting.';
  const siteImage = image || 'https://unsplash.com';

  return (
    <Helmet>
      {/* Primary Browser Tab Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={siteDesc} />

      {/* Open Graph / Facebook Social Share Cards */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDesc} />
      <meta property="og:image" content={siteImage} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDesc} />
      <meta name="twitter:image" content={siteImage} />
    </Helmet>
  );
}
