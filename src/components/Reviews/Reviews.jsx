import { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import ReviewCard from '../Ui/Cards/CardReview/CardReview.jsx';
import Button from '../Ui/Buttons/BaseButton/BaseButton.jsx';
import StarRating from '../Ui/StarRating/StarRating.jsx';
import { fetchReviewsRequest } from '../../services/api.js';
import { useReviewsPagination } from '../../hooks/useReviewsPagination.js';
import css from './Reviews.module.css';

const Reviews = ({ newReview }) => {
  const { i18n, t } = useTranslation('reviews');
  const currentLang = i18n.language || 'uk';

  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { visibleReviews, hasMore, handleLoadMore, resetPagination } =
    useReviewsPagination(reviews);

  const isExpanded = visibleReviews.length > 3;

  useEffect(() => {
    const loadReviews = async () => {
      try {
        setIsLoading(true);
        const data = await fetchReviewsRequest();

        const loadedReviews = Array.isArray(data)
          ? data
          : data?.reviews || data?.data || [];

        setReviews(loadedReviews);
      } catch (err) {
        console.error('Помилка завантаження відгуків:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadReviews();
  }, []);

  useEffect(() => {
    if (!newReview) return;

    setReviews(prevReviews => {
      const incomingId = String(newReview._id || newReview.id || '');
      const exists = prevReviews.some(
        item => String(item._id || item.id) === incomingId
      );

      if (exists) return prevReviews;

      return [newReview, ...prevReviews];
    });

    if (typeof resetPagination === 'function') {
      resetPagination();
    }
  }, [newReview, resetPagination]);

  const averageRating = useMemo(() => {
    if (!reviews || reviews.length === 0) return 0;
    const total = reviews.reduce(
      (acc, item) => acc + Number(item.rating || 0),
      0
    );
    return (total / reviews.length).toFixed(1);
  }, [reviews]);

  const formatDate = dateString => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';

    return new Intl.DateTimeFormat(currentLang === 'uk' ? 'uk-UA' : 'en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  };

  return (
    <section className={css['reviews-section']}>
      <div className={css['reviews-container']}>
        <div className={css['reviews-header-wrapper']}>
          <h2 className={css['reviews-title']}>
            {t('title', 'What our guests say')}
          </h2>
        </div>

        {!isLoading && reviews.length > 0 && (
          <div className={css['average-rating-block']}>
            <span className={css['rating-big-number']}>{averageRating}</span>
            <StarRating
              value={Math.round(Number(averageRating))}
              readOnly={true}
              size={24}
            />
            <span className={css['rating-count-label']}>
              {t('reviews_count', {
                count: reviews.length,
                defaultValue: `Based on ${reviews.length} reviews`,
              })}
            </span>
          </div>
        )}

        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className={css['error-message']}>{error}</p>
        ) : visibleReviews.length === 0 ? (
          <p className={css['no-reviews']}>No reviews yet.</p>
        ) : (
          <div className={css['reviews-items-grid']}>
            {visibleReviews.map((review, idx) => (
              <ReviewCard
                key={review._id || review.id || `review-${idx}`}
                review={review}
                currentLang={currentLang}
                formatDate={formatDate}
              />
            ))}
          </div>
        )}

        {!isLoading && (hasMore || isExpanded) && (
          <div className={css['actions-wrapper']}>
            {hasMore && (
              <Button
                variant="primary"
                onClick={handleLoadMore}
                className={css['collapse-btn']}
              >
                {t('show_more', 'Show more')}
              </Button>
            )}
            {isExpanded && (
              <Button
                variant="primary"
                onClick={resetPagination}
                className={css['collapse-btn']}
              >
                {t('show_less', 'Collapse')}
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

Reviews.propTypes = {
  newReview: PropTypes.object,
};

export default Reviews;
