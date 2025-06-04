/**
 * AllProjectsPage Component
 * Author: Luca Iantosco
 * Description: Detailed projects archive page with game prototypes and ML projects tables
 * Date: June 2, 2025
 */

import React, { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useLocation } from 'react-router-dom';
import { useScrollAnimation, useStaggeredAnimation } from '../hooks/useScrollAnimation';
import Header from './Header';
import '../styles/App.css';

// Import project images - main project images
import prototipiGif from '../assets/Prototipi.gif';
import sklearnPng from '../assets/Sklearn.png';
import careerConnectPng from '../assets/CareerConnect.png';
import portfolioPng from '../assets/Portfolio.png';
import hollowDungeonsPng from '../assets/TheHollowDungeons.jpg';

// Project gallery images configuration - manual setup like GitHub/Download buttons
// All projects disabled for now
const projectGalleries = {
  'Ghost Tower': [], // Disabled
  'Arcade Fantasy': [], // Disabled
  'Medievalia': [], // Disabled
  'StatsConverter': [], // Disabled
  'Predizione Prezzo Laptop': [], // Disabled
  'Back to Earth - Prologue': [], // Disabled
  'VortexCorp Lost Tapes': [] // Disabled
};

function AllProjectsPage() {
  const { t } = useLanguage();
  const location = useLocation();
  const sectionRef = useScrollAnimation();
  const softwareTableRef = useStaggeredAnimation(150);
  const gameTableRef = useStaggeredAnimation(150);
  const mlTableRef = useStaggeredAnimation(150);

  // Gallery state
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Scroll to the correct section when page loads with hash
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [location.hash]);

  // Gallery functions
  const openGallery = (project) => {
    setCurrentProject(project);
    setCurrentImageIndex(0);
    setGalleryOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  };

  const closeGallery = () => {
    setGalleryOpen(false);
    setCurrentProject(null);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'auto'; // Restore scroll
  };

  const nextImage = () => {
    if (currentProject && currentProject.images) {
      setCurrentImageIndex((prev) => 
        prev === currentProject.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (currentProject && currentProject.images) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? currentProject.images.length - 1 : prev - 1
      );
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!galleryOpen) return;
      
      switch (e.key) {
        case 'Escape':
          closeGallery();
          break;
        case 'ArrowLeft':
          prevImage();
          break;
        case 'ArrowRight':
          nextImage();
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [galleryOpen, currentProject]);

  // Project data for tables
  const tableProjects = {
    software: [
      {
        id: 'sw1',
        title: t('statsConverterTitle'),
        description: t('statsConverterDesc'),
        githubLink: 'https://github.com/Lukeino/StatsConverter-0.1.0a',
        playLink: null,
        downloadLink: 'https://mega.nz/file/HK5lkBqL#QNWWsfOOJcmGZ55nSC3U-4en_WDpROoscFrDCaQGJHc',
        images: projectGalleries['StatsConverter'] || []
      }
    ],
    prototypes: [
      {
        id: 'proto1',
        title: 'Ghost Tower',
        description: t('ghostTowerDesc'),
        githubLink: null,
        playLink: null,
        downloadLink: null,
        images: projectGalleries['Ghost Tower'] || []
      },
      {
        id: 'proto2', 
        title: 'Arcade Fantasy',
        description: t('arcadeFantasyDesc'),
        githubLink: null,
        playLink: null,
        downloadLink: null,
        images: projectGalleries['Arcade Fantasy'] || []
      },
      {
        id: 'proto3',
        title: 'Back to Earth - Prologue',
        description: t('backToEarthDesc'),
        githubLink: null,
        playLink: null,
        downloadLink: null,
        images: projectGalleries['Back to Earth - Prologue'] || []
      },
      {
        id: 'proto4',
        title: 'VortexCorp Lost Tapes',
        description: t('vortexCorpDesc'),
        githubLink: null,
        playLink: null,
        downloadLink: 'https://mega.nz/file/DC5FRSQb#K1ghRzG3YO0_tUIjDi6ULX7LoVhvzyBik5lq_u5aekc',
        images: projectGalleries['VortexCorp Lost Tapes'] || []
      }
    ],
    sklearn: [
      {
        id: 'ml1',
        title: 'Predizione Prezzo Laptop',
        description: t('laptopPricePredictionDesc'),
        githubLink: 'https://github.com/Lukeino/ML-Sklearn-Projects/tree/main/LaptopPricePrediction',
        playLink: null,
        downloadLink: null,
        images: projectGalleries['Predizione Prezzo Laptop'] || []
      },
      {
        id: 'ml2',
        title: 'Medievalia',
        description: t('medievaliaDesc'),
        githubLink: 'https://github.com/Lukeino/Medievalia',
        playLink: null,
        downloadLink: null,
        images: projectGalleries['Medievalia'] || []
      }
    ]
  };

  const renderTableProjectRow = (project) => (
    <tr key={project.id} className="luca-stagger-item">
      <td data-label={t('projectTitle')} className="project-title">{project.title}</td>
      <td data-label={t('projectDescription')} className="project-description">{project.description}</td>
      <td data-label="" className="project-actions">
        <div className="action-buttons">
          {project.githubLink ? (
            <a href={project.githubLink} className="btn-icon github-btn" target="_blank" rel="noopener noreferrer" title="GitHub">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
              </svg>
            </a>
          ) : (
            <span className="btn-icon github-btn disabled" title="Non disponibile">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
              </svg>
            </span>
          )}
          {project.images && project.images.length > 0 ? (
            <button 
              onClick={() => openGallery(project)} 
              className="btn-icon image-btn" 
              title={t('viewScreenshots')}
            >
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093L6.52 10.41l-2.105-1.946a.5.5 0 0 0-.676.017L1.002 10.25V3a1 1 0 0 1 1-1h12z"/>
              </svg>
            </button>
          ) : (
            <span className="btn-icon image-btn disabled" title={t('noImagesAvailable')}>
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093L6.52 10.41l-2.105-1.946a.5.5 0 0 0-.676.017L1.002 10.25V3a1 1 0 0 1 1-1h12z"/>
              </svg>
            </span>
          )}
          {project.downloadLink ? (
            <a href={project.downloadLink} className="btn-icon download-btn" target="_blank" rel="noopener noreferrer" title="Download">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
              </svg>
            </a>
          ) : (
            <span className="btn-icon download-btn disabled" title="Non disponibile">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
              </svg>
            </span>
          )}
        </div>
      </td>
    </tr>
  );
  return (
    <>
      <Header />
      <section id="all-projects-page" className="projects luca-scroll-animate" style={{ paddingTop: '100px' }} ref={sectionRef}>
        <div className="container">
          <h2 className="pixel-text">{t('allProjectsTitle')}</h2>

          {/* Software Development Table */}
          <div className="project-category" id="software-development">
            <h3 className="category-title centered-title">{t('softwareDevProjects')}</h3>
            <div className="table-responsive" ref={softwareTableRef}>
              <table className="project-table">
                <thead>
                  <tr>
                    <th className="centered-header">{t('projectTitle')}</th>
                    <th className="centered-header">{t('projectDescription')}</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {tableProjects.software.map(renderTableProjectRow)}
                </tbody>
              </table>
            </div>
          </div>

          {/* Game Prototypes Table */}
          <div className="project-category" id="game-prototypes">
            <h3 className="category-title centered-title">{t('gamePrototypes', 'Prototipi di Gioco')}</h3>
            <div className="table-responsive" ref={gameTableRef}>
              <table className="project-table">
                <thead>
                  <tr>
                    <th className="centered-header">{t('projectTitle')}</th>
                    <th className="centered-header">{t('projectDescription')}</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {tableProjects.prototypes.map(renderTableProjectRow)}
                </tbody>
              </table>
            </div>
          </div>

          {/* Machine Learning Projects Table */}
          <div className="project-category" id="ml-projects">
            <h3 className="category-title centered-title">{t('mlProjects', 'Progetti Machine Learning')}</h3>
            <div className="table-responsive" ref={mlTableRef}>
              <table className="project-table">
                <thead>
                  <tr>
                    <th className="centered-header">{t('projectTitle')}</th>
                    <th className="centered-header">{t('projectDescription')}</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {tableProjects.sklearn.map(renderTableProjectRow)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery Overlay */}
      {galleryOpen && currentProject && (
        <div className="gallery-overlay" onClick={closeGallery}>
          <div className="gallery-container" onClick={(e) => e.stopPropagation()}>
            <button className="gallery-close" onClick={closeGallery}>
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
              </svg>
            </button>
            
            <div className="gallery-header">
              <div className="gallery-title-section">
                <p className="gallery-subtitle">{t('imageGallery')}</p>
                <h3 className="gallery-title">{currentProject.title}</h3>
              </div>
            </div>

            <div className="gallery-content">
              {currentProject.images && currentProject.images.length > 1 && (
                <button className="gallery-nav gallery-prev" onClick={prevImage}>
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                  </svg>
                </button>
              )}

              <div className="gallery-image-container">
                <img 
                  src={currentProject.images?.[currentImageIndex]} 
                  alt={`${currentProject.title} - Screenshot ${currentImageIndex + 1}`}
                  className="gallery-image"
                />
              </div>

              {currentProject.images && currentProject.images.length > 1 && (
                <button className="gallery-nav gallery-next" onClick={nextImage}>
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                  </svg>
                </button>
              )}
            </div>

            {currentProject.images && currentProject.images.length > 1 && (
              <div className="gallery-dots">
                {currentProject.images.map((_, index) => (
                  <button
                    key={index}
                    className={`gallery-dot ${index === currentImageIndex ? 'active' : ''}`}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default AllProjectsPage;
