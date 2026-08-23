import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';

export default function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    // Initialize Lenis Smooth Scroll Engine
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <BrowserRouter>
      {/* Branded Preloader */}
      {!loadingComplete && (
        <Preloader onComplete={() => setLoadingComplete(true)} />
      )}

      {/* Custom Context-Sensitive Cursor */}
      <CustomCursor />

      {/* Page Routing */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}
