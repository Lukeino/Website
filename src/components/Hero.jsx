/**
 * Hero Component
 * Author: Luca Iantosco
 * Description: Main landing section with animated typewriter effect for title variations
 * Date: June 2, 2025
 */

import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import TypewriterEffect from './TypewriterEffect'
import HeroPixels from './HeroPixels'

function Hero() {
  const { t } = useLanguage()

  return (
    <section id="home" className="hero scanlines">
      <HeroPixels />
      <div className="container">
        <div className="hero-content">
          <h1 className="pixel-text">
            {t('heroTitle')}
          </h1>
          <h2 className="pixel-text typewriter-subtitle">
            <TypewriterEffect 
              texts={t('heroSubtitleVariants')}
              speed={100}
              deleteSpeed={50}
              delayBetween={2000}
            />
          </h2>
          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary">{t('myProjects')}</a>
            <a href="#contact" className="btn btn-secondary">{t('contactMe')}</a>
          </div>        </div>
      </div>
    </section>
  )
}

export default Hero
