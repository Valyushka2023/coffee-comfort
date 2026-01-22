import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Coffee, Flame, Home } from 'lucide-react';
import css from './AboutUs.module.css';

const AboutUs = () => {
  const { t } = useTranslation('about_Us');
  const sectionRef = useRef(null);

  useEffect(() => {
    // Використовуємо window. щоб ESLint не видавав помилку undef
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(css.isVisible);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${css['about-section']} ${css.reveal}`}
    >
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
                <strong className={css['about-accent-title']}>
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
                <strong className={css['about-accent-title']}>
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
                <strong className={css['about-accent-title']}>
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
          <div className={`${css['about-circle']} ${css['about-circle-big']}`}>
            <img src="/images/beans1.webp" alt="Beans" />
            <span className={css['about-circle-label']}>
              {t('circle_big', 'Beans')}
            </span>
          </div>
          <div
            className={`${css['about-circle']} ${css['about-circle-small']}`}
          >
            <img src="/images/roasting.webp" alt="Roasting" />
            <span className={css['about-circle-label']}>
              {t('circle_small', 'Roasting')}
            </span>
          </div>
          <div
            className={`${css['about-circle']} ${css['about-circle-medium']}`}
          >
            <img src="/images/cooking.webp" alt="Preparation" />
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
