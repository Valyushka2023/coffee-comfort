// import PropTypes from 'prop-types';
// import { useTranslation } from 'react-i18next';
// import Modal from '../../Modal/Modal.jsx';
// import css from './ServicesModal.module.css';

// const DEFAULT_PARAGRAPH_KEYS = [
//   'paragraph_1',
//   'paragraph_2',
//   'paragraph_3',
//   'paragraph_4',
//   'paragraph_5',
//   'paragraph_6',
// ];
// const FALLBACK_PARAGRAPHS = [
//   'Our services include camper rental, technical support on the road, route advice, and additional equipment.',
//   'You can rent a car with or without a driver.',
//   'A car delivery service to a specified location is possible.',
//   'The entire fleet is insured with CASCO and OSAGO.',
//   'Technical support is available 24/7. You can always call if you have any problems with your car or service.',
//   'If the car breaks down, we will replace it instantly.',
// ];
// const ServicesModal = ({ onClose }) => {
//   const { t } = useTranslation('services_modal');

//   const title = t('title', { defaultValue: 'Our services' });

//   const translatedParagraphs = DEFAULT_PARAGRAPH_KEYS.map((key, index) =>
//     t(key, {
//       defaultValue: FALLBACK_PARAGRAPHS[index],
//     })
//   );
//   return (
//     <Modal title={title} onClose={onClose}>
//       <div className={css['text-services-modal']}>
//         {translatedParagraphs.map((text, idx) => (
//           <p key={idx}>{text}</p>
//         ))}
//       </div>
//     </Modal>
//   );
// };
// ServicesModal.propTypes = {
//   onClose: PropTypes.func.isRequired,
//   title: PropTypes.string,
//   paragraphs: PropTypes.arrayOf(PropTypes.string),
// };

// export default ServicesModal;
