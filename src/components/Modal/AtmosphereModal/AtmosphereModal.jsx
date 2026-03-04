// import PropTypes from 'prop-types';
// import { useTranslation } from 'react-i18next';
// import BaseModal from '../BaseModal/BaseModal.jsx';
// import css from './AtmosphereModal.module.css';

// const AtmosphereModal = ({ isOpen, onClose, zone, onConfirm }) => {
//   const { t } = useTranslation('form_booking');

//   if (!zone) return null;

//   return (
//     <BaseModal isOpen={isOpen} onClose={onClose}>
//       <div className={css['modal-content']}>
//         <img
//           src={zone.img}
//           alt={t(`zones.${zone.id}`)}
//           className={css['modal-img']}
//         />
//         <div className={css['modal-footer']}>
//           <h4 className={css['modal-title']}>{t(`zones.${zone.id}`)}</h4>
//           <div className={css['modal-buttons']}>
//             <button type="button" className={css['btn-back']} onClick={onClose}>
//               {t('back_button', 'Назад')}
//             </button>
//             <button
//               type="button"
//               className={css['btn-confirm']}
//               onClick={() => {
//                 onConfirm(zone.id);
//                 onClose();
//               }}
//             >
//               {t('select_zone_button', 'Обрати цю зону')}
//             </button>
//           </div>
//         </div>
//       </div>
//     </BaseModal>
//   );
// };

// AtmosphereModal.propTypes = {
//   isOpen: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired,
//   zone: PropTypes.shape({
//     id: PropTypes.string.isRequired,
//     img: PropTypes.string.isRequired,
//   }),
//   onConfirm: PropTypes.func.isRequired,
// };

// export default AtmosphereModal;
/********* */ //
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import BaseModal from '../BaseModal/BaseModal.jsx';
import css from './AtmosphereModal.module.css';

// const AtmosphereModal = ({ isOpen, onClose, zone, onConfirm }) => {
//   const { t } = useTranslation('form_booking');

//   if (!zone) return null;

//   return (
//     <BaseModal
//       isOpen={isOpen}
//       onClose={onClose}
//       // Передаємо клас, щоб сховати хрестик, якщо BaseModal це підтримує
//       className={css['custom-modal']}
//     >
//       <div className={css['modal-content']}>
//         <img
//           src={zone.img}
//           alt={t(`zones.${zone.id}`)}
//           className={css['modal-img']}
//         />
//         <div className={css['modal-footer']}>
//           <h4 className={css['modal-title']}>{t(`zones.${zone.id}`)}</h4>
//           <div className={css['modal-buttons']}>
//             <button type="button" className={css['btn-back']} onClick={onClose}>
//               {t('back_button', 'Назад')}
//             </button>
//             <button
//               type="button"
//               className={css['btn-confirm']}
//               onClick={() => {
//                 onConfirm(zone.id);
//                 onClose();
//               }}
//             >
//               {t('select_zone_button', 'Обрати цю зону')}
//             </button>
//           </div>
//         </div>
//       </div>
//     </BaseModal>
//   );
// };
const AtmosphereModal = ({ isOpen, onClose, zone, onConfirm }) => {
  const { t } = useTranslation('form_booking');

  if (!zone) return null;

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      showCloseButton={false} // ✅ Хрестик тепер не з'явиться
    >
      <div className={css['modal-content']}>
        <div className={css['img-container']}>
          <img
            src={zone.img}
            alt={t(`zones.${zone.id}`)}
            className={css['modal-img']}
          />
        </div>
        <div className={css['modal-footer']}>
          <h4 className={css['modal-title']}>{t(`zones.${zone.id}`)}</h4>
          <div className={css['modal-buttons']}>
            <button type="button" className={css['btn-back']} onClick={onClose}>
              {t('back_button', 'Назад')}
            </button>
            <button
              type="button"
              className={css['btn-confirm']}
              onClick={() => {
                onConfirm(zone.id);
                onClose();
              }}
            >
              {t('select_zone_button', 'Обрати цю зону')}
            </button>
          </div>
        </div>
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
