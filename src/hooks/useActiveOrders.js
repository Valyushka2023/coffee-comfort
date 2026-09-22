import { generateAvailableSlots } from '../../../utils/timeUtils.js';
import { useEffect, useCallback, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Close, Trash, Plus, Minus, User, Phone, Clock } from '../../Icons';

import {
  removeFromCart,
  addToCart,
  clearCart,
} from '../../../redux/cartSlice.js';
import { sendOrderRequest } from '../../../services/api.js';
import { validateName, validatePhone } from '../../../utils/index.js';

import ActiveOrdersList from './components/ActiveOrdersList.jsx';
import OrdersSuccess from './components/OrdersSuccess.jsx';

import css from './ModalCart.module.css';

const capitalizeName = name => {
  if (!name) return '';
  return name
    .toLowerCase()
    .replace(/(^|[\s-])[а-яєіїґa-z]/g, letter => letter.toUpperCase());
};

const ModalCart = ({ isOpen, onClose }) => {
  const { t, i18n } = useTranslation('cart_modal');
  const dispatch = useDispatch();

  const [isOrdered, setIsOrdered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [pickupTime, setPickupTime] = useState('');

  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [nameError, setNameError] = useState('');
  const [timeError, setTimeError] = useState('');

  const [orderNum, setOrderNum] = useState(null);
  const [activeOrders, setActiveOrders] = useState([]);

  const { items, totalAmount } = useSelector(state => state.cart);
  const currentLang = (i18n.language || 'uk').slice(0, 2);

  const [busySlots, setBusySlots] = useState([]);

  // Логіку синхронізації, валідації та сабміту залишаємо тут (або можна винести у кастомні хуки пізніше)
  const syncActiveOrders = useCallback(async () => {
    const stored = localStorage.getItem('activeOrders');
    if (!stored) {
      setActiveOrders([]);
      return;
    }
    try {
      const parsed = JSON.parse(stored);
      if (!Array.isArray(parsed)) return;

      const ORDER_LIFETIME = 40 * 60 * 1000;
      const freshOrders = parsed.filter(
        order => Date.now() - order.timestamp < ORDER_LIFETIME
      );
      const orderIds = freshOrders.map(o => o.id).filter(Boolean);

      if (orderIds.length === 0) {
        setActiveOrders([]);
        localStorage.removeItem('activeOrders');
        return;
      }

      const baseUrl = import.meta.env.VITE_API_URL || '';
      const cleanBaseUrl = baseUrl.endsWith('/')
        ? baseUrl.slice(0, -1)
        : baseUrl;

      const response = await fetch(
        `${cleanBaseUrl}/api/orders/validate-active`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderIds }),
        }
      );

      if (!response.ok) return;
      const { orders } = await response.json();
      const activeStatuses = ['new', 'preparing', 'ready'];

      const validatedOrders = freshOrders.filter(order => {
        const found = orders.find(o => o._id === order.id);
        return found && activeStatuses.includes(found.status);
      });

      setActiveOrders(validatedOrders);
      if (validatedOrders.length === 0) {
        localStorage.removeItem('activeOrders');
      } else {
        localStorage.setItem('activeOrders', JSON.stringify(validatedOrders));
      }
    } catch (error) {
      console.error('Помилка синхронізації замовлень:', error);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    syncActiveOrders();
    const interval = setInterval(syncActiveOrders, 30000);
    return () => clearInterval(interval);
  }, [isOpen, syncActiveOrders]);

  useEffect(() => {
    if (!isOpen) return;
    const baseUrl = import.meta.env.VITE_API_URL || '';
    const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;

    fetch(`${cleanBaseUrl}/api/orders/busy-slots`)
      .then(res => res.json())
      .then(data => setBusySlots(data.fullyBookedSlots || []))
      .catch(err => console.error('Помилка завантаження слотів:', err));
  }, [isOpen]);

  const timeSlots = useMemo(
    () => generateAvailableSlots(10, busySlots),
    [busySlots]
  );

  useEffect(() => {
    if (isOpen && timeSlots.length > 0 && !pickupTime) {
      setPickupTime(timeSlots[0].value);
    }
  }, [isOpen, timeSlots, pickupTime]);

  const handleKeyDown = useCallback(
    event => {
      if (event.key === 'Escape') onClose();
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
    } else {
      setName('');
      setPhone('');
      setPickupTime('');
    }
  }, [isOpen]);

  const validatePickupTime = time => {
    if (!time) {
      setTimeError('');
      return true;
    }
    const [hours, minutes] = time.split(':').map(Number);
    const selectedInMinutes = hours * 60 + minutes;
    const now = new Date();
    const minimumTimeRequired = now.getHours() * 60 + now.getMinutes() + 10;

    if (selectedInMinutes < minimumTimeRequired) {
      setTimeError(t('errors.too_early') || 'Занадто ранній час');
      return false;
    }
    if (selectedInMinutes < 8 * 60 || selectedInMinutes >= 21 * 60) {
      setTimeError(t('errors.working_hours') || 'Ми зачинені в цей час');
      return false;
    }
    setTimeError('');
    return true;
  };

  const handlePhoneChange = event => {
    let input = event.target.value;
    if (['', '+', '+3', '+38', '+380'].includes(input)) {
      setPhone('');
      setPhoneError(
        hasAttemptedSubmit
          ? t('errors.phone_required') || 'Введіть номер телефону'
          : ''
      );
      return;
    }
    if (!input.startsWith('+380')) {
      const digits = input.replace(/\D/g, '');
      input = digits.startsWith('380')
        ? '+' + digits
        : '+380' + digits.replace(/^0+/, '');
    }
    const fullPhone = '+380' + input.slice(4).replace(/\D/g, '').slice(0, 9);
    setPhone(fullPhone);

    if (fullPhone.length < 13) {
      setPhoneError('Невірний формат номера телефону');
    } else {
      setPhoneError(validatePhone(fullPhone, t) || '');
    }
  };

  const handleNameChange = event => {
    const formattedName = capitalizeName(event.target.value);
    setName(formattedName);
    if (hasAttemptedSubmit) setNameError(validateName(formattedName, t) || '');
  };

  const handleTimeChange = event => {
    const value = event.target.value;
    setPickupTime(value);
    if (hasAttemptedSubmit) validatePickupTime(value);
  };

  const handleOrder = async e => {
    if (e?.preventDefault) e.preventDefault();
    setHasAttemptedSubmit(true);

    const formattedName = capitalizeName(name.trim());
    const nameErr = validateName(formattedName, t);
    let phoneErr = validatePhone(phone, t);
    const isTimeValid = validatePickupTime(pickupTime);

    if (!phoneErr && phone.length < 13)
      phoneErr = 'Невірний формат номера телефону';
    setNameError(nameErr || '');
    setPhoneError(phoneErr || '');

    if (nameErr || phoneErr || !isTimeValid || items.length === 0) return;

    setIsLoading(true);
    const itemsSnapshot = items.map(item => ({
      id: item._id || item.id,
      name: item.name,
      quantity: item.quantity,
    }));

    try {
      const orderData = {
        customerName: formattedName,
        customerPhone: phone.trim(),
        pickupTime,
        items: items.map(item => ({
          _id: item._id || item.id,
          slug: item.slug || 'item',
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        totalPrice: totalAmount,
      };

      const data = await sendOrderRequest(orderData);
      const generatedOrderNum =
        data.orderNumber || (data._id ? data._id.slice(-4) : 'XXXX');

      setOrderNum(generatedOrderNum);
      setIsOrdered(true);

      const newOrderInfo = {
        id: data._id,
        number: generatedOrderNum,
        customerName: formattedName,
        time: pickupTime || t('closest_time', 'Найближчий час'),
        items: itemsSnapshot,
        timestamp: Date.now(),
      };

      const updatedOrders = [...activeOrders, newOrderInfo];
      setActiveOrders(updatedOrders);
      localStorage.setItem('activeOrders', JSON.stringify(updatedOrders));
      window.dispatchEvent(new Event('orderUpdated'));

      dispatch(clearCart());
      setHasAttemptedSubmit(false);
    } catch (error) {
      console.error('API Error:', error);
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
          {/* Хрестик ховається, якщо замовлення вже успішно оформлене */}
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

        <div className={css['content']}>
          {/* Використовуємо наш винесений компонент активних замовлень */}
          {!isOrdered && (
            <ActiveOrdersList
              activeOrders={activeOrders}
              currentLang={currentLang}
            />
          )}

          {isOrdered ? (
            /* Використовуємо наш винесений компонент екрана успіху */
            <OrdersSuccess
              orderNum={orderNum}
              pickupTime={pickupTime}
              onClose={onClose}
            />
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
                            <Minus size={18} />
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            type="button"
                            className={css['count-btn']}
                            onClick={() => dispatch(addToCart(item))}
                            aria-label={t('increase_quantity')}
                          >
                            <Plus size={18} />
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>

              {/* Форма введення даних (Ім'я, Телефон, Час) */}
              <div className={css['form-wrapper']}>
                <div className={css['form-group']}>
                  <div className={css['field-input-and-field-error']}>
                    <User className={css['form-icon']} size={18} />
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

                <div className={css['field-input-and-field-error']}>
                  <Phone className={css['form-icon']} size={18} />
                  <input
                    type="tel"
                    value={phone}
                    onChange={handlePhoneChange}
                    onFocus={() => {
                      if (!phone) setPhone('+380');
                    }}
                    onBlur={() => {
                      if (phone === '+380') setPhone('');
                    }}
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

                <div className={css['form-group']}>
                  <label
                    htmlFor="pickup-time-select"
                    className={css['label-input-time']}
                  >
                    <Clock size={18} className={css['clock-icon']} />
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
                      style={{ appearance: 'auto' }}
                    >
                      {timeSlots.map(slot => (
                        <option
                          key={slot.value}
                          value={slot.value}
                          disabled={slot.disabled}
                        >
                          {slot.isAsap
                            ? `${t('asap', 'Якомога швидше')} (${slot.time})`
                            : slot.label}
                          {slot.disabled
                            ? ` ${t('busy_slot', '(Зайнято ☕)')}`
                            : ''}
                        </option>
                      ))}
                    </select>
                    {hasAttemptedSubmit && timeError && (
                      <p className={css['error-popup']}>{timeError}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Кнопки замовлення та очищення */}
              <div className={css['checkout-section']}>
                <div className={css['total-row']}>
                  <span className={css['total-label']}>
                    {t('total', ' Всього')}
                  </span>
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
                  <Trash size={18} />
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

ModalCart.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalCart;
