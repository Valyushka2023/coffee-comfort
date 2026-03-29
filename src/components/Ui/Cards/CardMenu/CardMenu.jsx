/* eslint-disable react/prop-types */
import { useTranslation } from 'react-i18next';
import css from './CardMenu.module.css';

const CardMenu = ({ item, formatPrice }) => {
  const { t } = useTranslation('card_menu');

  const itemKey = item.key || item.Key;
  const name = t(`items.${itemKey}.name`, item.name || itemKey);
  const description = t(`items.${itemKey}.desc`, item.desc || '');

  return (
    <div className={css['menu-card']}>
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
