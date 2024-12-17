import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Landing } from './pages/Landing';
import { Home } from './pages/Home';
import { Features } from './pages/Features';
import { HowItWorks } from './pages/HowItWorks';
import { About } from './pages/About';
import { Compare } from './pages/Compare';
import { Search } from './pages/Search';
import { ComparePhones } from './pages/ComparePhones';
import { ComparisonProvider } from './store/ComparisonContext';
import { ThemeProvider } from './store/ThemeContext';
import { PreferencesProvider } from './store/PreferencesContext';
import { ReviewProvider } from './store/ReviewContext';

function App() {
  return (
    <ThemeProvider>
      <PreferencesProvider>
        <ComparisonProvider>
          <ReviewProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/recommend" element={<Home />} />
                <Route path="/features" element={<Features />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/about" element={<About />} />
                <Route path="/compare" element={<Compare />} />
                <Route path="/search" element={<Search />} />
                <Route path="/compare-phones" element={<ComparePhones />} />
              </Routes>
            </Router>
          </ReviewProvider>
        </ComparisonProvider>
      </PreferencesProvider>
    </ThemeProvider>
  );
}

export default App;