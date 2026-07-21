import { useState } from 'react';
import PropTypes from 'prop-types';
import BaseModal from '../BaseModal/BaseModal.jsx';
import css from './ModalCardGallery.module.css';

const ModalCardGallery = ({ isOpen, onClose, image }) => {
  const [touchStart, setTouchStart] = useState(null);

  // Безпечна перевірка: якщо немає зображення або src — не рендеримо
  if (!isOpen || !image?.src) return null;

  const handleTouchStart = e => {
    // Фіксуємо початкову позицію першого дотику
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchMove = e => {
    if (touchStart === null) return;

    const touchEnd = e.targetTouches[0].clientY;
    const distance = touchEnd - touchStart;

    // Свайп вниз більше ніж на 100px
    if (distance > 100) {
      onClose();
      setTouchStart(null); // Очищаємо після успішного закриття
    }
  };

  const handleTouchEnd = () => {
    // Обов'язково скидаємо стан, якщо користувач відпустив палець (навіть якщо не досвайпав)
    setTouchStart(null);
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      className={css['gallery-modal']}
      closeBtnClassName={css['gallery-close-btn']}
    >
      <div
        className={css['img-wrapper']}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd} // Для випадків, коли тач переривається системою
      >
        <img
          src={image.src}
          alt={image.alt || 'Gallery image'}
          className={css['full-img']}
          draggable="false"
        />
      </div>
    </BaseModal>
  );
};

ModalCardGallery.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  image: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
  }),
};

export default ModalCardGallery;
