import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Header from './components/Header';

import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import NotFound from './pages/NotFound';

// Wrapper for animated page transition
const PageWrapper = ({ children }) => (
  <div
    className="fade-in"
    style={{
      minHeight: '80vh',
      padding: '1rem',
      background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)',
    }}
  >
    {children}
  </div>
);

// Router configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Header />
        <PageWrapper>
          <Home />
        </PageWrapper>
      </>
    ),
  },
  {
    path: '/product/:id',
    element: (
      <>
        <Header />
        <PageWrapper>
          <ProductDetail />
        </PageWrapper>
      </>
    ),
  },
  {
    path: '/cart',
    element: (
      <>
        <Header />
        <PageWrapper>
          <Cart />
        </PageWrapper>
      </>
    ),
  },
  {
    path: '/checkout',
    element: (
      <>
        <Header />
        <PageWrapper>
          <Checkout />
        </PageWrapper>
      </>
    ),
  },
  {
    path: '*',
    element: (
      <>
        <Header />
        <PageWrapper>
          <NotFound />
        </PageWrapper>
      </>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;