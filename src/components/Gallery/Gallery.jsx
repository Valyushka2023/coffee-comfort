// import { useTranslation } from 'react-i18next';
// import css from './Gallery.module.css';

// const images = [
//   {
//     id: 1,
//     src: '/public/images/interior.jpg',
//     alt: 'Cozy corner',
//   },
//   {
//     id: 2,
//     src: '/public/images/cappuccino1.jpg',
//     alt: 'Fresh cappuccino',
//   },
//   {
//     id: 3,
//     src: '/public/images/interior1.jpg',
//     alt: 'Window seat',
//   },
//   {
//     id: 4,
//     src: '/public/images/croissant3.jpg',
//     alt: 'Freshly baked croissant',
//   },
//   {
//     id: 5,
//     src: '/public/images/barista.jpg',
//     alt: 'Barista at work',
//   },
//   {
//     id: 6,
//     src: '/public/images/details.jpg',
//     alt: 'Coffee shop details',
//   },
// ];

// const Gallery = () => {
//   const { t } = useTranslation('gallery');

//   return (
//     <section className={css['gallery-section']}>
//       <div className={css['gallery-container']}>
//         <header className={css['gallery-header']}>
//           <h2 className={css['gallery-title']}>
//             {t('title', 'Галерея нашого затишку')}
//           </h2>
//           <div className={css['title-underline']}></div>
//           <p className={css['gallery-subtitle']}>
//             {t('subtitle', 'Кожна деталь створена для вашого натхнення')}
//           </p>
//         </header>

//         {/* Додана сітка зображень */}
//         <div className={css['grid']}>
//           {images.map(image => (
//             <div key={image.id} className={css['image-wrapper']}>
//               <img
//                 src={image.src}
//                 alt={t(`images.alt${image.id}`, image.alt)}
//                 className={css['image']}
//                 loading="lazy"
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Gallery;
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import css from './Gallery.module.css';

const images = [
  { id: 1, src: '/images/interior.jpg', alt: 'Cozy corner' },
  { id: 2, src: '/images/cappuccino1.jpg', alt: 'Fresh cappuccino' },
  { id: 3, src: '/images/interior1.jpg', alt: 'Window seat' },
  { id: 4, src: '/images/croissant3.jpg', alt: 'Freshly baked croissant' },
  { id: 5, src: '/images/barista.jpg', alt: 'Barista at work' },
  { id: 6, src: '/images/details.jpg', alt: 'Coffee shop details' },
];

const Gallery = () => {
  const { t } = useTranslation('gallery');
  const [selectedImg, setSelectedImg] = useState(null);

  // Закриття на Escape для виправлення помилок ESLint
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') setSelectedImg(null);
    };
    if (selectedImg) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImg]);

  return (
    <section className={css['gallery-section']}>
      <div className={css['gallery-container']}>
        <header className={css['gallery-header']}>
          <h2 className={css['gallery-title']}>
            {t('title', 'Gallery of our comfort')}
          </h2>
          <div className={css['title-underline']}></div>
          <p className={css['gallery-subtitle']}>
            {t('subtitle', 'Every detail is designed to inspire you')}
          </p>
        </header>

        <div className={css['grid']}>
          {images.map(image => (
            /* Використовуємо button замість div для клікабельних картинок */
            <button
              key={image.id}
              type="button"
              className={css['image-wrapper']}
              onClick={() => setSelectedImg(image)}
              aria-label="View photo"
            >
              <img
                src={image.src}
                alt={t(`images.alt${image.id}`, image.alt)}
                className={css['image']}
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Модальне вікно */}
      {selectedImg && (
        <div
          className={css['modal-backdrop']}
          onClick={() => setSelectedImg(null)}
          onKeyDown={e =>
            (e.key === 'Enter' || e.key === ' ') && setSelectedImg(null)
          }
          role="button"
          tabIndex={0}
          aria-label="Close modal window"
        >
          {/* Для контенту використовуємо role="presentation", щоб ESLint не сварився на клік всередині */}
          <div
            className={css['modal-content']}
            onClick={e => e.stopPropagation()}
            role="presentation"
          >
            <button
              type="button"
              className={css['close-button']}
              onClick={() => setSelectedImg(null)}
              aria-label={t('close_button_aria', 'Close modal')}
            >
              <span className={css['close-text']}>
                {t('close_label', 'Close')}
              </span>
              <span className={css['close-icon']}>&times;</span>
            </button>
            <img
              src={selectedImg.src}
              alt={selectedImg.alt}
              className={css['modal-image']}
            />
          </div>
        </div>
      )}
    </section>
  );
};

/* Цей рядок обов'язковий! Він виправляє SyntaxError "doesn't provide an export named default" */
export default Gallery;
