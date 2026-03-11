// import PropTypes from 'prop-types';
// import { useTranslation } from 'react-i18next';
// import Modal from '../../Modal/Modal.jsx';
// import css from './AboutModal.module.css';

// const DEFAULT_PARAGRAPH_KEYS = [
//   'paragraph_1',
//   'paragraph_2',
//   'paragraph_3',
//   'paragraph_4',
//   'paragraph_5',
//   'paragraph_6',
// ];

// const FALLBACK_PARAGRAPHS = [
//   'We are TravelTrucks — a company specializing in modern camper rentals for comfortable travel across Ukraine.',
//   'TravelTrucks was founded in 2024.',
//   'Our fleet includes 24 campers ranging from Economy to Premium class.',
//   'We operate in Kyiv, Odesa, Kharkiv, Sumy, Poltava, Dnipro, and Lviv.',
//   'The TravelTrucks team consists of young, energetic individuals.',
//   'Booking the camper you want is easy — just give us a call or leave a request on our website!',
// ];

// const AboutModal = ({ onClose }) => {
//   const { t } = useTranslation('about_modal');

//   const title = t('title', { defaultValue: 'About us' });

//   const translatedParagraphs = DEFAULT_PARAGRAPH_KEYS.map((key, index) =>
//     t(key, {
//       defaultValue: FALLBACK_PARAGRAPHS[index],
//     })
//   );

//   return (
//     <Modal title={title} onClose={onClose}>
//       <div className={css['text-about-modal']}>
//         {translatedParagraphs.map((text, idx) => (
//           <p key={idx}>{text}</p>
//         ))}
//       </div>
//     </Modal>
//   );
// };

// AboutModal.propTypes = {
//   onClose: PropTypes.func.isRequired,
// };

// export default AboutModal;
