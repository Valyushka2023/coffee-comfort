import { useSelector } from 'react-redux';
import { FiShoppingCart } from 'react-icons/fi';
import PropTypes from 'prop-types';
import css from './CartIcon.module.css';

const CartIcon = ({ onClick }) => {
  const items = useSelector(state => state.cart.items);
  console.log('Products in Redux', items);
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <button
      type="button"
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

CartIcon.propTypes = {
  onClick: PropTypes.func.isRequired,
};
export default CartIcon;
