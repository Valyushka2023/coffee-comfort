import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import StarRating from '../../components/Ui/StarRating/StarRating.jsx';
import Button from '../Ui/Buttons/BaseButton/BaseButton.jsx';
import CardReview from '../Ui/Cards/CardReview/CardReview.jsx';
import { fetchReviewsRequest } from '../../services/api.js';
import css from './Reviews.module.css';

const Reviews = ({ newReview }) => {
  const { t, i18n } = useTranslation('reviews');
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(3);

  const currentLang = i18n.language || 'uk';

  // 1. Завантаження відгуків із сервера при першому рендері
  useEffect(() => {
    const loadReviews = async () => {
      setIsLoading(true);
      try {
        const data = await fetchReviewsRequest();
        const sortedData = (data || []).sort(
          (a, b) =>
            new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date)
        );
        setReviews(sortedData);
      } catch (err) {
        console.error('Error fetching reviews:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadReviews();
  }, []);

  // 2. МИТТЄВЕ додавання нового відгуку на початок масиву
  useEffect(() => {
    if (!newReview) return;
    console.log('⚡ Reviews.jsx рендерить новий відгук:', newReview);

    setReviews(prevReviews => {
      const reviewId = newReview._id || newReview.id;

      // Видаляємо дублікати, якщо такий ID вже є в масиві
      const filtered = prevReviews.filter(
        r => (r._id || r.id)?.toString() !== reviewId?.toString()
      );

      // Ставимо новий відгук НАЙПЕРШИМ
      return [newReview, ...filtered];
    });
  }, [newReview]);

  const averageRating = useMemo(() => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce(
      (acc, rev) => acc + Number(rev.rating || 0),
      0
    );
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
      <div className={css['reviews-container']}>
        <header className={css['reviews-header-wrapper']}>
          <h2 className={css['reviews-title']}>
            {t('title', 'What Customers Say')}
          </h2>
        </header>

        {isLoading ? (
          <div className={css['reviews-items-grid']}>
            {[...Array(3)].map((_, index) => (
              <div key={index} className={css['skeleton-review-card']} />
            ))}
          </div>
        ) : (
          <>
            {reviews.length > 0 && (
              <div className={css['average-rating-block']}>
                <span className={css['rating-big-number']}>
                  {averageRating}
                </span>
                <StarRating
                  value={Number(averageRating)}
                  readOnly={true}
                  size={28}
                />
                <span className={css['rating-count-label']}>
                  {t('reviews_count', { count: reviews.length })}
                </span>
              </div>
            )}

            <div className={css['reviews-items-grid']}>
              {reviews.length > 0 ? (
                reviews
                  .slice(0, visibleCount)
                  .map((rev, index) => (
                    <CardReview
                      key={rev._id || rev.id || `rev-${index}`}
                      review={rev}
                      currentLang={currentLang}
                      formatDate={formatDate}
                    />
                  ))
              ) : (
                <div className={css['no-data']}>
                  {t('no_reviews', 'No reviews yet')}
                </div>
              )}
            </div>

            <div className={css['actions-wrapper']}>
              {visibleCount < reviews.length && (
                <Button
                  variant="primary"
                  isFixedWidth={true}
                  onClick={() => setVisibleCount(prev => prev + 3)}
                >
                  {t('show_more', 'SHOW MORE')}
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

Reviews.propTypes = {
  newReview: PropTypes.object,
};

export default Reviews;
