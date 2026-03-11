import { useState, useEffect, useCallback } from 'react';

export function useContainerScrollToTopButton(ref, threshold = 300) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref?.current) return;

    const container = ref.current;

    const onScroll = () => {
      setVisible(container.scrollTop > threshold);
    };

    container.addEventListener('scroll', onScroll);
    onScroll();

    return () => container.removeEventListener('scroll', onScroll);
  }, [ref, threshold]);

  const scrollToTop = useCallback(() => {
    if (ref?.current) {
      ref.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [ref]);

  return { visible, scrollToTop };
}
