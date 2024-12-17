import React from 'react';
import { Smartphone, Search, SlidersHorizontal } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from '../ThemeToggle';

export const Header = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <Smartphone className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 text-transparent bg-clip-text">
              PhoneGini
            </span>
          </Link>
          <nav className="flex items-center space-x-6">
            <Link 
              to="/search" 
              className={`transition-colors flex items-center gap-2 ${
                isActive('/search')
                  ? 'text-purple-600 dark:text-purple-400 font-medium'
                  : 'text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'
              }`}
            >
              <Search className="w-4 h-4" />
              Search
            </Link>
            <Link 
              to="/compare-phones" 
              className={`transition-colors flex items-center gap-2 ${
                isActive('/compare-phones')
                  ? 'text-purple-600 dark:text-purple-400 font-medium'
                  : 'text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Compare
            </Link>
            <Link 
              to="/features" 
              className={`transition-colors ${
                isActive('/features')
                  ? 'text-purple-600 dark:text-purple-400 font-medium'
                  : 'text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'
              }`}
            >
              Features
            </Link>
            <Link 
              to="/how-it-works" 
              className={`transition-colors ${
                isActive('/how-it-works')
                  ? 'text-purple-600 dark:text-purple-400 font-medium'
                  : 'text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'
              }`}
            >
              How it Works
            </Link>
            <Link 
              to="/about" 
              className={`transition-colors ${
                isActive('/about')
                  ? 'text-purple-600 dark:text-purple-400 font-medium'
                  : 'text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'
              }`}
            >
              About
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
};