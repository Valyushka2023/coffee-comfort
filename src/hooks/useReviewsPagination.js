import { useState, useMemo, useEffect } from 'react';

const REVIEWS_PER_PAGE = 3;

export function useReviewsPagination(reviews, camperId) {
  const [page, setPage] = useState(1);

  // Сортуємо відгуки — новіші зверху
  const sortedReviews = useMemo(() => {
    if (!reviews) return [];
    return [...reviews].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }, [reviews]);

  // Завжди показуємо кількість відгуків відповідно до сторінки
  const visibleReviews = useMemo(() => {
    return sortedReviews.slice(0, page * REVIEWS_PER_PAGE);
  }, [sortedReviews, page]);

  // Чи є ще відгуки для завантаження
  const hasMore = visibleReviews.length < sortedReviews.length;

  // Завантажити ще 3 відгуки
  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  // Скинути пагінацію, коли, наприклад, перемикається таб або camperId
  const resetPagination = () => {
    setPage(1);
  };

  // Скидаємо пагінацію, якщо змінюється camperId
  useEffect(() => {
    resetPagination();
  }, [camperId]);

  return {
    visibleReviews,
    hasMore,
    handleLoadMore,
    sortedReviews,
    resetPagination,
  };
}
