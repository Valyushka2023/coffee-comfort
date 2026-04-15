import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import buttonEN from '../locales/en/button.json';
import aboutUsEN from '../locales/en/about_us.json';
import formBookingEN from '../locales/en/form_booking.json';
import headerEN from '../locales/en/header.json';
import heroEN from '../locales/en/hero.json';
import menuEN from '../locales/en/menu.json';
import galleryEN from '../locales/en/gallery.json';
import reviewsEN from '../locales/en/reviews.json';
import reviewFormModalEN from '../locales/en/review_form_modal.json';
import footerEN from '../locales/en/footer.json';
import starRatingEN from '../locales/en/star_rating.json';
import cardMenuEN from '../locales/en/card_menu.json';
import contentReviewsEN from '../locales/en/content_reviews.json';
import fullScreenImageModalEN from '../locales/en/full_screen_image_modal.json';
import callbackModalEN from '../locales/en/callback_modal.json';
import validationEN from '../locales/en/validation.json';
import errorComponentEN from '../locales/en/error_component.json';

import buttonUK from '../locales/uk/button.json';
import aboutUsUK from '../locales/uk/about_us.json';
import formBookingUK from '../locales/uk/form_booking.json';
import headerUK from '../locales/uk/header.json';
import heroUK from '../locales/uk/hero.json';
import menuUK from '../locales/uk/menu.json';
import galleryUK from '../locales/uk/gallery.json';
import reviewsUK from '../locales/uk/reviews.json';
import reviewFormModalUK from '../locales/uk/review_form_modal.json';
import footerUK from '../locales/uk/footer.json';
import starRatingUK from '../locales/uk/star_rating.json';
import cardMenuUK from '../locales/uk/card_menu.json';
import contentReviewsUK from '../locales/uk/content_reviews.json';
import fullScreenImageModalUK from '../locales/uk/full_screen_image_modal.json';
import callbackModalUK from '../locales/uk/callback_modal.json';
import validationUK from '../locales/uk/validation.json';
import errorComponentUK from '../locales/uk/error_component.json'; // Додано

const resources = {
  en: {
    button: buttonEN,
    about_us: aboutUsEN,
    form_booking: formBookingEN,
    header: headerEN,
    hero: heroEN,
    menu: menuEN,
    gallery: galleryEN,
    reviews: reviewsEN,
    review_form_modal: reviewFormModalEN,
    footer: footerEN,
    star_rating: starRatingEN,
    card_menu: cardMenuEN,
    content_reviews: contentReviewsEN,
    full_screen_image_modal: fullScreenImageModalEN,
    callback_modal: callbackModalEN,
    validation: validationEN,
    error_component: errorComponentEN,
  },
  uk: {
    button: buttonUK,
    about_us: aboutUsUK,
    form_booking: formBookingUK,
    header: headerUK,
    hero: heroUK,
    menu: menuUK,
    gallery: galleryUK,
    reviews: reviewsUK,
    review_form_modal: reviewFormModalUK,
    footer: footerUK,
    star_rating: starRatingUK,
    card_menu: cardMenuUK,
    content_reviews: contentReviewsUK,
    full_screen_image_modal: fullScreenImageModalUK,
    callback_modal: callbackModalUK,
    validation: validationUK,
    error_component: errorComponentUK,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'cookie', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
    ns: Object.keys(resources.en),
    defaultNS: 'header',
  });

if (typeof window !== 'undefined') {
  document.documentElement.lang = i18n.language;
}

i18n.on('languageChanged', lng => {
  if (typeof window !== 'undefined') {
    document.documentElement.lang = lng;
  }
});

export default i18n;
