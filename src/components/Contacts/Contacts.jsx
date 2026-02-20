import { useTranslation } from 'react-i18next';
import FormBooking from '../Forms/FormBooking/FormBooking.jsx'; // Переконайтеся, що шлях правильний
import { MapPinIcon, ClockIcon } from '../Icons';
import css from './Contacts.module.css';

const Contacts = () => {
  const { t } = useTranslation('contacts');
  return (
    <section id="contacts-section" className={css['contacts-section']}>
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
              // Якщо ви ще не маєте фінального посилання від клієнта, ваш поточний варіант (з заміною на прямий рядок) підходить для тестування, але перед деплоєм обов'язково отримайте реальний код через кнопку "Share" -> "Embed a map" у Google Maps.
              src={
                'https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2540.195719252907!2d30.560838000000007!3d50.45608!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNTDCsDI3JzIxLjkiTiAzMMKwMzMnMzkuMCJF!5e0!3m2!1sru!2sua!4v1771446592376!5m2!1sru!2sua'
              }
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
