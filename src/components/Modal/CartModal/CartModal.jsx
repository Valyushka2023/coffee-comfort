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
  const { t, i18n } = useTranslation('cart_modal');
  const dispatch = useDispatch();

  const [isOrdered, setIsOrdered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [pickupTime, setPickupTime] = useState('');

  const [orderNum, setOrderNum] = useState(null);
  const [minTimeStr, setMinTimeStr] = useState('');

  const { items, totalAmount } = useSelector(state => state.cart);
  const currentLang = (i18n.language || 'uk').slice(0, 2);

  const handleKeyDown = useCallback(
    event => {
      if (event.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    const now = new Date();
    now.setMinutes(now.getMinutes() + 15);
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    setMinTimeStr(`${hours}:${minutes}`);

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
    if (!time) {
      return true;
    }

    const [hours, minutes] = time.split(':').map(Number);
    const now = new Date();
    const selectedTime = new Date();
    selectedTime.setHours(hours, minutes, 0, 0);

    const minimumTime = new Date(now.getTime() + 15 * 60 * 1000);

    if (selectedTime < minimumTime) {
      alert(t('errors.too_early'));
      return false;
    }

    const openHour = 8;
    const closeHour = 21;

    if (hours < openHour || hours >= closeHour) {
      alert(t('errors.working_hours'));
      return false;
    }

    return true;
  };

  const handleOrder = async () => {
    if (!validatePickupTime(pickupTime)) {
      return;
    }

    if (items.length === 0) {
      return;
    }

    if (!name.trim()) {
      return;
    }

    if (!phone.trim()) {
      return;
    }

    setIsLoading(true);

    try {
      const orderData = {
        customerName: name.trim(),
        customerPhone: phone.trim(),
        pickupTime,

        // === ПОВНИЙ ФІКС ВАРІАНТУ 2 (БЕЗ СКОРОЧЕНЬ) ===
        items: items.map(item => {
          // 1. Визначаємо базову назву для створення безпечного slug
          let nameForSlug = 'item';
          if (item.name) {
            if (typeof item.name === 'string') {
              nameForSlug = item.name;
            } else if (item.name.uk) {
              nameForSlug = item.name.uk;
            } else if (item.name.en) {
              nameForSlug = item.name.en;
            }
          }

          // 2. Генеруємо чистий латинізований або локальний slug без пробілів та спецсимволів
          const generatedSlug = nameForSlug
            .toLowerCase()
            .trim()
            .replace(/[^a-zа-яєіїґ0-9\s-]/g, '')
            .replace(/\s+/g, '-');

          // 3. Повертаємо об'єкт, який гарантовано містить коректний slug для бази даних
          return {
            _id: item._id || item.id,
            slug: item.slug || generatedSlug,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          };
        }),

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
      console.error('Error while placing order:', error);
      alert(error?.message || t('errors.generic'));
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  const isFormInvalid = !name.trim() || !phone.trim() || items.length === 0;

  return (
    <div className={css['overlay']}>
      <button
        type="button"
        className={css['backdrop-button']}
        onClick={onClose}
        aria-label={t('close_modal')}
      />

      <div
        className={css['drawer']}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-modal-title"
        tabIndex={-1}
      >
        <div className={css['header']}>
          <h2 id="cart-modal-title" className={css['modal-title']}>
            {t('your_order')}
          </h2>

          <button
            type="button"
            className={css['close-icon']}
            onClick={onClose}
            aria-label={t('close_modal')}
          >
            <FiX size={24} />
          </button>
        </div>

        <div className={css['content']}>
          {isOrdered ? (
            <div className={css['success-container']}>
              <FiCheckCircle size={80} color="var(--bg-accent)" />
              <h2 className={css['success-title']}>{t('thank_you')}</h2>
              <p className={css['order-number-label']}>{t('order_number')}</p>
              <div className={css['order-number-badge']}>#{orderNum}</div>
              <p className={css['warning-text']}>{t('warning_hold')}</p>
              <button
                type="button"
                className={css['order-btn']}
                onClick={onClose}
                aria-label={t('understood')}
              >
                {t('understood')}
              </button>
            </div>
          ) : items.length === 0 ? (
            <p className={css['modal-description']}>{t('empty_cart')}</p>
          ) : (
            <>
              <ul className={css['items-list']}>
                {items.map(item => {
                  const itemTitle =
                    item.name?.[currentLang] ||
                    item.name?.uk ||
                    item.name?.en ||
                    'Item';

                  return (
                    <li key={item._id || item.id} className={css.item}>
                      <img
                        src={item.img}
                        alt={itemTitle}
                        className={css['item-image']}
                      />

                      <div className={css['item-info']}>
                        <h4 className={css['item-title']}>{itemTitle}</h4>
                        <p className={css['item-price']}>
                          {item.price} {t('currency')}
                        </p>

                        <div className={css.controls}>
                          <button
                            type="button"
                            className={css['count-btn']}
                            onClick={() =>
                              dispatch(removeFromCart(item._id || item.id))
                            }
                            aria-label={t('decrease_quantity')}
                          >
                            <FiMinus />
                          </button>

                          <span>{item.quantity}</span>

                          <button
                            type="button"
                            className={css['count-btn']}
                            onClick={() => dispatch(addToCart(item))}
                            aria-label={t('increase_quantity')}
                          >
                            <FiPlus />
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className={css['form-wrapper']}>
                <div className={css['form-group']}>
                  <FiUser className={css['form-icon']} />
                  <input
                    type="text"
                    value={name}
                    onChange={event => setName(event.target.value)}
                    placeholder={t('placeholder_name')}
                    className={css['field-input']}
                  />
                </div>

                <div className={css['form-group']}>
                  <FiPhone className={css['form-icon']} />
                  <input
                    type="text"
                    value={phone}
                    onChange={event => setPhone(event.target.value)}
                    placeholder="+380XXXXXXXXX"
                    pattern="^\+380\d{9}$"
                    className={css['field-input']}
                    required
                  />
                </div>

                <div className={css['form-group']}>
                  <label
                    htmlFor="pickup-time"
                    className={css['label-input-time']}
                  >
                    <FiClock size={14} />
                    <span>{t('pickup_time_label')}</span>
                  </label>

                  <input
                    id="pickup-time"
                    type="time"
                    value={pickupTime}
                    min={minTimeStr}
                    onChange={event => setPickupTime(event.target.value)}
                    className={css['field-input-time']}
                  />
                </div>
              </div>

              <div className={css['checkout-section']}>
                <div className={css['total-row']}>
                  <span>{t('total')}</span>
                  <span>
                    {totalAmount} {t('currency')}
                  </span>
                </div>

                <button
                  type="button"
                  className={css['order-btn']}
                  onClick={handleOrder}
                  disabled={isLoading || isFormInvalid}
                >
                  {isLoading ? t('sending') : t('place_order')}
                </button>

                <button
                  type="button"
                  className={css['cancel-btn']}
                  onClick={() => dispatch(clearCart())}
                >
                  <FiTrash2 />
                  <span>{t('clear_cart_btn')}</span>
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
