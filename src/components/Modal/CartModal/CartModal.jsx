import { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import {
  FiX,
  FiTrash2,
  FiPlus,
  FiMinus,
  FiCheckCircle,
  FiUser,
  FiPhone,
  FiClock,
} from 'react-icons/fi';
import { removeFromCart, addToCart, clearCart } from '../../../redux/cartSlice';
import { sendOrderRequest } from '../../../services/api';
import css from './CartModal.module.css';

const CartModal = ({ isOpen, onClose }) => {
  // Використовуємо i18n для відстеження активної мови
  const { t, i18n } = useTranslation('menu');
  const dispatch = useDispatch();

  const [isOrdered, setIsOrdered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [orderNum, setOrderNum] = useState(null);
  const [minTimeStr, setMinTimeStr] = useState('');

  const { items, totalAmount } = useSelector(state => state.cart);

  // Визначаємо поточну мову (uk або en)
  const currentLang = (i18n.language || 'uk').slice(0, 2);

  const handleKeyDown = useCallback(
    e => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';

      const now = new Date();
      now.setMinutes(now.getMinutes() + 15);
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      setMinTimeStr(`${h}:${m}`);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleKeyDown]);

  useEffect(() => {
    if (isOpen) {
      setIsOrdered(false);
    }
  }, [isOpen]);

  const validatePickupTime = time => {
    if (!time) return true;

    const [hours, minutes] = time.split(':').map(Number);
    const now = new Date();
    const chosenTime = new Date();
    chosenTime.setHours(hours, minutes, 0, 0);

    const minRequiredTime = new Date(now.getTime() + 15 * 60000);
    if (chosenTime < minRequiredTime) {
      alert(t('cart_modal.errors.too_early'));
      return false;
    }

    const openTime = 8;
    const closeTime = 21;
    if (hours < openTime || hours >= closeTime) {
      alert(t('cart_modal.errors.working_hours'));
      return false;
    }

    return true;
  };

  const handleOrder = async () => {
    if (!validatePickupTime(pickupTime)) return;
    if (items.length === 0 || !name.trim() || !phone.trim()) return;

    setIsLoading(true);
    try {
      const orderData = {
        customerName: name,
        customerPhone: phone,
        pickupTime: pickupTime,
        items: items.map(item => ({
          _id: item._id || item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        totalPrice: totalAmount,
      };

      const data = await sendOrderRequest(orderData);

      setOrderNum(data.orderNumber || (data._id ? data._id.slice(-4) : 'XXXX'));
      setIsOrdered(true);

      dispatch(clearCart());
      setName('');
      setPhone('');
      setPickupTime('');
    } catch (error) {
      console.error('Error when placing an order:', error);
      alert(error.message || t('cart_modal.errors.generic'));
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  const isFormInvalid = !name.trim() || !phone.trim() || items.length === 0;

  return (
    <div className={css['overlay']}>
      <button
        type="button"
        className={css['backdrop-button']}
        onClick={onClose}
        aria-label={t('cart_modal.close_modal')}
      />

      <div
        className={css['drawer']}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
      >
        <div className={css['header']}>
          <h2 className={css['modal-title']}>{t('cart_modal.your_order')}</h2>
          <button className={css['close-icon']} onClick={onClose} type="button">
            <FiX size={24} />
          </button>
        </div>

        <div className={css['content']}>
          {isOrdered ? (
            <div className={css['success-container']}>
              <FiCheckCircle size={80} color="#2ecc71" />
              <h2 className={css['success-title']}>
                {t('cart_modal.thank_you')}
              </h2>
              <p className={css['order-number-label']}>
                {t('cart_modal.order_number')}
              </p>
              <div className={css['order-number-badge']}>#{orderNum}</div>
              <p className={css['warning-text']}>
                {t('cart_modal.warning_hold')}
              </p>
              <button
                className={css['order-btn']}
                onClick={onClose}
                type="button"
              >
                {t('cart_modal.understood')}
              </button>
            </div>
          ) : items.length === 0 ? (
            <p className={css['modal-description']}>
              {t('cart_modal.empty_cart')}
            </p>
          ) : (
            <>
              <ul className={css['items-list']}>
                {items.map(item => {
                  const itemTitle =
                    item.name?.[currentLang] || item.name?.uk || 'Item';

                  return (
                    <li key={item._id || item.id} className={css['item']}>
                      <img
                        src={item.img}
                        alt={itemTitle}
                        className={css['item-image']}
                      />
                      <div className={css['item-info']}>
                        <h4 className={css['item-title']}>{itemTitle}</h4>
                        <p className={css['item-price']}>
                          {item.price} {t('cart_modal.currency')}
                        </p>
                        <div className={css['controls']}>
                          <button
                            onClick={() =>
                              dispatch(removeFromCart(item._id || item.id))
                            }
                            className={css['count-btn']}
                            type="button"
                          >
                            <FiMinus />
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() => dispatch(addToCart(item))}
                            className={css['count-btn']}
                            type="button"
                          >
                            <FiPlus />
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className={css['form-group']}>
                <div className={css['form-group']}>
                  <FiUser className={css['form-icon']} />
                  <input
                    type="text"
                    placeholder={t('cart_modal.placeholder_name')}
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className={css['input-field']}
                  />
                </div>

                <div className={css['form-group']}>
                  <FiPhone className={css['form-icon']} />
                  <input
                    type="tel"
                    placeholder={t('cart_modal.placeholder_phone')}
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className={css['input-field']}
                  />
                </div>

                <div className={css['form-group']}>
                  <label
                    htmlFor="pickup-time"
                    className={css['time-input-label']}
                  >
                    <FiClock size={14} /> {t('cart_modal.pickup_time_label')}
                  </label>
                  <input
                    id="pickup-time"
                    type="time"
                    value={pickupTime}
                    min={minTimeStr}
                    onChange={e => setPickupTime(e.target.value)}
                    className={css['time-input-field']}
                  />
                </div>
              </div>

              <div className={css['checkout-section']}>
                <div className={css['total-row']}>
                  <span>{t('cart_modal.total')}</span>
                  <span>
                    {totalAmount} {t('cart_modal.currency')}
                  </span>
                </div>
                <button
                  type="button"
                  className={css['order-btn']}
                  onClick={handleOrder}
                  disabled={isLoading || isFormInvalid}
                >
                  {isLoading
                    ? t('cart_modal.sending')
                    : t('cart_modal.place_order')}
                </button>
                <button
                  type="button"
                  className={css['cancel-btn']}
                  onClick={() => dispatch(clearCart())}
                >
                  <FiTrash2 /> {t('cart_modal.clear_cart_btn')}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

CartModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CartModal;
