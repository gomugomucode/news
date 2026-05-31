import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App.jsx';
import ArticlePage from './ArticlePage.jsx';
import Homepage from '../components/Homepage.jsx';
import NotFound from './NotFound.jsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Homepage />
      },
      {
        path: 'news/:section/:slug',
        element: <ArticlePage />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
]);
