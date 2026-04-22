// import PropTypes from 'prop-types';
// import { useTranslation } from 'react-i18next';
// import BaseModal from '../BaseModal/BaseModal.jsx';
// import Button from '../../Ui/Buttons/BaseButton/Button.jsx';
// import css from './AtmosphereModal.module.css';

// const AtmosphereModal = ({ isOpen, onClose, zone, onConfirm }) => {
//   const { t } = useTranslation('form_booking');

//   if (!zone) return null;

//   return (
//     <BaseModal isOpen={isOpen} onClose={onClose} showCloseButton={false}>
//       <div className={css['modal-content']}>
//         <div className={css['img-container']}>
//           <img
//             src={zone.img}
//             alt={t(`atmosphere.zones.${zone.id}`)}
//             className={css['modal-img']}
//           />
//         </div>
//         <div className={css['modal-footer']}>
//           <h3
//             className={css['modal-title']}
//             dangerouslySetInnerHTML={{
//               __html: t(`atmosphere.zones.${zone.id}`),
//             }}
//           />
//           <div className={css['modal-buttons']}>
//             {/* Використовуємо універсальну кнопку з новим пропсом isFixedWidth */}
//             <Button
//               variant="default"
//               onClick={onClose}
//               className={css['flex-btn']}
//             >
//               {t('back_button')}
//             </Button>

//             <Button
//               variant="primary"
//               className={css['flex-btn']}
//               onClick={() => {
//                 onConfirm(zone.id);
//                 onClose();
//               }}
//             >
//               {t('atmosphere.select_button', 'Choose')}{' '}
//               {/* Додано шлях або дефолтне значення */}
//             </Button>
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
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import BaseModal from '../BaseModal/BaseModal.jsx';
import Button from '../../Ui/Buttons/BaseButton/Button.jsx';
import css from './AtmosphereModal.module.css';

const AtmosphereModal = ({ isOpen, onClose, zone, onConfirm }) => {
  const { t } = useTranslation('form_booking');

  if (!zone) return null;

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      showCloseButton={false}
      disablePortal={true} // Модалка залишиться всередині форми
    >
      <div className={css['modal-content']}>
        <div className={css['img-container']}>
          <img
            src={zone.img}
            alt={t(`atmosphere.zones.${zone.id}`)}
            className={css['modal-img']}
          />
        </div>
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
              onClick={() => {
                onConfirm(zone.id);
                onClose();
              }}
            >
              {t('atmosphere.select_button', 'Choose')}
            </Button>
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
