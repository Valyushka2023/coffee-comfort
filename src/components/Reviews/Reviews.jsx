import { useTranslation } from 'react-i18next';
import css from './Reviews.module.css';

const reviews = [
  {
    id: 1,
    name: 'Anna',
    text: 'The best coffee! Incredible atmosphere!',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?u=anna',
  },
  {
    id: 2,
    name: 'Vika',
    text: 'Always fresh and delicious pastries.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?u=vika',
  },
];

const Reviews = () => {
  const { t } = useTranslation('reviews');

  const renderStars = rating => {
    return '★'.repeat(rating);
  };

  return (
    <section className={css['reviews-section']}>
      {/* Ефекти пари (димки) */}
      {/* <div className={css['smoke-left']}></div>
      <div className={css['smoke-right']}></div> */}
      <div className={`${css['bean']} ${css['coffee-bean1']}`}></div>
      <div className={`${css['bean']} ${css['coffee-bean2']}`}></div>
      <div className={`${css['bean']} ${css['coffee-bean3']}`}></div>
      <div className={`${css['bean']} ${css['coffee-bean4']}`}></div>
      <div className={`${css['bean']} ${css['coffee-bean5']}`}></div>
      <div className={css['reviews-container']}>
        <div className={css['reviews-header']}>
          <h2 className={css['reviews-title']}>
            {t('title', 'What Customers Say')}
          </h2>
          <div className={css['title-divider']}>
            <div className={css['line']}></div>
            <div className={css['ornament']}>
              <svg
                width="80"
                height="40"
                viewBox="0 0 100 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
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
          {reviews.map(rev => (
            <div key={rev.id} className={css['reviews-card']}>
              <div className={css['card-glow']}></div>

              <div className={css['rating']}>{renderStars(rev.rating)}</div>

              <p className={css['reviews-text']}>
                {t(`review_text_${rev.id}`, rev.text)}
              </p>

              <div className={css['user-footer']}>
                <div className={css['user-info']}>
                  <div className={css['user-avatar']}>
                    <img src={rev.avatar} alt={rev.name} />
                  </div>
                  <span className={css['reviews-name']}>
                    {t(`review_name_${rev.id}`, rev.name)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
