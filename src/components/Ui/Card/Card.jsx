// import { useTranslation } from 'react-i18next';
// import { useState, useMemo, forwardRef } from 'react';
// import PropTypes from 'prop-types';
// import { useNavigate } from 'react-router-dom';
// import css from './Card.module.css';
// import Button from '../../Ui/Buttons/BaseButton/Button.jsx';
// import FeatureIcon from '../../FeatureIcon/FeatureIcon.jsx';
// import { v4 as uuidv4 } from 'uuid';
// import DescriptionPopup from '../../../components/Modals/DescriptionModal/DescriptionPopup.jsx';

// // Обгортаємо функціональний компонент у forwardRef
// // ref передається як другий аргумент
// const Card = forwardRef(
//   ({ _id, name, gallery, price, description, location, camper }, ref) => {
//     const { t: tCard } = useTranslation('card');
//     const { t: tButton } = useTranslation('button');
//     const { t: tLocation } = useTranslation('filter_location');
//     const [isPopupOpen, setIsPopupOpen] = useState(false);
//     const navigate = useNavigate();

//     let imageUrl = `${import.meta.env.BASE_URL}default_camper.jpg`;

//     if (gallery && Array.isArray(gallery) && gallery.length > 0) {
//       imageUrl = gallery[0] || `${import.meta.env.BASE_URL}default_camper.jpg`;
//     } else {
//       // Ігноруємо помилку, бо вона не критична
//     }

//     const handleTextInfoClick = () => {
//       setIsPopupOpen(true);
//     };

//     const handleClosePopup = () => {
//       setIsPopupOpen(false);
//     };

//     const reviewsWithUniqueIds = useMemo(() => {
//       if (camper?.reviews && Array.isArray(camper.reviews)) {
//         return camper.reviews.map(review => {
//           if (
//             !review._id ||
//             camper.reviews.filter(r => r._id === review._id).length > 1
//           ) {
//             return {
//               ...review,
//               _id: uuidv4(),
//             };
//           }
//           return { ...review };
//         });
//       }
//       return [];
//     }, [camper?.reviews]);

//     let averageRating = 0;
//     if (reviewsWithUniqueIds.length > 0) {
//       averageRating =
//         reviewsWithUniqueIds.reduce((sum, review) => {
//           return sum + (review.reviewer_rating || 0);
//         }, 0) / reviewsWithUniqueIds.length;
//     }

//     const handleShowMoreClick = () => {
//       navigate(`/catalog/${_id}`, { state: { camper } });
//     };

//     const MAX_WORDS = 20;
//     const shortDescription = useMemo(() => {
//       if (!description) return '';
//       const words = description.split(' ');
//       if (words.length <= MAX_WORDS) {
//         return description;
//       }
//       return words.slice(0, MAX_WORDS).join(' ') + '...';
//     }, [description]);

//     const translatedLocation = tLocation(`locations.${location}`, {
//       defaultValue: location,
//     });

//     return (
//       // Застосовуємо отриманий ref до кореневого div елемента
//       <div className={css.card} data-id={_id} ref={ref}>
//         {' '}
//         <div className={css['content-card']}>
//           <img className={css.image} src={imageUrl} alt={name} />

//           <div className={css['container-info']}>
//             <div className={css['title-info']}>
//               <h2>{name}</h2>
//               <div className={css['price-info']}>
//                 <h2 className={css['text-price-info']}>
//                   {tCard('currency_symbol')}
//                   {price}
//                 </h2>
//                 <svg
//                   className={css['icon-heart']}
//                   width="26"
//                   height="24"
//                   viewBox="0 0 32 32"
//                 >
//                   <use
//                     href={`${import.meta.env.BASE_URL}icons.svg#icon-heart`}
//                   ></use>
//                 </svg>
//               </div>
//             </div>

//             <div className={css['details-info']}>
//               <div className={css['reviews-info']}>
//                 <svg
//                   className={css['icon-star']}
//                   width="16"
//                   height="16"
//                   viewBox="0 0 32 32"
//                 >
//                   <use
//                     href={`${import.meta.env.BASE_URL}icons.svg#icon-star`}
//                   ></use>
//                 </svg>
//                 <p>
//                   {reviewsWithUniqueIds.length > 0 ? (
//                     <span>
//                       {averageRating.toFixed(1)}{' '}
//                       {tCard('reviews_count', {
//                         count: reviewsWithUniqueIds.length,
//                       })}
//                     </span>
//                   ) : (
//                     tCard('no_reviews')
//                   )}
//                 </p>
//               </div>
//               <div className={css['location-info']}>
//                 <svg
//                   className={css['icon-map']}
//                   width="16"
//                   height="16"
//                   viewBox="0 0 32 32"
//                 >
//                   <use
//                     href={`${import.meta.env.BASE_URL}icons.svg#icon-map`}
//                   ></use>
//                 </svg>
//                 <p>{translatedLocation}</p>
//               </div>
//             </div>

//             <div className={css['supporting-text-info']}>
//               <button
//                 className={css['text-button']}
//                 onClick={handleTextInfoClick}
//               >
//                 <p className={css['text-info']}>{shortDescription}</p>
//               </button>
//             </div>
//             <div className={css['badges-container']}>
//               {camper && <FeatureIcon camper={camper} />}
//             </div>
//             <div className={css['container-show-more']}>
//               <Button
//                 onClick={handleShowMoreClick}
//                 variant="primary"
//                 size="medium"
//               >
//                 {tButton('show_button')}
//               </Button>
//             </div>

//             {isPopupOpen && (
//               <DescriptionPopup
//                 description={description}
//                 onClose={handleClosePopup}
//               />
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   }
// );

// // ПропТайпи залишаються для компонента, але експортується forwardRef обгортка
// Card.propTypes = {
//   _id: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   gallery: PropTypes.arrayOf(PropTypes.string),
//   price: PropTypes.number.isRequired,
//   description: PropTypes.string,
//   location: PropTypes.string.isRequired,
//   reviews: PropTypes.arrayOf(
//     PropTypes.shape({
//       _id: PropTypes.string,
//       reviewer_rating: PropTypes.number,
//     })
//   ),
//   features: PropTypes.objectOf(PropTypes.bool),
//   camper: PropTypes.shape({
//     features: PropTypes.objectOf(PropTypes.bool),
//     reviews: PropTypes.arrayOf(
//       PropTypes.shape({
//         _id: PropTypes.string,
//         reviewer_rating: PropTypes.number,
//       })
//     ),
//   }),
// };
// Card.displayName = 'Card';
// // Експортуємо обгорнутий компонент
// export default Card;
