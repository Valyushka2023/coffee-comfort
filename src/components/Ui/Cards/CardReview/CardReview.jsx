import { useState } from 'react';
import PropTypes from 'prop-types';
import StarRating from '../../../StarRating/StarRating.jsx';
import Avatar from '../../Avatars/Avatar.jsx';
import ReviewCardModal from '../../../Modal/ReviewCardModal/ReviewCardModal.jsx';
import css from './CardReview.module.css';

const ReviewCard = ({ review, currentLang, formatDate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const name =
    typeof review.name === 'object'
      ? review.name[currentLang] || review.name.uk
      : review.name || 'Anonymous';

  const rawText = review.text || review.comment || '';

  const text =
    typeof rawText === 'object'
      ? rawText[currentLang] || rawText.uk || ''
      : rawText;

  const isLongText = text.length > 85;

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
            Read more...
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

      <ReviewCardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        review={{ ...review, name, text }}
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
