import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loader from '../Ui/Loader/Loader.jsx';

const Home = lazy(() => import('../../pages/Home/Home.jsx'));

function App() {
  return (
    <Router>
      {/* Use your custom Loader component as the fallback */}
      <Suspense fallback={<Loader type="container" />}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
