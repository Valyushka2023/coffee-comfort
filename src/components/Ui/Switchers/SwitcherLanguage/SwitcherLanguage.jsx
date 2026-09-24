import { useTranslation } from 'react-i18next';
import css from './SwitcherLanguage.module.css';

const SwitcherLanguage = () => {
  const { t, i18n } = useTranslation('header');

  const handleLanguageChange = lng => {
    i18n.changeLanguage(lng);
  };

  const currentLang =
    i18n.language && i18n.language.startsWith('uk') ? 'uk' : 'en';

  return (
    <div className={css['lang-switcher']}>
      <button
        type="button"
        onClick={() => handleLanguageChange('en')}
        className={`${currentLang === 'en' ? css['active'] : ''} ${css['language-en']}`}
      >
        {t('lang_en', 'EN')}
      </button>

      <span className={css.separator}>/</span>

      <button
        type="button"
        onClick={() => handleLanguageChange('uk')}
        className={`${currentLang === 'uk' ? css['active'] : ''} ${css['language-uk']}`}
      >
        {t('lang_uk', 'UK')}
      </button>
    </div>
  );
};

export default SwitcherLanguage;
