import React from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Settings, Search, BarChart2, ShoppingCart } from 'lucide-react';

export const HowItWorks = () => {
  const steps = [
    {
      icon: <Settings className="w-12 h-12 text-indigo-500 dark:text-indigo-400" />,
      title: "Set Your Preferences",
      description: "Tell us what matters most to you in a smartphone - from camera quality to battery life"
    },
    {
      icon: <Search className="w-12 h-12 text-indigo-500 dark:text-indigo-400" />,
      title: "Smart Analysis",
      description: "Our algorithm analyzes thousands of data points to find your perfect match"
    },
    {
      icon: <BarChart2 className="w-12 h-12 text-indigo-500 dark:text-indigo-400" />,
      title: "Compare Options",
      description: "View detailed comparisons and make an informed decision"
    },
    {
      icon: <ShoppingCart className="w-12 h-12 text-indigo-500 dark:text-indigo-400" />,
      title: "Easy Purchase",
      description: "Buy your chosen phone directly from trusted retailers"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400 text-transparent bg-clip-text">
          How It Works
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-16 max-w-2xl mx-auto">
          Finding your perfect phone match is easy with our simple 4-step process
        </p>

        <div className="relative">
          {/* Connection Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-indigo-200 to-blue-200 dark:from-indigo-900 dark:to-blue-900 transform -translate-y-1/2 hidden lg:block" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div 
                key={index}
                className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fadeIn"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-6">{step.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-indigo-500 dark:bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 animate-fadeIn">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Detailed Process</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-2">1. Preference Setting</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Use our intuitive rating system to specify the importance of key features like camera quality, storage capacity, processing power, and battery life. Set your budget range to ensure recommendations match your financial requirements.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-2">2. Analysis Process</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our advanced algorithm processes your preferences against our comprehensive database of smartphones. We consider not just the raw specifications, but also real-world performance metrics and user reviews.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-2">3. Comparison Tools</h3>
              <p className="text-gray-600 dark:text-gray-300">
                View detailed comparisons through our interactive radar graphs. Compare multiple phones side by side, focusing on the features that matter most to you. Each comparison includes a viability score to help you understand long-term value.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-2">4. Purchase Options</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Once you've made your decision, choose from our verified retail partners. We provide direct links to trusted sellers, ensuring you get the best price and authentic products.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};