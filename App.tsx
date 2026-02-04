
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Architecture from './pages/Architecture';
import Contact from './pages/Contact';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-zinc-950 text-zinc-50 selection:bg-zinc-100 selection:text-zinc-900">
        <Navigation />
        <main className="relative">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/architecture" element={<Architecture />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        
        {/* Footer info */}
        <footer className="py-8 border-t border-zinc-900 text-center">
          <p className="text-[10px] text-zinc-600 font-mono uppercase tracking-[0.2em]">
            Bekjan Temenov // Version 1.0 // Product-Engineer
          </p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
