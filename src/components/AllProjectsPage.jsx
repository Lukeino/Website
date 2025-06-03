/**
 * AllProjectsPage Component
 * Author: Luca Iantosco
 * Description: Detailed projects archive page with game prototypes and ML projects tables
 * Date: June 2, 2025
 */

import React, { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useLocation } from 'react-router-dom';
import { useScrollAnimation, useStaggeredAnimation } from '../hooks/useScrollAnimation';
import Header from './Header';
import '../styles/App.css';

function AllProjectsPage() {
  const { t } = useLanguage();
  const location = useLocation();
  const sectionRef = useScrollAnimation();
  const gameTableRef = useStaggeredAnimation(150);
  const mlTableRef = useStaggeredAnimation(150);

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

  // Project data for tables
  const tableProjects = {
    prototypes: [
      {
        id: 'proto1',
        title: 'Ghost Tower',
        description: 'Videogioco 2D sviluppato in Construct 3 in cui bisogna sopravvivere il più a lungo schivando i fantasmi con il mouse.',
        githubLink: null,
        playLink: null,
        downloadLink: null
      },
      {
        id: 'proto2', 
        title: 'Arcade Fantasy',
        description: 'Prototipo 3D di videogioco sviluppato in Unity. 4 giocatori devono giocare a giochi arcade per guadagnare punti e poi sopravvivere all\'attacco di titani.',
        githubLink: null,
        playLink: null,
        downloadLink: null
      },
      {
        id: 'proto3',
        title: 'Back to Earth - Prologue',
        description: 'Prototipo 3D di walking simulator horror con grafica retro. Scova il mistero che circonda una corporazione diabolica e una spada antica.',
        githubLink: null,
        playLink: null,
        downloadLink: null
      },
      {
        id: 'proto4',
        title: 'VortexCorp Lost Tapes',
        description: 'Prototipo 3D di walking simulator analogue horror con effetti VHS. Vivi le esperienze finali registrate di tre scienziati alla ricerca di antichi manufatti dal potere paranormale.',
        githubLink: null,
        playLink: null,
        downloadLink: 'https://mega.nz/file/DC5FRSQb#K1ghRzG3YO0_tUIjDi6ULX7LoVhvzyBik5lq_u5aekc'
      }
    ],
    sklearn: [
      {
        id: 'ml1',
        title: 'Predizione Prezzo Laptop',
        description: 'Sfruttando il Random Forest e la Regressione Lineare, prevede il prezzo di qualsiasi Laptop inserito, basandosi su un database.',
        githubLink: 'https://github.com/Lukeino/ML-Sklearn-Projects/tree/main/LaptopPricePrediction',
        playLink: null,
        downloadLink: null
      },
      {
        id: 'ml2',
        title: 'Medievalia',
        description: 'Un videogioco testuale scritto in Python che sfrutta la tecnologia Q-Learning per il boss finale.',
        githubLink: 'https://github.com/Lukeino/Medievalia',
        playLink: null,
        downloadLink: null
      }
    ]  };

  const renderTableProjectRow = (project) => (
    <tr key={project.id} className="luca-stagger-item">
      <td data-label="TITOLO PROGETTO" className="project-title">{project.title}</td>
      <td data-label="DESCRIZIONE" className="project-description">{project.description}</td>
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
          {project.playLink ? (
            <a href={project.playLink} className="btn-icon play-btn" target="_blank" rel="noopener noreferrer" title="Play">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
              </svg>
            </a>
          ) : (
            <span className="btn-icon play-btn disabled" title="Non disponibile">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
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

          {/* Game Prototypes Table */}
          <div className="project-category" id="game-prototypes">
            <h3 className="category-title centered-title">{t('gamePrototypes', 'Prototipi di Gioco')}</h3>
            <div className="table-responsive" ref={gameTableRef}>
              <table className="project-table">
                <thead>
                  <tr>
                    <th className="centered-header">TITOLO PROGETTO</th>
                    <th className="centered-header">DESCRIZIONE</th>
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
                    <th className="centered-header">TITOLO PROGETTO</th>
                    <th className="centered-header">DESCRIZIONE</th>
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

export default AllProjectsPage;
