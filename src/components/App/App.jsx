import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loader from '../Ui/Loader/Loader.jsx';

// Ліниве завантаження сторінок (Lazy Loading)
const Home = lazy(() => import('../../pages/home/HomePage.jsx'));
const BaristaDashboard = lazy(
  () => import('../../pages/barista-dashboard/BaristaDashboardPage.jsx')
);
const OrderHistory = lazy(
  () => import('../../pages/order-history/OrderHistoryPage.jsx')
);
const Inventory = lazy(() => import('../../pages/inventory/InventoryPage.jsx'));
const NotFound = lazy(() => import('../../pages/not-found/NotFoundPage.jsx'));
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
            <Route path="/dashboard-staff" element={<BaristaDashboard />} />

            {/* Маршрут для історії замовлень (адмінка/бухгалтер) */}
            <Route path="/history" element={<OrderHistory />} />

            {/* Маршрут для інвентаризації залишків (склад) */}
            <Route path="/inventory" element={<Inventory />} />

            {/* Сторінка 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
    </Router>
  );
}

export default App;
