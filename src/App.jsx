/**
 * App Component
 * Author: Luca Iantosco  
 * Description: Main application component with React Router setup for portfolio navigation
 * Date: June 2, 2025
 */

import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
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

function App() {
  return (
    <Router>
      <div className="App">
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
