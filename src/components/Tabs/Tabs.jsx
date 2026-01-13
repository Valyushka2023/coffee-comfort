// import { Link, useLocation } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import PropTypes from 'prop-types';
// import css from './Tabs.module.css';

// function Tabs({ camper, activeTab }) {
//   const location = useLocation();
//   const { t } = useTranslation('tabs');

//   const camperId = camper?._id || camper?.id;

//   if (!camperId) {
//     return null;
//   }

//   return (
//     <div className={css.tabs}>
//       <div className={css['titles-tabs']}>
//         <Link
//           to={`/catalog/${camperId}`}
//           state={{ camper }}
//           className={`${css['text-titles-tabs-features']} ${
//             location.pathname === `/catalog/${camperId}` &&
//             activeTab !== 'reviews'
//               ? css.active
//               : ''
//           }`}
//         >
//           {t('features')}
//         </Link>

//         <Link
//           to={`/catalog/${camperId}/reviews`}
//           state={{ camper }}
//           className={`${css['text-titles-tabs-reviews']} ${
//             location.pathname === `/catalog/${camperId}/reviews` &&
//             activeTab === 'reviews'
//               ? css.active
//               : ''
//           }`}
//         >
//           {t('reviews')}
//         </Link>
//       </div>
//     </div>
//   );
// }

// Tabs.propTypes = {
//   camper: PropTypes.shape({
//     _id: PropTypes.string,
//     id: PropTypes.string,
//   }),
//   activeTab: PropTypes.string.isRequired,
// };
// export default Tabs;
