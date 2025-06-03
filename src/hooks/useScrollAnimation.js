/**
 * Custom hook for scroll-triggered animations
 * Author: Luca Iantosco
 * Description: Provides smooth, professional scroll animations using Intersection Observer
 * Date: June 2, 2025
 */

import { useEffect, useRef } from 'react';

export const useScrollAnimation = (animationType = 'luca-scroll-animate') => {
  const elementRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('luca-animate-in');
          }
        });
      },      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      // Add the base animation class
      currentElement.classList.add(animationType);
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }    };
  }, [animationType]);

  return elementRef;
};

// Hook for staggered animations (for grids of items)
export const useStaggeredAnimation = (delay = 100) => {
  const containerRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.luca-stagger-item');
            items.forEach((item, index) => {
              setTimeout(() => {
                item.classList.add('luca-animate-in');
              }, index * delay);
            });
          }
        });
      },      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    const currentElement = containerRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [delay]);

  return containerRef;
};
