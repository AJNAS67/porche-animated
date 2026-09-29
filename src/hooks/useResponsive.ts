import { useState, useEffect } from 'react';

export interface ResponsiveInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLargeDesktop: boolean;
  dpr: number;
  width: number;
  height: number;
}

export function useResponsive(): ResponsiveInfo {
  const [state, setState] = useState<ResponsiveInfo>(() => {
    if (typeof window === 'undefined') {
      return {
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        isLargeDesktop: false,
        dpr: 1,
        width: 1920,
        height: 1080,
      };
    }

    const width = window.innerWidth;
    const height = window.innerHeight;
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;
    const isDesktop = width >= 1024;
    const isLargeDesktop = width >= 1440;
    const rawDpr = window.devicePixelRatio || 1;
    // Mobile devices cap DPR to 1.5 to prevent memory/GPU pressure, desktop up to 2
    const dpr = isMobile ? Math.min(rawDpr, 1.5) : Math.min(rawDpr, 2);

    return {
      isMobile,
      isTablet,
      isDesktop,
      isLargeDesktop,
      dpr,
      width,
      height,
    };
  });

  useEffect(() => {
    let timeoutId: number;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const isMobile = width < 768;
        const isTablet = width >= 768 && width < 1024;
        const isDesktop = width >= 1024;
        const isLargeDesktop = width >= 1440;
        const rawDpr = window.devicePixelRatio || 1;
        const dpr = isMobile ? Math.min(rawDpr, 1.5) : Math.min(rawDpr, 2);

        setState({
          isMobile,
          isTablet,
          isDesktop,
          isLargeDesktop,
          dpr,
          width,
          height,
        });
      }, 100);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return state;
}
