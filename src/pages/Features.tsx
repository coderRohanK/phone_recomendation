import React from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Smartphone, Camera, Battery, Cpu, HardDrive, BarChart3, ShoppingBag } from 'lucide-react';

export const Features = () => {
  const features = [
    {
      icon: <Camera className="w-12 h-12 text-purple-500 dark:text-purple-400" />,
      title: "Camera Analysis",
      description: "Compare phone cameras with detailed megapixel analysis and lens specifications"
    },
    {
      icon: <Battery className="w-12 h-12 text-purple-500 dark:text-purple-400" />,
      title: "Battery Life Estimation",
      description: "Get accurate battery life predictions based on capacity and usage patterns"
    },
    {
      icon: <Cpu className="w-12 h-12 text-purple-500 dark:text-purple-400" />,
      title: "Performance Metrics",
      description: "Detailed processor benchmarks and real-world performance comparisons"
    },
    {
      icon: <HardDrive className="w-12 h-12 text-purple-500 dark:text-purple-400" />,
      title: "Storage Options",
      description: "Compare different storage configurations and expansion possibilities"
    },
    {
      icon: <BarChart3 className="w-12 h-12 text-purple-500 dark:text-purple-400" />,
      title: "Visual Comparisons",
      description: "Interactive radar graphs for easy spec-by-spec comparisons"
    },
    {
      icon: <ShoppingBag className="w-12 h-12 text-purple-500 dark:text-purple-400" />,
      title: "Shopping Links",
      description: "Direct links to trusted retailers with the best prices"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 text-transparent bg-clip-text">
          Our Features
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-16 max-w-2xl mx-auto">
          Discover the powerful features that help you make the perfect choice for your next smartphone
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fadeIn"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};