import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Smartphone, Search, BarChart2, ShoppingCart } from 'lucide-react';

export const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 via-purple-100 to-fuchsia-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16 animate-fadeIn">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400 text-transparent bg-clip-text">
            Find Your Perfect Phone
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            Let our smart recommendation system help you discover the ideal smartphone based on your preferences
          </p>
          <Link
            to="/recommend"
            className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-violet-500 to-purple-500 dark:from-violet-600 dark:to-purple-600 rounded-xl hover:from-violet-600 hover:to-purple-600 dark:hover:from-violet-700 dark:hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Get Started
            <Smartphone className="ml-2 w-6 h-6" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 animate-fadeIn">
            <Search className="w-12 h-12 text-violet-500 dark:text-violet-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">Smart Search</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Tell us your preferences and budget, and we'll find the perfect match for you
            </p>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 animate-fadeIn" style={{ animationDelay: '100ms' }}>
            <BarChart2 className="w-12 h-12 text-violet-500 dark:text-violet-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">Compare Features</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Compare phones side by side with our interactive comparison tools
            </p>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 animate-fadeIn" style={{ animationDelay: '200ms' }}>
            <ShoppingCart className="w-12 h-12 text-violet-500 dark:text-violet-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">Easy Purchase</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Buy directly from trusted retailers at the best available prices
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};