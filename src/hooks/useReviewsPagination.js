import { useState, useMemo, useCallback } from 'react';

export const useReviewsPagination = (reviews = [], itemsPerPage = 3) => {
  const [page, setPage] = useState(1);

  // 1. Сортуємо відгуки за датою від найновіших до найстаріших
  const sortedReviews = useMemo(() => {
    if (!Array.isArray(reviews)) return [];

    return [...reviews].sort((a, b) => {
      const dateA = new Date(a.createdAt || a.date || 0).getTime();
      const dateB = new Date(b.createdAt || b.date || 0).getTime();
      return dateB - dateA;
    });
  }, [reviews]);

  // 2. Витягуємо видимі відгуки відповідно до поточної сторінки
  const visibleReviews = useMemo(() => {
    return sortedReviews.slice(0, page * itemsPerPage);
  }, [sortedReviews, page, itemsPerPage]);

  const hasMore = visibleReviews.length < sortedReviews.length;

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  // 3. Функція скидання на 1 сторінку при додаванні нового відгуку
  const resetPagination = useCallback(() => {
    setPage(1);
  }, []);

  return {
    visibleReviews,
    hasMore,
    handleLoadMore,
    resetPagination,
  };
};
