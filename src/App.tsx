import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import { useAuth } from './context/AuthContext';

// Lazy load components
const Home = React.lazy(() => import('./pages/Home'));
const ProductsPage = React.lazy(() => import('./pages/ProductsPage'));
const ProductDetail = React.lazy(() => import('./pages/ProductDetail'));
const Cart = React.lazy(() => import('./pages/Cart'));
const Checkout = React.lazy(() => import('./pages/Checkout'));
const OrderConfirmation = React.lazy(() => import('./pages/OrderConfirmation'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const Login = React.lazy(() => import('./pages/Login'));
const AdminDashboard = React.lazy(() => import('./pages/AdminDashboard'));
const OrderDetails = React.lazy(() => import('./pages/OrderDetails'));
const MyOrders = React.lazy(() => import('./pages/MyOrders'));
const FAQ = React.lazy(() => import('./pages/FAQ'));
const CustomOrder = React.lazy(() => import('./pages/CustomOrder'));

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
  </div>
);

function App() {
  const { user, isAdmin } = useAuth();

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={
            <Suspense fallback={<LoadingSpinner />}>
              <Home />
            </Suspense>
          } />
          <Route path="products" element={
            <Suspense fallback={<LoadingSpinner />}>
              <ProductsPage />
            </Suspense>
          } />
          <Route path="products/:id" element={
            <Suspense fallback={<LoadingSpinner />}>
              <ProductDetail />
            </Suspense>
          } />
          <Route path="cart" element={
            <Suspense fallback={<LoadingSpinner />}>
              <Cart />
            </Suspense>
          } />
          <Route path="checkout" element={
            <Suspense fallback={<LoadingSpinner />}>
              <Checkout />
            </Suspense>
          } />
          <Route path="custom-order" element={
            <Suspense fallback={<LoadingSpinner />}>
              <CustomOrder />
            </Suspense>
          } />
          <Route path="confirmation/:orderId" element={
            <Suspense fallback={<LoadingSpinner />}>
              <OrderConfirmation />
            </Suspense>
          } />
          <Route path="login" element={
            <Suspense fallback={<LoadingSpinner />}>
              <Login />
            </Suspense>
          } />
          <Route path="faq" element={
            <Suspense fallback={<LoadingSpinner />}>
              <FAQ />
            </Suspense>
          } />
          <Route 
            path="my-orders" 
            element={
              !user ? (
                <Navigate to="/login\" replace />
              ) : (
                <Suspense fallback={<LoadingSpinner />}>
                  <MyOrders />
                </Suspense>
              )
            } 
          />
          <Route 
            path="admin" 
            element={
              !user ? (
                <Navigate to="/login\" replace />
              ) : isAdmin ? (
                <Suspense fallback={<LoadingSpinner />}>
                  <AdminDashboard />
                </Suspense>
              ) : (
                <Navigate to="/" replace />
              )
            } 
          />
          <Route
            path="admin/orders/:orderId"
            element={
              !user ? (
                <Navigate to="/login\" replace />
              ) : isAdmin ? (
                <Suspense fallback={<LoadingSpinner />}>
                  <OrderDetails />
                </Suspense>
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route path="*" element={
            <Suspense fallback={<LoadingSpinner />}>
              <NotFound />
            </Suspense>
          } />
        </Route>
      </Routes>
    </>
  );
}

export default App;