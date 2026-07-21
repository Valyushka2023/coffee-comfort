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
  closeBtnClassName,
  showCloseButton = true,
  disablePortal = false,
}) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
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
          <div className={css['close-btn']}>
            <CloseButton onClick={onClose} className={closeBtnClassName} />
          </div>
        )}

        {title && <h3 className={css['modal-title']}>{title}</h3>}

        <div className={css['modal-content']}>{children}</div>
      </div>
    </div>
  );

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
  closeBtnClassName: PropTypes.string,
  showCloseButton: PropTypes.bool,
  disablePortal: PropTypes.bool,
};

export default BaseModal;
