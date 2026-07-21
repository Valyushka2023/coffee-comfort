import { useTranslation } from 'react-i18next';

import css from './Hero.module.css';

const Hero = () => {
  const { t } = useTranslation('hero');
  return (
    <section className={css['hero-section']}>
      <div className={css['hero-overlay']}>
        <div className={css['hero-container']}>
          <h1 className={css['hero-title']}>
            {t('title', 'Our coffee creates your mood')}
          </h1>
          <h2 className={css['hero-subtitle']}>
            {t(
              'subtitle',
              'Freshly roasted coffee and signature desserts daily'
            )}
          </h2>

          <div className={css['hero-links']}>
            <a href="#menu" className={css['hero-link']}>
              {t('menu_hero_link', 'View menu')}
            </a>
            <a href="#contacts" className={css['hero-link']}>
              {t('contacts_hero_link', 'Visit us')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
