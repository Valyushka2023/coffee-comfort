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

const Home = () => {
  const { visible, scrollToTop } = useWindowScrollToTopButton(300);
  const [isCallbackOpen, setCallbackOpen] = useState(false);
  const [isReviewOpen, setReviewOpen] = useState(false);
  const [reviewsTrigger, setReviewsTrigger] = useState(0);

  const handleReviewSuccess = () => {
    setReviewOpen(false);
    setReviewsTrigger(prev => prev + 1); // Оновлюємо список
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
          <Gallery />
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
