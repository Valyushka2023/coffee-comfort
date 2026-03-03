import { useState } from 'react';
import { useWindowScrollToTopButton } from '../../hooks/useWindowScrollToTopButton';

import Header from '../../components/Header/Header.jsx';
import Hero from '../../components/Hero/Hero.jsx';
import AboutUs from '../../components/AboutUs/AboutUs.jsx';
import Menu from '../../components/Menu/Menu.jsx';
import Gallery from '../../components/Gallery/Gallery.jsx';
import Reviews from '../../components/Reviews/Reviews.jsx';
import Contacts from '../../components/Contacts/Contacts.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import ScrollToTopButton from '../../components/Ui/Buttons/ScrollToTopButton/ScrollToTopButton.jsx';
import CallbackModal from '../../components/Modal/CalllbackModal/CallbackModal.jsx';
import ReviewModal from '../../components/Modal/ReviewModal/ReviewModal.jsx';

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

const Home = () => {
  const { visible, scrollToTop } = useWindowScrollToTopButton(300);
  const [isCallbackOpen, setCallbackOpen] = useState(false);
  const [isReviewOpen, setReviewOpen] = useState(false);
  const [reviewsTrigger, setReviewsTrigger] = useState(0);

  const handleReviewSuccess = () => {
    setReviewOpen(false);
    setReviewsTrigger(prev => prev + 1);
  };

  return (
    <>
      <Header />
      <main>
        <Hero />
        <section id="about">
          <AboutUs />
        </section>
        <section id="menu">
          <Menu />
        </section>

        <section id="gallery">
          {/* 2. ОБОВ'ЯЗКОВО ПЕРЕДАЄМО МАСИВ КАРТИНОК ТУТ */}
          <Gallery images={GALLERY_IMAGES} />
        </section>

        <section id="reviews">
          <Reviews refreshTrigger={reviewsTrigger} />
        </section>
        <section id="contacts">
          <Contacts />
        </section>
      </main>

      <Footer
        onOpenReview={() => setReviewOpen(true)}
        onOpenCallback={() => setCallbackOpen(true)}
      />

      <ScrollToTopButton visible={visible} onClick={scrollToTop} />

      <CallbackModal
        isOpen={isCallbackOpen}
        onClose={() => setCallbackOpen(false)}
      />

      <ReviewModal
        isOpen={isReviewOpen}
        onClose={() => setReviewOpen(false)}
        onSuccess={handleReviewSuccess}
      />
    </>
  );
};

export default Home;
