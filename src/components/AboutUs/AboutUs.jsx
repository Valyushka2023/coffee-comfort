import { useTranslation } from 'react-i18next';
import { Coffee, Flame, Home } from 'lucide-react';
import css from './AboutUs.module.css';

const AboutUs = () => {
  const { t } = useTranslation('about_Us');
  return (
    <section className={css['about-section']}>
      {/* Декоративні зерна на фоні */}
      {/* <div className={`${css.bean} ${css.bean1}`}></div>
      <div className={`${css.bean} ${css.bean2}`}></div> */}

      <div className={css['about-container']}>
        <div className={css['about-text-block']}>
          <h2 className={css['about-title']}>{t('title', 'Our history')}</h2>
          <p className={css['about-history']}>
            {t(
              'history',
              'Coffee Comfort started with one small dream about the perfect cup of coffee. And today our coffee is not just a drink. It is your mood, a conversation, silence or the beginning of something new.'
            )}
          </p>
          <ul className={css['about-features']}>
            <li>
              <div className={css['about-icon-circle']}>
                <Coffee size={20} />
              </div>
              <div>
                <strong className={css['about-select']}>
                  {t('select', 'Selected beans')}
                </strong>
                <p className={css['beans']}>
                  {t(
                    'beans',
                    'We use direct supplies from plantations in Ethiopia and Brazil.'
                  )}
                </p>
              </div>
            </li>
            <li>
              <div className={css['about-icon-circle']}>
                <Flame size={20} />
              </div>
              <div>
                <strong className={css['roast']}>
                  {t('roast', 'Hand Roasted')}
                </strong>
                <p className={css['roasting']}>
                  {t(
                    'roasting',
                    'We control every degree to reveal the taste.'
                  )}
                </p>
              </div>
            </li>
            <li>
              <div className={css['about-icon-circle']}>
                <Home size={20} />
              </div>
              <div>
                <strong className={css['cook']}>
                  {t('cook', 'The magic of cooking')}
                </strong>
                <p className={css['cooking']}>
                  {t(
                    'cooking',
                    'We prepare coffee with care so that each cup is exactly the one you need right now.'
                  )}
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className={css['about-image-composition']}>
          {/* Використовуємо реальні назви файлів з вашої папки public/images */}
          <div className={`${css['about-circle']} ${css['about-circle-big']}`}>
            <img src="/images/beans1.jpg" alt="Beans" />
            <span className={css['about-circle-label']}>
              {t('circle_big', 'Beans')}
            </span>
          </div>
          <div
            className={`${css['about-circle']} ${css['about-circle-small']}`}
          >
            <img src="/images/roasting.jpg" alt="Roasting" />
            <span className={css['about-circle-label']}>
              {t('circle_small', 'Roasting')}
            </span>
          </div>
          <div
            className={`${css['about-circle']} ${css['about-circle-medium']}`}
          >
            <img src="/images/cooking.jpg" alt="Preparation" />
            <span className={css['about-circle-label']}>
              {t('circle_medium', 'Magic')}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
