/**
 * TypewriterEffect Component
 * Author: Luca Iantosco
 * Description: Animated typewriter effect for cycling through text variations
 * Date: January 2025
 */

import React, { useState, useEffect, useRef } from 'react'

function TypewriterEffect({ 
  texts, 
  speed = 100, 
  deleteSpeed = 50, 
  delayBetween = 2000 
}) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isWaiting, setIsWaiting] = useState(false)
  
  // Use ref to prevent memory leaks
  const timeoutRef = useRef(null)

  useEffect(() => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    if (isWaiting) {
      timeoutRef.current = setTimeout(() => {
        setIsWaiting(false)
        setIsDeleting(true)
      }, delayBetween)
      return () => clearTimeout(timeoutRef.current)
    }

    const targetText = texts[currentTextIndex]
    
    if (!isDeleting) {
      // Write the text
      if (currentText.length < targetText.length) {
        timeoutRef.current = setTimeout(() => {
          setCurrentText(targetText.slice(0, currentText.length + 1))
        }, speed)
      } else {
        // Text completed, start waiting
        setIsWaiting(true)
      }
    } else {
      // Delete the text
      if (currentText.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1))
        }, deleteSpeed)
      } else {
        // Text deleted, move to next
        setIsDeleting(false)
        setCurrentTextIndex((prev) => (prev + 1) % texts.length)
      }
    }

    // Cleanup function
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [currentText, currentTextIndex, isDeleting, isWaiting, texts, speed, deleteSpeed, delayBetween])

  return (
    <span className="typewriter-text" aria-live="polite" aria-atomic="true">
      {currentText}
    </span>
  )
}

export default React.memo(TypewriterEffect)