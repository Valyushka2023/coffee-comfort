import PropTypes from 'prop-types'; // Додаємо PropTypes для валідації
import Header from '../../components/Header/Header.jsx';
import Hero from '../../components/Hero/Hero.jsx';
import AboutUs from '../../components/AboutUs/AboutUs.jsx';
import Menu from '../../components/Menu/Menu.jsx';
import Gallery from '../../components/Gallery/Gallery.jsx';
import Reviews from '../../components/Reviews/Reviews.jsx';
import Contacts from '../../components/Contacts/Contacts.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import ScrollToTopButton from '../../components/Ui/Buttons/ScrollToTopButton/ScrollToTopButton.jsx';

import { useWindowScrollToTopButton } from '../../hooks/useWindowScrollToTopButton';

// Приймаємо onOpenReview, який ми передали з App.jsx
const Home = ({ onOpenReview }) => {
  const { visible, scrollToTop } = useWindowScrollToTopButton(300);

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
          <Reviews />
        </section>

        <section id="contacts">
          <Contacts />
        </section>
      </main>

      {/* Передаємо функцію далі у Footer */}
      <Footer onOpenReview={onOpenReview} />

      <ScrollToTopButton visible={visible} onClick={scrollToTop} />
    </>
  );
};

// Валідація пропсів, щоб ESLint не сварився
Home.propTypes = {
  onOpenReview: PropTypes.func.isRequired,
};

export default Home;
