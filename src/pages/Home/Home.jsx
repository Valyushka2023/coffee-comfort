// import { useState, useEffect } from 'react';
// import Header from '../../components/Header/Header.jsx';
// import Hero from '../../components/Hero/Hero.jsx';
// import AboutUs from '../../components/AboutUs/AboutUs.jsx';
// import Menu from '../../components/Menu/Menu.jsx';
// import Gallery from '../../components/Gallery/Gallery.jsx';
// import Reviews from '../../components/Reviews/Reviews.jsx';
// import Contacts from '../../components/Contacts/Contacts.jsx';
// import Footer from '../../components/Footer/Footer.jsx';
// import ScrollToTopButton from '../../components/Ui/Buttons/ScrollToTopButton/ScrollToTopButton.jsx';

// const Home = () => {
//   const [isVisible, setIsVisible] = useState(false);

//   // показувати кнопку після прокрутки 300px
//   useEffect(() => {
//     const toggleVisibility = () => {
//       if (window.scrollY > 300) {
//         setIsVisible(true);
//       } else {
//         setIsVisible(false);
//       }
//     };

//     window.addEventListener('scroll', toggleVisibility);

//     return () => {
//       window.removeEventListener('scroll', toggleVisibility);
//     };
//   }, []);

//   // плавний скрол вверх
//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth',
//     });
//   };

//   return (
//     <>
//       <Header />
//       <main>
//         {/* Hero зазвичай не потребує окремого id, якщо на нього немає посилання, але можна додати id="hero" */}
//         <Hero />

//         <section id="about">
//           <AboutUs />
//         </section>

//         <section id="menu">
//           <Menu />
//         </section>

//         <section id="gallery">
//           <Gallery />
//         </section>

//         <section id="reviews">
//           <Reviews />
//         </section>

//         <section id="contacts">
//           <Contacts />
//         </section>
//       </main>
//       <Footer />
//       <ScrollToTopButton
//         visible={isVisible}
//         onClick={scrollToTop}
//         label="Підняти вверх"
//       />
//     </>
//   );
// };

// export default Home;
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

const Home = () => {
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

      <Footer />

      <ScrollToTopButton visible={visible} onClick={scrollToTop} />
    </>
  );
};

export default Home;
