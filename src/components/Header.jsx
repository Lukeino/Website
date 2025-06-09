/**
 * Header Component
 * Author: Luca Iantosco
 * Description: Main navigation header with section links, language toggle, and CV download
 * Date: June 2, 2025
 */

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isNavigating, setIsNavigating] = useState(false);
  const [clickedSection, setClickedSection] = useState(null);
  const { language, toggleLanguage, t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Forza la home a essere visualizzata all'inizio e imposta un flag per evitare il salto iniziale
    let initialLoad = true;
    
    // Evidenzia il pulsante "Archivio Progetti" quando siamo sulla pagina AllProjectsPage
    if (location.pathname === '/all-projects') {
      setActiveSection('all-projects');
      return;
    }
    
    // Observer per l'evidenziazione delle sezioni solo sulla home page
    if (location.pathname === '/') {
      // Resetta lo scroll e imposta home come sezione attiva all'inizio
      window.scrollTo(0, 0);
      setActiveSection('home');
      
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const observerOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px', // Ridotto significativamente per evitare salti
        threshold: 0.2 // Aumentato per richiedere che più della sezione sia visibile
      };

      const observerCallback = (entries) => {
        // Ignora aggiornamenti durante la navigazione o al caricamento iniziale
        if (isNavigating || initialLoad) return;
        
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      };

      const observer = new IntersectionObserver(observerCallback, observerOptions);
      
      // Imposta un breve ritardo per permettere alla pagina di stabilizzarsi
      setTimeout(() => {
        initialLoad = false; // Dopo questo momento, l'observer può iniziare a rilevare cambiamenti
        
        sections.forEach((sectionId) => {
          const element = document.getElementById(sectionId);
          if (element) {
            observer.observe(element);
          }
        });
      }, 500);

      return () => {
        sections.forEach((sectionId) => {
          const element = document.getElementById(sectionId);
          if (element) {
            observer.unobserve(element);
          }
        });
      };
    }
  }, [isNavigating, location.pathname]);

  const handleNavClick = (sectionId) => {
    // Torna alla home se siamo su una pagina diversa
    if (location.pathname !== '/') {
      navigate('/');
      // Delay per permettere il caricamento della pagina
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
        setActiveSection(sectionId);
      }, 300);
      return;
    }

    setIsNavigating(true);
    setClickedSection(sectionId);
    setActiveSection(sectionId);
    
    // Scroll verso la sezione
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Reset stato di navigazione
    setTimeout(() => {
      setIsNavigating(false);
      setClickedSection(null);
    }, 1000);
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
            <li>
              <Link 
                to="/all-projects" 
                className={`nav-button archive-projects-btn ${activeSection === 'all-projects' ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('allProjectsTitle')}
              </Link>
            </li>
            <li className="nav-divider">|</li>
            <li><button onClick={() => handleNavClickWithMenuClose('contact')} className={`nav-button ${activeSection === 'contact' ? 'active' : ''}`}>{t('contact')}</button></li>
          </ul>
          
          {/* Mostra le azioni nel menu mobile */}
          <div className="nav-mobile-actions">
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
