// import React from 'react';
import { useTranslation } from 'react-i18next';
import { MapPinIcon, ClockIcon } from '..//Icons';
import FormBooking from '..//Forms/FormBooking/FormBooking.jsx';
import css from './Contacts.module.css';

const Contacts = () => {
  const { t } = useTranslation('contacts');

  return (
    <section id="contacts-section" className={css['contacts-section']}>
      <div className={css['contacts-container']}>
        {/* ЛІВА ЧАСТИНА: ІНФОРМАЦІЯ */}
        <div className={css['contacts-info']}>
          <h2 className={css['contacts-title']}>{t('title', 'Visit Us')}</h2>
          <div className={css['contacts-item']}>
            <div className={`${css['item-row']} ${css['row-map']}`}>
              <MapPinIcon
                size={24}
                className={`${css['info-icon']} ${css['map-pin-animated']}`}
              />
              <span>{t('address', '12 Kavova St., Kyiv')}</span>
            </div>

            <div className={`${css['item-row']} ${css['row-clock']}`}>
              <ClockIcon size={24} className={css['info-icon']} />
              <span>{t('hours', 'Mon-Sun: 08:00 - 21:00')}</span>
            </div>
          </div>

          <div className={css['contacts-map']}>
            <iframe
              title={t('mapTitle', 'Google Maps Location')}
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2540.195719252907!2d30.560838000000007!3d50.45608!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNTDCsDI3JzIxLjkiTiAzMMKwMzMnMzkuMCJF!5e0!3m2!1sru!2sua!4v1771446592376!5m2!1sru!2sua"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* ПРАВА ЧАСТИНА: ФОРМА */}
        <div className={css['contacts-form-container']}>
          <FormBooking />
        </div>
      </div>
    </section>
  );
};

export default Contacts;
