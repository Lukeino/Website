/**
 * Hero Component
 * Author: Luca Iantosco
 * Description: Main landing section with animated typewriter effect for title variations
 * Date: June 2, 2025
 */

import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import TypewriterEffect from './TypewriterEffect'

function Hero() {
  const { t } = useLanguage()

  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-content">
          <h1>
            {t('heroTitle')}
          </h1>
          <h2 className="typewriter-subtitle">
            <TypewriterEffect 
              texts={t('heroSubtitleVariants')}
              speed={100}
              deleteSpeed={50}
              delayBetween={2000}
            />
          </h2>
        </div>
      </div>
      
      {/* Scroll indicator - posizionato al margine della hero section */}
      <div className="scroll-indicator">
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none"
        >
          <path 
            d="M7 10l5 5 5-5" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  )
}

export default Hero
