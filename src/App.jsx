import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header.jsx';

function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const location = useLocation();

  // Animation configuration settings presets
  const fadePageVariants = {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } },
    exit: { opacity: 0, y: -8, transition: { duration: 0.18, ease: 'easeIn' } }
  };

  return (
    <div className="min-h-screen bg-gray-50/30 flex flex-col font-sans antialiased text-gray-900">
      {/* GLOBAL BRAND HEADER AND INJECTED TAB STATE SELECTION */}
      <Header activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

      {/* HARDWARE ACCELERATED FRAME SYSTEM WRAPPER VIEW CONTAINER */}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={fadePageVariants}
          className="flex-grow flex flex-col"
        >
          {/* Passes context flags down cleanly via modern React Router context utilities */}
          <Outlet context={{ activeCategory, setActiveCategory }} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;
