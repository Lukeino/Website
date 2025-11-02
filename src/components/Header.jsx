/**
 * Header Component
 * Author: Luca Iantosco
 * Description: Main navigation header with section links, language toggle, and theme toggle
 * Date: January 2025
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoSunny, IoMoon } from 'react-icons/io5';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const [displayTheme, setDisplayTheme] = useState('dark');
  const { language, toggleLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Refs to control the observer
  const observerRef = useRef(null);
  const scrollHandlerRef = useRef(null);
  
  useEffect(() => {
    // Sync displayTheme with actual theme on mount
    setDisplayTheme(theme);
  }, [theme]);

  useEffect(() => {
    // Highlight "Archive Projects" button when on AllProjectsPage
    if (location.pathname === '/all-projects') {
      setActiveSection('all-projects');
      return;
    }
    
    // Observer for section highlighting only on homepage
    if (location.pathname === '/') {
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      
      // Function to create and start the observer
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
          // If auto-scrolling, do nothing
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
        
        // Fallback with scroll listener
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
        
        // Setup observer immediately
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
      
      // Function to stop the observer
      const stopObserver = () => {
        if (observerRef.current) {
          observerRef.current.disconnect();
        }
        if (scrollHandlerRef.current) {
          window.removeEventListener('scroll', scrollHandlerRef.current);
        }
      };
      
      // If not auto-scrolling, start the observer
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

  const handleNavClick = useCallback((sectionId) => {
    // Immediately set the section as active
    setActiveSection(sectionId);
    
    // Physically disconnect the observer and listener
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    if (scrollHandlerRef.current) {
      window.removeEventListener('scroll', scrollHandlerRef.current);
    }
    
    // Set flags
    setIsAutoScrolling(true);
    
    // Return to home if on a different page
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          
          // Reactivate observer after delay
          setTimeout(() => {
            setIsAutoScrolling(false);
          }, 2000);
        }
      }, 200);
      return;
    }

    // Scroll to section on homepage
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      
      // Reactivate observer after fixed delay
      setTimeout(() => {
        setIsAutoScrolling(false);
      }, 2000);
    }
  }, [location.pathname, navigate]);

  const handleMenuToggle = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const handleNavClickWithMenuClose = useCallback((sectionId) => {
    handleNavClick(sectionId);
    setIsMenuOpen(false);
  }, [handleNavClick]);

  const handleThemeToggle = useCallback((event) => {
    setDisplayTheme(prev => prev === 'dark' ? 'light' : 'dark');
    toggleTheme(event);
  }, [toggleTheme]);  const handleArchiveClick = useCallback(() => {
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
  }, []);

  return (
    <header className="header">
      <div className="container">
        {/* Separate Archive section on the left */}
        <div className="archive-section">
          <Link 
            to="/all-projects" 
            className={`archive-projects-btn standalone ${activeSection === 'all-projects' ? 'active' : ''}`}
            onClick={handleArchiveClick}
          >
            {t('allProjectsTitle')}
          </Link>
        </div>

        {/* Mobile hamburger menu */}
        <button className="menu-toggle" onClick={handleMenuToggle} aria-label="Toggle menu">
          <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
        
        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <ul>
            <li><button onClick={() => handleNavClickWithMenuClose('home')} className={`nav-button ${activeSection === 'home' ? 'active' : ''}`}>{t('home')}</button></li>
            <li className="nav-divider" aria-hidden="true">|</li>
            <li><button onClick={() => handleNavClickWithMenuClose('about')} className={`nav-button ${activeSection === 'about' ? 'active' : ''}`}>{t('about')}</button></li>
            <li className="nav-divider" aria-hidden="true">|</li>
            <li><button onClick={() => handleNavClickWithMenuClose('skills')} className={`nav-button ${activeSection === 'skills' ? 'active' : ''}`}>{t('skills')}</button></li>
            <li className="nav-divider" aria-hidden="true">|</li>
            <li><button onClick={() => handleNavClickWithMenuClose('projects')} className={`nav-button ${activeSection === 'projects' ? 'active' : ''}`}>{t('projects')}</button></li>
            <li className="nav-divider" aria-hidden="true">|</li>
            <li><button onClick={() => handleNavClickWithMenuClose('contact')} className={`nav-button ${activeSection === 'contact' ? 'active' : ''}`}>{t('contact')}</button></li>
          </ul>
          
          {/* Show actions in mobile menu */}
          <div className="nav-mobile-actions">
            <Link 
              to="/all-projects" 
              className={`archive-projects-btn mobile ${activeSection === 'all-projects' ? 'active' : ''}`}
              onClick={handleArchiveClick}
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
            
            <button 
              className="theme-toggle mobile"
              onClick={(e) => {
                handleThemeToggle(e);
                setIsMenuOpen(false);
              }}
              title={displayTheme === 'dark' ? 'Switch to Light Mode' : 'Passa a Dark Mode'}
            >
              {displayTheme === 'dark' ? <IoSunny size={20} /> : <IoMoon size={20} />}
            </button>
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
          
          <button 
            className="theme-toggle"
            onClick={handleThemeToggle}
            title={displayTheme === 'dark' ? 'Switch to Light Mode' : 'Passa a Dark Mode'}
          >
            {displayTheme === 'dark' ? <IoSunny size={20} /> : <IoMoon size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;