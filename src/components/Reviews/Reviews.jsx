import { useTranslation } from 'react-i18next';
import css from './Reviews.module.css';

const reviews = [
  {
    id: 1,
    name: 'Anna',
    text: 'The best coffee! Incredible atmosphere!',
    rating: 5,
  },
  {
    id: 2,
    name: 'Vika',
    text: 'Always fresh and delicious pastries.',
    rating: 5,
  },
];

const Reviews = () => {
  const { t } = useTranslation('reviews');

  const renderStars = rating => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <section className={css['reviews-section']}>
      <div className={css['reviews-container']}>
        <h2 className={css['reviews-title']}>
          {t('title', 'What Customers Say')}
        </h2>
        <div className={css['title-underline']}></div>
        <div className={css['reviews-grid']}>
          {reviews.map(rev => (
            <div key={rev.id} className={css['reviews-card']}>
              <div className={css['rating']}>{renderStars(rev.rating)}</div>
              <p className={css['reviews-text']}>
                {/* Використовуємо динамічний ключ для перекладу кожного відгуку */}
                {t(`review_text_${rev.id}`, rev.text)}
              </p>
              <span className={css['reviews-name']}>
                —{/* Додаємо t() для імені */}—{' '}
                {t(`review_name_${rev.id}`, rev.name)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
