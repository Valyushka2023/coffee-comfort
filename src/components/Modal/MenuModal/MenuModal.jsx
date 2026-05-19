/* eslint-disable react/prop-types */
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux'; // Імпорт для зв'язку з Redux
import { addToCart } from '../../../redux/cartSlice'; // Шлях до твого слайсу кошика
import css from './MenuModal.module.css';

const MenuModal = ({ item, onClose, formatPrice }) => {
  // Використовуємо префікс для меню, як у тебе було налаштовано
  const { t, i18n } = useTranslation('menu', { keyPrefix: 'menu_modal' });
  const dispatch = useDispatch();

  // Якщо товар не переданий, нічого не рендеримо
  if (!item) return null;

  // Функція для обробки натискання "Замовити зараз"
  const handleOrderClick = () => {
    dispatch(
      addToCart({
        ...item,
        id: item._id, // Копіюємо значення з _id в id
      })
    );
    onClose();
  };

  return (
    /* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
    <div className={css['modal-overlay']} onClick={onClose}>
      <div
        className={css['modal-content']}
        onClick={e => e.stopPropagation()}
        /* Додаємо анімацію появи, якщо вона є у твоєму CSS */
        style={{ animation: 'pop-in 0.4s ease-out' }}
      >
        <button
          className={css['close-icon']}
          onClick={onClose}
          type="button"
          aria-label="Close"
        >
          &times;
        </button>

        <div className={css['modal-body']}>
          <img
            src={item.img || '/images/default-coffee.webp'}
            alt={item.name?.[i18n.language] || 'Coffee Item'}
            className={css['modal-image']}
          />

          <div className={css['modal-info']}>
            <h3>{item.name?.[i18n.language]}</h3>
            <p className={css['modal-description']}>
              {item.description?.[i18n.language]}
            </p>
            <p className={css['modal-price']}>{formatPrice(item.price)}</p>
          </div>
        </div>

        <div className={css['modal-actions']}>
          <button
            className={css['select-btn']}
            onClick={handleOrderClick}
            type="button"
          >
            {/* Беремо переклад ключа order_now */}
            {t('order_now') || 'ORDER'}
          </button>
          <button className={css['cancel-btn']} onClick={onClose} type="button">
            {t('close') || 'CLOSE'}
          </button>
        </div>
      </div>
    </div>
    /* eslint-enable */
  );
};

export default MenuModal;
