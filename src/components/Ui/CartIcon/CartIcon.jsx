import { useSelector } from 'react-redux';
import { FiShoppingCart } from 'react-icons/fi';
import PropTypes from 'prop-types'; // 1. Додаємо імпорт
import css from './CartIcon.module.css';

const CartIcon = ({ onClick }) => {
  const items = useSelector(state => state.cart.items);
  console.log('Товари в Redux:', items);
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <button
      type="button"
      className={css['cart-icon-wrapper']}
      onClick={() => {
        console.log('Клік по іконці кошика');
        onClick();
      }}
      aria-label="Кошик"
    >
      <FiShoppingCart size={30} />
      {totalItems > 0 && <span className={css['badge']}>{totalItems}</span>}
    </button>
  );
};

// 2. Описуємо тип для пропса в кінці файлу
CartIcon.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default CartIcon;
