import { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import GalleryModal from '../Modal/GalleryModal/GalleryModal.jsx';
import css from './Gallery.module.css';

const Gallery = ({ images = [] }) => {
  const [selectedImg, setSelectedImg] = useState(null);
  const { t } = useTranslation('gallery');

  return (
    <section className={css['gallery-section']}>
      <div className={css['gallery-container']}>
        <header className={css['gallery-header']}>
          <h2 className={css['gallery-title']}>
            {t('title', 'Gallery of our comfort')}
          </h2>
          <div className={css['title-divider']}>
            <div className={css['line']}></div>
            <div className={css['ornament']}>
              <svg
                width="80"
                height="40"
                viewBox="0 0 100 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 25C30 5 70 45 90 25M10 25C30 45 70 5 90 25"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx="50" cy="25" r="3" fill="currentColor" />
              </svg>
            </div>
            <div className={css['line']}></div>
          </div>
          <p className={css['gallery-subtitle']}>
            {t('subtitle', 'Every detail is designed to inspire you')}
          </p>
        </header>

        <div className={css['grid']}>
          {images.map(img => (
            <button
              key={img.id}
              type="button"
              className={css['thumb-btn']}
              onClick={() => setSelectedImg(img)}
              aria-label={img.alt || 'View image'}
            >
              <img
                src={img.src}
                alt={img.alt || ''}
                className={css['thumb-img']}
              />
            </button>
          ))}
        </div>
      </div>{' '}
      <GalleryModal
        isOpen={!!selectedImg}
        onClose={() => setSelectedImg(null)}
        image={selectedImg}
      />
    </section>
  );
};

Gallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      src: PropTypes.string.isRequired,
      alt: PropTypes.string,
    })
  ).isRequired,
};

export default Gallery;
