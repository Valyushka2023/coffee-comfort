import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { User, Phone, Clock, Trash } from '../../Icons';
import CartItemsList from './CartItemsList';
import css from './OrderForm.module.css';

const OrderForm = ({
  items,
  currentLang,
  name,
  phone,
  pickupTime,
  nameError,
  phoneError,
  timeError,
  hasAttemptedSubmit,
  isLoading,
  totalAmount,
  timeSlots,
  onNameChange,
  onPhoneChange,
  onTimeChange,
  onPhoneFocus,
  onPhoneBlur,
  onSubmit,
  onIncrease,
  onDecrease,
  onClearCart,
}) => {
  const { t } = useTranslation('cart_modal');
  const isButtonDisabled = isLoading || items.length === 0;

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={css['checkout-form-container']}
    >
      {/* Список товарів */}
      <CartItemsList
        items={items}
        currentLang={currentLang}
        onIncrease={onIncrease}
        onDecrease={onDecrease}
      />

      {/* Поля введення даних */}
      <div className={css['form-wrapper']}>
        {/* Ім'я */}
        <div className={css['form-group']}>
          <div className={css['field-input-and-field-error']}>
            <User className={css['form-icon']} size={18} />
            <input
              type="text"
              value={name}
              onChange={onNameChange}
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

        {/* Телефон */}
        <div className={css['field-input-and-field-error']}>
          <Phone className={css['form-icon']} size={18} />
          <input
            type="tel"
            value={phone}
            onChange={onPhoneChange}
            onFocus={onPhoneFocus}
            onBlur={onPhoneBlur}
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

        {/* Час отримання */}
        <div className={css['form-group']}>
          <label
            htmlFor="pickup-time-select"
            className={css['label-input-time']}
          >
            <Clock size={18} className={css['clock-icon']} />
            <span>{t('pickup_time_label') || 'Оберіть час отримання:'}</span>
          </label>
          <div className={css['field-input-and-field-error']}>
            <select
              id="pickup-time-select"
              value={pickupTime}
              onChange={onTimeChange}
              className={clsx(
                css['field-input'],
                css['field-input-time'],
                hasAttemptedSubmit && timeError && css['field-error']
              )}
              style={{ appearance: 'auto' }}
            >
              {timeSlots.map(slot => (
                <option
                  key={slot.value}
                  value={slot.value}
                  disabled={slot.disabled}
                >
                  {slot.isAsap
                    ? `${t('asap', 'Якомога швидше')} (${slot.time})`
                    : slot.label}
                  {slot.disabled ? ` ${t('busy_slot', '(Зайнято ☕)')}` : ''}
                </option>
              ))}
            </select>
            {hasAttemptedSubmit && timeError && (
              <p className={css['error-popup']}>{timeError}</p>
            )}
          </div>
        </div>
      </div>

      {/* Кнопки замовлення та очищення */}
      <div className={css['checkout-section']}>
        <div className={css['total-row']}>
          <span className={css['total-label']}>{t('total', ' Всього')}</span>
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
          onClick={onClearCart}
        >
          <Trash size={18} />
          <span>{t('clear_cart_btn')}</span>
        </button>
      </div>
    </form>
  );
};

OrderForm.propTypes = {
  items: PropTypes.array.isRequired,
  currentLang: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  pickupTime: PropTypes.string.isRequired,
  nameError: PropTypes.string.isRequired,
  phoneError: PropTypes.string.isRequired,
  timeError: PropTypes.string.isRequired,
  hasAttemptedSubmit: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  totalAmount: PropTypes.number.isRequired,
  timeSlots: PropTypes.array.isRequired,
  onNameChange: PropTypes.func.isRequired,
  onPhoneChange: PropTypes.func.isRequired,
  onTimeChange: PropTypes.func.isRequired,
  onPhoneFocus: PropTypes.func.isRequired,
  onPhoneBlur: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onIncrease: PropTypes.func.isRequired,
  onDecrease: PropTypes.func.isRequired,
  onClearCart: PropTypes.func.isRequired,
};

export default OrderForm;
