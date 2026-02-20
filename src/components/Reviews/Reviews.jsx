import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { StarIcon } from '../Icons';
import Avatar from '../Ui/Avatars/Avatar.jsx';
import css from './Reviews.module.css';

// 1. ПРИБРАЛИ імпорт FormReview звідси, бо він тепер в App.jsx

const Reviews = () => {
  const { t, i18n } = useTranslation('reviews');
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const currentLang = i18n.language;

  const fetchReviews = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:5001/api/reviews');
      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      const data = await response.json();
      setReviews(data);
    } catch (err) {
      console.error('Помилка при завантаженні відгуків:', err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const renderStars = useCallback(rating => {
    return [...Array(5)].map((_, i) => (
      <StarIcon
        key={i}
        size={18}
        color="var(--color-latte-coffee)"
        fill={i < rating ? 'var(--color-amber)' : 'none'}
      />
    ));
  }, []);

  const getLocalizedField = (field, lang) => {
    if (!field) return '';
    return field[lang] || field.en || field.uk || '';
  };

  const formatDate = (dateString, lang) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat(lang === 'uk' ? 'uk-UA' : 'en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(date);
    } catch {
      return dateString;
    }
  };

  return (
    <section className={css['reviews-section']}>
      {[1, 2, 3, 4, 5].map(n => (
        <div
          key={n}
          className={`${css['bean']} ${css[`coffee-bean${n}`]}`}
        ></div>
      ))}

      <div className={css['reviews-container']}>
        {/* --- 2. ПРИБРАЛИ "АДМІН-ЗОНУ" З ФОРМОЮ ЗВІДСИ --- */}
        {/* Форма тепер викликається з футера і рендериться в App.jsx */}

        <div className={css['reviews-header']}>
          <h2 className={css['reviews-title']}>
            {t('title', 'What Customers Say')}
          </h2>
          <div className={css['title-divider']}>
            <div className={css['line']}></div>
            <div className={css['ornament']}>
              <svg width="80" height="40" viewBox="0 0 100 50" fill="none">
                <path
                  d="M10 25C30 5 70 45 90 25M10 25C30 45 70 5 90 25"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx="50" cy="25" r="3" fill="currentColor" />
              </svg>
            </div>
            <div className={css['line']}></div>
          </div>
        </div>

        <div className={css['reviews-grid']}>
          {isLoading ? (
            <div className={css['loading-container']}>
              <p className={css['loading-text']}>
                {t('loading', 'Loading reviews...')}
              </p>
            </div>
          ) : reviews.length > 0 ? (
            reviews.map(rev => (
              <div key={rev._id || rev.id} className={css['reviews-card']}>
                <div className={css['card-glow']}></div>
                <div className={css['rating-row']}>
                  <div className={css['rating']}>{renderStars(rev.rating)}</div>
                  <span className={css['reviews-date']}>
                    {formatDate(rev.date, currentLang)}
                  </span>
                </div>
                <p className={css['reviews-text']}>
                  {getLocalizedField(rev.text, currentLang)}
                </p>
                <div className={css['user-footer']}>
                  <div className={css['user-info']}>
                    <Avatar
                      name={getLocalizedField(rev.name, currentLang)}
                      src={rev.avatar}
                      lang={currentLang}
                    />
                    <span className={css['reviews-name']}>
                      {getLocalizedField(rev.name, currentLang)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className={css['no-data']}>
              {t('no_reviews', 'No reviews yet.')}
            </p>
          )}
        </div>

        <div className={css['reviews-external']}>
          <p className={css['external-text']}>
            {t('google_cta', 'Want to see more reviews?')}
          </p>
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className={css['google-button']}
          >
            <span>{t('read_on_google', 'Read all reviews on Google')}</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
