import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import AtmosphereModal from '../Modal/AtmosphereModal/AtmosphereModal.jsx';
import css from './AtmosphereSelector.module.css';

const ZONES = [
  { id: 'window', img: '/images/window-interior.webp' },
  { id: 'lounge', img: '/images/lounge-interior.webp' },
  { id: 'work', img: '/images/work-interior.webp' },
];

const AtmosphereSelector = ({ selectedZone, onSelect }) => {
  const { t } = useTranslation('form_booking');
  const [previewZone, setPreviewZone] = useState(null);

  return (
    <div className={css['selector-container']}>
      <h4 className={css['main-title']}>
        {t('choose_atmosphere', 'Виберіть атмосферну зону')}
      </h4>

      <div className={css['zone-grid']}>
        {ZONES.map(zone => (
          <div key={zone.id} className={css['zone-item']}>
            <button
              type="button"
              className={css['zone-card']}
              onClick={() => setPreviewZone(zone)}
            >
              <div
                className={clsx(css['img-wrapper'], {
                  [css['active-border']]: selectedZone === zone.id,
                })}
              >
                <img src={zone.img} alt="" />
              </div>
              {/* Обертаємо в div для фіксованої висоти */}
              <div className={css['label-container']}>
                <span
                  className={clsx(css['zone-label'], {
                    [css['active-text']]: selectedZone === zone.id,
                  })}
                >
                  {t(`zones.${zone.id}`)}
                </span>
              </div>
            </button>
          </div>
        ))}
      </div>

      <AtmosphereModal
        isOpen={!!previewZone}
        onClose={() => setPreviewZone(null)}
        zone={previewZone}
        onConfirm={onSelect}
      />
    </div>
  );
};

AtmosphereSelector.propTypes = {
  selectedZone: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
};

export default AtmosphereSelector;
