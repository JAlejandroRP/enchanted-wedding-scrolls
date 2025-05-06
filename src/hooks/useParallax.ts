
import { useEffect, useState } from 'react';

interface ParallaxOptions {
  speed?: number;
  reverse?: boolean;
  min?: number;
  max?: number;
}

export function useParallax(options: ParallaxOptions = {}) {
  const { speed = 0.15, reverse = false, min = -100, max = 100 } = options;
  const [offset, setOffset] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const newOffset = scrollPosition * speed * (reverse ? -1 : 1);
      // Clamp the value between min and max
      const clampedOffset = Math.max(min, Math.min(max, newOffset));
      setOffset(clampedOffset);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize on mount
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, reverse, min, max]);
  
  return offset;
}
