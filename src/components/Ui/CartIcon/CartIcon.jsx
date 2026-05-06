// import { useSelector } from 'react-redux';
// import { useTranslation } from 'react-i18next';
// import { FiShoppingBag } from 'react-icons/fi';
// import css from './CartIcon.module.css';

// const CartIcon = ({ onClick }) => {
//   const { t } = useTranslation('menu');

//   const totalItems = useSelector(state =>
//     state.cart.items.reduce((total, item) => total + item.quantity, 0)
//   );

//   // Обробник натискання клавіш для доступності
//   const handleKeyDown = event => {
//     if (event.key === 'Enter' || event.key === ' ') {
//       event.preventDefault();
//       onClick();
//     }
//   };

//   return (
//     <div
//       className={css['cart-fixed-container']} // Використовуємо контейнер для позиціонування
//       onClick={onClick}
//       onKeyDown={handleKeyDown} // Додано для виправлення помилки ESLint
//       role="button"
//       tabIndex="0"
//       aria-label={t('cart') || 'Кошик'}
//     >
//       <div className={css['cart-button']}>
//         <FiShoppingBag className={css['cart-icon']} />
//         {totalItems > 0 && <span className={css['badge']}>{totalItems}</span>}
//       </div>
//     </div>
//   );
// };

// export default CartIcon;
// /**/

/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { useSelector } from 'react-redux';
import { FiShoppingCart } from 'react-icons/fi';
import css from './CartIcon.module.css';

const CartIcon = ({ onClick }) => {
  const items = useSelector(state => state.cart.items);
  console.log('Товари в Redux:', items);
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <div
      className={css['cart-icon-wrapper']}
      onClick={() => {
        console.log('Клік по іконці кошика');
        onClick();
      }}
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
