import { useEffect, useState } from 'react';

export const useScreenDetector = () => {
  const [width, setWidth] = useState<number | undefined>(undefined);

  useEffect(() => {
    const handleWindowSizeChange = () => {
      setWidth(window.innerWidth);
    };

    handleWindowSizeChange(); // Set the initial width
    window.addEventListener('resize', handleWindowSizeChange);

    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  const isMobile = width !== undefined && width <= 768;
  const isTablet = width !== undefined && width > 768 && width <= 1024;
  const isDesktop = width !== undefined && width > 1024;

  return { isMobile, isTablet, isDesktop };
};
