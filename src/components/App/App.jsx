import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loader from '../Ui/Loader/Loader.jsx';

const Home = lazy(() => import('../../pages/Home/Home.jsx'));

function App() {
  const handleOpenReview = () => {
    console.log('Відкриваємо відгуки');
  };

  return (
    <Router>
      {/* ПРИБИРАЄМО key={i18n.language} */}
      <main className="page-fade">
        <Suspense fallback={<Loader type="container" />}>
          <Routes>
            <Route
              path="/"
              element={<Home onOpenReview={handleOpenReview} />}
            />
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
