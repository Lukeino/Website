/**
 * TypewriterEffect Component
 * Author: Luca Iantosco
 * Description: Animated typewriter effect for cycling through text variations
 * Date: June 2, 2025
 */

import React, { useState, useEffect } from 'react'

function TypewriterEffect({ texts, speed = 100, deleteSpeed = 50, delayBetween = 2000 }) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isWaiting, setIsWaiting] = useState(false)

  useEffect(() => {
    if (isWaiting) {
      const timer = setTimeout(() => {
        setIsWaiting(false)
        setIsDeleting(true)
      }, delayBetween)
      return () => clearTimeout(timer)
    }

    const targetText = texts[currentTextIndex]
    
    if (!isDeleting) {
      // Scrivere il testo
      if (currentText.length < targetText.length) {
        const timer = setTimeout(() => {
          setCurrentText(targetText.slice(0, currentText.length + 1))
        }, speed)
        return () => clearTimeout(timer)
      } else {
        // Testo completato, inizia l'attesa
        setIsWaiting(true)
      }
    } else {
      // Cancellare il testo
      if (currentText.length > 0) {
        const timer = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1))
        }, deleteSpeed)
        return () => clearTimeout(timer)
      } else {
        // Testo cancellato, passa al prossimo
        setIsDeleting(false)
        setCurrentTextIndex((prev) => (prev + 1) % texts.length)
      }
    }
  }, [currentText, currentTextIndex, isDeleting, isWaiting, texts, speed, deleteSpeed, delayBetween])

  return (
    <span className="typewriter-text">
      {currentText}
    </span>
  )
}

export default TypewriterEffect
