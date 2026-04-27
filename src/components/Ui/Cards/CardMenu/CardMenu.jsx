// /* eslint-disable react/prop-types */
// import { useTranslation } from 'react-i18next';
// import css from './CardMenu.module.css';

// const CardMenu = ({ item, formatPrice }) => {
//   const { t, i18n } = useTranslation('card_menu'); // Додали i18n для визначення мови

//   const itemKey = item.key || item.Key;

//   // Назва: пріоритет файлу перекладу, якщо немає — беремо ключ
//   const name = t(`items.${itemKey}.name`, itemKey);

//   // Опис: беремо мовну версію безпосередньо з об'єкта item, який прийшов з бази
//   // i18n.language поверне 'ua' або 'en'
//   const currentLang = i18n.language;
//   const description =
//     item.description?.[currentLang] || item.description?.ua || '';

//   return (
//     <div className={css['menu-card']}>
//       {/* ... ваш код фото ... */}
//       <div className={css['item-content']}>
//         <div className={css['item-header-row']}>
//           <h4 className={css['item-name']}>{name}</h4>
//           <span className={css['item-price']}>{formatPrice(item.price)}</span>
//         </div>
//         {/* Тепер тут відобразиться текст із бази */}
//         {description && (
//           <p className={css['item-description']}>{description}</p>
//         )}
//       </div>
//     </div>
//   );
// };
// export default CardMenu;
/**/

// import { useTranslation } from 'react-i18next';
// import css from './CardMenu.module.css';

// const CardMenu = ({ item, formatPrice }) => {
//   const { t } = useTranslation('card_menu');

//   const itemKey = item.key || item.Key;
//   const name = t(`items.${itemKey}.name`, item.name || itemKey);
//   const description = t(`items.${itemKey}.desc`, item.desc || '');

//   return (
//     <div className={css['menu-card']}>
//       <div className={css['item-photo-wrapper']}>
//         <img
//           src={item.img || '/images/default-coffee.webp'}
//           alt={name}
//           className={css['item-photo']}
//         />
//       </div>
//       <div className={css['item-content']}>
//         <div className={css['item-header-row']}>
//           <h4 className={css['item-name']}>{name}</h4>
//           <span className={css['item-price']}>{formatPrice(item.price)}</span>
//         </div>
//         {description && (
//           <p className={css['item-description']}>{description}</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CardMenu;

/**/
/* eslint-disable react/prop-types */
import { useTranslation } from 'react-i18next';
import css from './CardMenu.module.css';

const CardMenu = ({ item, formatPrice }) => {
  // Додаємо i18n для відстеження поточної мови (ua/en)
  const { t, i18n } = useTranslation('card_menu');

  const itemKey = item.key || item.Key;

  // Назву залишаємо через t(), щоб вона могла братися з JSON файлів перекладу
  const name = t(`items.${itemKey}.name`, item.name || itemKey);

  // ОПИС: Беремо безпосередньо з об'єкта item, який прийшов з бази.
  // Використовуємо i18n.language ('ua' або 'en'), щоб вибрати потрібне поле.
  // Додаємо захист від помилок (?.) та фолбек (||) на українську мову або пустий рядок.
  const description =
    item.description?.[i18n.language] || item.description?.ua || '';

  return (
    <div className={css['menu-card']}>
      <div className={css['item-photo-wrapper']}>
        <img
          src={item.img || '/images/default-coffee.webp'}
          alt={name}
          className={css['item-photo']}
        />
      </div>
      <div className={css['item-content']}>
        <div className={css['item-header-row']}>
          <h4 className={css['item-name']}>{name}</h4>
          <span className={css['item-price']}>{formatPrice(item.price)}</span>
        </div>

        {/* Відображаємо опис, якщо він не пустий */}
        {description && (
          <p className={css['item-description']}>{description}</p>
        )}
      </div>
    </div>
  );
};

export default CardMenu;
