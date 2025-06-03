import React, { useEffect, useRef } from 'react'

function PixelBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    // Imposta le dimensioni del canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Particelle pixel art
    const particles = []
    const particleCount = 50

    // Classe particella
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 4 + 2
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        this.opacity = Math.random() * 0.5 + 0.3
        this.color = this.getRandomColor()
        this.pulse = Math.random() * Math.PI * 2
      }

      getRandomColor() {
        const colors = ['#00d4ff', '#4ecdc4', '#ff6b6b', '#ffffff']
        return colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY
        this.pulse += 0.02

        // Rimbalza sui bordi
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1

        // Mantieni le particelle nell'area visibile
        this.x = Math.max(0, Math.min(canvas.width, this.x))
        this.y = Math.max(0, Math.min(canvas.height, this.y))
      }

      draw() {
        const currentSize = this.size + Math.sin(this.pulse) * 0.5
        const currentOpacity = this.opacity + Math.sin(this.pulse) * 0.1
        
        ctx.globalAlpha = currentOpacity
        ctx.fillStyle = this.color
        
        // Disegna un quadrato pixelato
        ctx.fillRect(
          Math.floor(this.x), 
          Math.floor(this.y), 
          Math.floor(currentSize), 
          Math.floor(currentSize)
        )
        
        // Effetto glow leggero
        ctx.shadowColor = this.color
        ctx.shadowBlur = 10
        ctx.fillRect(
          Math.floor(this.x), 
          Math.floor(this.y), 
          Math.floor(currentSize), 
          Math.floor(currentSize)
        )
        ctx.shadowBlur = 0
      }
    }

    // Inizializza particelle
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Funzione di animazione
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })
      
      requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas)
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
