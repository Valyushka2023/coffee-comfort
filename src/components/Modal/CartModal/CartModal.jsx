import { generateAvailableSlots } from '../../../utils/timeUtils.js';
import { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import clsx from 'clsx';
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
import { validateName, validatePhone } from '../../../utils/index.js';
import css from './CartModal.module.css';

const CartModal = ({ isOpen, onClose }) => {
  const { t, i18n } = useTranslation('cart_modal');
  const dispatch = useDispatch();

  const [isOrdered, setIsOrdered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [pickupTime, setPickupTime] = useState(''); // Залишаємо ТІЛЬКИ ОДИН pickupTime

  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [nameError, setNameError] = useState('');
  const [timeError, setTimeError] = useState('');

  const [orderNum, setOrderNum] = useState(null);

  const { items, totalAmount } = useSelector(state => state.cart);
  const currentLang = (i18n.language || 'uk').slice(0, 2);

  const [busySlots, setBusySlots] = useState([]);

  // Отримуємо зайняті слоти
  useEffect(() => {
    // Вкажіть правильний базовий URL, якщо запит йде не туди
    fetch('/api/orders/busy-slots')
      .then(res => res.json())
      .then(data => setBusySlots(data.fullyBookedSlots || []))
      .catch(err => console.error('Помилка завантаження слотів:', err));
  }, [isOpen]); // Оновлюємо слоти щоразу, коли відкривається модалка

  const timeSlots = generateAvailableSlots(10, busySlots);

  // Встановлюємо найперший доступний час автоматично
  useEffect(() => {
    if (timeSlots.length > 0 && !pickupTime && isOpen) {
      setPickupTime(timeSlots[0].value);
    }
  }, [timeSlots, pickupTime, isOpen]);

  // Моніторинг рендерів
  useEffect(() => {
    console.log('[CART MODAL MONITOR]:', {
      phone,
      phoneError,
      hasAttemptedSubmit,
      isCartEmpty: items.length === 0,
    });
  }, [phone, phoneError, hasAttemptedSubmit, items.length]);

  const handleKeyDown = useCallback(
    event => {
      if (event.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return undefined;

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleKeyDown]);

  useEffect(() => {
    if (isOpen) {
      setIsOrdered(false);
      setPhoneError('');
      setNameError('');
      setTimeError('');
      setHasAttemptedSubmit(false);
    }
  }, [isOpen]);

  const validatePickupTime = time => {
    if (!time) {
      setTimeError('');
      return true;
    }

    const [hours, minutes] = time.split(':').map(Number);
    const now = new Date();
    const selectedTime = new Date();
    selectedTime.setHours(hours, minutes, 0, 0);

    const minimumTime = new Date(now.getTime() + 10 * 60 * 1000); // Змінив на 10 хв згідно вашого бекенду

    if (selectedTime < minimumTime) {
      const errMsg = t('errors.too_early') || 'Занадто ранній час';
      setTimeError(errMsg);
      return false;
    }

    const openHour = 8;
    const closeHour = 21;

    if (hours < openHour || hours >= closeHour) {
      const errMsg = t('errors.working_hours') || 'Ми зачинені в цей час';
      setTimeError(errMsg);
      return false;
    }

    setTimeError('');
    return true;
  };

  const handlePhoneChange = event => {
    let input = event.target.value;

    if (input === '' || input === '+380') {
      setPhone(input);
      setPhoneError(
        hasAttemptedSubmit
          ? t('errors.phone_required') || 'Введіть номер телефону'
          : ''
      );
      return;
    }

    if (!input.startsWith('+380')) {
      const digits = input.replace(/\D/g, '');
      if (digits.startsWith('380')) {
        input = '+' + digits;
      } else {
        input = '+380' + digits.replace(/^0+/, '');
      }
    }

    const prefix = '+380';
    const dynamicPart = input.slice(4).replace(/\D/g, '').slice(0, 9);
    const fullPhone = prefix + dynamicPart;

    setPhone(fullPhone);

    if (fullPhone.length < 13) {
      const fallbackError =
        t('errors.invalid_phone') === 'errors.invalid_phone'
          ? 'Невірний формат номера телефону'
          : t('errors.invalid_phone') || 'Невірний формат номера телефону';

      setPhoneError(fallbackError);
    } else {
      const error = validatePhone(fullPhone, t);
      setPhoneError(error || '');
    }
  };

  const handlePhoneFocus = () => {
    if (!phone) {
      setPhone('+380');
    }
  };

  const handleNameChange = event => {
    const value = event.target.value;
    setName(value);

    if (hasAttemptedSubmit) {
      const error = validateName(value, t);
      setNameError(error || '');
    }
  };

  const handleTimeChange = event => {
    const value = event.target.value;
    setPickupTime(value);

    if (hasAttemptedSubmit) {
      validatePickupTime(value);
    }
  };

  const handleOrder = async e => {
    if (e && e.preventDefault) e.preventDefault();

    setHasAttemptedSubmit(true);

    const nameErr = validateName(name, t);
    let phoneErr = validatePhone(phone, t);
    const isTimeValid = validatePickupTime(pickupTime);

    if (!phoneErr && phone.length < 13) {
      phoneErr =
        t('errors.invalid_phone') === 'errors.invalid_phone'
          ? 'Невірний формат номера телефону'
          : t('errors.invalid_phone') || 'Невірний формат номера телефону';
    }
    setNameError(nameErr || '');
    setPhoneError(phoneErr || '');

    if (nameErr || phoneErr || !isTimeValid || items.length === 0) {
      console.log('Order blocked by frontend validation.');
      return;
    }

    setIsLoading(true);

    try {
      const orderData = {
        customerName: name.trim(),
        customerPhone: phone.trim(),
        pickupTime,
        items: items.map(item => {
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

          const generatedSlug = nameForSlug
            .toLowerCase()
            .trim()
            .replace(/[^a-zа-яєіїґ0-9\s-]/g, '')
            .replace(/\s+/g, '-');

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
      setHasAttemptedSubmit(false);
    } catch (error) {
      console.error('API Error during placement:', error);
      alert(error?.message || t('errors.generic'));
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  const isButtonDisabled = isLoading || items.length === 0;

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
              {/* <div className={css['order-number-badge']}>#{orderNum}</div> */}
              <div className={css['order-number-badge']}>
                {'# '}
                {orderNum}
              </div>
              <div className={css['pickup-time-info']}>
                <span className={css['pickup-time-text']}>
                  {t('pickup_time_info_label', 'Час отримання:')}{' '}
                  <strong className={css['pickup-time-value']}>
                    {pickupTime || t('closest_time', 'Найближчий час')}
                  </strong>
                </span>
              </div>
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
            <form
              onSubmit={handleOrder}
              noValidate
              className={css['checkout-form-container']}
            >
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
                {/* ІМ'Я */}
                <div className={css['form-group']}>
                  <div className={css['field-input-and-field-error']}>
                    <FiUser className={css['form-icon']} />
                    <input
                      type="text"
                      value={name}
                      onChange={handleNameChange}
                      autoComplete="off"
                      placeholder={t('placeholder_name') || "Ваше ім'я"}
                      className={clsx(
                        css['field-input'],
                        hasAttemptedSubmit && nameError && css['field-error']
                      )}
                    />
                    {hasAttemptedSubmit && nameError && (
                      <p className={css['error-popup']}>{nameError}</p>
                    )}
                  </div>
                </div>

                {/* ТЕЛЕФОН */}
                <div className={css['form-group']}>
                  <div className={css['field-input-and-field-error']}>
                    <FiPhone className={css['form-icon']} />
                    <input
                      type="tel"
                      value={phone}
                      onChange={handlePhoneChange}
                      onFocus={handlePhoneFocus}
                      autoComplete="off"
                      placeholder="+380XXXXXXXXX"
                      className={clsx(
                        css['field-input'],
                        hasAttemptedSubmit && phoneError && css['field-error']
                      )}
                    />
                    {hasAttemptedSubmit && phoneError && (
                      <p className={css['error-popup']}>{phoneError}</p>
                    )}
                  </div>
                </div>

                {/* БАЖАНИЙ ЧАС (Тільки випадаючий список) */}
                <div className={css['form-group']}>
                  <label
                    htmlFor="pickup-time-select"
                    className={css['label-input-time']}
                  >
                    <FiClock size={14} />
                    <span>
                      {t('pickup_time_label') || 'Оберіть час отримання:'}
                    </span>
                  </label>

                  <div className={css['field-input-and-field-error']}>
                    <select
                      id="pickup-time-select"
                      value={pickupTime}
                      onChange={handleTimeChange}
                      className={clsx(
                        css['field-input'],
                        css['field-input-time'],
                        hasAttemptedSubmit && timeError && css['field-error']
                      )}
                      style={{ paddingLeft: '16px', appearance: 'auto' }} // невелике корегування стилю для select
                    >
                      {timeSlots.map(slot => (
                        <option
                          key={slot.value}
                          value={slot.value}
                          disabled={slot.disabled}
                        >
                          {slot.label} {slot.disabled ? ' (Зайнято ☕)' : ''}
                        </option>
                      ))}
                    </select>
                    {hasAttemptedSubmit && timeError && (
                      <p className={css['error-popup']}>{timeError}</p>
                    )}
                  </div>
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
                  type="submit"
                  className={css['order-btn']}
                  disabled={isButtonDisabled}
                >
                  {isLoading ? t('sending') : t('place_order')}
                </button>

                <button
                  type="button"
                  className={css['cancel-btn']}
                  onClick={e => {
                    e.preventDefault();
                    dispatch(clearCart());
                  }}
                >
                  <FiTrash2 />
                  <span>{t('clear_cart_btn')}</span>
                </button>
              </div>
            </form>
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
