// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';

// // --- Імпорт файлів перекладу (EN) --- //
// import buttonEN from '../locales/en/button.json';
// import aboutUsEN from '../locales/en/about_us.json';
// import cardListEN from '../locales/en/card_list.json';
// import homeEN from '../locales/en/home.json';
// import catalogEN from '../locales/en/catalog.json';
// import formBookingEN from '../locales/en/form_booking.json';
// import formReviewsEN from '../locales/en/form_reviews.json';
// import headerEN from '../locales/en/header.json';
// import heroEN from '../locales/en/hero.json';
// import menuEN from '../locales/en/menu.json';
// import galleryEN from '../locales/en/gallery.json';
// import reviewsEN from '../locales/en/reviews.json';
// import contactsEN from '../locales/en/contacts.json';
// import footerEN from '../locales/en/footer.json';
// import aboutModalEN from '../locales/en/about_modal.json';
// import servicesModalEN from '../locales/en/services_modal.json';
// import pricesModalEN from '../locales/en/prices_modal.json';
// import contactsModalEN from '../locales/en/contacts_modal.json';
// import filterLocationEN from '../locales/en/filter_location.json';
// import starRatingEN from '../locales/en/star_rating.json';
// import cardEN from '../locales/en/card.json';
// import featureIconEN from '../locales/en/feature_icon.json';
// import errorComponentEN from '../locales/en/error_component.json';
// import contentDetailsEN from '../locales/en/content_details.json';
// import contentReviewsEN from '../locales/en/content_reviews.json';
// import fullScreenImageModalEN from '../locales/en/full_screen_image_modal.json';

// const unitsEN = {
//   m: 'm',
//   l: 'l',
//   km: 'km',
//   l_per_100km: 'l/100km',
// };

// // --- Імпорт файлів перекладу (UK) --- //
// import buttonUK from '../locales/uk/button.json';
// import aboutUsUK from '../locales/uk/about_us.json';
// import cardListUK from '../locales/uk/card_list.json';
// import homeUK from '../locales/uk/home.json';
// import catalogUK from '../locales/uk/catalog.json';
// import formBookingUK from '../locales/uk/form_booking.json';
// import formReviewsUK from '../locales/uk/form_reviews.json';
// import headerUK from '../locales/uk/header.json';
// import heroUK from '../locales/uk/hero.json';
// import menuUK from '../locales/uk/menu.json';
// import galleryUK from '../locales/uk/gallery.json';
// import reviewsUK from '../locales/uk/reviews.json';
// import contactsUK from '../locales/uk/contacts.json';
// import footerUK from '../locales/uk/footer.json';
// import aboutModalUK from '../locales/uk/about_modal.json';
// import servicesModalUK from '../locales/uk/services_modal.json';
// import pricesModalUK from '../locales/uk/prices_modal.json';
// import contactsModalUK from '../locales/uk/contacts_modal.json';
// import filterLocationUK from '../locales/uk/filter_location.json';
// import starRatingUK from '../locales/uk/star_rating.json';
// import cardUK from '../locales/uk/card.json';
// import featureIconUK from '../locales/uk/feature_icon.json';
// import errorComponentUK from '../locales/uk/error_component.json';
// import contentDetailsUK from '../locales/uk/content_details.json';
// import contentReviewsUK from '../locales/uk/content_reviews.json';
// import fullScreenImageModalUK from '../locales/uk/full_screen_image_modal.json';

// const unitsUK = {
//   m: 'м',
//   l: 'л',
//   km: 'км',
//   l_per_100km: 'л/100км',
// };

// const resources = {
//   en: {
//     button: buttonEN,
//     about_us: aboutUsEN,
//     card_list: cardListEN,
//     home: homeEN,
//     catalog: catalogEN,
//     form_booking: formBookingEN,
//     form_reviews: formReviewsEN,
//     header: headerEN,
//     hero: heroEN,
//     menu: menuEN,
//     gallery: galleryEN,
//     reviews: reviewsEN,
//     contacts: contactsEN,
//     footer: footerEN,
//     about_modal: aboutModalEN,
//     services_modal: servicesModalEN,
//     prices_modal: pricesModalEN,
//     contacts_modal: contactsModalEN,
//     filter_location: filterLocationEN,
//     star_rating: starRatingEN,
//     card: cardEN,
//     feature_icon: featureIconEN,
//     units: unitsEN,
//     error_component: errorComponentEN,
//     content_details: contentDetailsEN,
//     content_reviews: contentReviewsEN,
//     full_screen_image_modal: fullScreenImageModalEN,
//   },
//   uk: {
//     button: buttonUK,
//     about_us: aboutUsUK,
//     card_list: cardListUK,
//     home: homeUK,
//     catalog: catalogUK,
//     form_booking: formBookingUK,
//     form_reviews: formReviewsUK,
//     header: headerUK,
//     hero: heroUK,
//     menu: menuUK,
//     gallery: galleryUK,
//     reviews: reviewsUK,
//     contacts: contactsUK,
//     footer: footerUK,
//     about_modal: aboutModalUK,
//     services_modal: servicesModalUK,
//     prices_modal: pricesModalUK,
//     contacts_modal: contactsModalUK,
//     filter_location: filterLocationUK,
//     star_rating: starRatingUK,
//     card: cardUK,
//     feature_icon: featureIconUK,
//     units: unitsUK,
//     error_component: errorComponentUK,
//     content_details: contentDetailsUK,
//     content_reviews: contentReviewsUK,
//     full_screen_image_modal: fullScreenImageModalUK,
//   },
// };

// i18n.use(initReactI18next).init({
//   resources,
//   lng: 'en',
//   fallbackLng: 'en',
//   interpolation: {
//     escapeValue: false,
//   },
//   // Залишаємо тільки ті ns, для яких реально імпортовані файли
//   ns: Object.keys(resources.en),
//   defaultNS: 'home',
// });

// // Автоматичне оновлення атрибуту lang у <html>
// document.documentElement.lang = i18n.language;
// i18n.on('languageChanged', lng => {
//   document.documentElement.lang = lng;
// });

// export default i18n;
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// --- Імпорт файлів перекладу (EN) --- //
import buttonEN from '../locales/en/button.json';
import aboutUsEN from '../locales/en/about_us.json';
import cardListEN from '../locales/en/card_list.json';
import homeEN from '../locales/en/home.json';
import catalogEN from '../locales/en/catalog.json';
import formBookingEN from '../locales/en/form_booking.json';
import formReviewsEN from '../locales/en/form_reviews.json';
import headerEN from '../locales/en/header.json';
import heroEN from '../locales/en/hero.json';
import menuEN from '../locales/en/menu.json';
import galleryEN from '../locales/en/gallery.json';
import reviewsEN from '../locales/en/reviews.json';
import contactsEN from '../locales/en/contacts.json';
import footerEN from '../locales/en/footer.json';
import aboutModalEN from '../locales/en/about_modal.json';
import servicesModalEN from '../locales/en/services_modal.json';
import pricesModalEN from '../locales/en/prices_modal.json';
import contactsModalEN from '../locales/en/contacts_modal.json';
import filterLocationEN from '../locales/en/filter_location.json';
import starRatingEN from '../locales/en/star_rating.json';
import cardEN from '../locales/en/card.json';
import featureIconEN from '../locales/en/feature_icon.json';
import errorComponentEN from '../locales/en/error_component.json';
import contentDetailsEN from '../locales/en/content_details.json';
import contentReviewsEN from '../locales/en/content_reviews.json';
import fullScreenImageModalEN from '../locales/en/full_screen_image_modal.json';

const unitsEN = {
  m: 'm',
  l: 'l',
  km: 'km',
  l_per_100km: 'l/100km',
};

// --- Імпорт файлів перекладу (UK) --- //
import buttonUK from '../locales/uk/button.json';
import aboutUsUK from '../locales/uk/about_us.json';
import cardListUK from '../locales/uk/card_list.json';
import homeUK from '../locales/uk/home.json';
import catalogUK from '../locales/uk/catalog.json';
import formBookingUK from '../locales/uk/form_booking.json';
import formReviewsUK from '../locales/uk/form_reviews.json';
import headerUK from '../locales/uk/header.json';
import heroUK from '../locales/uk/hero.json';
import menuUK from '../locales/uk/menu.json';
import galleryUK from '../locales/uk/gallery.json';
import reviewsUK from '../locales/uk/reviews.json';
import contactsUK from '../locales/uk/contacts.json';
import footerUK from '../locales/uk/footer.json';
import aboutModalUK from '../locales/uk/about_modal.json';
import servicesModalUK from '../locales/uk/services_modal.json';
import pricesModalUK from '../locales/uk/prices_modal.json';
import contactsModalUK from '../locales/uk/contacts_modal.json';
import filterLocationUK from '../locales/uk/filter_location.json';
import starRatingUK from '../locales/uk/star_rating.json';
import cardUK from '../locales/uk/card.json';
import featureIconUK from '../locales/uk/feature_icon.json';
import errorComponentUK from '../locales/uk/error_component.json';
import contentDetailsUK from '../locales/uk/content_details.json';
import contentReviewsUK from '../locales/uk/content_reviews.json';
import fullScreenImageModalUK from '../locales/uk/full_screen_image_modal.json';

const unitsUK = {
  m: 'м',
  l: 'л',
  km: 'км',
  l_per_100km: 'л/100км',
};

const resources = {
  en: {
    button: buttonEN,
    about_us: aboutUsEN,
    card_list: cardListEN,
    home: homeEN,
    catalog: catalogEN,
    form_booking: formBookingEN,
    form_reviews: formReviewsEN,
    header: headerEN,
    hero: heroEN,
    menu: menuEN,
    gallery: galleryEN,
    reviews: reviewsEN,
    contacts: contactsEN,
    footer: footerEN,
    about_modal: aboutModalEN,
    services_modal: servicesModalEN,
    prices_modal: pricesModalEN,
    contacts_modal: contactsModalEN,
    filter_location: filterLocationEN,
    star_rating: starRatingEN,
    card: cardEN,
    feature_icon: featureIconEN,
    units: unitsEN,
    error_component: errorComponentEN,
    content_details: contentDetailsEN,
    content_reviews: contentReviewsEN,
    full_screen_image_modal: fullScreenImageModalEN,
  },
  uk: {
    button: buttonUK,
    about_us: aboutUsUK,
    card_list: cardListUK,
    home: homeUK,
    catalog: catalogUK,
    form_booking: formBookingUK,
    form_reviews: formReviewsUK,
    header: headerUK,
    hero: heroUK,
    menu: menuUK,
    gallery: galleryUK,
    reviews: reviewsUK,
    contacts: contactsUK,
    footer: footerUK,
    about_modal: aboutModalUK,
    services_modal: servicesModalUK,
    prices_modal: pricesModalUK,
    contacts_modal: contactsModalUK,
    filter_location: filterLocationUK,
    star_rating: starRatingUK,
    card: cardUK,
    feature_icon: featureIconUK,
    units: unitsUK,
    error_component: errorComponentUK,
    content_details: contentDetailsUK,
    content_reviews: contentReviewsUK,
    full_screen_image_modal: fullScreenImageModalUK,
  },
};

i18n
  .use(LanguageDetector) // Підключаємо автоматичне визначення мови
  .use(initReactI18next)
  .init({
    resources,
    // Параметр lng видалено, щоб дозволити LanguageDetector обирати мову
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'cookie', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage'], // Зберігати вибір мови в браузері
    },
    interpolation: {
      escapeValue: false,
    },
    ns: Object.keys(resources.en),
    defaultNS: 'home',
  });

// Оновлення атрибуту lang у <html> для SEO та доступності
document.documentElement.lang = i18n.language;

i18n.on('languageChanged', lng => {
  document.documentElement.lang = lng;
});

export default i18n;
