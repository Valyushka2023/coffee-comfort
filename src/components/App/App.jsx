// import { lazy, Suspense } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Loader from '../Ui/Loader/Loader.jsx';

// // Ліниве завантаження головної сторінки
// const Home = lazy(() => import('../../pages/Home/Home.jsx'));

// function App() {
//   return (
//     <Router>
//       <main className="page-fade">
//         <Suspense fallback={<Loader type="container" />}>
//           <Routes>
//             {/* Home тепер сам керує модалками,
//                тому пропси onOpenReview більше не потрібні
//             */}
//             <Route path="/" element={<Home />} />
//           </Routes>
//         </Suspense>
//       </main>
//     </Router>
//   );
// }

// export default App;
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loader from '../Ui/Loader/Loader.jsx';

// Ліниве завантаження головної сторінки
const Home = lazy(() => import('../../pages/Home/Home.jsx'));

function App() {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <main className="page-fade">
        <Suspense fallback={<Loader type="container" />}>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Suspense>
      </main>
    </Router>
  );
}

export default App;
