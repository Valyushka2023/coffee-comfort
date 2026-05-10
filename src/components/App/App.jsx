import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loader from '../Ui/Loader/Loader.jsx';

// Ліниве завантаження сторінок
const Home = lazy(() => import('../../pages/Home/Home.jsx'));
const Baristadashboard = lazy(
  () => import('../../pages/Baristadashboard/Baristadashboard.jsx')
);

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
            {/* Головна сторінка для клієнтів (ваше поточне меню) */}
            <Route path="/" element={<Home />} />

            {/* Нова сторінка для бариста (буде доступна за посиланням /dashboard-staff) */}
            <Route path="/dashboard-staff" element={<Baristadashboard />} />

            {/* Сторінка 404 (якщо введено неправильну адресу) */}
            <Route
              path="*"
              element={
                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                  Сторінку не знайдено
                </div>
              }
            />
          </Routes>
        </Suspense>
      </main>
    </Router>
  );
}

export default App;
