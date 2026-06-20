/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../redux/cartSlice';
import Loader from '../../Ui/Loader/Loader.jsx'; // Переконайся, що шлях до лоадера правильний
import css from './MenuModal.module.css';

const MenuModal = ({ item, onClose, formatPrice }) => {
  const { t, i18n } = useTranslation('menu', { keyPrefix: 'menu_modal' });
  const dispatch = useDispatch();

  // Стейт для відстеження завантаження картинки
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // Скидаємо стейт завантаження, якщо раптом item змінився
  useEffect(() => {
    setIsImageLoaded(false);
  }, [item]);

  if (!item) return null;

  const currentLang = (i18n.language || 'uk').substring(0, 2);
  const dishName =
    item.name?.[currentLang] || item.name?.uk || item.name?.en || 'Coffee Item';
  const dishDescription =
    item.description?.[currentLang] ||
    item.description?.uk ||
    item.description?.en ||
    '';

  const handleOrderClick = () => {
    dispatch(
      addToCart({
        ...item,
        id: item._id,
      })
    );
    onClose();
  };

  const imageUrl = item.img || '/images/default-coffee.webp';

  return (
    /* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
    <div className={css['modal-overlay']} onClick={onClose}>
      {/* 1. Поки картинка кави качається, показуємо гарний лоадер по центру */}
      {!isImageLoaded && (
        <div style={{ pointerEvents: 'none' }}>
          <Loader type="container" size={60} />
        </div>
      )}

      {/* 2. Модалка рендериться в DOM завжди (щоб картинка почала качатись), 
             але стає видимою ТОДІ й ТІЛЬКИ тоді, коли фото готове. 
             Це гарантує ОДНОЧАСНУ появу всього вікна! */}
      <div
        className={css['modal-content']}
        onClick={e => e.stopPropagation()}
        style={{ display: isImageLoaded ? 'flex' : 'none' }}
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
          {/* Прихована картинка, яка тригерить стейт при повній готовності */}
          <img
            src={imageUrl}
            alt={dishName}
            className={css['modal-image']}
            onLoad={() => setIsImageLoaded(true)}
          />

          <div className={css['modal-info']}>
            {/* НОВИЙ БЛОК: Назва та ціна тепер в одному рядку */}
            <div className={css['modal-header-row']}>
              <h3>{dishName}</h3>
              <span className={css['modal-price']}>
                {formatPrice(item.price)}
              </span>
            </div>

            {/* Опис відображається акуратно під рядком назви та ціни */}
            <p className={css['modal-description']}>{dishDescription}</p>
          </div>
        </div>

        <div className={css['modal-actions']}>
          <button
            className={css['select-btn']}
            onClick={handleOrderClick}
            type="button"
          >
            {t('order_now', 'ORDER NOW')}
          </button>
          <button className={css['cancel-btn']} onClick={onClose} type="button">
            {t('close', 'CLOSE')}
          </button>
        </div>
      </div>
    </div>
    /* eslint-enable */
  );
};

export default MenuModal;
