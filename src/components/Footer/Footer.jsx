// import PhoneNumber from '../../components/Contacts/PhoneNumber/PhoneNumber.jsx';
// import SocialLinks from '../../components/Contacts/SocialNetworks/SocialLinks.jsx';

// import InfoLinks from '../InfoLinks/InfoLinks.jsx';
// import css from './Footer.module.css';

// function Footer() {
//   return (
//     <div className={css['footer-wrapper']}>
//       <footer className={css['footer-container']}>
//         <div className={css['contact-group']}>
//           <PhoneNumber />
//           <div className={css['social-networks']}>
//             <SocialLinks />
//           </div>
//         </div>

//         <div className={css['info-links']}>
//           <InfoLinks />
//         </div>
//       </footer>
//     </div>
//   );
// }

// export default Footer;

import { useTranslation } from 'react-i18next';
import css from './Footer.module.css';

const Footer = () => {
  const { t } = useTranslation('footer');

  return (
    <footer className={css['footer-section']}>
      <div className={css['footer-socials']}>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('socials_instagram', 'Instagram')}
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          {' '}
          {t('socials_fasebook', 'Facebook')}
        </a>
      </div>

      <p className={css['footer-copy']}>
        © {new Date().getFullYear()} {t('copy', 'Coffee House.')}{' '}
        {t('rights', 'All rights reserved.')}
      </p>
    </footer>
  );
};

export default Footer;
