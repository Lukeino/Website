/**
 * Skills Component
 * Author: Luca Iantosco
 * Description: Technical skills showcase with animated icons and proficiency levels
 * Date: June 2, 2025
 */

import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useScrollAnimation, useStaggeredAnimation } from '../hooks/useScrollAnimation';
import { 
  SiUnity, 
  SiGodotengine,
  SiJavascript, 
  SiPython, 
  SiReact, 
  SiNodedotjs,
  SiScikitlearn,
  SiPytorch,
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
  SiAudacity
} from 'react-icons/si';
import { FaBrain, FaJava, FaHtml5, FaJoomla, FaCss3Alt } from 'react-icons/fa';
import { TbBrandCSharp } from 'react-icons/tb';
import { GiBroadsword, GiSpikedDragonHead } from 'react-icons/gi';
import { BsWindowStack } from "react-icons/bs";
import { BiLogoNetlify } from "react-icons/bi";
import { SiAdobephotoshop } from "react-icons/si";

function Skills() {
  const { t } = useLanguage();
  const sectionRef = useScrollAnimation();
  const gameEngineGridRef = useStaggeredAnimation(100);
  const programmingGridRef = useStaggeredAnimation(100);
  const webDevGridRef = useStaggeredAnimation(100);
  const databaseGridRef = useStaggeredAnimation(100);
  const securityGridRef = useStaggeredAnimation(100);
  const aiMlGridRef = useStaggeredAnimation(100);
  
  return (
    <section id="skills" className="skills-section scanlines" ref={sectionRef}>
      <div className="container">
        <h2 className="pixel-text">{t('skillsTitle')}</h2>
        
        <div className="skills">
          {/* Programming Languages */}
          <div className="skill-category">
            <h4 className="category-title">{t('programmingLanguagesCategory')}</h4>
            <div className="skills-grid" ref={programmingGridRef}>
              <div className="skill-item pixel-float luca-stagger-item">
                <SiC className="skill-icon" />
                <span>C</span>
              </div>
              <div className="skill-item pixel-float luca-stagger-item">
                <TbBrandCSharp className="skill-icon" />
                <span>C#</span>
              </div>
              <div className="skill-item pixel-float luca-stagger-item">
                <SiCplusplus className="skill-icon" />
                <span>C++</span>
              </div>
              <div className="skill-item pixel-float luca-stagger-item">
                <SiPython className="skill-icon" />
                <span>Python</span>
              </div>
              <div className="skill-item pixel-float luca-stagger-item">
                <FaJava className="skill-icon" />
                <span>Java</span>
              </div>
              <div className="skill-item pixel-float luca-stagger-item">
                <SiJavascript className="skill-icon" />
                <span>JavaScript</span>
              </div>
            </div>
          </div>

          {/* Web & Software Development */}
          <div className="skill-category">
            <h4 className="category-title">{t('webDevelopmentCategory')}</h4>
            <div className="skills-grid" ref={webDevGridRef}>
              <div className="skill-item pixel-float luca-stagger-item">
                <FaHtml5 className="skill-icon" />
                <span>HTML5</span>
              </div>
              <div className="skill-item pixel-float luca-stagger-item">
                <FaCss3Alt className="skill-icon" />
                <span>CSS</span>
              </div>
              <div className="skill-item pixel-float luca-stagger-item">
                <SiReact className="skill-icon" />
                <span>React</span>
              </div>
              <div className="skill-item pixel-float luca-stagger-item">
                <SiNodedotjs className="skill-icon" />
                <span>Node.js</span>
              </div>
              <div className="skill-item pixel-float luca-stagger-item">
                <SiVite className="skill-icon" />
                <span>Vite</span>
              </div>
              <div className="skill-item pixel-float luca-stagger-item">
                <SiStrapi className="skill-icon" />
                <span>Strapi</span>
              </div>
              <div className="skill-item pixel-float luca-stagger-item">
                <FaJoomla className="skill-icon" />
                <span>Joomla!</span>
              </div>
              <div className="skill-item pixel-float luca-stagger-item">
                <BsWindowStack className="skill-icon" />
                <span>WPF</span>
              </div>
              <div className="skill-item pixel-float luca-stagger-item">
                <SiGit className="skill-icon" />
                <span>Git</span>
              </div>
              <div className="skill-item pixel-float luca-stagger-item">
                <SiGithub className="skill-icon" />
                <span>GitHub</span>
              </div>
              <div className="skill-item pixel-float luca-stagger-item">
                <BiLogoNetlify className="skill-icon" />
                <span>Netlify</span>
              </div>
            </div>
          </div>

          {/* DBMS */}
          <div className="skill-category">
            <h4 className="category-title">{t('databaseCategory')}</h4>
            <div className="skills-grid" ref={databaseGridRef}>
              <div className="skill-item pixel-float luca-stagger-item">
                <SiMysql className="skill-icon" />
                <span>MySQL</span>
              </div>
              <div className="skill-item pixel-float luca-stagger-item">
                <SiSqlite className="skill-icon" />
                <span>SQLite</span>
              </div>
            </div>
          </div>

          {/* Game Engine & Tools */}
          <div className="skill-category">
            <h4 className="category-title">{t('gameEngineCategory')}</h4>
            <div className="skills-grid" ref={gameEngineGridRef}>
              <div className="skill-item pixel-float luca-stagger-item">
                <SiUnity className="skill-icon" />
                <span>Unity</span>
              </div>
              <div className="skill-item pixel-float luca-stagger-item">
                <SiConstruct3 className="skill-icon" />
                <span>Construct 3</span>
              </div>
              <div className="skill-item pixel-float luca-stagger-item">
                <SiGodotengine className="skill-icon" />
                <span>Godot</span>
              </div>
              <div className="skill-item pixel-float luca-stagger-item">
                <GiBroadsword className="skill-icon" />
                <span>RPG Maker MV</span>
              </div>
              <div className="skill-item pixel-float luca-stagger-item">
                <SiBlender className="skill-icon" />
                <span>Blender</span>
              </div>
              <div className="skill-item pixel-float luca-stagger-item">
                <SiAudacity className="skill-icon" />
                <span>Audacity</span>
              </div>
              <div className="skill-item pixel-float luca-stagger-item">
                <SiAdobephotoshop className="skill-icon" />
                <span>Photoshop</span>
              </div>
            </div>
          </div>

          {/* Security & Analysis */}
          <div className="skill-category">
            <h4 className="category-title">{t('securityCategory')}</h4>
            <div className="skills-grid" ref={securityGridRef}>
              <div className="skill-item pixel-float luca-stagger-item">
                <GiSpikedDragonHead className="skill-icon" />
                <span>Ghidra</span>
              </div>
              <div className="skill-item pixel-float luca-stagger-item">
                <SiWireshark className="skill-icon" />
                <span>Wireshark</span>
              </div>
            </div>
          </div>

          {/* AI/ML */}
          <div className="skill-category">
            <h4 className="category-title">{t('aiMlCategory')}</h4>
            <div className="skills-grid" ref={aiMlGridRef}>
              <div className="skill-item pixel-float luca-stagger-item">
                <SiScikitlearn className="skill-icon" />
                <span>Scikit Learn</span>
              </div>
              <div className="skill-item pixel-float luca-stagger-item">
                <SiPytorch className="skill-icon" />
                <span>PyTorch</span>
              </div>
              <div className="skill-item pixel-float luca-stagger-item">
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
