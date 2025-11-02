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
import AllProjectsPage from './components/AllProjectsPage'

// Component to control scroll behavior
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    // Always scroll to top when pathname changes
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

function App() {
  return (
    <Router>
      <div className="App">
        <ScrollToTop />
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