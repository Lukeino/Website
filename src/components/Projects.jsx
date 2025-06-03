/**
 * Projects Component
 * Author: Luca Iantosco
 * Description: Main projects showcase section with featured projects and navigation to detailed archive
 * Date: June 2, 2025
 */

import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { useScrollAnimation, useStaggeredAnimation } from '../hooks/useScrollAnimation'
import { Link } from 'react-router-dom'
import hollowDungeonsImage from '../assets/TheHollowDungeons.jpg'
import careerConnectImage from '../assets/CareerConnect.png'
import portfolioImage from '../assets/Portfolio.png'
import oldPortfolioImage from '../assets/OldPortfolio.png'
import sklearnImage from '../assets/Sklearn.png'
import prototypesGif from '../assets/Prototipi.gif'

function Projects() {
  const { t } = useLanguage()
  const sectionRef = useScrollAnimation();
  const gameDevGridRef = useStaggeredAnimation(150);
  const webAppsGridRef = useStaggeredAnimation(150);
  const researchGridRef = useStaggeredAnimation(150);
  
  // Project categories with data
  const projectCategories = {
    gameDev: [
      {
        id: 3,
        title: t('hollowDungeonsTitle'),
        description: t('hollowDungeonsDesc'),
        technologies: ["Unity", "C#"],        
        link: "#",
        github: "#",
        image: hollowDungeonsImage,
        hideDemoButton: true,
        hideGitHubButton: true,
        showInDevelopment: true
      },      {
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
      }],    webApps: [      {
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
        id: 2,
        title: t('oldPortfolioTitle'),
        description: t('oldPortfolioDesc'),
        technologies: ["HTML", "CSS", "SCSS"],
        link: "#",
        github: "https://github.com/Lukeino/PortfolioWebsite-Legacy-",
        image: oldPortfolioImage,
        hideDemoButton: true
      },      {
        id: 5,
        title: t('careerConnectTitle'),
        description: t('careerConnectDesc'),
        technologies: ["React", "Vite", "CSS", "Strapi"],
        link: "#",
        github: "https://github.com/Lukeino/CareerConnectWebsite",
        image: careerConnectImage,
        hideDemoButton: true
      }
    ],    researchAi: [
      {
        id: 3,
        title: t('sklearnProjectsTitle'),
        description: t('sklearnProjectsDesc'),
        technologies: ["Scikit-Learn", "Python", "Q-Learning"],        link: "#",
        github: "https://github.com/Lukeino/ML-Sklearn-Projects",
        image: sklearnImage,
        disclaimer: t('sklearnProjectsDisclaimer'),
        showDetailsButton: true,
        hideDemoButton: true
      }
      // Temporaneamente nascosto - Neural Network Optimizer
      // {
      //   id: 6,
      //   title: "Neural Network Optimizer",
      //   description: "Sistema di ottimizzazione automatica per reti neurali usando algoritmi genetici",
      //   technologies: ["Python", "PyTorch", "Scikit-learn"],
      //   link: "#",
      //   github: "#"
      // }
    ]  }
  const renderProjectCard = (project) => (
    <div key={project.id} className="project-card pixel-float neon-pulse luca-stagger-item">
      <div className="project-image">
        {project.image ? (
          <img 
            src={project.image} 
            alt={project.title} 
            className="project-img"
          />
        ) : (
          <div className="placeholder-project">
            <span>Project Screenshot</span>
          </div>
        )}
      </div><div className="project-content">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        {project.title === t('hollowDungeonsTitle') && (
          <p className="project-alias-disclaimer">{t('developedByAlias')}</p>
        )}
        {project.disclaimer && (
          <p className="project-alias-disclaimer">{project.disclaimer}</p>
        )}
        <div className="project-technologies">
          {project.technologies.map(tech => (
            <span key={tech} className="tech-tag">{tech}</span>
          ))}
          {project.showInDevelopment && (
            <span className="development-tag">{t('inDevelopment')}</span>
          )}
        </div>        <div className="project-links">
          {!project.hideDemoButton && (
            <a 
              href={project.link} 
              className="btn btn-small btn-primary"
              target="_blank" 
              rel="noopener noreferrer"
            >
              {t('demo')}
            </a>
          )}
          {!project.hideGitHubButton && (
            <a href={project.github} className="btn btn-small btn-outline">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style={{ marginRight: '8px' }}>
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
              </svg>
              {t('github')}
            </a>
          )}          {project.showDetailsButton && (
            <Link 
              to={project.title === t('prototypeGamesTitle') ? "/all-projects#game-prototypes" : "/all-projects#ml-projects"} 
              className="btn btn-small btn-secondary"
            >
              {t('browseProjects')}
            </Link>
          )}
        </div>
      </div>
    </div>  )
    
  return (
    <section id="projects" className="projects-section" ref={sectionRef}>
      <div className="container">
        <h2 className="pixel-text">{t('projectsTitle')}</h2>
        
        {/* Game Development */}
        <div className="project-category">
          <h3 className="category-title">{t('gameDevProjects')}</h3>
          <div className="projects-grid" ref={gameDevGridRef}>
            {projectCategories.gameDev.map(renderProjectCard)}
          </div>
        </div>

        {/* Web Applications */}
        <div className="project-category">
          <h3 className="category-title">{t('webAppProjects')}</h3>
          <div className="projects-grid" ref={webAppsGridRef}>
            {projectCategories.webApps.map(renderProjectCard)}
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

export default Projects
