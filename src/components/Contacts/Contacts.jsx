import { useTranslation } from 'react-i18next';
import css from './Contacts.module.css';

const Contacts = () => {
  // Додаємо i18n, щоб знати поточну мову додатку
  const { t, i18n } = useTranslation('contacts');

  // Визначаємо мову для карти (беремо поточну мову i18next)
  const currentLang = i18n.language || 'uk';

  return (
    <section className={css['contacts-section']}>
      <div className={css['contacts-content']}>
        <div className={css['contacts-info']}>
          <h2 className={css['contacts-title']}>{t('title', 'Visit Us')}</h2>
          <p className={css['contacts-adress']}>
            📍 {t('address', '12 Kavova St., Kyiv')}
          </p>
          <p className={css['contacts-hours']}>
            ⏰ {t('hours', 'Mon-Sun: 08:00 -21:00')}
          </p>

          <div className={css['contacts-map']}>
            <iframe
              title={t('mapTitle', 'Google Maps Location')}
              /* ВАЖЛИВО: 
                 1. Використовуйте hl=${currentLang} для зміни мови інтерфейсу.
                 2. Використовуйте q=Адреса для позначення місця.
              */
              /*src={https://www.google.com/search?q=https://maps.google.com/maps%3Fq%3D%D0%9A%D0%B8%D1%97%D0%B2,%D0%B2%D1%83%D0%BB.%D0%9A%D0%B0%D0%B2%D0%BE%D0%B2%D0%B0,12%26hl%3D${currentLang}&t=&z=15&ie=UTF8&iwloc=&output=embed}*/
              src={`https://www.google.com/maps?q=Київ,вул.Кавова,12&output=embed&hl=${currentLang}`}
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>

        <form className={css['contact-form']}>
          <input type="text" placeholder={t('form.name', 'Your Name')} />
          <input type="tel" placeholder={t('form.phone', 'Phone Number')} />
          <textarea placeholder={t('form.message', 'Message')}></textarea>
          <button type="submit" className={css['contact-submit-btn']}>
            {t('form.send', 'Book a Table')}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contacts;
