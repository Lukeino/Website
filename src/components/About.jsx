/**
 * About Component
 * Author: Luca Iantosco
 * Description: Personal introduction section with profile image and bio
 * Date: June 2, 2025
 */

import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import profileImage from '../assets/Picture.png';
import unibaImage from '../assets/Uniba.png';

function About() {
  const { t } = useLanguage();
  const sectionRef = useScrollAnimation();
  
  return (
    <section id="about" className="about-section scanlines" ref={sectionRef}>
      <div className="container">
        <h2 className="pixel-text">{t('aboutTitle')}</h2>
        <div className="about-content">
          <div className="about-image">
            <div className="profile-image">
              <img src={profileImage} alt="Luca Iantosco" />
            </div>
            
            {/* Education Section */}
            <div className="education-section">
              <h3 className="education-title">{t('educationTitle')}</h3>
              <div className="education-content">
                <div className="university-logo">
                  <img src={unibaImage} alt="Università degli Studi di Bari Aldo Moro" />
                </div>
                <div className="education-info">
                  <h4 className="degree-title" dangerouslySetInnerHTML={{ __html: t('degreeTitle') }}></h4>
                  <p className="university-name">{t('universityName')}</p>
                </div>
              </div>
            </div>
          </div>          <div className="about-text">
            <p>
              {t('aboutDescription1')}
            </p>
            <p>
              {t('aboutDescription2')}
            </p>
            <p>
              {t('aboutDescription3')}
            </p>
            <p>
              {t('aboutDescription4')}
            </p>
            <p>
              {t('aboutDescription5')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
