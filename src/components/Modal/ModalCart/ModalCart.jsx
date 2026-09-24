import PropTypes from 'prop-types';
import { Close } from '../../Icons';

import ActiveOrdersList from './ActiveOrdersList.jsx';

import OrderForm from './OrderForm.jsx';
import OrdersSuccess from './OrdersSuccess.jsx';

import { useModalCart } from '../../../hooks/useModalcart';

import css from './ModalCart.module.css';

const ModalCart = ({ isOpen, onClose }) => {
  const {
    t,
    isOrdered,
    isLoading,
    name,
    phone,
    pickupTime,
    hasAttemptedSubmit,
    phoneError,
    nameError,
    timeError,
    orderNum,
    activeOrders,
    items,
    totalAmount,
    currentLang,
    timeSlots,
    isButtonDisabled,
    handleNameChange,
    handlePhoneChange,
    handleTimeChange,
    handlePhoneFocus,
    handlePhoneBlur,
    handleOrder,

    removeItemFromCart,
    addCartItem,
    clearCartData,
  } = useModalCart({ isOpen, onClose });

  if (!isOpen) return null;

  return (
    <div className={css.overlay}>
      <button
        type="button"
        className={css['backdrop-button']}
        onClick={onClose}
        aria-label={t('close_modal')}
      />

      <div
        className={css.drawer}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-modal-title"
        tabIndex={-1}
      >
        <div className={css.header}>
          <h2 id="cart-modal-title" className={css['modal-title']}>
            {t('your_order')}
          </h2>

          {!isOrdered && (
            <button
              type="button"
              className={css['close-icon']}
              onClick={onClose}
              aria-label={t('close_modal')}
            >
              <Close size={24} />
            </button>
          )}
        </div>

        <div className={css.content}>
          {!isOrdered && (
            <ActiveOrdersList
              activeOrders={activeOrders}
              currentLang={currentLang}
            />
          )}

          {isOrdered ? (
            <OrdersSuccess
              orderNum={orderNum}
              pickupTime={pickupTime}
              onClose={onClose}
            />
          ) : items.length === 0 ? (
            <p className={css['modal-description']}>{t('empty_cart')}</p>
          ) : (
            <OrderForm
              items={items}
              currentLang={currentLang}
              name={name}
              phone={phone}
              pickupTime={pickupTime}
              nameError={nameError}
              phoneError={phoneError}
              timeError={timeError}
              hasAttemptedSubmit={hasAttemptedSubmit}
              isLoading={isLoading}
              totalAmount={totalAmount}
              timeSlots={timeSlots}
              isButtonDisabled={isButtonDisabled}
              onNameChange={handleNameChange}
              onPhoneChange={handlePhoneChange}
              onTimeChange={handleTimeChange}
              onPhoneFocus={handlePhoneFocus}
              onPhoneBlur={handlePhoneBlur}
              onSubmit={handleOrder}
              onIncrease={addCartItem}
              onDecrease={removeItemFromCart}
              onClearCart={clearCartData}
            />
          )}
        </div>
      </div>
    </div>
  );
};

ModalCart.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalCart;
