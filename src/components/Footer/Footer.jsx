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

  return (
    <footer className={css['footer-section']}>
      <div className={css['footer-container']}>
        {/* БЛОК 1: АДРЕСА */}
        <div className={css['footer-column']}>
          <h4 className={css['column-title']}>
            {t('title_address', 'НАША АДРЕСА')}
          </h4>
          {/* <div className={css['first-row']}>
            <MapPinIcon size={18} color="var(--icon-map-color)" />
            <span>{t('address', 'ВУЛ. КАВОВА, 12, КИЇВ')}</span>
          </div> */}
          <div className={css['first-row']}>
            <a href="#contacts-section" className={css['location-anchor']}>
              <MapPinIcon size={18} color="var(--icon-map-color)" />
              <span>{t('address', 'ВУЛ. КАВОВА, 12, КИЇВ')}</span>
            </a>
          </div>
          <div className={css['info-item']}>
            <ClockIcon size={18} color="var(--icon-clock-color)" />
            <span>{t('hours', 'ПН-НД: 08:00 - 21:00')}</span>
          </div>
        </div>

        <div className={css['footer-column']}>
          <h4 className={css['column-title']}>
            {t('title_callback', 'ЗВОРОТНИЙ ЗВ’ЯЗОК')}
          </h4>
          <a href="tel:+380000000000" className={css['first-row']}>
            <PhoneIcon size={18} />
            <span>+380 XX XXX XX XX</span>
          </a>
          <button className={css['callback-link']} onClick={onOpenCallback}>
            {t('request_call', 'ЗАМОВИТИ ДЗВІНОК')}
          </button>
        </div>

        <div className={css['footer-column']}>
          <h4 className={css['column-title']}>
            {t('title_socials', 'МИ В СОЦМЕРЕЖАХ')}
          </h4>
          <div className={css['first-row']}>
            <div className={css['social-icons']}>
              <a
                href="[https://instagram.com](https://instagram.com)"
                target="_blank"
                rel="noreferrer"
              >
                <InstagramIcon size={32} />
              </a>
              <a
                href="[https://facebook.com](https://facebook.com)"
                target="_blank"
                rel="noreferrer"
              >
                <FacebookIcon size={32} />
              </a>
            </div>
          </div>
        </div>

        <div className={css['footer-column']}>
          <h4 className={css['column-title']}>
            {t('title_review', 'ВАША ДУМКА')}
          </h4>
          <div className={css['first-row']}>
            <button className={css['review-trigger']} onClick={onOpenReview}>
              <ReviewIcon size={20} className={css['trigger-icon']} />
              <span className={css['trigger-text']}>
                {t('leave_review', 'ЗАЛИШИТИ ВІДГУК')}
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className={css['footer-divider']}></div>
      <div className={css['footer-bottom']}>
        <p>© {currentYear} Coffee House. All rights reserved.</p>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  onOpenReview: PropTypes.func.isRequired,
  onOpenCallback: PropTypes.func,
};

export default Footer;
