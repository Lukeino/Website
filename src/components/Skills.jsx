/**
 * Skills Component
 * Author: Luca Iantosco
 * Description: Technical skills showcase with animated icons and proficiency levels
 * Date: June 2, 2025
 */

import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { 
  SiUnity, 
  SiGodotengine,
  SiJavascript,   SiPython, 
  SiReact, 
  SiNodedotjs,
  SiScikitlearn,
  SiC,
  SiCplusplus,
  SiConstruct3,
  SiMysql,
  SiSqlite,
  SiStrapi,
  SiBlender,
  SiGithub,
  SiGit,
  SiVite,
  SiWireshark,
  SiAudacity,
  SiAngular,
  SiSpringboot,
  SiApachemaven
} from 'react-icons/si';
import { FaBrain, FaJava, FaHtml5, FaJoomla, FaCss3Alt, FaAws } from 'react-icons/fa';
import { TbBrandCSharp } from 'react-icons/tb';
import { GiBroadsword, GiSpikedDragonHead } from 'react-icons/gi';
import { BsWindowStack } from "react-icons/bs";
import { BiLogoNetlify } from "react-icons/bi";
import { SiAdobephotoshop } from "react-icons/si";

function Skills() {
  const { t } = useLanguage();
  const sectionRef = useScrollAnimation();
  
  return (
    <section id="skills" className="skills-section scanlines" ref={sectionRef}>
      <div className="container">
        <h2 className="pixel-text">{t('skillsTitle')}</h2>
        
        <div className="skills">
          {/* Programming Languages */}
          <div className="skill-category">
            <h4 className="category-title">{t('programmingLanguagesCategory')}</h4>
            <div className="skills-grid">
              <div className="skill-item pixel-float">
                <SiC className="skill-icon" />
                <span>C</span>
              </div>
              <div className="skill-item pixel-float">
                <TbBrandCSharp className="skill-icon" />
                <span>C#</span>
              </div>
              <div className="skill-item pixel-float">
                <SiCplusplus className="skill-icon" />
                <span>C++</span>
              </div>
              <div className="skill-item pixel-float">
                <SiPython className="skill-icon" />
                <span>Python</span>
              </div>
              <div className="skill-item pixel-float">
                <FaJava className="skill-icon" />
                <span>Java</span>
              </div>
              <div className="skill-item pixel-float">
                <SiJavascript className="skill-icon" />
                <span>JavaScript</span>
              </div>
            </div>
          </div>

          {/* Web & Software Development */}
          <div className="skill-category">
            <h4 className="category-title">{t('webDevelopmentCategory')}</h4>
            <div className="skills-grid">
              <div className="skill-item pixel-float">
                <FaHtml5 className="skill-icon" />
                <span>HTML5</span>
              </div>
              <div className="skill-item pixel-float">
                <FaCss3Alt className="skill-icon" />
                <span>CSS</span>
              </div>
              <div className="skill-item pixel-float">
                <SiReact className="skill-icon" />
                <span>React</span>
              </div>
              <div className="skill-item pixel-float">
                <SiAngular className="skill-icon" />
                <span>Angular</span>
              </div>
              <div className="skill-item pixel-float">
                <SiNodedotjs className="skill-icon" />
                <span>Node.js</span>
              </div>
              <div className="skill-item pixel-float">
                <SiSpringboot className="skill-icon" />
                <span>Spring Boot</span>
              </div>
              <div className="skill-item pixel-float">
                <SiVite className="skill-icon" />
                <span>Vite</span>
              </div>
              <div className="skill-item pixel-float">
                <SiStrapi className="skill-icon" />
                <span>Strapi</span>
              </div>
              <div className="skill-item pixel-float">
                <FaJoomla className="skill-icon" />
                <span>Joomla!</span>
              </div>
              <div className="skill-item pixel-float">
                <BsWindowStack className="skill-icon" />
                <span>WPF</span>
              </div>
              <div className="skill-item pixel-float">
                <SiGit className="skill-icon" />
                <span>Git</span>
              </div>
              <div className="skill-item pixel-float">
                <SiGithub className="skill-icon" />
                <span>GitHub</span>
              </div>              <div className="skill-item pixel-float">
                <SiApachemaven className="skill-icon" />
                <span>Maven</span>
              </div>
              <div className="skill-item pixel-float">
                <BiLogoNetlify className="skill-icon" />
                <span>Netlify</span>
              </div>
              <div className="skill-item pixel-float">
                <FaAws className="skill-icon" />
                <span>AWS</span>
              </div>
            </div>
          </div>

          {/* DBMS */}
          <div className="skill-category">
            <h4 className="category-title">{t('databaseCategory')}</h4>
            <div className="skills-grid">
              <div className="skill-item pixel-float">
                <SiMysql className="skill-icon" />
                <span>MySQL</span>
              </div>
              <div className="skill-item pixel-float">
                <SiSqlite className="skill-icon" />
                <span>SQLite</span>
              </div>
            </div>
          </div>

          {/* Game Engine & Tools */}
          <div className="skill-category">
            <h4 className="category-title">{t('gameEngineCategory')}</h4>
            <div className="skills-grid">
              <div className="skill-item pixel-float">
                <SiUnity className="skill-icon" />
                <span>Unity</span>
              </div>
              <div className="skill-item pixel-float">
                <SiConstruct3 className="skill-icon" />
                <span>Construct 3</span>
              </div>
              <div className="skill-item pixel-float">
                <SiGodotengine className="skill-icon" />
                <span>Godot</span>
              </div>
              <div className="skill-item pixel-float">
                <GiBroadsword className="skill-icon" />
                <span>RPG Maker MV</span>
              </div>
              <div className="skill-item pixel-float">
                <SiBlender className="skill-icon" />
                <span>Blender</span>
              </div>
              <div className="skill-item pixel-float">
                <SiAudacity className="skill-icon" />
                <span>Audacity</span>
              </div>
              <div className="skill-item pixel-float">
                <SiAdobephotoshop className="skill-icon" />
                <span>Photoshop</span>
              </div>
            </div>
          </div>

          {/* Security & Analysis */}
          <div className="skill-category">
            <h4 className="category-title">{t('securityCategory')}</h4>
            <div className="skills-grid">
              <div className="skill-item pixel-float">
                <GiSpikedDragonHead className="skill-icon" />
                <span>Ghidra</span>
              </div>
              <div className="skill-item pixel-float">
                <SiWireshark className="skill-icon" />
                <span>Wireshark</span>
              </div>
            </div>
          </div>

          {/* AI/ML */}
          <div className="skill-category">
            <h4 className="category-title">{t('aiMlCategory')}</h4>
            <div className="skills-grid">              <div className="skill-item pixel-float">
                <SiScikitlearn className="skill-icon" />
                <span>Scikit Learn</span>
              </div>
              <div className="skill-item pixel-float">
                <FaBrain className="skill-icon" />
                <span>Q-Learning</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
