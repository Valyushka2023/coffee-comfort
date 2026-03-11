import PropTypes from 'prop-types';
import BaseModal from '../BaseModal/BaseModal.jsx';
import css from './GalleryModal.module.css';

const GalleryModal = ({ isOpen, onClose, image }) => {
  if (!image) return null;

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      /* Використовуємо специфічний клас для пріоритету стилів */
      className={css['gallery-specific-modal']}
    >
      <div className={css['img-wrapper']}>
        <img
          src={image.src}
          alt={image.alt || 'Gallery image'}
          className={css['full-img']}
        />
      </div>
    </BaseModal>
  );
};

GalleryModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  image: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
  }),
};

export default GalleryModal;
