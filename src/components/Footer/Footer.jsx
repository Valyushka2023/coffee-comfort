// import PropTypes from 'prop-types';
// import { useTranslation } from 'react-i18next';
// import {
//   InstagramIcon,
//   FacebookIcon,
//   MapPinIcon,
//   PhoneIcon,
//   ClockIcon,
//   ReviewIcon,
// } from '../Icons';
// import css from './Footer.module.css';
// const Footer = ({ onOpenReview, onOpenCallback }) => {
//   const { t } = useTranslation('footer');
//   const currentYear = new Date().getFullYear();

//   return (
//     <footer className={css['footer-section']}>
//       <div className={css['footer-container']}>
//         {/* БЛОК 1: АДРЕСА */}
//         <div className={css['footer-column']}>
//           <h4 className={css['column-title']}>
//             {t('title_address', 'Our address')}
//           </h4>
//           <a href="#contacts-section" className={css['footer-item']}>
//             <MapPinIcon size={18} color="var(--icon-map-color)" />
//             <span>{t('address', '12 Coffee St, Kyiv')}</span>
//           </a>
//           <div className={`${css['footer-item']} ${css['no-hover']}`}>
//             <ClockIcon size={18} color="var(--icon-clock-color)" />
//             <span>{t('hours', 'ПН-НД: 08:00 - 21:00')}</span>
//           </div>
//         </div>

//         {/* БЛОК 2: ЗВОРОТНИЙ ЗВ'ЯЗОК */}
//         <div className={css['footer-column']}>
//           <h4 className={css['column-title']}>
//             {t('title_callback', 'Feedback')}
//           </h4>
//           <a href="tel:+380000000000" className={css['footer-item']}>
//             <PhoneIcon size={18} />
//             <span>+380 XX XXX XX XX</span>
//           </a>
//           <button
//             type="button"
//             className={css['callback-link']}
//             onClick={onOpenCallback}
//           >
//             {t('request_call', 'Request a call')}
//           </button>
//         </div>

//         {/* БЛОК 3: СОЦМЕРЕЖІ */}
//         <div className={css['footer-column']}>
//           <h4 className={css['column-title']}>
//             {t('title_socials', 'We are on social media')}
//           </h4>
//           <div className={css['social-icons']}>
//             <a
//               href="https://instagram.com"
//               target="_blank"
//               rel="noreferrer"
//               aria-label="Instagram"
//             >
//               <InstagramIcon size={24} />
//             </a>
//             <a
//               href="https://facebook.com"
//               target="_blank"
//               rel="noreferrer"
//               aria-label="Facebook"
//             >
//               <FacebookIcon size={24} />
//             </a>
//           </div>
//         </div>

//         {/* БЛОК 4: ВІДГУК */}
//         <div className={css['footer-column']}>
//           <h4 className={css['column-title']}>
//             {t('title_review', 'Your opinion')}
//           </h4>
//           <button
//             type="button"
//             className={css['review-trigger']}
//             onClick={onOpenReview}
//           >
//             <ReviewIcon size={20} />
//             <span>{t('leave_review', 'Leave a review')}</span>
//           </button>
//         </div>
//       </div>

//       <div className={css['footer-divider']} />
//       <div className={css['footer-bottom']}>
//         <p>© {currentYear} Coffee House. All rights reserved.</p>
//       </div>
//     </footer>
//   );
// };

// Footer.propTypes = {
//   onOpenReview: PropTypes.func.isRequired,
//   onOpenCallback: PropTypes.func.isRequired,
// };
// export default Footer;
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
  InstagramIcon,
  FacebookIcon,
  MapPinIcon,
  PhoneIcon,
  ClockIcon,
  ReviewIcon,
} from '../Icons';
import css from './Footer.module.css';

const Footer = ({ onOpenReview, onOpenCallback }) => {
  const { t } = useTranslation('footer');
  const currentYear = new Date().getFullYear();

  // Функція для зняття фокусу при кліку
  const handleTouchFocus = e => {
    e.currentTarget.blur();
  };

  return (
    <footer className={css['footer-section']}>
      <div className={css['footer-container']}>
        {/* БЛОК 1: АДРЕСА */}
        <div className={css['footer-column']}>
          <h4 className={css['column-title']}>
            {t('title_address', 'Our address')}
          </h4>
          <a
            href="#contacts-section"
            className={css['footer-item']}
            onClick={handleTouchFocus}
          >
            <MapPinIcon size={18} color="var(--icon-map-color)" />
            <span>{t('address', '12 Coffee St, Kyiv')}</span>
          </a>
          <div className={`${css['footer-item']} ${css['no-hover']}`}>
            <ClockIcon size={18} color="var(--icon-clock-color)" />
            <span>{t('hours', 'ПН-НД: 08:00 - 21:00')}</span>
          </div>
        </div>

        {/* БЛОК 2: ЗВОРОТНИЙ ЗВ'ЯЗОК */}
        <div className={css['footer-column']}>
          <h4 className={css['column-title']}>
            {t('title_callback', 'Feedback')}
          </h4>
          <a
            href="tel:+380000000000"
            className={css['footer-item']}
            onClick={handleTouchFocus}
          >
            <PhoneIcon size={18} />
            <span>+380 XX XXX XX XX</span>
          </a>
          <button
            type="button"
            className={css['callback-link']}
            onClick={e => {
              onOpenCallback();
              handleTouchFocus(e);
            }}
          >
            {t('request_call', 'Request a call')}
          </button>
        </div>

        {/* БЛОК 3: СОЦМЕРЕЖІ */}
        <div className={css['footer-column']}>
          <h4 className={css['column-title']}>
            {t('title_socials', 'We are on social media')}
          </h4>
          <div className={css['social-icons']}>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              onClick={handleTouchFocus}
            >
              <InstagramIcon size={24} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              onClick={handleTouchFocus}
            >
              <FacebookIcon size={24} />
            </a>
          </div>
        </div>

        {/* БЛОК 4: ВІДГУК */}
        <div className={css['footer-column']}>
          <h4 className={css['column-title']}>
            {t('title_review', 'Your opinion')}
          </h4>
          <button
            type="button"
            className={css['review-trigger']}
            onClick={e => {
              onOpenReview();
              handleTouchFocus(e);
            }}
          >
            <ReviewIcon size={20} />
            <span>{t('leave_review', 'Leave a review')}</span>
          </button>
        </div>
      </div>

      <div className={css['footer-divider']} />
      <div className={css['footer-bottom']}>
        <p>© {currentYear} Coffee House. All rights reserved.</p>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  onOpenReview: PropTypes.func.isRequired,
  onOpenCallback: PropTypes.func.isRequired,
};

export default Footer;
