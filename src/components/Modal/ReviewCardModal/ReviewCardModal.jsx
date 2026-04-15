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
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className={css['card-review-modal']}>
        <div className={css['rating-wrapper']}>
          <StarRating value={review.rating} readOnly={true} size={20} />
        </div>

        <p className={css['text-review-modal']}>{review.text}</p>

        <div className={css['card-review-modal-footer']}>
          <div className={css['user-info-modal']}>
            <Avatar name={review.name} src={review.avatar} lang={currentLang} />
            <div className={css['user-data-modal']}>
              <span className={css['author-name-modal']}>{review.name}</span>{' '}
              <span className={css['date-modal']}>
                {formatDate(review.createdAt || review.date)}
              </span>
            </div>
          </div>
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
