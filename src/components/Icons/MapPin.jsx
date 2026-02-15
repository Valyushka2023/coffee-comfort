import PropTypes from 'prop-types';

export const MapPin = ({ size = 24, color = '#FF6B6B', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" fill={color} fillOpacity="0.2" />
  </svg>
);

// MapPin.propTypes = {
//   size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//   color: PropTypes.string,
// };
MapPin.propTypes = {
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
  className: PropTypes.string,
};
