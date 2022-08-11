import React from 'react';
import BottomNav from './components/bottomNav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/main';
import Basket from './pages/basket';
import { routes } from './constantes/routes';
import ProductPage from './pages/productPage';
import { HelmetProvider } from 'react-helmet-async';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorHandler } from './components/errorHandler/ErrorHandler';
import Search from './pages/search';
import Favorites from './pages/favorites';

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorHandler}>
      <HelmetProvider>
        <BrowserRouter>
          <Routes>
            <Route path={routes.main} element={<MainPage />} />
            <Route path={routes.main + ':slug'} element={<ProductPage />} />
            <Route path={routes.basket} element={<Basket />} />
            <Route path={routes.search} element={<Search />} />
            <Route path={routes.favorites} element={<Favorites />} />
          </Routes>
          <BottomNav />
        </BrowserRouter>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
