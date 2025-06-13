/**
 * LanguageContext
 * Author: Luca Iantosco
 * Description: React context for multi-language support with Italian and English translations
 * Date: June 2, 2025
 */

import React, { createContext, useContext, useState, useEffect } from 'react'

// Translation data
const translations = {
  it: {
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

    // Buttons
    demo: "Demo",
    github: "GitHub",
    website: "Visita Sito",

    // Hero Section
    heroTitle: "Luca Iantosco",
    heroSubtitle: "Software & Game Developer",
    heroSubtitleVariants: [
      "Full-Stack Developer",
      "Game Developer",
    ],
    heroDescription: "Creo mondi virtuali.",
    myProjects: "Esplora i Progetti",
    contactMe: "Contattami",

    // About Section
    aboutTitle: "Chi Sono",
    aboutDescription1: "Sono Luca Iantosco, uno studente di Informatica e Tecnologie per la Produzione del Software presso l'Università degli Studi di Bari Aldo Moro.",
    aboutDescription2: "Attualmente possiedo competenze piuttosto versatili, che spaziano dallo sviluppo di videogiochi al web development, dal machine learning alla cyber security.",
    aboutDescription3: "La maggior parte di queste ultime derivano da progetti come solo dev e dal mio percorso di studi.",
    aboutDescription4: "Nell'ambito del Game Development, pubblico sotto l'alias \"Madspace Interactive\".",
    aboutDescription5: "Credo fermamente che il software migliore nasca dall'equilibrio tra logica ed immaginazione: ogni riga di codice è per me un'opportunità per risolvere un problema, raccontare una storia o costruire qualcosa che abbia un impatto reale sulle persone.",
    
    // Education Section
    educationTitle: "Educazione",
    degreeTitle: "Laureando in Informatica e<br/>Tecnologie per la Produzione<br/>del Software",
    universityName: "Università degli Studi di Bari Aldo Moro",
    
    skillsTitle: "Le Mie Competenze",

    // Skill Categories
    gameEngineCategory: "Game Engine & Strumenti",
    programmingLanguagesCategory: "Linguaggi di Programmazione", 
    webDevelopmentCategory: "Sviluppo Software & Web",
    databaseCategory: "DBMS",
    securityCategory: "Sicurezza e Analisi",
    aiMlCategory: "AI/ML",

    // Projects Section
    projectsTitle: "I Miei Progetti",
    featuredProjects: "Progetti in Evidenza",
    gameDevProjects: "Game Development", 
    webAppProjects: "Applicazioni Web",
    researchAiProjects: "Ricerca e IA",
    gamePrototypes: "Prototipi di Gioco",
    mlProjects: "Progetti ML",
    softwareDevProjects: "Software Development",
    webDevProjects: "Sviluppo Web",
    
    // StatsConverter Project
    statsConverterTitle: "StatsConverter",
    statsConverterDesc: "Piccolo software sviluppato usando WPF (Windows Presentation Foundation) che sfrutta la tecnologia Google \"Tesseract OCR\" per convertire i file .jpg/.png in .txt",

    // Featured Project - The Hollow Dungeons
    hollowDungeonsTitle: "The Hollow Dungeons",
    hollowDungeonsDesc: "Un videogioco dark fantasy RPG in 3D che combina atmosfere gotiche con una grafica retro nostalgica.",
    developedByAlias: "Sviluppato sotto l'alias Madspace Interactive",
    inDevelopment: "In Sviluppo",

    // Featured Project - CareerConnect
    careerConnectTitle: "CareerConnect",
    careerConnectDesc: "Piattaforma di recruiting e ricerca di lavoro sviluppata in un team di 4 persone con metodologia Agile. Realizzata in React+Vite, hosting in Amazon AWS (EC2) e Netlify.",

    // Portfolio Site
    portfolioSiteTitle: "Portfolio",
    portfolioSiteDesc: "Questo sito, realizzato per mostrare le mie capacità e i miei progetti!",
    
    // Old Portfolio Site
    healthboardTitle: "Healthboard",
    healthboardDesc: "Applicazione web sviluppata in React, Vite, CSS e SQLite che permette l'accesso al personale medico per gestire il loro Fascicolo Sanitario Elettronico.",
    
    // Old Portfolio Project
    oldPortfolioTitle: "Portfolio (Vecchia Versione)",
    oldPortfolioDesc: "Una vecchia versione più statica del mio sito web portfolio. Sviluppata con HTML, CSS e SCSS.",

    projectPortfolio: "Portfolio GameDev",
    projectPortfolioDesc: "Il mio sito portfolio personale per showcasare i miei progetti di game development",

    // Prototype Games
    prototypeGamesTitle: "Prototipi di Gioco",
    prototypeGamesDesc: "Una collezione di prototipi ed esperimenti di game development che rappresentano il mio percorso di apprendimento nel mondo dello sviluppo di videogiochi.",
    
    projectExample: "Gioco 2D Platform",
    projectExampleDesc: "Un platform 2D sviluppato in Unity con meccaniche innovative e pixel art",
    anotherProject: "Sistema AI per Giochi",
    anotherProjectDesc: "Implementazione di intelligenza artificiale per NPC con machine learning",
    
    // Machine Learning Projects
    sklearnProjectsTitle: "Progetti Machine Learning",
    sklearnProjectsDesc: "Una raccolta di progetti realizzati con varie librerie di Python per l'applicazione del Machine Learning come: predizione, analisi di dati complessi e training.",
    sklearnProjectsDisclaimer: "Include progetti sviluppati per competizioni Kaggle e analisi predittive",
    
    // Medievalia Project
    medievaliaTitle: "Medievalia",
    medievaliaDesc: "Un videogioco testuale scritto in Python che sfrutta la tecnologia Q-Learning per il boss finale.",
    
    // Game Prototypes descriptions
    ghostTowerDesc: "Videogioco 2D sviluppato in Construct 3. Schiva tutti i nemici utilizzando il mouse, cercando di sopravvivere il più a lungo possibile.",
    backToEarthDesc: "Prototipo di videogioco 3D horror, sviluppato in Unity e C#. Il giocatore deve scoprire i misteri che aleggiano attorno alla VortexCorp ed i suoi whistleblower scomparsi.",
    vortexCorpDesc: "Prototipo di videogioco 3D analog horror, sviluppato in Unity HDRP e C#. Il giocatore seleziona una videocassetta che registra gli ultimi momenti di vita di alcuni scienziati della VortexCorp, in epoche diverse, alla ricerca di antichi frammenti di una spada.",
    
    // ML Projects descriptions
    laptopPricePredictionDesc: "Script in Python che, fornito un dataset di Kaggle, permette di inserire un Laptop con le sue specifiche tecniche e di restituire la previsione di un prezzo (in EUR) e il margine di errore effettuato.",
    
    browseProjects: "Sfoglia i progetti",
    allProjectsTitle: "Archivio Progetti",
    
    // Gallery
    imageGallery: "Galleria Immagini",
    viewScreenshots: "Visualizza Screenshot",
    noImagesAvailable: "Nessuna immagine disponibile",
    closeGallery: "Chiudi Galleria",
    previousImage: "Immagine Precedente", 
    nextImage: "Immagine Successiva",
    
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
  },

  en: {
    // Navigation
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
    projectDescription: "DESCRIPTION",

    // Buttons
    demo: "Demo",
    github: "GitHub",
    website: "Visit Site",

    // Hero Section
    heroTitle: "Luca Iantosco",
    heroSubtitle: "Software & Game Developer",
    heroSubtitleVariants: [
      "Full-Stack Developer",
      "Game Developer",
    ],
    heroDescription: "I create virtual worlds.",
    myProjects: "Explore Projects",
    contactMe: "Contact Me",

    // About Section
    aboutTitle: "About Me",
    aboutDescription1: "I'm Luca Iantosco, a Computer Science and Software Production Technologies student at the University of Bari Aldo Moro.",
    aboutDescription2: "I currently possess quite versatile skills, ranging from video game development to web development, from machine learning to cyber security.",
    aboutDescription3: "Most of my skills derive from solo dev projects and my academic journey.",
    aboutDescription4: "In the Game Development field, I publish under the alias \"Madspace Interactive\".",
    aboutDescription5: "I firmly believe that the best software comes from the balance between logic and imagination: every line of code is for me an opportunity to solve a problem, tell a story or build something that has a real impact on people.",
    
    // Education Section
    educationTitle: "Education",
    degreeTitle: "Bachelor's candidate in<br/>Computer Science",
    universityName: "University of Bari Aldo Moro",
    
    skillsTitle: "My Skills",

    // Skill Categories
    gameEngineCategory: "Game Engines & Tools",
    programmingLanguagesCategory: "Programming Languages",
    webDevelopmentCategory: "Web & Software Development", 
    databaseCategory: "DBMS",
    securityCategory: "Security & Analysis",
    aiMlCategory: "AI/ML",

    // Projects Section
    projectsTitle: "My Projects",
    featuredProjects: "Featured Projects",
    gameDevProjects: "Game Development",
    webAppProjects: "Web Applications", 
    researchAiProjects: "Research & AI",
    gamePrototypes: "Game Prototypes",
    mlProjects: "ML Projects",
    softwareDevProjects: "Software Development",
    webDevProjects: "Web Development",
    
    // StatsConverter Project
    statsConverterTitle: "StatsConverter",
    statsConverterDesc: "Small software developed using WPF (Windows Presentation Foundation) that leverages Google's \"Tesseract OCR\" technology to convert .jpg/.png files to .txt",

    // Featured Project - The Hollow Dungeons
    hollowDungeonsTitle: "The Hollow Dungeons",
    hollowDungeonsDesc: "A dark fantasy 3D RPG that combines gothic atmospheres with nostalgic retro graphics.",
    developedByAlias: "Developed under the Madspace Interactive alias",
    inDevelopment: "In Development",

    // Featured Project - CareerConnect
    careerConnectTitle: "CareerConnect",
    careerConnectDesc: "Recruiting and job search platform developed by a team of 4 people using Agile methodology. Built with React+Vite, hosted on Amazon AWS (EC2) and Netlify.",

    // Portfolio Site
    portfolioSiteTitle: "Portfolio",
    portfolioSiteDesc: "This website, created to showcase my skills and projects!",
    
    // Healthboard Site
    healthboardTitle: "Healthboard",
    healthboardDesc: "Web application developed in React, Vite, CSS and SQLite that allows medical staff to access and manage their Electronic Health Record.",
    
    // Old Portfolio Project
    oldPortfolioTitle: "Portfolio (Old Version)",
    oldPortfolioDesc: "An older, more static version of my portfolio website. Developed with HTML, CSS and SCSS.",

    projectPortfolio: "GameDev Portfolio",
    projectPortfolioDesc: "My personal portfolio website to showcase my game development projects",

    // Prototype Games
    prototypeGamesTitle: "Game Prototypes",
    prototypeGamesDesc: "A collection of prototypes and game development experiments representing my learning journey in the world of video game development.",
    
    projectExample: "2D Platform Game",
    projectExampleDesc: "A 2D platform game developed in Unity with innovative mechanics and pixel art",
    anotherProject: "AI System for Games",
    anotherProjectDesc: "Implementation of artificial intelligence for NPCs with machine learning",
    
    // Machine Learning Projects
    sklearnProjectsTitle: "Machine Learning Projects",
    sklearnProjectsDesc: "A collection of projects developed with various Python libraries for Machine Learning applications such as: prediction, complex data analysis, and training.",
    sklearnProjectsDisclaimer: "Includes projects developed for Kaggle competitions and predictive analytics",
    
    // Medievalia Project
    medievaliaTitle: "Medievalia",
    medievaliaDesc: "A text-based video game written in Python that leverages Q-Learning technology for the final boss.",
    
    // Game Prototypes descriptions
    ghostTowerDesc: "2D video game developed in Construct 3. Dodge all enemies using the mouse, trying to survive as long as possible.",
    backToEarthDesc: "3D horror video game prototype, developed in Unity and C#. The player must discover the mysteries surrounding VortexCorp and its missing whistleblowers.",
    vortexCorpDesc: "3D analog horror video game prototype, developed in Unity HDRP and C#. The player selects a videotape that records the last moments of life of some VortexCorp scientists, in different eras, searching for ancient fragments of a sword.",
    
    // ML Projects descriptions
    laptopPricePredictionDesc: "Python script that, given a Kaggle dataset, allows you to input a laptop with its technical specifications and returns a price prediction (in EUR) and the margin of error achieved.",
    
    browseProjects: "Browse projects",
    allProjectsTitle: "Project Archive",
    
    // Gallery
    imageGallery: "Image Gallery",
    viewScreenshots: "View Screenshots",
    noImagesAvailable: "No images available",
    closeGallery: "Close Gallery",
    previousImage: "Previous Image",
    nextImage: "Next Image",
    
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
