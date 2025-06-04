/**
 * LanguageContext
 * Author: Luca Ianto    aboutDescription1: "Sono Luca Iantosco, uno studente di Informatica e Tecnologie per la Produzione del Software presso l'Università degli Studi di Bari. La mia specializzazione è nello sviluppo di videogiochi, software e applicazioni web.",
    aboutDescription2: "Ho esperienza nello sviluppo full-stack utilizzando tecnologie moderne, programmazione orientata agli oggetti e nella creazione di sistemi interattivi come giochi, strumenti e interfacce utente. Sono anche fortemente interessato verso il mondo del machine learning e intelligenza artificiale.",
    aboutDescription3: "Pubblico i miei lavori nel campo del game development sotto l'alias \"Madspace Interactive\".",
    aboutDescription4: "Credo fermamente che il software migliore nasca dall'equilibrio tra logica e immaginazione: ogni riga di codice è per me un'opportunità per risolvere un problema, raccontare una storia o costruire qualcosa che abbia un impatto reale sulle persone.", * Description: React context for multi-language support with Italian and English translations
 * Date: June 2, 2025
 */

import React, { createContext, useContext, useState, useEffect } from 'react'

// Translation data
const translations = {  it: {
    // Navigation
    home: "Home",
    about: "Chi Sono",
    skills: "Competenze",
    projects: "Progetti",
    contact: "Contatti",
    downloadCV: "Scarica CV",
    
    // Table headers
    title: "Titolo",
    projectName: "Nome Progetto",
    description: "Descrizione", 
    technologies: "Tecnologie",
    link: "Link",
    viewProject: "Visualizza Progetto",
    projectTitle: "TITOLO",
    projectDescription: "DESCRIZIONE",

    // Hero Section
    heroTitle: "Luca Iantosco",
    heroSubtitle: "Software & Game Developer",
    
    heroSubtitleVariants: [
      "Software & Game Developer",
      "Unity Developer",
      "Full-Stack Developer",
      "AI & Machine Learning",
      "Web Developer",
      "Worldbuilder"
    ],    heroDescription: "Creo mondi virtuali.",
    myProjects: "Esplora i Progetti",
    contactMe: "Inizia Collaborazione",    // About Section
    aboutTitle: "Chi Sono",
    aboutDescription1: "Sono Luca Iantosco, uno studente di Informatica e Tecnologie per la Produzione del Software presso l'Università degli Studi di Bari. La mia specializzazione è nello sviluppo di videogiochi, software e applicazioni web.",
    aboutDescription2: "Ho esperienza nello sviluppo full-stack utilizzando tecnologie moderne, programmazione orientata agli oggetti e nella creazione di sistemi interattivi come giochi, strumenti e interfacce utente. Sono anche fortemente interessato al mondo del machine learning e dell'intelligenza artificiale.",
    aboutDescription3: "Pubblico i miei lavori nel campo del game development sotto l’alias “Madspace Interactive”",
    aboutDescription4: "Credo fermamente che il software migliore nasca dall’equilibrio tra logica e immaginazione: ogni riga di codice è per me un’opportunità per risolvere un problema, raccontare una storia o costruire qualcosa che abbia un impatto reale sulle persone.",
    
    // Education Section
    educationTitle: "Educazione",
    degreeTitle: "Laureando in Informatica e<br/>Tecnologie per la Produzione<br/>del Software",
    universityName: "Università degli Studi di Bari Aldo Moro",
    
    skillsTitle: "Le Mie Competenze",    // Skill Categories
    gameEngineCategory: "Game Engine & Strumenti",
    programmingLanguagesCategory: "Linguaggi di Programmazione", 
    webDevelopmentCategory: "Sviluppo Software & Web",
    databaseCategory: "Database",
    securityCategory: "Sicurezza e Analisi",
    aiMlCategory: "AI/ML",    // Projects Section
    projectsTitle: "I Miei Progetti",
    featuredProjects: "Progetti in Evidenza",
    gameDevProjects: "Game Development", 
    webAppProjects: "Applicazioni Web",
    researchAiProjects: "Ricerca e IA",
    gamePrototypes: "Prototipi di Gioco",
    mlProjects: "Progetti ML",
    softwareDevProjects: "Software Development",
    
    // StatsConverter Project
    statsConverterTitle: "StatsConverter",
    statsConverterDesc: "Piccolo software sviluppato usando WPF (Windows Presentation Foundation) che sfrutta la tecnologia Google \"Tesseract OCR\" per convertire i file .jpg/.png in .txt",
      // Featured Project - The Hollow Dungeons
    hollowDungeonsTitle: "The Hollow Dungeons",
    hollowDungeonsDesc: "Un videogioco dark fantasy RPG in 3D che combina atmosfere gotiche con una grafica retro nostalgica.",
    developedByAlias: "Sviluppato sotto l'alias Madspace Interactive",
    inDevelopment: "In Sviluppo",// Featured Project - CareerConnect
    careerConnectTitle: "CareerConnect",
    careerConnectDesc: "Piattaforma innovativa di recruiting e ricerca lavoro sviluppata in team seguendo metodologie agili. Una soluzione moderna per connettere talenti e opportunità professionali.",// Portfolio Site
    portfolioSiteTitle: "Portfolio",
    portfolioSiteDesc: "Questo sito, realizzato per mostrare le mie capacità e i miei progetti!",
    
    // Old Portfolio Site
    oldPortfolioTitle: "Portfolio (vecchia versione)",
    oldPortfolioDesc: "Sviluppato in HTML, CSS e SCSS, rappresenta una vecchia versione del mio sito più statica.",
      projectPortfolio: "Portfolio GameDev",
    projectPortfolioDesc: "Il mio sito portfolio personale per showcasare i miei progetti di game development",
      // Prototype Games
    prototypeGamesTitle: "Prototipi di Gioco",
    prototypeGamesDesc: "Una collezione di prototipi ed esperimenti di game development che rappresentano il mio percorso di apprendimento nel mondo dello sviluppo di videogiochi.",
    
    projectExample: "Gioco 2D Platform",
    projectExampleDesc: "Un platform 2D sviluppato in Unity con meccaniche innovative e pixel art",anotherProject: "Sistema AI per Giochi",
    anotherProjectDesc: "Implementazione di intelligenza artificiale per NPC con machine learning",
    
    // Machine Learning Projects
    sklearnProjectsTitle: "Progetti Machine Learning",
    sklearnProjectsDesc: "Una raccolta di progetti realizzati con varie librerie di Python per l'applicazione del Machine Learning come: predizione, analisi di dati complessi e training.",
    sklearnProjectsDisclaimer: "Include progetti sviluppati per competizioni Kaggle e analisi predittive",
    
    // Medievalia Project
    medievaliaTitle: "Medievalia",
    medievaliaDesc: "Un videogioco testuale scritto in Python che sfrutta la tecnologia Q-Learning per il boss finale.",
    
    // Game Prototypes descriptions
    ghostTowerDesc: "Videogioco 2D sviluppato in Construct 3 in cui bisogna sopravvivere il più a lungo schivando i fantasmi con il mouse.",
    arcadeFantasyDesc: "Prototipo 3D di videogioco sviluppato in Unity. 4 giocatori devono giocare a giochi arcade per guadagnare punti e poi sopravvivere all'attacco di titani.",
    backToEarthDesc: "Prototipo 3D di walking simulator horror con grafica retro. Scova il mistero che circonda una corporazione diabolica e una spada antica.",
    vortexCorpDesc: "Prototipo 3D di walking simulator analogue horror con effetti VHS. Vivi le esperienze finali registrate di tre scienziati alla ricerca di antichi manufatti dal potere paranormale.",
    
    // ML Projects descriptions
    laptopPricePredictionDesc: "Sfruttando il Random Forest e la Regressione Lineare, prevede il prezzo di qualsiasi Laptop inserito, basandosi su un database.",
    
    browseProjects: "Sfoglia i progetti",
    allProjectsTitle: "Archivio Progetti",
      demo: "Demo",
    github: "GitHub",
    
    // Contact Section
    contactTitle: "Contattami",
    contactSubtitle: "Mettiamoci in contatto",
    contactDescription: "Sono sempre interessato a nuove opportunità lavorative e collaborazioni. Non esitare a contattarmi!",
    contactEmail: "lucaiantosco000@gmail.com",
    contactLinkedin: "https://www.linkedin.com/in/lucaiantosco",
    contactGithub: "https://github.com/Lukeino",
    contactInstagram: "https://www.instagram.com/madspace.interactive/",
    instagramAlias: "Instagram (Madspace Interactive)",
    name: "Nome",
    email: "Email",
    message: "Messaggio",
    sendMessage: "Invia Messaggio",
    sending: "Invio in corso...",
    messageSent: "Messaggio inviato con successo!",
    messageError: "Errore nell'invio del messaggio. Riprova.",
    
    // Footer
    allRightsReserved: "Tutti i diritti riservati."
  },  en: {    // Navigation
    home: "Home",
    about: "About",
    skills: "Skills",
    projects: "Projects",
    contact: "Contact",
    downloadCV: "Download CV",
    // Table headers
    title: "Title",
    projectName: "Project Name",
    description: "Description",
    technologies: "Technologies",
    link: "Link",
    viewProject: "View Project",
    projectTitle: "TITLE",
    projectDescription: "DESCRIPTION",// Hero Section
    heroTitle: "Luca Iantosco",
    heroSubtitle: "Software & Game Developer",    heroSubtitleVariants: [
      "Software & Game Developer",
      "Unity Developer",
      "Full-Stack Developer",
      "AI & Machine Learning",
      "Web Developer",
      "Worldbuilder"
    ],    heroDescription: "I create virtual worlds.",
    myProjects: "Explore Projects",
    contactMe: "Start Collaboration",
      // About Section
    aboutTitle: "About Me",
    aboutDescription1: "I'm Luca Iantosco, a Computer Science and Software Production Technologies student at the University of Bari. I specialize in video game development, software, web applications and machine learning/artificial intelligence.",
    aboutDescription2: "I have experience in full-stack development using modern technologies, object-oriented programming and in creating interactive systems such as games, tools and user interfaces. I'm also strongly interested in the world of machine learning and artificial intelligence.",
    aboutDescription3: "I publish my work in game development under the alias \"Madspace Interactive\".",
    aboutDescription4: "I firmly believe that the best software comes from the balance between logic and imagination: every line of code is for me an opportunity to solve a problem, tell a story or build something that has a real impact on people.",
    
    // Education Section
    educationTitle: "Education",
    degreeTitle: "Bachelor's candidate in<br/>Computer Science",
    universityName: "University of Bari Aldo Moro",
    
    skillsTitle: "My Skills",    // Skill Categories
    gameEngineCategory: "Game Engines & Tools",
    programmingLanguagesCategory: "Programming Languages",
    webDevelopmentCategory: "Web & Software Development", 
    databaseCategory: "Database",
    securityCategory: "Security & Analysis",
    aiMlCategory: "AI/ML",    // Projects Section
    projectsTitle: "My Projects",
    featuredProjects: "Featured Projects",
    gameDevProjects: "Game Development",
    webAppProjects: "Web Applications", 
    researchAiProjects: "Research & AI",
    gamePrototypes: "Game Prototypes",
    mlProjects: "ML Projects",
    softwareDevProjects: "Software Development",
    
    // StatsConverter Project
    statsConverterTitle: "StatsConverter",
    statsConverterDesc: "Small software developed using WPF (Windows Presentation Foundation) that leverages Google's \"Tesseract OCR\" technology to convert .jpg/.png files to .txt",
      // Featured Project - The Hollow Dungeons
    hollowDungeonsTitle: "The Hollow Dungeons",
    hollowDungeonsDesc: "A dark fantasy 3D RPG that combines gothic atmospheres with nostalgic retro graphics.",
    developedByAlias: "Developed under the Madspace Interactive alias",
    inDevelopment: "In Development",// Featured Project - CareerConnect
    careerConnectTitle: "CareerConnect",
    careerConnectDesc: "Innovative recruiting and job search platform developed in a team using agile methodologies. A modern solution for connecting talents with professional opportunities.",// Portfolio Site
    portfolioSiteTitle: "Portfolio",
    portfolioSiteDesc: "This website, created to showcase my skills and projects!",
    
    // Old Portfolio Site
    oldPortfolioTitle: "Portfolio (old version)",
    oldPortfolioDesc: "Developed in HTML, CSS and SCSS, it represents an older, more static version of my website.",
      projectPortfolio: "GameDev Portfolio",
    projectPortfolioDesc: "My personal portfolio website to showcase my game development projects",
      // Prototype Games
    prototypeGamesTitle: "Game Prototypes",
    prototypeGamesDesc: "A collection of prototypes and game development experiments representing my learning journey in the world of video game development.",
    
    projectExample: "2D Platform Game",
    projectExampleDesc: "A 2D platform game developed in Unity with innovative mechanics and pixel art",anotherProject: "AI System for Games",
    anotherProjectDesc: "Implementation of artificial intelligence for NPCs with machine learning",
    
    // Machine Learning Projects
    sklearnProjectsTitle: "Machine Learning Projects",
    sklearnProjectsDesc: "A collection of projects developed with various Python libraries for Machine Learning applications such as: prediction, complex data analysis, and training.",
    sklearnProjectsDisclaimer: "Includes projects developed for Kaggle competitions and predictive analytics",
    
    // Medievalia Project
    medievaliaTitle: "Medievalia",
    medievaliaDesc: "A text-based video game written in Python that leverages Q-Learning technology for the final boss.",
    
    // Game Prototypes descriptions
    ghostTowerDesc: "2D video game developed in Construct 3 where you must survive as long as possible by dodging ghosts with the mouse.",
    arcadeFantasyDesc: "3D video game prototype developed in Unity. 4 players must play arcade games to earn points and then survive the attack of titans.",
    backToEarthDesc: "3D prototype of horror walking simulator with retro graphics. Uncover the mystery surrounding a diabolical corporation and an ancient sword.",
    vortexCorpDesc: "3D prototype of analogue horror walking simulator with VHS effects. Experience the final recorded experiences of three scientists searching for ancient artifacts with paranormal power.",
    
    // ML Projects descriptions
    laptopPricePredictionDesc: "Using Random Forest and Linear Regression, it predicts the price of any laptop entered, based on a database.",
    
    browseProjects: "Browse projects",
    allProjectsTitle: "Project Archive",
      demo: "Demo",
    github: "GitHub",
    
    // Contact Section
    contactTitle: "Contact Me",
    contactSubtitle: "Let's get in touch",
    contactDescription: "I'm always interested in new job opportunities and collaborations. Don't hesitate to contact me!",
    contactEmail: "lucaiantosco000@gmail.com",
    contactLinkedin: "https://www.linkedin.com/in/lucaiantosco",
    contactGithub: "https://github.com/Lukeino",
    contactInstagram: "https://www.instagram.com/madspace.interactive/",
    instagramAlias: "Instagram (Madspace Interactive)",
    name: "Name",
    email: "Email",
    message: "Message",
    sendMessage: "Send Message",
    sending: "Sending...",
    messageSent: "Message sent successfully!",
    messageError: "Error sending message. Please try again.",
    
    // Footer
    allRightsReserved: "All rights reserved."
  }
}

// Context
const LanguageContext = createContext()

// Provider
export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('it') // Default italiano

  // Aggiorna l'attributo lang dell'HTML quando cambia la lingua
  useEffect(() => {
    document.documentElement.lang = language
    document.title = language === 'it' ? 'Luca Iantosco - Portfolio' : 'Luca Iantosco - Portfolio'
  }, [language])

  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'it' ? 'en' : 'it')
  }

  const t = (key) => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

// Hook personalizzato
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export default LanguageContext
