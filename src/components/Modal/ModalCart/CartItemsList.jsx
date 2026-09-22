import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Plus, Minus } from '../../Icons';
import css from './CartItemsList.module.css';

const CartItemsList = ({ items, currentLang, onIncrease, onDecrease }) => {
  const { t } = useTranslation('cart_modal');

  return (
    <ul className={css['items-list']}>
      {items.map(item => {
        const itemTitle =
          item.name?.[currentLang] || item.name?.uk || item.name?.en || 'Item';
        return (
          <li key={item._id || item.id} className={css.item}>
            <img src={item.img} alt={itemTitle} className={css['item-image']} />
            <div className={css['item-info']}>
              <h4 className={css['item-title']}>{itemTitle}</h4>
              <p className={css['item-price']}>
                {item.price} {t('currency')}
              </p>
              <div className={css.controls}>
                <button
                  type="button"
                  className={css['count-btn']}
                  onClick={() => onDecrease(item._id || item.id)}
                  aria-label={t('decrease_quantity')}
                >
                  <Minus size={18} />
                </button>
                <span>{item.quantity}</span>
                <button
                  type="button"
                  className={css['count-btn']}
                  onClick={() => onIncrease(item)}
                  aria-label={t('increase_quantity')}
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

CartItemsList.propTypes = {
  items: PropTypes.array.isRequired,
  currentLang: PropTypes.string.isRequired,
  onIncrease: PropTypes.func.isRequired,
  onDecrease: PropTypes.func.isRequired,
};

export default CartItemsList;
