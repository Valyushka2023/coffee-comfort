import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loader from '../Ui/Loader/Loader.jsx';

// Ліниве завантаження головної сторінки
const Home = lazy(() => import('../../pages/Home/Home.jsx'));

function App() {
  return (
    <Router>
      <main className="page-fade">
        <Suspense fallback={<Loader type="container" />}>
          <Routes>
            {/* Home тепер сам керує модалками, 
               тому пропси onOpenReview більше не потрібні 
            */}
            <Route path="/" element={<Home />} />
          </Routes>
        </Suspense>
      </main>
    </Router>
  );
}

export default App;

// import { lazy, Suspense } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Loader from '../Ui/Loader/Loader.jsx';

// const Home = lazy(() => import('../../pages/Home/Home.jsx'));

// function App() {
//   // Просто створюємо функцію-заглушку, щоб передати її в Home
//   const handleOpenReview = () => {
//     console.log('Кнопка відгуку натиснута!');
//   };

//   return (
//     <Router>
//       <Suspense fallback={<Loader type="container" />}>
//         <Routes>
//           {/* Тепер Home отримує те, що просить, і помилка зникне */}
//           <Route path="/" element={<Home onOpenReview={handleOpenReview} />} />
//         </Routes>
//       </Suspense>
//     </Router>
//   );
// }

// export default App;
