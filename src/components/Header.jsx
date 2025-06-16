/**
 * Header Component
 * Author: Luca Iantosco
 * Description: Main navigation header with section links, language toggle, and CV download
 * Date: June 2, 2025
 */

import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isNavigating, setIsNavigating] = useState(false);
  const [clickedSection, setClickedSection] = useState(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Riferimenti per controllare l'observer
  const observerRef = useRef(null);
  const scrollHandlerRef = useRef(null);
  
  useEffect(() => {
    // Evidenzia il pulsante "Archivio Progetti" quando siamo sulla pagina AllProjectsPage
    if (location.pathname === '/all-projects') {
      setActiveSection('all-projects');
      return;
    }
    
    // Observer per l'evidenziazione delle sezioni solo sulla home page
    if (location.pathname === '/') {
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      
      // Funzione per creare e avviare l'observer
      const startObserver = () => {
        if (observerRef.current) {
          observerRef.current.disconnect();
        }
        
        const observerOptions = {
          root: null,
          rootMargin: '-10% 0px -10% 0px',
          threshold: [0, 0.1, 0.25, 0.5, 0.75]
        };

        const observerCallback = (entries) => {
          // Se stiamo facendo auto-scroll, non fare nulla
          if (isAutoScrolling) return;
          
          let mostVisibleSection = null;
          let maxVisibility = 0;
          
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > maxVisibility) {
              maxVisibility = entry.intersectionRatio;
              mostVisibleSection = entry.target.id;
            }
          });
          
          if (mostVisibleSection && maxVisibility > 0.1) {
            setActiveSection(mostVisibleSection);
          }
        };

        observerRef.current = new IntersectionObserver(observerCallback, observerOptions);
        
        // Fallback con scroll listener
        const handleScroll = () => {
          if (isAutoScrolling) return;
          
          const scrollPosition = window.scrollY + window.innerHeight / 2;
          let activeId = 'home';
          
          sections.forEach(sectionId => {
            const element = document.getElementById(sectionId);
            if (element) {
              const rect = element.getBoundingClientRect();
              const elementTop = rect.top + window.scrollY;
              const elementBottom = elementTop + rect.height;
              
              if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
                activeId = sectionId;
              }
            }
          });
          
          setActiveSection(activeId);
        };
        
        scrollHandlerRef.current = handleScroll;
        
        // Setup observer immediately instead of delayed
        if (!isAutoScrolling) {
          sections.forEach((sectionId) => {
            const element = document.getElementById(sectionId);
            if (element && observerRef.current) {
              observerRef.current.observe(element);
            }
          });
          
          window.addEventListener('scroll', scrollHandlerRef.current, { passive: true });
        }
      };
      
      // Funzione per fermare l'observer
      const stopObserver = () => {
        if (observerRef.current) {
          observerRef.current.disconnect();
        }
        if (scrollHandlerRef.current) {
          window.removeEventListener('scroll', scrollHandlerRef.current);
        }
      };
      
      // Se non stiamo facendo auto-scroll, avvia l'observer
      if (!isAutoScrolling) {
        startObserver();
      } else {
        stopObserver();
      }

      return () => {
        stopObserver();
      };
    }
  }, [isAutoScrolling, location.pathname]);

  const handleNavClick = (sectionId) => {
    // Imposta immediatamente la sezione come attiva
    setActiveSection(sectionId);
    
    // DISCONNETTI FISICAMENTE l'observer e il listener
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    if (scrollHandlerRef.current) {
      window.removeEventListener('scroll', scrollHandlerRef.current);
    }
    
    // Imposta i flag
    setIsNavigating(true);
    setClickedSection(sectionId);
    setIsAutoScrolling(true);
    
    // Torna alla home se siamo su una pagina diversa
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          
          // Riattiva l'observer dopo un delay
          setTimeout(() => {
            setIsNavigating(false);
            setClickedSection(null);
            setIsAutoScrolling(false); // Questo ricreerà l'observer tramite useEffect
          }, 2000);
        }
      }, 200);
      return;
    }

    // Scroll verso la sezione sulla home page
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      
      // Riattiva l'observer dopo un delay fisso
      setTimeout(() => {
        setIsNavigating(false);
        setClickedSection(null);
        setIsAutoScrolling(false); // Questo ricreerà l'observer tramite useEffect
      }, 2000);
    }
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClickWithMenuClose = (sectionId) => {
    handleNavClick(sectionId);
    setIsMenuOpen(false); // Chiude il menu dopo il click
  };

  return (
    <header className="header">
      <div className="container">
        {/* Pulsante Archivio separato a sinistra */}
        <div className="archive-section">
          <Link 
            to="/all-projects" 
            className={`archive-projects-btn standalone ${activeSection === 'all-projects' ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style={{ marginRight: '6px' }}>
              <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1V2zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5H2zm13-3H1v2h14V2zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
            </svg>
            {t('allProjectsTitle')}
          </Link>
        </div>

        {/* Menu mobile hamburger */}
        <button className="menu-toggle" onClick={handleMenuToggle}>
          <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
        
        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <ul>
            <li><button onClick={() => handleNavClickWithMenuClose('home')} className={`nav-button ${activeSection === 'home' ? 'active' : ''}`}>{t('home')}</button></li>
            <li className="nav-divider">|</li>
            <li><button onClick={() => handleNavClickWithMenuClose('about')} className={`nav-button ${activeSection === 'about' ? 'active' : ''}`}>{t('about')}</button></li>
            <li className="nav-divider">|</li>
            <li><button onClick={() => handleNavClickWithMenuClose('skills')} className={`nav-button ${activeSection === 'skills' ? 'active' : ''}`}>{t('skills')}</button></li>
            <li className="nav-divider">|</li>
            <li><button onClick={() => handleNavClickWithMenuClose('projects')} className={`nav-button ${activeSection === 'projects' ? 'active' : ''}`}>{t('projects')}</button></li>
            <li className="nav-divider">|</li>
            <li><button onClick={() => handleNavClickWithMenuClose('contact')} className={`nav-button ${activeSection === 'contact' ? 'active' : ''}`}>{t('contact')}</button></li>
          </ul>
          
          {/* Mostra le azioni nel menu mobile */}
          <div className="nav-mobile-actions">
            <Link 
              to="/all-projects" 
              className={`archive-projects-btn mobile ${activeSection === 'all-projects' ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style={{ marginRight: '6px' }}>
                <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1V2zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5H2zm13-3H1v2h14V2zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
              </svg>
              {t('allProjectsTitle')}
            </Link>
            
            <button 
              className="language-toggle mobile"
              onClick={() => {
                toggleLanguage();
                setIsMenuOpen(false);
              }}
              title={language === 'it' ? 'Switch to English' : 'Passa all\'Italiano'}
            >
              {language === 'it' ? 'IT' : 'EN'}
            </button>
            
            <a 
              href="/CV.pdf" 
              download="Luca_Iantosco_CV.pdf"
              className="cv-download-btn mobile"
              title={t('downloadCV')}
              onClick={() => setIsMenuOpen(false)}
            >
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
              </svg>
              CV
            </a>
          </div>
        </nav>
        
        <div className="header-actions desktop-only">
          <button 
            className="language-toggle"
            onClick={toggleLanguage}
            title={language === 'it' ? 'Switch to English' : 'Passa all\'Italiano'}
          >
            {language === 'it' ? 'IT' : 'EN'}
          </button>
          
          <a 
            href="/CV.pdf" 
            download="Luca_Iantosco_CV.pdf"
            className="cv-download-btn"
            title={t('downloadCV')}
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
              <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
            </svg>
            CV
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
