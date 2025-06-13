/**
 * App Component
 * Author: Luca Iantosco  
 * Description: Main application component with React Router setup for portfolio navigation
 * Date: June 2, 2025
 */

import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import PixelBackground from './components/PixelBackground'
import AllProjectsPage from './components/AllProjectsPage'
import './styles/App.css'

// Componente per controllare lo scroll
function ScrollToTop() {
  const { pathname } = useLocation();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  
  useEffect(() => {
    // Solo per i cambi di route, non per il primo caricamento della pagina
    if (!isFirstLoad && pathname !== '/') {
      // Solo scroll to top quando cambiamo veramente pagina (non quando andiamo alla home)
      window.scrollTo(0, 0);
    } else if (isFirstLoad) {
      // Per il primo caricamento, inizia dalla cima ma non bloccare lo scroll
      window.scrollTo(0, 0);
      setIsFirstLoad(false);
    }
  }, [pathname, isFirstLoad]);
  
  return null;
}

function App() {
  return (
    <Router>
      <div className="App">
        <ScrollToTop />
        <PixelBackground />
        <Header />
        <Routes>
          <Route path="/" element={
            <main>
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Contact />
            </main>
          } />
          <Route path="/all-projects" element={<AllProjectsPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
