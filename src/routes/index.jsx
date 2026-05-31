import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App.jsx';
import ArticlePage from './ArticlePage.jsx';
import Homepage from '../components/Homepage.jsx';
import NotFound from './NotFound.jsx';
import EditorLogin from './EditorLogin.jsx'; // ← IMPORTED NEW ROUTE

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
        path: 'editor/login', // ← REGISTERED NEW VIEW ROUTE HERE
        element: <EditorLogin />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
]);
