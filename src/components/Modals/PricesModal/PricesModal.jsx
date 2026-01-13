// import PropTypes from 'prop-types';
// import { useTranslation } from 'react-i18next';
// import css from './PricesModal.module.css';
// import Modal from '../../Modal/Modal.jsx';

// const DEFAULT_PARAGRAPH_KEYS = [
//   'paragraph_1',
//   'paragraph_2',
//   'paragraph_3',
//   'paragraph_4',
//   'paragraph_5',
// ];
// const FALLBACK_PARAGRAPHS = [
//   'Prices depend on the model and length of rental.',
//   'Discounts for rentals of a week or more.',
//   'Payments in national currency.',
//   'Advance payment. The deposit is paid separately from the payment, before the start of the rental.',
//   'In case of early return, a payment of 30% for the remaining days will be withheld, the difference will be refunded.',
// ];
// const PricesModal = ({ onClose }) => {
//   const { t } = useTranslation('prices_modal');

//   const title = t('title', { defaultValue: 'Prices' });

//   const translatedParagraphs = DEFAULT_PARAGRAPH_KEYS.map((key, index) =>
//     t(key, {
//       defaultValue: FALLBACK_PARAGRAPHS[index],
//     })
//   );

//   return (
//     <Modal title={title} onClose={onClose}>
//       <div className={css['text-prices-modal']}>
//         {translatedParagraphs.map((text, idx) => (
//           <p key={idx}>{text}</p>
//         ))}
//       </div>
//     </Modal>
//   );
// };

// PricesModal.propTypes = {
//   onClose: PropTypes.func.isRequired,
//   title: PropTypes.string,
//   paragraphs: PropTypes.arrayOf(PropTypes.string),
// };
// export default PricesModal;
