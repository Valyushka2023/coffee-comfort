import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import BaseModal from '../BaseModal/BaseModal.jsx';
import Button from '../../Ui/Buttons/BaseButton/Button.jsx';
import css from './AtmosphereModal.module.css';

const AtmosphereModal = ({ isOpen, onClose, zone, onConfirm }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const { t } = useTranslation('form_booking');

  // Скидаємо стан зуму при закритті модалки
  useEffect(() => {
    if (!isOpen) {
      setIsZoomed(false);
    }
  }, [isOpen]);

  if (!zone) return null;

  const handleToggleZoom = e => {
    // Запобігаємо спливанню події, щоб клік на картинку не закривав саму модалку
    e.stopPropagation();
    setIsZoomed(prev => !prev);
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      // Викликаємо спільну функцію, щоб логіка була в одному місці
      handleToggleZoom(e);
    }
  };

  const handleConfirm = () => {
    onConfirm(zone.id);
    onClose();
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      showCloseButton={false}
      // КЛЮЧОВЕ РІШЕННЯ: Якщо зум активовано, Portal ВКЛЮЧАЄТЬСЯ (disablePortal={false}),
      // щоб винести картинку на весь екран.
      // Якщо зум вимкнено, Portal ВИМКНЕНО (disablePortal={true}), щоб модалка залишалася у формі.
      disablePortal={!isZoomed}
    >
      <div
        className={`${css['modal-content']} ${isZoomed ? css['is-zoomed-mode'] : ''}`}
      >
        <div
          className={`${css['img-container']} ${isZoomed ? css['zoomed'] : ''}`}
          onClick={handleToggleZoom}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex="0"
          aria-label={
            isZoomed ? t('atmosphere.close_zoom') : t('atmosphere.open_zoom')
          }
        >
          <img
            src={zone.img}
            alt={t(`atmosphere.zones.${zone.id}`)}
            className={css['modal-img']}
          />
          {!isZoomed && (
            <div className={css['zoom-icon']}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="11" y1="8" x2="11" y2="14"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
              </svg>
            </div>
          )}
        </div>

        {/* Футер повністю приховуємо, щоб він не рендерився в Порталі при зумі */}
        {!isZoomed && (
          <div className={css['modal-footer']}>
            <h3
              className={css['modal-title']}
              dangerouslySetInnerHTML={{
                __html: t(`atmosphere.zones.${zone.id}`),
              }}
            />
            <div className={css['modal-buttons']}>
              <Button
                variant="default"
                onClick={onClose}
                className={css['flex-btn']}
              >
                {t('back_button')}
              </Button>

              <Button
                variant="primary"
                className={css['flex-btn']}
                onClick={handleConfirm}
              >
                {t('atmosphere.select_button', 'Choose')}
              </Button>
            </div>
          </div>
        )}
      </div>
    </BaseModal>
  );
};

AtmosphereModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  zone: PropTypes.shape({
    id: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
  }),
  onConfirm: PropTypes.func.isRequired,
};

export default AtmosphereModal;
