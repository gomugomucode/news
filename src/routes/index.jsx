import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App.jsx';
import ArticlePage from './ArticlePage.jsx';
import Homepage from '../components/Homepage.jsx';
import NotFound from './NotFound.jsx';
import EditorLogin from './EditorLogin.jsx';
import EditorDashboard from './EditorDashboard.jsx';
import NewArticle from './NewArticle.jsx'; // ← IMPORTED THE COMPONENT

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
        path: 'editor/login',
        element: <EditorLogin />
      },
      {
        path: 'editor/dashboard',
        element: <EditorDashboard />
      },
      {
        path: 'editor/articles/new', // ← HOOKED UP DYNAMIC PATHWAY
        element: <NewArticle />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
]);
