import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

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
// import tabsEN from '../locales/en/tabs.json';
// import vechicleDetailsEN from '../locales/en/vechicle_details.json';
import filterLocationEN from '../locales/en/filter_location.json';
// import filterVehicleTypeEN from '../locales/en/filter_vehicle_type.json';
// import filterVehicleEquipmentEN from '../locales/en/filter_vehicle_equipment.json';
// import thankYouBookingPageEN from '../locales/en/thank_you_booking_page.json';
// import thankYouReviewsPageEN from '../locales/en/thank_you_reviews.page.json';
import starRatingEN from '../locales/en/star_rating.json';
import cardEN from '../locales/en/card.json';
import featureIconEN from '../locales/en/feature_icon.json';
import errorComponentEN from '../locales/en/error_component.json';
import contentDetailsEN from '../locales/en/content_details.json';
import contentReviewsEN from '../locales/en/content_reviews.json';
import fullScreenImageModalEN from '../locales/en/full_screen_image_modal.json';

// --- Оновлений namespace для одиниць виміру (англійська) --- //
const unitsEN = {
  m: 'm',
  l: 'l',
  km: 'km',
  l_per_100km: 'l/100km', // ✅ Додано ключ для витрати палива
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
// import tabsUK from '../locales/uk/tabs.json';
// import vechicleDetailsUK from '../locales/uk/vechicle_details.json';
import filterLocationUK from '../locales/uk/filter_location.json';
// import filterVehicleTypeUK from '../locales/uk/filter_vehicle_type.json';
// import filterVehicleEquipmentUK from '../locales/uk/filter_vehicle_equipment.json';
// import thankYouBookingPageUK from '../locales/uk/thank_you_booking_page.json';
// import thankYouReviewsPageUK from '../locales/uk/thank_you_reviews_page.json';
import starRatingUK from '../locales/uk/star_rating.json';
import cardUK from '../locales/uk/card.json';
import featureIconUK from '../locales/uk/feature_icon.json';
import errorComponentUK from '../locales/uk/error_component.json';
import contentDetailsUK from '../locales/uk/content_details.json';
import contentReviewsUK from '../locales/uk/content_reviews.json';
import fullScreenImageModalUK from '../locales/uk/full_screen_image_modal.json';

// --- Оновлений namespace для одиниць виміру (українська) --- //
const unitsUK = {
  m: 'м',
  l: 'л',
  km: 'км',
  l_per_100km: 'л/100км', // ✅ Додано ключ для витрати палива
};

// --- Підключення всіх перекладів --- //
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
    // tabs: tabsEN,
    // vechicle_details: vechicleDetailsEN,
    filter_location: filterLocationEN,
    // filter_vehicle_type: filterVehicleTypeEN,
    // filter_vehicle_equipment: filterVehicleEquipmentEN,
    // thank_you_booking_page: thankYouBookingPageEN,
    // thank_you_reviews_page: thankYouReviewsPageEN,
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
    // tabs: tabsUK,
    // vechicle_details: vechicleDetailsUK,
    filter_location: filterLocationUK,
    // filter_vehicle_type: filterVehicleTypeUK,
    // filter_vehicle_equipment: filterVehicleEquipmentUK,
    // thank_you_booking_page: thankYouBookingPageUK,
    // thank_you_reviews_page: thankYouReviewsPageUK,
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

// --- Ініціалізація i18next --- //
i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',

  interpolation: {
    escapeValue: false,
  },

  ns: [
    'button',
    'about_us',
    'card_list',
    'home',
    'catalog',
    'form_booking',
    'form_reviews',
    'header',
    'hero',
    'menu',
    'gallery',
    'reviews',
    'contacts',
    'footer',
    'about_modal',
    'services_modal',
    'prices_modal',
    'contacts_modal',
    'tabs',
    'vechicle_details',
    'filter_location',
    // 'filter_vehicle_type',
    // 'filter_vehicle_equipment',
    // 'thank_you_booking_page',
    // 'thank_you_reviews_page',
    'star_rating',
    'card',
    'feature_icon',
    'units',
    'error_component',
    'content_details',
    'content_reviews',
    'full_screen_image_modal',
  ],

  defaultNS: 'home',
});

// 🟢 Автоматичне оновлення атрибуту lang у <html>
document.documentElement.lang = i18n.language;
i18n.on('languageChanged', lng => {
  document.documentElement.lang = lng;
});
console.log('Контент меню (UK):', resources.uk.menu);
export default i18n;
