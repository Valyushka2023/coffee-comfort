import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loader from '../Ui/Loader/Loader.jsx';

// Ліниве завантаження сторінок
const Home = lazy(() => import('../../pages/Home/Home.jsx'));
const Baristadashboard = lazy(
  () => import('../../pages/Baristadashboard/Baristadashboard.jsx')
);
// 1. Додаємо імпорт нової сторінки історії
const OrderHistory = lazy(
  () => import('../../pages/OrderHistory/OrderHistory.jsx')
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
            {/* Головна сторінка для клієнтів */}
            <Route path="/" element={<Home />} />

            {/* Панель бариста */}
            <Route path="/dashboard-staff" element={<Baristadashboard />} />

            {/* 2. Додаємо новий маршрут для історії замовлень */}
            <Route path="/history" element={<OrderHistory />} />

            {/* Сторінка 404 */}
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
