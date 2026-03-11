import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import css from './ErrorComponent.module.css';

const ErrorComponent = ({ error, onRetry }) => {
  // >>> ВИПРАВЛЕННЯ: Змінено 'errorComponent' на 'error_component'
  const { t } = useTranslation('error_component');

  return (
    <div className={css['error-container']}>
      <p className={css['error-message']}>
        {t('error_message')} {error}
      </p>
      <button className={css['retry-button']} onClick={onRetry}>
        {t('retry_button')}
      </button>
    </div>
  );
};

ErrorComponent.propTypes = {
  error: PropTypes.string.isRequired,
  onRetry: PropTypes.func.isRequired,
};

export default ErrorComponent;
