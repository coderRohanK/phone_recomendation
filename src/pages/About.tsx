import React from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Users, Target, Shield } from 'lucide-react';

export const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 text-transparent bg-clip-text">
          About PhoneGini
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-16 max-w-2xl mx-auto">
          We're dedicated to helping you make informed decisions about your next smartphone purchase
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
          <div className="text-center p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg animate-fadeIn">
            <Users className="w-16 h-16 text-blue-500 dark:text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">Our Mission</h3>
            <p className="text-gray-600 dark:text-gray-300">
              To simplify the smartphone selection process by providing accurate, data-driven recommendations
            </p>
          </div>

          <div className="text-center p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg animate-fadeIn" style={{ animationDelay: '100ms' }}>
            <Target className="w-16 h-16 text-blue-500 dark:text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">Our Vision</h3>
            <p className="text-gray-600 dark:text-gray-300">
              To become the most trusted platform for smartphone recommendations worldwide
            </p>
          </div>

          <div className="text-center p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg animate-fadeIn" style={{ animationDelay: '200ms' }}>
            <Shield className="w-16 h-16 text-blue-500 dark:text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">Our Values</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Transparency, accuracy, and user-centric decision making guide everything we do
            </p>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 animate-fadeIn" style={{ animationDelay: '300ms' }}>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Our Story</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            PhoneGini was born from a simple observation: choosing the right smartphone has become increasingly complex. With countless options, specifications, and features to consider, many people feel overwhelmed when making this important decision.
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Our team of tech enthusiasts and data analysts came together to create a solution that combines advanced analytics with user-friendly design. We believe that everyone deserves access to clear, unbiased information to make the best choice for their needs and budget.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Today, we're proud to help thousands of users find their perfect smartphone match through our innovative recommendation system and comprehensive comparison tools.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};