import { useSelector } from 'react-redux';
import { FiShoppingCart } from 'react-icons/fi';
import css from './CartIcon.module.css';

const CartIcon = ({ onClick }) => {
  const items = useSelector(state => state.cart.items);
  console.log('Товари в Redux:', items);
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  const handleKeyDown = e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className={css['cart-icon-wrapper']}
      onClick={() => {
        console.log('Клік по іконці кошика');
        onClick();
      }}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex="0"
      aria-label="Кошик"
    >
      <FiShoppingCart size={30} />
      {totalItems > 0 && <span className={css['badge']}>{totalItems}</span>}
    </div>
  );
};

export default CartIcon;
