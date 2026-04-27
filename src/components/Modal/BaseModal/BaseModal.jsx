import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import CloseButton from '../../Ui/Buttons/CloseButton/CloseButton.jsx';
import css from './BaseModal.module.css';

const BaseModal = ({
  isOpen,
  onClose,
  children,
  title,
  className,
  showCloseButton = true,
  disablePortal = false, // Новий проп
}) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    // Блокуємо скрол body тільки якщо це глобальна модалка
    if (!disablePortal) {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, disablePortal]);

  if (!isOpen) return null;

  const modalContent = (
    <div
      className={clsx(css['wrapper'], disablePortal && css['local-wrapper'])}
    >
      <div
        className={css['overlay']}
        onClick={onClose}
        role="button"
        tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && onClose()}
        aria-label="Close modal"
      />

      <div
        className={clsx(css['modal'], className)}
        role="dialog"
        aria-modal="true"
      >
        {showCloseButton && (
          <div
            className={clsx(
              css['close-btn'],
              className && css['gallery-close-btn']
            )}
          >
            <CloseButton onClick={onClose} />
          </div>
        )}

        {title && <h3 className={css['modal-title']}>{title}</h3>}

        <div className={css['modal-content']}>{children}</div>
      </div>
    </div>
  );

  // Рендеримо або в портал, або прямо в DOM-дерево компонента
  if (disablePortal) {
    return modalContent;
  }

  return createPortal(modalContent, document.body);
};

BaseModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  className: PropTypes.string,
  showCloseButton: PropTypes.bool,
  disablePortal: PropTypes.bool,
};

export default BaseModal;
