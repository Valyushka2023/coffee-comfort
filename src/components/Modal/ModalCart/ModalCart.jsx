/**
// ✅ Бариста натиснув "Скасувати" → статус cancelled
// ✅ Клієнт відкрив кошик → замовлення автоматично зникло
// ✅ Якщо кошик відкритий — перевірка кожні 30 секунд
// ✅ Якщо замовлення виконане (completed) — також зникне
// ✅ Якщо замовлення старше 40 хвилин — автоматично очищається з localStorage
// ✅ localStorage повністю очищається, коли активних замовлень більше немає
**/
import { generateAvailableSlots } from '../../../utils/timeUtils.js';
import { useEffect, useCallback, useState, useMemo } from 'react';
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

import {
  removeFromCart,
  addToCart,
  clearCart,
} from '../../../redux/cartSlice.js';
import { sendOrderRequest } from '../../../services/api.js';
import { validateName, validatePhone } from '../../../utils/index.js';
import css from './ModalCart.module.css';

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
          headers: {
            'Content-Type': 'application/json',
          },
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

  // Автоматична синхронізація активних замовлень клієнта з сервером
  useEffect(() => {
    if (!isOpen) return;

    syncActiveOrders();

    const interval = setInterval(() => {
      syncActiveOrders();
    }, 30000);

    return () => clearInterval(interval);
  }, [isOpen, syncActiveOrders]);

  // Отримуємо зайняті слоти
  useEffect(() => {
    if (!isOpen) return;

    const baseUrl = import.meta.env.VITE_API_URL || '';
    const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;

    fetch(`${cleanBaseUrl}/api/orders/busy-slots`)
      .then(res => {
        if (!res.ok) throw new Error('Помилка мережі');
        return res.json();
      })
      .then(data => setBusySlots(data.fullyBookedSlots || []))
      .catch(err => console.error('Помилка завантаження слотів:', err));
  }, [isOpen]);

  // КЕШУЄМО СЛОТИ
  const timeSlots = useMemo(() => {
    return generateAvailableSlots(10, busySlots);
  }, [busySlots]);

  // Автоматично виставляємо перший слот
  useEffect(() => {
    if (isOpen && timeSlots.length > 0 && !pickupTime) {
      setPickupTime(timeSlots[0].value);
    }
  }, [isOpen, timeSlots, pickupTime]);

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

  // Очищення полів при закритті вікна
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
    const currentInMinutes = now.getHours() * 60 + now.getMinutes();
    const minimumTimeRequired = currentInMinutes + 10;

    if (selectedInMinutes < minimumTimeRequired) {
      const errMsg = t('errors.too_early') || 'Занадто ранній час';
      setTimeError(errMsg);
      return false;
    }

    const openMinutes = 8 * 60;
    const closeMinutes = 21 * 60;

    if (selectedInMinutes < openMinutes || selectedInMinutes >= closeMinutes) {
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
    if (!phone) setPhone('+380');
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
    if (hasAttemptedSubmit) validatePickupTime(value);
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

    if (nameErr || phoneErr || !isTimeValid || items.length === 0) return;

    setIsLoading(true);

    const itemsSnapshot = items.map(item => ({
      id: item._id || item.id,
      title:
        item.name?.[currentLang] || item.name?.uk || item.name?.en || 'Item',
      quantity: item.quantity,
    }));

    try {
      const orderData = {
        customerName: name.trim(),
        customerPhone: phone.trim(),
        pickupTime,
        items: items.map(item => {
          let nameForSlug = 'item';
          if (item.name) {
            if (typeof item.name === 'string') nameForSlug = item.name;
            else if (item.name.uk) nameForSlug = item.name.uk;
            else if (item.name.en) nameForSlug = item.name.en;
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
      const generatedOrderNum =
        data.orderNumber || (data._id ? data._id.slice(-4) : 'XXXX');

      setOrderNum(generatedOrderNum);
      setIsOrdered(true);

      const newOrderInfo = {
        id: data._id, // Зберігаємо повний ID для подальшої валідації статусів
        number: generatedOrderNum,
        customerName: name.trim(), // 🚀 ЗБЕРІГАЄМО ІМ'Я ДЛЯ ОФІСНОГО ВІДЖЕТА
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
          {activeOrders.length > 0 && !isOrdered && (
            <div className={css['active-orders-container']}>
              <h3 className={css['active-orders-title']}>
                <FiClock className={css['banner-icon']} size={16} />
                {t('active_orders_heading', 'Ваші поточні замовлення:')}
              </h3>
              <ul className={css['active-orders-list']}>
                {activeOrders.map(order => (
                  <li key={order.number} className={css['active-order-item']}>
                    <div className={css['active-order-header']}>
                      {/* Новий контейнер для правильного групування елементів */}
                      <div className={css['active-order-info-block']}>
                        {/* Верхній рядок: Номер ліворуч, час праворуч */}
                        <div className={css['active-order-top-row']}>
                          <span className={css['active-order-number']}>
                            Замовлення{' '}
                            <strong>
                              {'# '}
                              {order.number}
                            </strong>
                          </span>
                          <span className={css['active-order-time']}>
                            {order.time}
                          </span>
                        </div>

                        {/* Нижній рядок: Ім'я клієнта залишається знизу */}
                        {order.customerName && (
                          <span className={css['active-order-customer']}>
                            {order.customerName}
                          </span>
                        )}
                      </div>
                    </div>
                    <ul className={css['active-order-subitems']}>
                      {order.items.map((item, idx) => (
                        <li key={idx}>
                          {item.title} — <strong>{item.quantity} шт.</strong>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {isOrdered ? (
            <div className={css['success-container']}>
              <FiCheckCircle size={80} color="var(--bg-accent)" />
              <h2 className={css['success-title']}>{t('thank_you')}</h2>
              <p className={css['order-number-label']}>{t('order_number')}</p>
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
                      style={{ paddingLeft: '16px', appearance: 'auto' }}
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

ModalCart.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalCart;
