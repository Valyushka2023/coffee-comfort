import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { StarIcon } from '../Icons';
import css from './StarRating.module.css';

const StarRating = ({
  value,
  onChange,
  name = 'rating',
  totalStars = 5,
  size = 20,
  error,
  accessible = true,
  readOnly = false,
}) => {
  const { t } = useTranslation('star_rating');

  const handleClick = starValue => {
    if (readOnly || !onChange) return;
    onChange(starValue);
  };

  return (
    <div className={clsx(css['wrapper'], { [css['readOnly']]: readOnly })}>
      {!readOnly && (
        <label htmlFor={name} className={css['label']}>
          {t('rating', 'Rating')}*
        </label>
      )}

      <div className={css['field-container']}>
        <div
          id={name}
          className={clsx(css.stars, { [css['field-error']]: error })}
          role={accessible ? 'radiogroup' : undefined}
        >
          {[...Array(totalStars)].map((_, i) => {
            const starValue = i + 1;
            const isFilled = starValue <= value;

            return (
              <span
                key={starValue}
                className={clsx(css['star'], {
                  [css['filled']]: isFilled,
                  [css['empty']]: !isFilled,
                })}
                style={{ cursor: readOnly ? 'default' : 'pointer' }}
                onClick={() => handleClick(starValue)}
                /* Виправлення ESLint: додаємо обробник клавіатури */
                onKeyDown={e => {
                  if (readOnly) return;
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleClick(starValue);
                  }
                }}
                role={accessible ? 'radio' : undefined}
                aria-checked={accessible ? isFilled : undefined}
                tabIndex={readOnly || !accessible ? -1 : 0}
              >
                <StarIcon
                  size={size}
                  color="currentColor"
                  fill="currentColor"
                />
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

StarRating.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func,
  name: PropTypes.string,
  totalStars: PropTypes.number,
  size: PropTypes.number,
  error: PropTypes.any,
  accessible: PropTypes.bool,
  readOnly: PropTypes.bool,
};

export default StarRating;
