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
/**/
// import { useState, useMemo, useEffect, useCallback } from 'react';

// const REVIEWS_PER_PAGE = 3;

// export function useReviewsPagination(reviews, camperId) {
//   const [page, setPage] = useState(1);

//   // Безпечне отримання timestamp для дати (createdAt або date)
//   const getTime = dateStr => {
//     if (!dateStr) return 0;
//     const time = new Date(dateStr).getTime();
//     return isNaN(time) ? 0 : time;
//   };

//   // Сортуємо відгуки — новіші зверху (безпечно перевіряємо і createdAt, і date)
//   const sortedReviews = useMemo(() => {
//     if (!Array.isArray(reviews)) return [];
//     return [...reviews].sort((a, b) => {
//       const dateA = getTime(a.createdAt || a.date);
//       const dateB = getTime(b.createdAt || b.date);
//       return dateB - dateA;
//     });
//   }, [reviews]);

//   // Завжди показуємо кількість відгуків відповідно до сторінки
//   const visibleReviews = useMemo(() => {
//     return sortedReviews.slice(0, page * REVIEWS_PER_PAGE);
//   }, [sortedReviews, page]);

//   // Чи є ще відгуки для завантаження
//   const hasMore = visibleReviews.length < sortedReviews.length;

//   const handleLoadMore = () => {
//     setPage(prev => prev + 1);
//   };

//   // Огортаємо в useCallback, щоб resetPagination не перестворювався при кожному рендері
//   const resetPagination = useCallback(() => {
//     setPage(1);
//   }, []);

//   // Скидаємо пагінацію, якщо змінюється camperId
//   useEffect(() => {
//     if (camperId) {
//       resetPagination();
//     }
//   }, [camperId, resetPagination]);

//   return {
//     visibleReviews,
//     hasMore,
//     handleLoadMore,
//     sortedReviews,
//     resetPagination,
//   };
// }
