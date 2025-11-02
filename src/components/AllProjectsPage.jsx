/**
 * AllProjectsPage Component
 * Author: Luca Iantosco
 * Description: Detailed projects archive page with thumbnails in tables
 * Date: January 2025
 */

import React, { useEffect, useMemo, useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useLocation } from 'react-router-dom';
import { useScrollAnimation, useStaggeredAnimation } from '../hooks/useScrollAnimation';
import Header from './Header';

// Import project images
import sklearnPng from '../assets/Sklearn.png';
import vortexCorpImage from '../assets/VortexCorpLostTapes.jpg';
import healthboardPng from '../assets/Healthboard.png';
import oldPortfolioImage from '../assets/OldPortfolio.png';

// Project thumbnail images configuration
const projectThumbnails = {
  'Ghost Tower': null,
  'Medievalia': null,
  'StatsConverter': null,
  'Predizione Prezzo Laptop': sklearnPng,
  'VortexCorp Lost Tapes': vortexCorpImage,
  'Healthboard': healthboardPng,
  'Old Portfolio': oldPortfolioImage
};

// Table Row Component (Memoized)
const TableRow = React.memo(({ project, t }) => (
  <tr className="luca-stagger-item">
    <td data-label={t('projectTitle')} className="project-title">{project.title}</td>
    <td data-label={t('projectDescription')} className="project-description">{project.description}</td>
    <td data-label="" className="project-actions">
      <div className="action-buttons">
        {project.githubLink ? (
          <a 
            href={project.githubLink} 
            className="btn-icon github-btn" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label={`View ${project.title} on GitHub`}
          >
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
            </svg>
          </a>
        ) : (
          <span className="btn-icon github-btn disabled" aria-label="GitHub not available">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
            </svg>
          </span>
        )}
        {project.downloadLink ? (
          <a 
            href={project.downloadLink} 
            className="btn-icon download-btn" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label={`Download ${project.title}`}
          >
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
              <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
            </svg>
          </a>
        ) : (
          <span className="btn-icon download-btn disabled" aria-label="Download not available">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
              <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
            </svg>
          </span>
        )}
      </div>
    </td>
  </tr>
));

TableRow.displayName = 'TableRow';

function AllProjectsPage() {
  const { t } = useLanguage();
  const location = useLocation();
  const sectionRef = useScrollAnimation();
  const softwareTableRef = useStaggeredAnimation(150);
  const webdevTableRef = useStaggeredAnimation(150);
  const gameTableRef = useStaggeredAnimation(150);
  const mlTableRef = useStaggeredAnimation(150);

  // Force scroll to top when page loads (only if no hash)
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      });
      
      // Multiple backups to ensure scroll to top
      const timeouts = [
        setTimeout(() => window.scrollTo(0, 0), 10),
        setTimeout(() => window.scrollTo(0, 0), 50),
        setTimeout(() => window.scrollTo(0, 0), 100)
      ];
      
      return () => timeouts.forEach(clearTimeout);
    }
    
    const handleLoad = () => {
      if (!location.hash) {
        window.scrollTo(0, 0);
      }
    };
    window.addEventListener('load', handleLoad);
    
    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, [location.hash]);

  // Scroll to section when hash changes
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
      }
    }
  }, [location.hash]);

  // Memoize project data
  const tableProjects = useMemo(() => ({
    software: [
      {
        id: 'sw1',
        title: t('statsConverterTitle'),
        description: t('statsConverterDesc'),
        githubLink: 'https://github.com/Lukeino/StatsConverter-0.1.0a',
        downloadLink: 'https://mega.nz/file/HK5lkBqL#QNWWsfOOJcmGZ55nSC3U-4en_WDpROoscFrDCaQGJHc',
        thumbnail: projectThumbnails['StatsConverter']
      }
    ],
    webdev: [
      {
        id: 'web1',
        title: t('healthboardTitle'),
        description: t('healthboardDesc'),
        githubLink: 'https://github.com/Lukeino/Healthboard-website',
        thumbnail: projectThumbnails['Healthboard']
      },
      {
        id: 'web2',
        title: t('oldPortfolioTitle'),
        description: t('oldPortfolioDesc'),
        githubLink: 'https://github.com/Lukeino/PortfolioWebsite-Legacy-',
        thumbnail: projectThumbnails['Old Portfolio']
      }
    ],
    prototypes: [
      {
        id: 'proto1',
        title: 'Ghost Tower',
        description: t('ghostTowerDesc'),
        thumbnail: projectThumbnails['Ghost Tower']
      },
      {
        id: 'proto4',
        title: 'The Kaladbolg Chronicles: Lost Tapes',
        description: t('vortexCorpDesc'),
        downloadLink: 'https://mega.nz/file/DC5FRSQb#K1ghRzG3YO0_tUIjDi6ULX7LoVhvzyBik5lq_u5aekc',
        thumbnail: projectThumbnails['VortexCorp Lost Tapes']
      }
    ],
    sklearn: [
      {
        id: 'ml1',
        title: 'Predizione Sklearn: Prezzo Laptop',
        description: t('laptopPricePredictionDesc'),
        githubLink: 'https://github.com/Lukeino/ML-Sklearn-Projects/tree/main/LaptopPricePrediction',
        thumbnail: projectThumbnails['Predizione Prezzo Laptop']
      },
      {
        id: 'ml2',
        title: 'Medievalia',
        description: t('medievaliaDesc'),
        githubLink: 'https://github.com/Lukeino/Medievalia',
        thumbnail: projectThumbnails['Medievalia']
      }
    ]
  }), [t]);

  const renderTableProjectRow = useCallback((project) => (
    <TableRow key={project.id} project={project} t={t} />
  ), [t]);

  return (
    <>
      <Header />
      <section 
        id="all-projects-page" 
        className="projects luca-scroll-animate all-projects-page" 
        style={{ paddingTop: '100px' }} 
        ref={sectionRef}
      >
        <div className="container">
          {/* Software Development Table */}
          <div className="project-category" id="software-development">
            <h3 className="category-title centered-title">{t('softwareDevProjects')}</h3>
            <div className="table-responsive" ref={softwareTableRef}>
              <table className="project-table">
                <thead>
                  <tr>
                    <th className="centered-header">{t('thumbnail')}</th>
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

          {/* Web Development Table */}
          <div className="project-category" id="web-development">
            <h3 className="category-title centered-title">{t('webDevProjects')}</h3>
            <div className="table-responsive" ref={webdevTableRef}>
              <table className="project-table">
                <thead>
                  <tr>
                    <th className="centered-header">{t('thumbnail')}</th>
                    <th className="centered-header">{t('projectTitle')}</th>
                    <th className="centered-header">{t('projectDescription')}</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {tableProjects.webdev.map(renderTableProjectRow)}
                </tbody>
              </table>
            </div>
          </div>

          {/* Game Prototypes Table */}
          <div className="project-category" id="game-prototypes">
            <h3 className="category-title centered-title">{t('gamePrototypes')}</h3>
            <div className="table-responsive" ref={gameTableRef}>
              <table className="project-table">
                <thead>
                  <tr>
                    <th className="centered-header">{t('thumbnail')}</th>
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

          {/* ML Projects Table */}
          <div className="project-category" id="ml-projects">
            <h3 className="category-title centered-title">{t('mlProjects')}</h3>
            <div className="table-responsive" ref={mlTableRef}>
              <table className="project-table">
                <thead>
                  <tr>
                    <th className="centered-header">{t('thumbnail')}</th>
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
    </>
  );
}

export default React.memo(AllProjectsPage);