import { useRef, useEffect } from 'react';
import { OverlayScrollbars } from 'overlayscrollbars';

export const useOverlayscrollbar = () => {
  const scrollbarRef = useRef(null);

  useEffect(() => {
    let osInstance;
    if (scrollbarRef.current) {
      osInstance = OverlayScrollbars(scrollbarRef.current, {
        /* опції, якщо потрібно */
      });
    }

    return () => {
      if (osInstance) {
        osInstance.destroy();
      }
    };
  }, []);

  return scrollbarRef;
};
