/**
 * Skills Component
 * Author: Luca Iantosco
 * Description: Technical skills showcase with animated icons and proficiency levels
 * Date: January 2025
 */

import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { 
  SiUnity, 
  SiGodotengine,
  SiJavascript,
  SiPython, 
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
  SiApachemaven,
  SiDocker,
  SiAdobephotoshop
} from 'react-icons/si';
import { FaBrain, FaJava, FaHtml5, FaJoomla, FaCss3Alt, FaAws } from 'react-icons/fa';
import { TbBrandCSharp } from 'react-icons/tb';
import { GiBroadsword, GiSpikedDragonHead } from 'react-icons/gi';
import { BsWindowStack } from "react-icons/bs";
import { BiLogoNetlify } from "react-icons/bi";

// Skill item component
const SkillItem = React.memo(({ icon: Icon, name }) => (
  <div className="skill-item">
    <Icon className="skill-icon" aria-hidden="true" />
    <span>{name}</span>
  </div>
));

SkillItem.displayName = 'SkillItem';

function Skills() {
  const { t } = useLanguage();
  const sectionRef = useScrollAnimation();
  
  // Organize skills by category for better maintainability
  const skillCategories = [
    {
      title: t('programmingLanguagesCategory'),
      skills: [
        { icon: SiC, name: 'C' },
        { icon: TbBrandCSharp, name: 'C#' },
        { icon: SiCplusplus, name: 'C++' },
        { icon: SiPython, name: 'Python' },
        { icon: FaJava, name: 'Java' },
        { icon: SiJavascript, name: 'JavaScript' },
      ]
    },
    {
      title: t('webDevelopmentCategory'),
      skills: [
        { icon: FaHtml5, name: 'HTML5' },
        { icon: FaCss3Alt, name: 'CSS' },
        { icon: SiReact, name: 'React' },
        { icon: SiAngular, name: 'Angular' },
        { icon: SiNodedotjs, name: 'Node.js' },
        { icon: SiSpringboot, name: 'Spring Boot' },
        { icon: SiVite, name: 'Vite' },
        { icon: SiStrapi, name: 'Strapi' },
        { icon: FaJoomla, name: 'Joomla!' },
        { icon: BsWindowStack, name: 'WPF' },
        { icon: SiGit, name: 'Git' },
        { icon: SiGithub, name: 'GitHub' },
        { icon: SiApachemaven, name: 'Maven' },
        { icon: BiLogoNetlify, name: 'Netlify' },
        { icon: FaAws, name: 'AWS' },
        { icon: SiDocker, name: 'Docker' },
      ]
    },
    {
      title: t('databaseCategory'),
      skills: [
        { icon: SiMysql, name: 'MySQL' },
        { icon: SiSqlite, name: 'SQLite' },
      ]
    },
    {
      title: t('gameEngineCategory'),
      skills: [
        { icon: SiUnity, name: 'Unity' },
        { icon: SiConstruct3, name: 'Construct 3' },
        { icon: SiGodotengine, name: 'Godot' },
        { icon: GiBroadsword, name: 'RPG Maker MV' },
        { icon: SiBlender, name: 'Blender' },
        { icon: SiAudacity, name: 'Audacity' },
        { icon: SiAdobephotoshop, name: 'Photoshop' },
      ]
    },
    {
      title: t('securityCategory'),
      skills: [
        { icon: GiSpikedDragonHead, name: 'Ghidra' },
        { icon: SiWireshark, name: 'Wireshark' },
      ]
    },
    {
      title: t('aiMlCategory'),
      skills: [
        { icon: SiScikitlearn, name: 'Scikit Learn' },
        { icon: FaBrain, name: 'Q-Learning' },
      ]
    }
  ];
  
  return (
    <section id="skills" className="skills-section scanlines" ref={sectionRef}>
      <div className="container">
        <h2 className="pixel-text">{t('skillsTitle')}</h2>
        
        <div className="skills">
          {skillCategories.map((category, index) => (
            <div className="skill-category" key={index}>
              <h4 className="category-title">{category.title}</h4>
              <div className="skills-grid">
                {category.skills.map((skill, skillIndex) => (
                  <SkillItem 
                    key={skillIndex} 
                    icon={skill.icon} 
                    name={skill.name} 
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default React.memo(Skills);