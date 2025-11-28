import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function AOSInit() {
  useEffect(() => {
    // Ensure we're in the browser
    if (typeof window === 'undefined') return;
    
    try {
      // Check if user prefers reduced motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      // Always initialize AOS
      AOS.init({ 
        duration: prefersReducedMotion ? 0 : 1000, 
        once: true,
      });
      
      // If reduced motion, immediately show all elements
      if (prefersReducedMotion) {
        // Wait a bit for AOS to initialize, then show all elements
        setTimeout(() => {
          const elements = document.querySelectorAll('[data-aos]');
          elements.forEach(el => {
            el.classList.add('aos-animate');
          });
        }, 100);
      }
    } catch (error) {
      console.warn('AOS initialization error:', error);
    }
  }, []);
  return null;
}
