import React, { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Clock, Truck, CreditCard, Apple, ChefHat, Search, Plus, ShoppingCart, CheckCircle } from 'lucide-react';
import { categories } from '../data/products';
import Cookie from '../components/Cookie';
import Coffee from '../components/Coffee';
import SprayCan from '../components/SprayCan';
import Pencil from '../components/Pencil';

// Lazy load ProductCard and featured products to reduce initial bundle size
const ProductCard = lazy(() => import('../components/ProductCard'));
const FeaturedProducts = lazy(() => import('../components/FeaturedProducts'));

// Loading skeleton component for better perceived performance
const ProductCardSkeleton = () => (
  <div className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
    <div className="h-48 bg-gray-200"></div>
    <div className="p-4">
      <div className="h-4 bg-gray-200 rounded mb-2"></div>
      <div className="h-3 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  </div>
);

const Home: React.FC = () => {
  return (
    <div>
      {/* Hero Section with Optimized Gradient  */}
      <section className="relative py-16 overflow-hidden">
        {/* Simplified gradient for better performance */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-purple-600 to-orange-500"></div>
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in-up">
              Everyday Supplies Delivered to Your Door
            </h1>
            <p className="text-xl mb-8 opacity-90 animate-slide-up">
              Get all your essentials delivered directly to your hostel room in minutes.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center btn bg-white text-blue-700 hover:text-orange-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-medium text-lg shadow-lg transition-all hover:shadow-xl transform hover:scale-105"
            >
              <ShoppingBag className="mr-2" size={20} />
              Shop Now
            </Link>
          </div>
        </div>
        
        {/* Reduced floating elements for better performance */}
        <div className="absolute top-20 left-10 w-16 h-16 bg-white bg-opacity-10 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-20 w-20 h-20 bg-white bg-opacity-10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
      </section>

      {/* Optimized Shopping Process Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              Your Shopping Journey
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From browsing to delivery - experience seamless shopping in just a few simple steps
            </p>
          </div>

          <div className="relative max-w-6xl mx-auto">
            {/* Simplified progress line */}
            <div className="absolute top-20 left-0 right-0 h-1 bg-gray-200 hidden lg:block">
              <div className="h-full bg-gradient-to-r from-blue-500 to-orange-500 w-full"></div>
            </div>

            {/* Shopping Steps - Optimized animations */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
              {/* Step 1: Browse & Search */}
              <div className="relative group">
                <div className="bg-white rounded-2xl shadow-lg p-8 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Search className="text-white" size={32} />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">Browse & Search</h3>
                  <p className="text-gray-600 mb-4">
                    Explore our wide range of products or search for exactly what you need
                  </p>
                </div>
              </div>

              {/* Step 2: Add to Cart */}
              <div className="relative group">
                <div className="bg-white rounded-2xl shadow-lg p-8 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Plus className="text-white" size={32} />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">Add to Cart</h3>
                  <p className="text-gray-600 mb-4">
                    Select your desired quantities and add items to your shopping cart
                  </p>
                  <div className="relative">
                    <ShoppingCart className="mx-auto text-green-500" size={24} />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center text-xs">
                      3
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Secure Checkout */}
              <div className="relative group">
                <div className="bg-white rounded-2xl shadow-lg p-8 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <CreditCard className="text-white" size={32} />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">Secure Checkout</h3>
                  <p className="text-gray-600 mb-4">
                    Enter your delivery details and pay securely with M-Pesa
                  </p>
                  <div className="flex justify-center items-center space-x-2">
                    <div className="w-6 h-4 bg-green-500 rounded"></div>
                    <span className="text-xs text-gray-500 font-medium">M-PESA</span>
                  </div>
                </div>
              </div>

              {/* Step 4: Fast Delivery */}
              <div className="relative group">
                <div className="bg-white rounded-2xl shadow-lg p-8 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Truck className="text-white" size={32} />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      4
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">Fast Delivery</h3>
                  <p className="text-gray-600 mb-4">
                    Sit back and relax while we deliver your order directly to your room
                  </p>
                  <div className="flex justify-center items-center">
                    <CheckCircle className="text-green-500" size={24} />
                    <span className="ml-2 text-sm text-green-600 font-medium">Delivered!</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <Link
              to="/products"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-orange-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <ShoppingBag className="mr-2" size={20} />
              Start Shopping Now
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Why Choose Qhub?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-6 rounded-xl hover:shadow-md transition-shadow">
              <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Wide Selection</h3>
              <p className="text-gray-600">
                From snacks to toiletries, we've got all your hostel needs covered.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-6 rounded-xl hover:shadow-md transition-shadow">
              <div className="bg-green-100 text-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quick Delivery</h3>
              <p className="text-gray-600">
                Get your items delivered to your room in 30-45 minutes.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-6 rounded-xl hover:shadow-md transition-shadow">
              <div className="bg-orange-100 text-orange-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Payment</h3>
              <p className="text-gray-600">
                Pay with Safaricom M-Pesa for secure and convenient transactions.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="text-center p-6 rounded-xl hover:shadow-md transition-shadow">
              <div className="bg-purple-100 text-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Room Delivery</h3>
              <p className="text-gray-600">
                No need to leave your room - we'll bring everything right to your door.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Browse By Category
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-8 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/products?category=${category.id}`}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 text-center group"
              >
                <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-100 transition-colors">
                  <span className="text-orange-600">
                    {category.icon === 'shopping-basket' && <ShoppingBag size={24} />}
                    {category.icon === 'apple' && <Apple size={24} />}
                    {category.icon === 'cookie' && <Cookie size={24} />}
                    {category.icon === 'coffee' && <Coffee size={24} />}
                    {category.icon === 'spray-can' && <SprayCan size={24} />}
                    {category.icon === 'pencil' && <Pencil size={24} />}
                    {category.icon === 'chef-hat' && <ChefHat size={24} />}
                  </span>
                </div>
                <h3 className="font-medium text-gray-900 text-sm">{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products - Lazy Loaded */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Featured Products</h2>
            <Link to="/products" className="text-blue-600 hover:text-blue-800 font-medium">
              View All →
            </Link>
          </div>
          
          <Suspense 
            fallback={
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            }
          >
            <FeaturedProducts />
          </Suspense>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to make hostel life easier?
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Start ordering your essentials today and experience the convenience of room delivery.
          </p>
          <Link
            to="/products"
            className="btn btn-primary px-8 py-3 text-lg"
          >
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;