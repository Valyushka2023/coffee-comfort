import PropTypes from 'prop-types';
import BaseModal from '../BaseModal/BaseModal.jsx';
import StarRating from '../../StarRating/StarRating.jsx';
import Avatar from '../../Ui/Avatars/Avatar.jsx';
import css from './ReviewCardModal.module.css';

const ReviewCardModal = ({
  isOpen,
  onClose,
  review,
  currentLang,
  formatDate,
}) => {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={review.name} // Ім'я клієнта як заголовок
    >
      <div className={css['modal-content-wrapper']}>
        <div className={css['rating-date-info']}>
          <StarRating value={review.rating} readOnly={true} size={20} />
          <span className={css['modal-date']}>
            {formatDate(review.createdAt || review.date)}
          </span>
        </div>

        <div className={css['text-scroll-area']}>
          <p className={css['modal-full-text']}>{review.text}</p>
        </div>

        <div className={css['modal-user-footer']}>
          <Avatar name={review.name} src={review.avatar} lang={currentLang} />
          <span className={css['modal-author-name']}>{review.name}</span>
        </div>
      </div>
    </BaseModal>
  );
};

ReviewCardModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  review: PropTypes.shape({
    name: PropTypes.string,
    text: PropTypes.string,
    rating: PropTypes.number,
    avatar: PropTypes.string,
    createdAt: PropTypes.string,
    date: PropTypes.string,
  }).isRequired,
  currentLang: PropTypes.string.isRequired,
  formatDate: PropTypes.func.isRequired,
};

export default ReviewCardModal;
