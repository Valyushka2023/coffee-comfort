import { useTranslation } from 'react-i18next';
import FormBooking from '../Forms/FormBooking/FormBooking.jsx'; // Переконайтеся, що шлях правильний
import { MapPinIcon, ClockIcon } from '../Icons';
import css from './Contacts.module.css';

const Contacts = () => {
  // Додаємо i18n, щоб знати поточну мову додатку
  const { t, i18n } = useTranslation('contacts');

  // Визначаємо мову для карти
  const currentLang = i18n.language || 'uk';

  return (
    // Додаємо id="contacts", щоб працював якірний скрол з хедера
    <section id="contacts" className={css['contacts-section']}>
      <div className={css['contacts-content']}>
        {/* ЛІВА ЧАСТИНА: Інформація та Карта */}
        <div className={css['contacts-info']}>
          <h2 className={css['contacts-title']}>{t('title', 'Visit Us')}</h2>
          <p className={css['contacts-item']}>
            <MapPinIcon
              size={24}
              color="var(--icon-map-color)"
              /* Додаємо два класи: базовий і анімаційний */
              className={`${css['info-icon']} ${css['map-pin-animated']}`}
            />
            <span>{t('address', '12 Kavova St., Kyiv')}</span>
          </p>

          <p className={css['contacts-item']}>
            <ClockIcon
              size={24}
              color="var(--icon-clock-color)"
              className={css['info-icon']}
            />
            <span>{t('hours', 'Mon-Sun: 08:00 - 21:00')}</span>
          </p>

          <div className={css['contacts-map']}>
            <iframe
              title={t('mapTitle', 'Google Maps Location')}
              src={`https://maps.google.com/maps?q=Kyiv,12%20Kavova%20St&hl=${currentLang}&z=15&output=embed`}
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* ПРАВА ЧАСТИНА: Нова форма з валідацією та повідомленням про успіх */}
        <div className={css['contact-form-container']}>
          <FormBooking />
        </div>
      </div>
    </section>
  );
};

export default Contacts;
