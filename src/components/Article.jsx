import React from 'react';
import { sampleArticle } from '../data/sampleArticle';

export default function Article() {
  const article = sampleArticle;

  return (
    <article style={{ maxWidth: '800px', margin: '0 auto', lineHeight: 1.6 }}>
      {/* SECTION LABEL */}
      <div style={{
        backgroundColor: '#0063B1',
        color: 'white',
        padding: '4px 12px',
        display: 'inline-block',
        fontSize: '14px',
        marginBottom: '12px',
        borderRadius: '4px'
      }}>
        {article.section.label}
      </div>

      {/* HERO MEDIA (if exists) */}
      {article.heroMedia && (
        <figure style={{ margin: '0 0 16px 0' }}>
          <img
            src={article.heroMedia.url}
            alt={article.heroMedia.alt}
            style={{ width: '100%', borderRadius: '8px' }}
          />
          <figcaption style={{
            fontSize: '14px',
            color: '#666',
            marginTop: '8px',
            fontStyle: 'italic'
          }}>
            {article.heroMedia.credit}
          </figcaption>
        </figure>
      )}

      {/* HEADLINE */}
      <h1 style={{
        fontSize: '28px',
        fontWeight: 700,
        margin: '0 0 12px 0',
        color: '#111'
      }}>
        {article.headline}
      </h1>

      {/* STANDFIRST */}
      <p style={{
        fontSize: '18px',
        color: '#3F3F42',
        margin: '0 0 20px 0',
        lineHeight: 1.4
      }}>
        {article.standfirst}
      </p>

      {/* AUTHOR METADATA */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '24px',
        gap: '12px',
        fontSize: '14px',
        color: '#666'
      }}>
        <img
          src={article.metadata.author.avatar}
          alt={article.metadata.author.name}
          style={{ width: '32px', height: '32px', borderRadius: '50%' }}
        />
        <div>
          <strong>{article.metadata.author.name}</strong><br />
          <span>{article.metadata.published} • {article.metadata.readTime}</span>
        </div>
      </div>

      {/* BODY CONTENT */}
      <div>
        {article.body.map((block, index) => (
          <p key={index} style={{ marginBottom: '16px' }}>
            {block.text}
          </p>
        ))}
      </div>
    </article>
  );
}
