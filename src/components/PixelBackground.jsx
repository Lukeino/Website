/**
 * PixelBackground Component
 * Author: Luca Iantosco
 * Description: Animated pixel matrix background effect using HTML5 Canvas
 * Date: June 2, 2025
 */

import React, { useEffect, useRef } from 'react'

function PixelBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    // Check if user prefers reduced motion or is on mobile
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.innerWidth <= 768
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Adjust particle count based on device
    const particleCount = isMobile ? 15 : 30 // Fewer particles on mobile
    const particles = []

    // Classe particella
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * (isMobile ? 2 : 3) + 1 // Smaller on mobile
        this.speedX = (Math.random() - 0.5) * (isMobile ? 0.2 : 0.3) // Slower on mobile
        this.speedY = (Math.random() - 0.5) * (isMobile ? 0.2 : 0.3)
        this.opacity = Math.random() * (isMobile ? 0.15 : 0.2) + 0.1 // More transparent on mobile
        this.color = this.getRandomColor()
        this.pulse = Math.random() * Math.PI * 2
      }

      getRandomColor() {
        const colors = ['#007acc', '#17a2b8', '#ff6b35', '#6f42c1']
        return colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY
        this.pulse += isMobile ? 0.01 : 0.02 // Slower pulse on mobile

        // Rimbalza sui bordi
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1

        // Mantieni le particelle nell'area visibile
        this.x = Math.max(0, Math.min(canvas.width, this.x))
        this.y = Math.max(0, Math.min(canvas.height, this.y))
      }

      draw() {
        const currentSize = this.size + Math.sin(this.pulse) * 0.3
        const currentOpacity = this.opacity + Math.sin(this.pulse) * 0.05
        
        ctx.globalAlpha = currentOpacity
        ctx.fillStyle = this.color
        
        // Disegna un quadrato pixelato
        ctx.fillRect(
          Math.floor(this.x), 
          Math.floor(this.y), 
          Math.floor(currentSize), 
          Math.floor(currentSize)
        )
        
        // Effetto glow molto leggero (skip on mobile for performance)
        if (!isMobile) {
          ctx.shadowColor = this.color
          ctx.shadowBlur = 5
          ctx.fillRect(
            Math.floor(this.x), 
            Math.floor(this.y), 
            Math.floor(currentSize), 
            Math.floor(currentSize)
          )
          ctx.shadowBlur = 0
        }
      }
    }

    // Skip animation if user prefers reduced motion
    if (prefersReducedMotion) {
      return () => {
        window.removeEventListener('resize', resizeCanvas)
      }
    }

    // Inizializza particelle
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    let animationId

    // Funzione di animazione with performance throttling
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })
      
      // Throttle animation on mobile
      if (isMobile) {
        setTimeout(() => {
          animationId = requestAnimationFrame(animate)
        }, 16) // ~60fps -> ~30fps on mobile
      } else {
        animationId = requestAnimationFrame(animate)
      }
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pixel-background"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none'
      }}
    />
  )
}

export default PixelBackground
