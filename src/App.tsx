import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import { useAuth } from './context/AuthContext';

// Lazy load components for better performance
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

// Enhanced loading component with better UX
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p className="text-gray-600 font-medium">Loading...</p>
    </div>
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