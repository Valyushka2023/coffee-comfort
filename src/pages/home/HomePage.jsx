import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useWindowScrollToTopButton } from '../../hooks/useWindowScrollToTopButton';

import Header from '../../components/Header/Header.jsx';
import MobileMenu from '../../components/Header/HeaderMobileMenu.jsx';
import Hero from '../../components/Hero/Hero.jsx';
import AboutUs from '../../components/AboutUs/AboutUs.jsx';
import Menu from '../../components/Menu/Menu.jsx';
import Gallery from '../../components/Gallery/Gallery.jsx';
import Reviews from '../../components/Reviews/Reviews.jsx';
import Contacts from '../../components/Contacts/Contacts.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import ScrollToTopButton from '../../components/Ui/Buttons/ScrollToTopButton/ScrollToTopButton.jsx';
import ModalFormCallback from '../../components/Modal/ModalFormCallback/ModalFormCallback.jsx';
import ModalFormReview from '../../components/Modal/ModalFormReview/ModalFormReview.jsx';
import ModalReviewSuccess from '../../components/Modal/ModalReviewSuccess/ModalReviewSuccess.jsx';

import css from './HomePage.module.css';

const GALLERY_IMAGES = [
  { id: 1, src: '/images/gallery-interior.webp', alt: 'Cozy corner' },
  { id: 2, src: '/images/gallery-cappuchino1.webp', alt: 'Fresh cappuccino' },
  { id: 3, src: '/images/gallery-interior1.webp', alt: 'Window seat' },
  {
    id: 4,
    src: '/images/gallery-croissant3.webp',
    alt: 'Freshly baked croissant',
  },
  { id: 5, src: '/images/gallery-barista.webp', alt: 'Barista at work' },
  { id: 6, src: '/images/gallery-details.webp', alt: 'Coffee shop details' },
];

const HomePage = () => {
  const { t } = useTranslation('header');
  const { visible, scrollToTop } = useWindowScrollToTopButton(300);

  const NAV_ITEMS = [
    { href: '#menu', labelKey: 'menu_header_link', defaultLabel: 'Menu' },
    { href: '#about', labelKey: 'about_header_link', defaultLabel: 'About us' },
    {
      href: '#gallery',
      labelKey: 'gallery_header_link',
      defaultLabel: 'Gallery',
    },
    {
      href: '#contacts',
      labelKey: 'contacts_header_link',
      defaultLabel: 'Contacts',
    },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCallbackOpen, setCallbackOpen] = useState(false);
  const [isReviewOpen, setReviewOpen] = useState(false);
  const [isSuccessOpen, setSuccessOpen] = useState(false);
  const [latestReview, setLatestReview] = useState(null);
  const handleReviewSuccess = createdReview => {
    console.log('🔥 HomePage отримав новий відгук:', createdReview);
    setLatestReview(createdReview);
    setReviewOpen(false);
    setSuccessOpen(true);
  };

  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  return (
    <>
      <Header isMenuOpen={isMenuOpen} onToggleMenu={toggleMenu} />

      {isMenuOpen && (
        <MobileMenu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          navItems={NAV_ITEMS}
          t={t}
        />
      )}

      <div className={css['container-page']}>
        <main>
          <Hero />
          <section id="about">
            <AboutUs />
          </section>
          <section id="menu">
            <Menu />
          </section>
          <section id="gallery">
            <Gallery images={GALLERY_IMAGES} />
          </section>
          <section id="reviews">
            <Reviews newReview={latestReview} />
          </section>
          <section id="contacts">
            <Contacts />
          </section>
        </main>

        <Footer
          onOpenReview={() => setReviewOpen(true)}
          onOpenCallback={() => setCallbackOpen(true)}
        />
      </div>

      <ScrollToTopButton visible={visible} onClick={scrollToTop} />

      <ModalFormCallback
        isOpen={isCallbackOpen}
        onClose={() => setCallbackOpen(false)}
      />

      <ModalFormReview
        isOpen={isReviewOpen}
        onClose={() => setReviewOpen(false)}
        onSuccess={handleReviewSuccess}
      />

      <ModalReviewSuccess
        isOpen={isSuccessOpen}
        onClose={() => setSuccessOpen(false)}
      />
    </>
  );
};

export default HomePage;
