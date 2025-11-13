/**
 * useScrollAnimation Hook
 * Author: Luca Iantosco
 * Description: Optimized scroll animation hook with dynamic will-change management
 * Date: January 2025
 * Performance: Manages will-change only when elements are animating
 */

import { useEffect, useRef } from 'react';

/**
 * Hook for simple scroll animations on a single element
 * Applies will-change only during animation, then removes it
 */
export function useScrollAnimation(threshold = 0.1) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check if reduced motion is preferred
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      element.classList.add('luca-animate-in');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Apply will-change just before animation starts
            entry.target.style.willChange = 'transform, opacity';
            
            // Add animation class
            entry.target.classList.add('luca-animate-in');
            
            // Remove will-change after animation completes (800ms max duration)
            setTimeout(() => {
              entry.target.style.willChange = 'auto';
            }, 1000);
            
            // Stop observing once animated
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: threshold,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold]);

  return ref;
}

/**
 * Hook for staggered animations (e.g., lists of items)
 * Manages will-change for multiple child elements
 */
export function useStaggeredAnimation(delayIncrement = 100, threshold = 0.1) {
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    // Check if reduced motion is preferred
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      const items = container.querySelectorAll('.luca-stagger-item');
      items.forEach(item => item.classList.add('luca-animate-in'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.luca-stagger-item');
            
            items.forEach((item, index) => {
              setTimeout(() => {
                // Apply will-change just before animation
                item.style.willChange = 'transform, opacity';
                
                // Add animation class
                item.classList.add('luca-animate-in');
                
                // Remove will-change after animation
                setTimeout(() => {
                  item.style.willChange = 'auto';
                }, 600);
              }, index * delayIncrement);
            });
            
            // Stop observing once all items are animated
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: threshold,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    observer.observe(container);

    return () => {
      if (container) {
        observer.unobserve(container);
      }
    };
  }, [delayIncrement, threshold]);

  return ref;
}

/**
 * Hook for fade-in animations with will-change optimization
 */
export function useFadeInAnimation(threshold = 0.1) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      element.style.opacity = '1';
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.willChange = 'opacity';
            entry.target.style.opacity = '1';
            
            setTimeout(() => {
              entry.target.style.willChange = 'auto';
            }, 800);
            
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: threshold,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold]);

  return ref;
}
