import { useSelector } from 'react-redux';
import { FiShoppingCart } from 'react-icons/fi';
import css from './CartIcon.module.css';

// eslint-disable-next-line react/prop-types
const CartIcon = ({ onClick }) => {
  const items = useSelector(state => state.cart.items); // Додано дужки (state)
  console.log('Products in Redux', items);
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <button
      type="button" // Тепер це правильний семантичний елемент
      className={css['btn-cart-icon']}
      onClick={() => {
        console.log('Click on the basket icon');
        onClick();
      }}
      aria-label="Basket"
    >
      <FiShoppingCart size={25} />
      {totalItems > 0 && <span className={css['badge']}>{totalItems}</span>}
    </button>
  );
};

export default CartIcon;
