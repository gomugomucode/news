import React from 'react';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div>
      {/* 
        The Outlet component acts as a dynamic placeholder.
        React Router will automatically swap this out with your 
        Homepage component on '/' or your ArticlePage component on 'news/:section/:slug'.
      */}
      <Outlet />
    </div>
  );
}

export default App;
