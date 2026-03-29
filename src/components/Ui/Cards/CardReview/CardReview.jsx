import PropTypes from 'prop-types';
import StarRating from '../../../StarRating/StarRating.jsx';
import Avatar from '../../Avatars/Avatar.jsx';
import css from './CardReview.module.css'; // Використовуємо ті ж стилі

const ReviewCard = ({ review, currentLang, formatDate }) => {
  const name =
    typeof review.name === 'object'
      ? review.name[currentLang] || review.name.uk
      : review.name;

  const text =
    typeof review.text === 'object'
      ? review.text[currentLang] || review.text.uk
      : review.text;

  return (
    <div className={css['reviews-card']}>
      <div className={css['rating-wrapper']}>
        <StarRating value={review.rating} readOnly={true} size={20} />
      </div>
      <p className={css['reviews-text']}>{text}</p>
      <div className={css['user-footer']}>
        <div className={css['user-info']}>
          <Avatar name={name} src={review.avatar} lang={currentLang} />
          <div className={css['user-data']}>
            <span className={css['reviews-name']}>{name}</span>
            <span className={css['reviews-date']}>
              {formatDate(review.createdAt || review.date)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

ReviewCard.propTypes = {
  review: PropTypes.object.isRequired,
  currentLang: PropTypes.string.isRequired,
  formatDate: PropTypes.func.isRequired,
};

export default ReviewCard;
