/* eslint-disable react/prop-types */
import { useTranslation } from 'react-i18next';
import css from './CardMenu.module.css';

const CardMenu = ({ item, formatPrice, onOpenModal }) => {
  // const { i18n } = useTranslation('card_menu');
  const { t, i18n } = useTranslation('card_menu');

  const name = item.name?.[i18n.language] || item.name?.uk || item.key;
  const description =
    item.description?.[i18n.language] || item.description?.uk || '';

  // Функція для обробки натискання клавіш Enter або Space
  const handleKeyDown = event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onOpenModal();
    }
  };

  return (
    <div
      className={css['menu-card']}
      onClick={onOpenModal}
      onKeyDown={handleKeyDown} // Додаємо цей рядок
      role="button"
      tabIndex="0"
      aria-label={t('view_details', { defaultValue: 'View details' })} // Покращуємо доступність
    >
      <div className={css['item-photo-wrapper']}>
        <img
          src={item.img || '/images/default-coffee.webp'}
          alt={name}
          className={css['item-photo']}
        />
      </div>
      <div className={css['item-content']}>
        <div className={css['item-header-row']}>
          <h4 className={css['item-name']}>{name}</h4>
          <span className={css['item-price']}>{formatPrice(item.price)}</span>
        </div>

        {description && (
          <p className={css['item-description']}>{description}</p>
        )}
      </div>
    </div>
  );
};

export default CardMenu;
/**/
