import { useState } from 'react';
import PropTypes from 'prop-types';
import StarRating from '../../../StarRating/StarRating.jsx';
import Avatar from '../../Avatars/Avatar.jsx';
import ReviewCardModal from '../../../Modal/ReviewCardModal/ReviewCardModal.jsx'; // Оновлена назва
import css from './CardReview.module.css';

const ReviewCard = ({ review, currentLang, formatDate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Визначаємо ім'я та текст залежно від мови
  const name =
    typeof review.name === 'object'
      ? review.name[currentLang] || review.name.uk
      : review.name;

  const text =
    typeof review.text === 'object'
      ? review.text[currentLang] || review.text.uk
      : review.text;

  // Кнопка з'явиться, якщо текст довгий
  const isLongText = text.length > 110;

  return (
    <>
      <div className={css['card-review']}>
        <div className={css['rating-wrapper']}>
          <StarRating value={review.rating} readOnly={true} size={20} />
        </div>

        <p className={css['text-review']}>{text}</p>

        {isLongText && (
          <button
            type="button"
            className={css['read-more-btn']}
            onClick={() => setIsModalOpen(true)}
          >
            Читати далі...
          </button>
        )}

        <div className={css['card-review-footer']}>
          <div className={css['user-info']}>
            <Avatar name={name} src={review.avatar} lang={currentLang} />
            <div className={css['user-data']}>
              <span className={css['author-name']}>{name}</span>
              <span className={css['reviews-date']}>
                {formatDate(review.createdAt || review.date)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Модальне вікно для детального перегляду відгуку */}
      <ReviewCardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        review={{ ...review, name, text }} // Передаємо вже готові name та text
        currentLang={currentLang}
        formatDate={formatDate}
      />
    </>
  );
};

ReviewCard.propTypes = {
  review: PropTypes.object.isRequired,
  currentLang: PropTypes.string.isRequired,
  formatDate: PropTypes.func.isRequired,
};

export default ReviewCard;
