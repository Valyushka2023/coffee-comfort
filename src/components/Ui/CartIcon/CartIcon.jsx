import { useSelector } from 'react-redux';
import { FiShoppingCart } from 'react-icons/fi';
import css from './CartIcon.module.css';

// eslint-disable-next-line react/prop-types
const CartIcon = ({ onClick }) => {
  const items = useSelector(state => state.cart.items); // Додано дужки (state)
  console.log('Товари в Redux:', items);
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <button
      type="button" // Тепер це правильний семантичний елемент
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

export default CartIcon;
