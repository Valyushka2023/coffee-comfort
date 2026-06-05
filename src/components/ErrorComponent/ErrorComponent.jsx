import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import css from './ErrorComponent.module.css';

const ErrorComponent = ({ errorCode, onRetry }) => {
  const { t } = useTranslation('error_component');

  // Шукаємо переклад за кодом (наприклад, 'errors.ORDER_NOT_FOUND')
  // Якщо коду немає в локалізації, виведеться сам код або дефолтне повідомлення
  const errorMessage = t(`errors.${errorCode}`, {
    defaultValue: t('errors.UNKNOWN_ERROR'),
  });

  return (
    <div className={css['error-container']}>
      <p className={css['error-message']}>
        {t('error_message')} {errorMessage}
      </p>
      {onRetry && (
        <button className={css['retry-button']} onClick={onRetry}>
          {t('retry_button')}
        </button>
      )}
    </div>
  );
};

ErrorComponent.propTypes = {
  errorCode: PropTypes.string.isRequired,
  onRetry: PropTypes.func,
};

export default ErrorComponent;
