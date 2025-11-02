/**
 * ThemeContext
 * Author: Luca Iantosco
 * Description: React context for dark/light theme management with persistence
 */

import React, { createContext, useContext, useState, useEffect } from 'react'

// Create the context with default value
const ThemeContext = createContext({
  theme: 'dark',
  toggleTheme: () => {}
})

// Theme provider component
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark')
  const [isLoading, setIsLoading] = useState(true)

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark'
    setTheme(savedTheme)
    applyTheme(savedTheme)
    setIsLoading(false)
  }, [])

  // Apply theme to document
  const applyTheme = (themeValue) => {
    const root = document.documentElement
    if (themeValue === 'light') {
      root.setAttribute('data-theme', 'light')
    } else {
      root.setAttribute('data-theme', 'dark')
    }
  }

  // Toggle between themes with position
  const toggleTheme = async (event) => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    
    // Get click position
    const x = event?.clientX ?? window.innerWidth / 2
    const y = event?.clientY ?? window.innerHeight / 2
    
    // Fallback for unsupported browsers
    if (!document.startViewTransition) {
      applyTheme(newTheme)
      localStorage.setItem('theme', newTheme)
      setTheme(newTheme)
      return
    }
    
    // Wait for next frame to ensure DOM is completely stable
    await new Promise(resolve => requestAnimationFrame(() => {
      requestAnimationFrame(resolve)
    }))
    
    // Use View Transition API
    const transition = document.startViewTransition(() => {
      document.documentElement.classList.add('theme-transitioning')
      
      applyTheme(newTheme)
      localStorage.setItem('theme', newTheme)
    })
    
    // Animate with circular reveal from click position
    transition.ready.then(() => {
      const radius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      )
      
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${radius}px at ${x}px ${y}px)`
          ]
        },
        {
          duration: 500,
          easing: 'ease-in-out',
          pseudoElement: '::view-transition-new(root)'
        }
      )
    })
    
    transition.finished.then(() => {
      document.documentElement.classList.remove('theme-transitioning')
      setTheme(newTheme)
    })
  }

  if (isLoading) {
    return <>{children}</>
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// Hook to use the theme context
export function useTheme() {
  const context = useContext(ThemeContext)
  // Removed error check - context has default value
  return context
}
