// import { ClipLoader } from 'react-spinners';
// import css from './Loader.module.css';
// import PropTypes from 'prop-types';

// const Loader = ({ type, color, size }) => {
//   const loaderClass =
//     type === 'overlay' ? css['loader-overlay'] : css['loader-container'];

//   return (
//     <div className={loaderClass}>
//       <ClipLoader color={color} size={size} />
//     </div>
//   );
// };

// Loader.propTypes = {
//   type: PropTypes.oneOf(['container', 'overlay']).isRequired,
//   color: PropTypes.string,
//   size: PropTypes.number,
// };

// Loader.defaultProps = {
//   color: 'var(--color-blue)',
//   size: 50,
// };

// export default Loader;
import { ClipLoader } from 'react-spinners';
import css from './Loader.module.css';
import PropTypes from 'prop-types';

const Loader = ({ type, color = 'var(--color-blue)', size = 50 }) => {
  const loaderClass =
    type === 'overlay' ? css['loader-overlay'] : css['loader-container'];

  return (
    <div className={loaderClass}>
      <ClipLoader color={color} size={size} />
    </div>
  );
};

Loader.propTypes = {
  type: PropTypes.oneOf(['container', 'overlay']).isRequired,
  color: PropTypes.string,
  size: PropTypes.number,
};

export default Loader;
