import { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import StarRating from '../../StarRating/StarRating.jsx';
import Avatar from '../../Avatars/Avatar.jsx';
import ModalCardReview from '../../../Modal/ModalCardReview/ModalCardReview.jsx';
import Button from '../../../Ui/Buttons/BaseButton/BaseButton.jsx';
import css from './CardReview.module.css';

// Допоміжна функція для безпечного витягування тексту (об'єкт чи рядок)
const getLocalizedText = (field, lang = 'uk') => {
  if (!field) return '';
  if (typeof field === 'string') return field;
  if (typeof field === 'object') {
    return field[lang] || field.uk || field.en || '';
  }
  return String(field);
};

const ReviewCard = ({ review, currentLang, formatDate }) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!review) return null;

  // Безпечно отримуємо ім'я та текст
  const name = getLocalizedText(review.name, currentLang) || 'Anonymous';
  const rawText = review.text || review.comment;
  const text = getLocalizedText(rawText, currentLang);

  // Отримуємо актуальну дату (з фолбеком на поточну, якщо бекенд ще не прислав createdAt)
  const reviewDate =
    review.createdAt || review.date || new Date().toISOString();

  const isLongText = text.length > 85;

  return (
    <>
      <div className={css['card-review']}>
        <div className={css['rating-wrapper']}>
          <StarRating
            value={Number(review.rating || 0)}
            readOnly={true}
            size={20}
          />
        </div>

        <p className={css['text-review']}>{text}</p>

        {isLongText && (
          <Button
            variant="link"
            onClick={() => setIsModalOpen(true)}
            className={css['read-more-btn']}
          >
            {t('reviews:reviews.read_more', 'Read more')}
          </Button>
        )}

        <div className={css['card-review-footer']}>
          <div className={css['user-info']}>
            <Avatar name={name} src={review.avatar} lang={currentLang} />
            <div className={css['user-data']}>
              <span className={css['author-name']}>{name}</span>
              <span className={css['reviews-date']}>
                {formatDate(reviewDate)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Модальне вікно з повним текстом */}
      <ModalCardReview
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        review={{ ...review, name, text, createdAt: reviewDate }}
        currentLang={currentLang}
        formatDate={formatDate}
      />
    </>
  );
};

ReviewCard.propTypes = {
  review: PropTypes.shape({
    _id: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    comment: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    rating: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    avatar: PropTypes.string,
    createdAt: PropTypes.string,
    date: PropTypes.string,
  }).isRequired,
  currentLang: PropTypes.string.isRequired,
  formatDate: PropTypes.func.isRequired,
};

export default ReviewCard;
