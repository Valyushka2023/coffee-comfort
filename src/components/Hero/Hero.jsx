import { useTranslation } from 'react-i18next';

import css from './Hero.module.css';

const Hero = () => {
  const { t } = useTranslation('hero');
  return (
    <section className={css['hero']}>
      <div className={css['overlay']}>
        <div className={css['container']}>
          <div className={css['content']}>
            <h1 className={css['title']}>
              {t('title', 'Our coffee is your mood')}
            </h1>
            <p className={css['subtitle']}>
              {t(
                'subtitle',
                'Freshly roasted coffee and signature desserts daily'
              )}
            </p>

            <div className={css['buttons']}>
              <a href="#menu">{t('menu_buttons', 'View menu')}</a>
              <a href="#contacts">{t('contacts_buttons', 'Visit us')} </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
