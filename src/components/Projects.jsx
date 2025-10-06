/**
 * Projects Component
 * Author: Luca Iantosco
 * Description: Main projects showcase section with featured projects and navigation to detailed archive
 * Date: January 2025
 */

import React, { useMemo, useCallback } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { useScrollAnimation, useStaggeredAnimation } from '../hooks/useScrollAnimation'
import { Link } from 'react-router-dom'
import kaladBolgChroniclesImage from '../assets/TheKaladbolgChronicles.jpg'
import careerConnectImage from '../assets/CareerConnect.png'
import portfolioImage from '../assets/Portfolio.png'
import sklearnImage from '../assets/Sklearn.png'
import prototypesGif from '../assets/Prototipi.gif'

// Project Card Component (Memoized for performance)
const ProjectCard = React.memo(({ project, t }) => (
  <div className="project-card luca-stagger-item">
    <div className="project-image">
      {project.image ? (
        <img 
          src={project.image} 
          alt={project.title} 
          className="project-img"
          loading="lazy"
          width="350"
          height="200"
        />
      ) : (
        <div className="placeholder-project">
          <span>Project Screenshot</span>
        </div>
      )}
    </div>
    
    <div className="project-content">
      <h3>{project.title}</h3>
      
      {project.title === t('kaladBolgChroniclesTitle') && (
        <div className="development-status">
          <div className="status-indicator" aria-label="In Development"></div>
          <span className="status-text">{t('inDevelopment')}</span>
        </div>
      )}
      
      <p>{project.description}</p>
      
      {project.title === t('kaladBolgChroniclesTitle') && (
        <p className="project-alias-disclaimer">{t('developedByAlias')}</p>
      )}
      
      {project.disclaimer && (
        <p className="project-alias-disclaimer">{project.disclaimer}</p>
      )}
      
      <div className="project-technologies">
        {project.technologies.map(tech => (
          <span key={tech} className="tech-tag">{tech}</span>
        ))}
      </div>
      
      <div className="project-links">
        {!project.hideDemoButton && (
          <a 
            href={project.link} 
            className="btn btn-small btn-primary"
            target="_blank" 
            rel="noopener noreferrer"
            aria-label={`Demo of ${project.title}`}
          >
            {t('demo')}
          </a>
        )}
        
        {project.websiteLink && (
          <a 
            href={project.websiteLink} 
            className="btn btn-small btn-secondary"
            target="_blank" 
            rel="noopener noreferrer"
            aria-label={`Visit ${project.title} website`}
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style={{ marginRight: '8px' }} aria-hidden="true">
              <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-6.5h-2.49A13.65 13.65 0 0 1 12.18 5h2.146c-.365.767-.594 1.61-.656 2.5zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z"/>
            </svg>
            {t('website')}
          </a>
        )}
        
        {!project.hideGitHubButton && (
          <a 
            href={project.github} 
            className="btn btn-small btn-outline"
            target="_blank" 
            rel="noopener noreferrer"
            aria-label={`View ${project.title} on GitHub`}
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style={{ marginRight: '8px' }} aria-hidden="true">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
            </svg>
            {t('github')}
          </a>
        )}
        
        {project.showDetailsButton && (
          <Link 
            to={project.title === t('prototypeGamesTitle') ? "/all-projects#game-prototypes" : "/all-projects#ml-projects"} 
            className="btn btn-small btn-secondary"
          >
            {t('browseProjects')}
          </Link>
        )}
      </div>
    </div>
  </div>
));

ProjectCard.displayName = 'ProjectCard';

function Projects() {
  const { t } = useLanguage()
  const sectionRef = useScrollAnimation();
  const webAppsGridRef = useStaggeredAnimation(150);
  const gameDevGridRef = useStaggeredAnimation(150);
  const researchGridRef = useStaggeredAnimation(150);
  
  // Memoize project data to prevent recalculation on every render
  const projectCategories = useMemo(() => ({
    webApps: [
      {
        id: 1,
        title: t('portfolioSiteTitle'),
        description: t('portfolioSiteDesc'),
        technologies: ["React", "Vite", "CSS"],
        link: "#",
        github: "https://github.com/Lukeino/Website",
        image: portfolioImage,
        hideDemoButton: true
      },
      {
        id: 5,
        title: t('careerConnectTitle'),
        description: t('careerConnectDesc'),
        technologies: ["React", "Vite", "CSS", "SQLite", "Amazon AWS", "Node.js", "Express.js"],
        link: "#",
        github: "https://github.com/Lukeino/CareerConnectWebsite",
        websiteLink: "https://careerconnectproject.netlify.app",
        image: careerConnectImage,
        hideDemoButton: true
      }
    ],
    gameDev: [
      {
        id: 3,
        title: t('kaladBolgChroniclesTitle'),
        description: t('kaladBolgChroniclesDesc'),
        technologies: ["Unity", "C#"],
        link: "#",
        github: null,
        image: kaladBolgChroniclesImage,
        hideDemoButton: true,
        hideGitHubButton: true
      },
      {
        id: 4,
        title: t('prototypeGamesTitle'),
        description: t('prototypeGamesDesc'),
        technologies: ["Construct 3", "Unity", "C#", "Blender"],
        link: "#",
        github: "#",
        image: prototypesGif,
        hideGitHubButton: true,
        showDetailsButton: true,
        hideDemoButton: true
      }
    ],
    researchAi: [
      {
        id: 3,
        title: t('sklearnProjectsTitle'),
        description: t('sklearnProjectsDesc'),
        technologies: ["Scikit-Learn", "Python"],
        link: "#",
        github: "https://github.com/Lukeino/ML-Sklearn-Projects",
        image: sklearnImage,
        disclaimer: t('sklearnProjectsDisclaimer'),
        showDetailsButton: true,
        hideDemoButton: true
      }
    ]
  }), [t]);

  const renderProjectCard = useCallback((project) => (
    <ProjectCard key={project.id} project={project} t={t} />
  ), [t]);
    
  return (
    <section id="projects" className="projects-section" ref={sectionRef}>
      <div className="container">
        <h2 className="pixel-text">{t('projectsTitle')}</h2>

        {/* Web Applications */}
        <div className="project-category">
          <h3 className="category-title">{t('webAppProjects')}</h3>
          <div className="projects-grid" ref={webAppsGridRef}>
            {projectCategories.webApps.map(renderProjectCard)}
          </div>
        </div>

        {/* Game Development */}
        <div className="project-category">
          <h3 className="category-title">{t('gameDevProjects')}</h3>
          <div className="projects-grid" ref={gameDevGridRef}>
            {projectCategories.gameDev.map(renderProjectCard)}
          </div>
        </div>

        {/* Research & AI */}
        <div className="project-category">
          <h3 className="category-title">{t('researchAiProjects')}</h3>
          <div className="projects-grid" ref={researchGridRef}>
            {projectCategories.researchAi.map(renderProjectCard)}
          </div>
        </div>
      </div>
    </section>
  )
}

export default React.memo(Projects)