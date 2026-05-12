/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
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
  const { t } = useTranslation('menu');
  const dispatch = useDispatch();

  const [isOrdered, setIsOrdered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [orderNum, setOrderNum] = useState(null);
  const [minTimeStr, setMinTimeStr] = useState('');

  const { items, totalAmount } = useSelector(state => state.cart);

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

  // Скидаємо стан успіху при відкритті модалки
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
      alert('Будь ласка, обирайте час не раніше ніж за 15 хвилин від зараз.');
      return false;
    }

    const openTime = 8;
    const closeTime = 21;
    if (hours < openTime || hours >= closeTime) {
      alert(`Вибачте, кав'ярня працює з ${openTime}:00 до ${closeTime}:00.`);
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
        totalPrice: totalAmount, // Змінено з totalAmount на totalPrice для бекенду
      };

      const data = await sendOrderRequest(orderData);

      setOrderNum(data.orderNumber || (data._id ? data._id.slice(-4) : 'XXXX'));
      setIsOrdered(true);

      dispatch(clearCart());
      setName('');
      setPhone('');
      setPickupTime('');
    } catch (error) {
      console.error('Помилка при оформленні замовлення:', error);
      alert(error.message || 'Вибачте, сталася помилка.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={css.overlay} onClick={onClose}>
      <div
        className={css.drawer}
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        tabIndex="-1"
      >
        <div className={css.header}>
          <h2 className={css['modal-title']}>{t('cart_modal.your_order')}</h2>
          <button className={css['close-icon']} onClick={onClose} type="button">
            <FiX size={24} />
          </button>
        </div>

        <div className={css.content}>
          {isOrdered ? (
            <div
              style={{
                textAlign: 'center',
                marginTop: '30px',
                padding: '20px',
              }}
            >
              <FiCheckCircle size={80} color="#2ecc71" />
              <h2 style={{ color: '#2c3e50' }}>Дякуємо, {name}!</h2>
              <p style={{ fontSize: '1.2rem' }}>Ваш номер замовлення:</p>
              <div
                style={{
                  background: '#f1c40f',
                  display: 'inline-block',
                  padding: '10px 20px',
                  borderRadius: '10px',
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  margin: '10px 0',
                }}
              >
                #{orderNum}
              </div>
              <p
                style={{
                  color: '#e67e22',
                  fontWeight: 'bold',
                  marginTop: '20px',
                }}
              >
                ⚠️ Ми тримаємо замовлення 20 хвилин, після чого воно буде
                розформоване.
              </p>
              <button
                className={css['order-btn']}
                onClick={onClose}
                style={{ marginTop: '20px' }}
                type="button"
              >
                Зрозумів
              </button>
            </div>
          ) : items.length === 0 ? (
            <p className={css['modal-description']}>
              {t('cart_modal.empty_cart')}
            </p>
          ) : (
            <>
              <ul
                className={css.itemsList}
                style={{ listStyle: 'none', padding: 0, margin: 0 }}
              >
                {items.map(item => (
                  <li key={item._id || item.id} className={css.item}>
                    <img
                      src={item.img}
                      alt={item.name?.uk}
                      className={css['item-img']}
                    />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: 0 }}>{item.name?.uk}</h4>
                      <p
                        style={{
                          margin: '5px 0',
                          color: '#d35400',
                          fontWeight: 'bold',
                        }}
                      >
                        {item.price} грн
                      </p>
                      <div className={css.controls}>
                        <button
                          onClick={() =>
                            dispatch(removeFromCart(item._id || item.id))
                          }
                          className={css.countBtn}
                          type="button"
                        >
                          <FiMinus />
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => dispatch(addToCart(item))}
                          className={css.countBtn}
                          type="button"
                        >
                          <FiPlus />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div style={{ padding: '20px 0', borderTop: '1px solid #eee' }}>
                <div style={{ marginBottom: '15px', position: 'relative' }}>
                  <FiUser
                    style={{
                      position: 'absolute',
                      left: '10px',
                      top: '12px',
                      color: '#95a5a6',
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Ваше ім'я"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 10px 10px 35px',
                      borderRadius: '8px',
                      border: '1px solid #ddd',
                    }}
                  />
                </div>
                <div style={{ marginBottom: '15px', position: 'relative' }}>
                  <FiPhone
                    style={{
                      position: 'absolute',
                      left: '10px',
                      top: '12px',
                      color: '#95a5a6',
                    }}
                  />
                  <input
                    type="tel"
                    placeholder="Номер телефону"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 10px 10px 35px',
                      borderRadius: '8px',
                      border: '1px solid #ddd',
                    }}
                  />
                </div>

                <div style={{ marginTop: '15px' }}>
                  <label
                    htmlFor="pickup-time"
                    style={{
                      marginBottom: '5px',
                      fontSize: '0.9rem',
                      color: '#7f8c8d',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                  >
                    <FiClock size={14} /> Бажаний час (необов&apos;язково):
                  </label>
                  <input
                    id="pickup-time"
                    type="time"
                    value={pickupTime}
                    min={minTimeStr}
                    onChange={e => setPickupTime(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '8px',
                      border: '1px solid #ddd',
                      fontSize: '1rem',
                      fontFamily: 'inherit',
                    }}
                  />
                </div>
              </div>

              <div
                style={{
                  marginTop: 'auto',
                  paddingTop: '10px',
                  borderTop: '2px solid #eee',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    marginBottom: '15px',
                  }}
                >
                  <span>Всього:</span>
                  <span>{totalAmount} грн</span>
                </div>
                <button
                  type="button"
                  className={css['order-btn']}
                  onClick={handleOrder}
                  disabled={
                    isLoading ||
                    !name.trim() ||
                    !phone.trim() ||
                    items.length === 0
                  }
                  style={{
                    opacity:
                      !name.trim() || !phone.trim() || items.length === 0
                        ? 0.6
                        : 1,
                  }}
                >
                  {isLoading ? 'Відправка...' : 'Оформити замовлення'}
                </button>
                <button
                  type="button"
                  className={css['cancel-btn']}
                  onClick={() => dispatch(clearCart())}
                  style={{
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    color: '#95a5a6',
                    marginTop: '10px',
                    cursor: 'pointer',
                  }}
                >
                  <FiTrash2 /> Очистити кошик
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
