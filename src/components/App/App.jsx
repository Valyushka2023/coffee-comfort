import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loader from '../Ui/Loader/Loader.jsx';

// Ліниве завантаження сторінок (Lazy Loading)
const Home = lazy(() => import('../../pages/Home/Home.jsx'));
const Baristadashboard = lazy(
  () => import('../../pages/Baristadashboard/Baristadashboard.jsx')
);
const OrderHistory = lazy(
  () => import('../../pages/OrderHistory/OrderHistory.jsx')
);
// Виправлено: тепер Inventory завантажується ліниво, як і інші сторінки
const Inventory = lazy(() => import('../../pages/Inventory/Inventory.jsx'));

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

            {/* Маршрут для історії замовлень (адмінка/бухгалтер) */}
            <Route path="/history" element={<OrderHistory />} />

            {/* Маршрут для інвентаризації залишків (склад) */}
            <Route path="/inventory" element={<Inventory />} />

            {/* Сторінка 404 */}
            <Route
              path="*"
              element={
                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                  <h1>404</h1>
                  <p>Сторінку не знайдено</p>
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
