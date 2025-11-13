/**
 * HeroPixels Component
 * Author: Luca Iantosco
 * Description: Floating blue pixels animation for Hero section background
 * Date: June 6, 2025
 */

import React, { useState, useEffect } from 'react';

function HeroPixels() {
  // Animation variants
  const animations = ['heroPixelFloat', 'heroPixelFloat2', 'heroPixelFloat3'];
  
  // Use state to avoid rendering issues during hydration
  const [pixels, setPixels] = useState([]);
    // Generate pixels only after component mounts to avoid hydration mismatch
  useEffect(() => {
    // Skip on mobile for better performance
    if (window.innerWidth <= 768) {
      return;
    }
    
    // Generate array of pixels with random properties
    const pixelCount = window.innerWidth <= 1024 ? 5 : 8; // Reduced to avoid will-change memory budget
    
    const generatedPixels = Array.from({ length: pixelCount }, (_, i) => ({    
      id: i,
      size: Math.random() * 3 + 2, // 2px to 5px
      left: Math.random() * 80 + 10, // 10% to 90% (keep away from edges)
      top: Math.random() * 80 + 10, // 10% to 90% (keep away from edges)
      animationDelay: -(Math.random() * 10), // Reduced delay range
      animationDuration: Math.random() * 10 + 10, // 10s to 20s
      opacity: Math.random() * 0.25 + 0.1, // 0.1 to 0.35 (more transparent)
      direction: Math.random() > 0.5 ? 1 : -1, // Random direction
      xMovement: Math.random() * 40 + 20, // 20px to 60px movement (reduced)
      yMovement: Math.random() * 40 + 20, // 20px to 60px movement (reduced)
      animation: animations[Math.floor(Math.random() * animations.length)], // Random animation
    }));
    
    setPixels(generatedPixels);
  }, []);
  return (
    <div className="hero-pixels">
      {pixels.map((pixel) => (
        <div
          key={pixel.id}
          className="hero-pixel"
          style={{
            width: `${pixel.size}px`,
            height: `${pixel.size}px`,
            left: `${pixel.left}%`,
            top: `${pixel.top}%`,
            animationName: pixel.animation,
            animationDelay: `${pixel.animationDelay}s`,
            animationDuration: `${pixel.animationDuration}s`,
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
            animationFillMode: 'both',
            opacity: pixel.opacity,
            '--direction': pixel.direction,
            '--x-movement': `${pixel.xMovement}px`,
            '--y-movement': `${pixel.yMovement}px`,
          }}
        />
      ))}
    </div>
  );
}

export default HeroPixels;
