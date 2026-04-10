import { useState } from 'react';
import PropTypes from 'prop-types';
import BaseModal from '../BaseModal/BaseModal.jsx';
import css from './GalleryModal.module.css';

const GalleryModal = ({ isOpen, onClose, image }) => {
  const [touchStart, setTouchStart] = useState(null);

  if (!image) return null;
  const handleTouchStart = e => {
    setTouchStart(e.targetTouches[0].clientY);
  };
  const handleTouchMove = e => {
    if (!touchStart) return;
    const touchEnd = e.targetTouches[0].clientY;
    // Якщо свайпнули вниз більше ніж на 100px — закриваємо
    if (touchEnd - touchStart > 100) {
      onClose();
      setTouchStart(null);
    }
  };
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      /* Використовуємо специфічний клас для пріоритету стилів */
      className={css['gallery-specific-modal']}
    >
      {/* Додаємо слухачі touch подій на обгортку картинки */}
      <div
        className={css['img-wrapper']}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
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
