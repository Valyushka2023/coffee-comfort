import { useState } from 'react';

import { useTranslation } from 'react-i18next';
import {
  MapPinIcon,
  ClockIcon,
  PhoneIcon,
  InstagramIcon,
  FacebookIcon,
  ReviewIcon,
} from '../Icons';

import ModalFormReview from '../Modal/ModalFormReview/ModalFormReview.jsx';
import ModalReviewSuccess from '../Modal/ModalReviewSuccess/ModalReviewSuccess.jsx';
import ModalFormCallback from '../Modal/ModalFormCallback/ModalFormCallback.jsx';

import ModalCallbackSuccess from '../Modal/ModalCallbackSuccess/ModalCallbackSuccess.jsx';

import css from './Footer.module.css';

const Footer = () => {
  const { t } = useTranslation('footer');
  const currentYear = new Date().getFullYear();

  // Стани для модалок відгуку
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [isReviewSuccessOpen, setIsReviewSuccessOpen] = useState(false);

  // Стани для модалок зворотного дзвінка
  const [isCallbackFormOpen, setIsCallbackFormOpen] = useState(false);
  const [isCallbackSuccessOpen, setIsCallbackSuccessOpen] = useState(false);

  const handleTouchFocus = e => {
    e.currentTarget.blur();
  };

  // Перемикання з форми відгуку на успіх
  const handleReviewSuccess = () => {
    setIsReviewFormOpen(false);

    setTimeout(() => {
      setIsReviewSuccessOpen(true);

      const reviewsSection = document.getElementById('reviews');
      if (reviewsSection) {
        const yOffset = -100;
        const y =
          reviewsSection.getBoundingClientRect().top +
          window.pageYOffset +
          yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 150);
  };

  // Перемикання з форми дзвінка на успіх
  const handleCallbackSuccess = () => {
    setIsCallbackFormOpen(false);

    setTimeout(() => {
      setIsCallbackSuccessOpen(true);
    }, 150);
  };

  // Відкриття форми зворотного дзвінка (напряму змінюємо локальний стейт)
  const handleOpenCallbackModal = e => {
    setIsCallbackFormOpen(true);
    handleTouchFocus(e);
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
            className={`${css['footer-column-item']} ${css['item-address']}`}
            onClick={handleTouchFocus}
          >
            <MapPinIcon size={18} />
            <span>{t('address', '12 Coffee St, Kyiv')}</span>
          </a>
          <div
            className={`${css['footer-column-item']} ${css['item-hours']} ${css['no-hover']}`}
          >
            <ClockIcon size={18} />
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
            className={css['footer-column-item']}
            onClick={handleTouchFocus}
          >
            <PhoneIcon size={18} />
            <span>+380 XX XXX XX XX</span>
          </a>
          <button
            type="button"
            className={css['callback-trigger']}
            onClick={handleOpenCallbackModal}
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
              className={css['social-icons-ig']}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              onPointerUp={e => setTimeout(() => e.currentTarget.blur(), 50)}
            >
              <InstagramIcon size={24} />
            </a>
            <a
              href="https://facebook.com"
              className={css['social-icons-fb']}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              onPointerUp={e => setTimeout(() => e.currentTarget.blur(), 50)}
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
              setIsReviewFormOpen(true);
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
        <p className={css['copyright']}>
          © {currentYear}{' '}
          {t('copyright', 'Coffee House. All rights reserved.')}
        </p>
      </div>

      {/* МОДАЛКИ ВІДГУКІВ */}
      <ModalFormReview
        isOpen={isReviewFormOpen}
        onClose={() => setIsReviewFormOpen(false)}
        onSuccess={handleReviewSuccess}
      />

      <ModalReviewSuccess
        isOpen={isReviewSuccessOpen}
        onClose={() => setIsReviewSuccessOpen(false)}
      />

      {/* МОДАЛКИ ЗВОРОТНОГО ДЗВІНКА */}
      <ModalFormCallback
        isOpen={isCallbackFormOpen}
        onClose={() => setIsCallbackFormOpen(false)}
        onSuccess={handleCallbackSuccess}
      />

      <ModalCallbackSuccess
        isOpen={isCallbackSuccessOpen}
        onClose={() => setIsCallbackSuccessOpen(false)}
      />
    </footer>
  );
};

export default Footer;
