import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header.jsx';

function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const fadePageVariants = {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } },
    exit: { opacity: 0, y: -8, transition: { duration: 0.18, ease: 'easeIn' } }
  };

  return (
    <div className="min-h-screen bg-gray-50/30 flex flex-col font-sans antialiased text-gray-900">
      {/* BRAND HEADER INJECTED WITH QUERY CONTROLS */}
      <Header 
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory} 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={fadePageVariants}
          className="flex-grow flex flex-col"
        >
          {/* Distribute text parameters down down safely via router context grids */}
          <Outlet context={{ activeCategory, setActiveCategory, searchQuery }} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;
