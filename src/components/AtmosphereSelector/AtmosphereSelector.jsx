// import { useState, useEffect, useCallback } from 'react';
// import { useTranslation } from 'react-i18next';
// import PropTypes from 'prop-types';
// import clsx from 'clsx';
// import css from './AtmosphereSelector.module.css';

// const ZONES = [
//   { id: 'window', img: '/images/window-interior.webp' },
//   { id: 'lounge', img: '/images/lounge-interior.webp' },
//   { id: 'work', img: '/images/work-interior.webp' },
// ];

// const AtmosphereSelector = ({ selectedZone, onSelect }) => {
//   const { t } = useTranslation('form_booking');
//   const [previewZone, setPreviewZone] = useState(null);

//   const closeItems = useCallback(() => setPreviewZone(null), []);

//   useEffect(() => {
//     if (!previewZone) return;
//     const handleKeyDown = e => {
//       if (e.key === 'Escape') closeItems();
//     };
//     window.addEventListener('keydown', handleKeyDown);
//     document.body.style.overflow = 'hidden';
//     return () => {
//       window.removeEventListener('keydown', handleKeyDown);
//       document.body.style.overflow = 'unset';
//     };
//   }, [previewZone, closeItems]);

//   const handleZoneSelect = id => {
//     console.log('1. [SELECTOR] Клік по кнопці. Передаємо ID:', id);
//     onSelect(id);
//     closeItems();
//   };
//   return (
//     <div className={css['selector-container']}>
//       <p className={css['zone-title']}>{t('choose_atmosphere')}</p>

//       <div className={css['zone-grid']}>
//         {ZONES.map(zone => (
//           <button
//             key={zone.id}
//             type="button"
//             className={css['zone-card']}
//             onClick={() => setPreviewZone(zone)}
//           >
//             <div
//               className={clsx(css['img-wrapper'], {
//                 [css['active-border']]: selectedZone === zone.id,
//               })}
//             >
//               <img src={zone.img} alt="" className={css['zone-img']} />
//             </div>
//             <span
//               className={clsx(css['zone-label'], {
//                 [css['active-text']]: selectedZone === zone.id,
//               })}
//             >
//               {t(`zones.${zone.id}`)}
//             </span>
//           </button>
//         ))}
//       </div>

//       {previewZone && (
//         <div className={css['modal-overlay']}>
//           <button
//             type="button"
//             className={css['modal-backdrop']}
//             onClick={closeItems}
//             aria-label="Close"
//           />

//           <div className={css['modal-content']} role="dialog" aria-modal="true">
//             <img src={previewZone.img} alt="" className={css['modal-img']} />
//             <div className={css['modal-footer']}>
//               <h4 className={css['modal-title']}>
//                 {t(`zones.${previewZone.id}`)}
//               </h4>
//               <div className={css['modal-buttons']}>
//                 <button
//                   type="button"
//                   className={css['btn-back']}
//                   onClick={closeItems}
//                 >
//                   {t('back_button', 'Назад')}
//                 </button>
//                 <button
//                   type="button"
//                   className={css['btn-confirm']}
//                   onClick={() => handleZoneSelect(previewZone.id)}
//                 >
//                   {t('select_zone_button', 'Обрати цю зону')}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// AtmosphereSelector.propTypes = {
//   selectedZone: PropTypes.string,
//   onSelect: PropTypes.func.isRequired,
// };

// export default AtmosphereSelector;
/*************/
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
      <h3 className={css['main-title']}>{t('choose_atmosphere')}</h3>

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
