import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import StarRating from '../StarRating/StarRating.jsx';
import Button from '../Ui/Buttons/BaseButton/Button.jsx';
import CardReview from '../Ui/Cards/CardReview/CardReview.jsx';
import { fetchReviewsRequest } from '../../services/api.js';
import css from './Reviews.module.css';

const Reviews = ({ refreshTrigger }) => {
  const { t, i18n } = useTranslation('reviews');
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(3);

  const currentLang = i18n.language || 'uk';

  useEffect(() => {
    const loadReviews = async () => {
      setIsLoading(true);
      try {
        const data = await fetchReviewsRequest();
        const sortedData = data.sort(
          (a, b) =>
            new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date)
        );
        setReviews(sortedData);
      } catch (err) {
        console.error('Помилка завантаження відгуків:', err);
      } finally {
        setIsLoading(false);
      }
    };
    loadReviews();
  }, [refreshTrigger]);

  const averageRating = useMemo(() => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((acc, rev) => acc + rev.rating, 0);
    return (total / reviews.length).toFixed(1);
  }, [reviews]);

  const formatDate = dateString => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString(currentLang === 'uk' ? 'uk-UA' : 'en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <section id="reviews" className={css['reviews-section']}>
      <div className={`${css['bean']} ${css['coffee-bean4']}`}></div>
      <div className={`${css['bean']} ${css['coffee-bean5']}`}></div>

      <div className={css['reviews-container']}>
        <header className={css['reviews-header-wrapper']}>
          <h2 className={css['reviews-title']}>
            {t('title', 'What Customers Say')}
          </h2>
          <div className={`${css.bean} ${css['coffee-bean1']}`}></div>
          <div className={`${css.bean} ${css['coffee-bean2']}`}></div>
          <div className={`${css.bean} ${css['coffee-bean3']}`}></div>
        </header>

        {isLoading ? (
          /* --- СКЕЛЕТОНИ ПІД ЧАС ЗАВАНТАЖЕННЯ --- */
          <div className={css['reviews-items-grid']}>
            {[...Array(3)].map((_, index) => (
              <div key={index} className={css['skeleton-review-card']}>
                <div className={css['skeleton-header']}></div>
                <div className={css['skeleton-line']}></div>
                <div className={css['skeleton-line-short']}></div>
                <div className={css['skeleton-shimmer']}></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {reviews.length > 0 && (
              <div className={css['average-rating-block']}>
                <span className={css['rating-big-number']}>
                  {averageRating}
                </span>
                <div className={css['rating-stars-wrapper']}>
                  <StarRating
                    value={Number(averageRating)}
                    readOnly={true}
                    size={28}
                  />
                </div>
                <span className={css['rating-count-label']}>
                  {t('reviews_count', { count: reviews.length })}
                </span>
              </div>
            )}

            <div className={css['title-divider']}>
              <div className={css['line']}></div>
              <div className={css['ornament']}>
                <svg width="80" height="40" viewBox="0 0 100 50">
                  <path
                    d="M10 25C30 5 70 45 90 25M10 25C30 45 70 5 90 25"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <circle cx="50" cy="25" r="3" fill="currentColor" />
                </svg>
              </div>
              <div className={css['line']}></div>
            </div>

            <div className={css['reviews-items-grid']}>
              {reviews.length > 0 ? (
                reviews
                  .slice(0, visibleCount)
                  .map(rev => (
                    <CardReview
                      key={rev._id}
                      review={rev}
                      currentLang={currentLang}
                      formatDate={formatDate}
                    />
                  ))
              ) : (
                <div className={css['no-data']}>
                  {t('no_reviews', 'Відгуків поки немає')}
                </div>
              )}
            </div>

            <div className={css['more-btn-container']}>
              {visibleCount < reviews.length && (
                <Button
                  variant="primary"
                  isFixedWidth={true}
                  onClick={() => setVisibleCount(prev => prev + 3)}
                >
                  {t('show_more', 'ПОКАЗАТИ ЩЕ')}
                </Button>
              )}
              {visibleCount > 3 && (
                <Button
                  variant="primary"
                  isFixedWidth={true}
                  onClick={() => {
                    setVisibleCount(3);
                    document
                      .getElementById('reviews')
                      ?.querySelector('h2')
                      ?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {t('show_less', 'ЗГОРНУТИ')}
                </Button>
              )}
            </div>

            <div className={css['reviews-external']}>
              <p className={css['external-text']}>{t('google_cta')}</p>
              <Button
                variant="primary"
                isFixedWidth={true}
                onClick={() =>
                  window.open('https://www.google.com/maps', '_blank')
                }
              >
                {t('read_on_google', 'Читати в Google')}
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

Reviews.propTypes = {
  refreshTrigger: PropTypes.number.isRequired,
};

export default Reviews;
// import { useState, useEffect, useMemo } from 'react';
// import { useTranslation } from 'react-i18next';
// import PropTypes from 'prop-types';
// import StarRating from '../StarRating/StarRating.jsx';
// import Button from '../Ui/Buttons/BaseButton/Button.jsx';
// import CardReview from '../Ui/Cards/CardReview/CardReview.jsx';
// import Loader from '../Ui/Loader/Loader.jsx'; // Додано імпорт лоадера
// import { fetchReviewsRequest } from '../../services/api.js';
// import css from './Reviews.module.css';

// const Reviews = ({ refreshTrigger }) => {
//   const { t, i18n } = useTranslation('reviews');
//   const [reviews, setReviews] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [visibleCount, setVisibleCount] = useState(3);

//   const currentLang = i18n.language || 'uk';

//   useEffect(() => {
//     const loadReviews = async () => {
//       setIsLoading(true); // Включаємо лоадер при кожному оновленні (refreshTrigger)
//       try {
//         const data = await fetchReviewsRequest();
//         // Сортуємо: найновіші зверху
//         const sortedData = data.sort(
//           (a, b) =>
//             new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date)
//         );
//         setReviews(sortedData);
//       } catch (err) {
//         console.error('Помилка завантаження відгуків:', err);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     loadReviews();
//   }, [refreshTrigger]);

//   // --- РОЗРАХУНОК СЕРЕДНЬОГО РЕЙТИНГУ ---
//   const averageRating = useMemo(() => {
//     if (reviews.length === 0) return 0;
//     const total = reviews.reduce((acc, rev) => acc + rev.rating, 0);
//     return (total / reviews.length).toFixed(1);
//   }, [reviews]);

//   // Функція форматування дати
//   const formatDate = dateString => {
//     if (!dateString) return '';
//     const date = new Date(dateString);
//     return date.toLocaleDateString(currentLang === 'uk' ? 'uk-UA' : 'en-US', {
//       day: '2-digit',
//       month: '2-digit',
//       year: 'numeric',
//     });
//   };

//   return (
//     <section id="reviews" className={css['reviews-section']}>
//       {/* Декоративні зерна завжди видимі */}
//       <div className={`${css['bean']} ${css['coffee-bean4']}`}></div>
//       <div className={`${css['bean']} ${css['coffee-bean5']}`}></div>

//       <div className={css['reviews-container']}>
//         <header className={css['reviews-header-wrapper']}>
//           <h2 className={css['reviews-title']}>
//             {t('title', 'What Customers Say')}
//           </h2>
//           <div className={`${css.bean} ${css['coffee-bean1']}`}></div>
//           <div className={`${css.bean} ${css['coffee-bean2']}`}></div>
//           <div className={`${css.bean} ${css['coffee-bean3']}`}></div>
//         </header>

//         {/* Логіка відображення контенту */}
//         {isLoading ? (
//           /* Показуємо лоадер, поки дані вантажаться */
//           <div
//             style={{ padding: '4rem 0', textAlign: 'center', width: '100%' }}
//           >
//             <Loader type="container" color="#6f4e37" size={60} />
//             <p style={{ marginTop: '1rem', color: '#6f4e37' }}>
//               {t('loading', 'Завантаження...')}
//             </p>
//           </div>
//         ) : (
//           <>
//             {/* Блок середнього рейтингу */}
//             {reviews.length > 0 && (
//               <div className={css['average-rating-block']}>
//                 <span className={css['rating-big-number']}>
//                   {averageRating}
//                 </span>
//                 <div className={css['rating-stars-wrapper']}>
//                   <StarRating
//                     value={Number(averageRating)}
//                     readOnly={true}
//                     size={28}
//                   />
//                 </div>
//                 <span className={css['rating-count-label']}>
//                   {reviews.length} {t('reviews_count', 'відгук(ів)')}
//                 </span>
//               </div>
//             )}

//             <div className={css['title-divider']}>
//               <div className={css['line']}></div>
//               <div className={css['ornament']}>
//                 <svg width="80" height="40" viewBox="0 0 100 50">
//                   <path
//                     d="M10 25C30 5 70 45 90 25M10 25C30 45 70 5 90 25"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     fill="none"
//                     strokeLinecap="round"
//                   />
//                   <circle cx="50" cy="25" r="3" fill="currentColor" />
//                 </svg>
//               </div>
//               <div className={css['line']}></div>
//             </div>

//             {/* Сітка з картками відгуків */}
//             <div className={css['reviews-items-grid']}>
//               {reviews.length > 0 ? (
//                 reviews
//                   .slice(0, visibleCount)
//                   .map(rev => (
//                     <CardReview
//                       key={rev._id}
//                       review={rev}
//                       currentLang={currentLang}
//                       formatDate={formatDate}
//                     />
//                   ))
//               ) : (
//                 <div className={css['no-data']}>
//                   {t('no_reviews', 'Відгуків поки немає')}
//                 </div>
//               )}
//             </div>

//             {/* Кнопки керування кількістю */}
//             <div className={css['more-btn-container']}>
//               {visibleCount < reviews.length && (
//                 <Button
//                   variant="primary"
//                   isFixedWidth={true}
//                   onClick={() => setVisibleCount(prev => prev + 3)}
//                 >
//                   {t('show_more', 'ПОКАЗАТИ ЩЕ')}
//                 </Button>
//               )}
//               {visibleCount > 3 && (
//                 <Button
//                   variant="primary"
//                   isFixedWidth={true}
//                   onClick={() => {
//                     setVisibleCount(3);
//                     document
//                       .getElementById('reviews')
//                       ?.querySelector('h2')
//                       ?.scrollIntoView({ behavior: 'smooth' });
//                   }}
//                 >
//                   {t('show_less', 'ЗГОРНУТИ')}
//                 </Button>
//               )}
//             </div>
//           </>
//         )}

//         {/* Блок Google завжди внизу, незалежно від завантаження (опціонально) */}
//         {!isLoading && (
//           <div className={css['reviews-external']}>
//             <p className={css['external-text']}>{t('google_cta')}</p>
//             <Button
//               variant="primary"
//               isFixedWidth={true}
//               onClick={() =>
//                 window.open('https://www.google.com/maps', '_blank')
//               }
//             >
//               {t('read_on_google', 'Читати в Google')}
//             </Button>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// Reviews.propTypes = {
//   refreshTrigger: PropTypes.number.isRequired,
// };

// export default Reviews;
