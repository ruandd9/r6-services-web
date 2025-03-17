import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Community from './pages/Community';
import TestProfileHero from './pages/TestProfileHero';
import TestGridBackground from './pages/TestGridBackground';
import CommunityWithGrid from './pages/CommunityWithGrid';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Community />} />
        <Route path="/comunidade" element={<Community />} />
        <Route path="/comunidade-grid" element={<CommunityWithGrid />} />
        <Route path="/teste-profile" element={<TestProfileHero />} />
        <Route path="/teste-grid" element={<TestGridBackground />} />
      </Routes>
    </Router>
  );
};

export default App;
