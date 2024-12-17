import React, { useState } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { PhoneSelector } from '../components/PhoneSelector';
import { PhoneSearchModal } from '../components/PhoneSearchModal';
import { RadarChart } from '../components/RadarChart';
import { Phone } from '../types/phone';

export const ComparePhones = () => {
  const [phone1, setPhone1] = useState<Phone | null>(null);
  const [phone2, setPhone2] = useState<Phone | null>(null);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [activeSelector, setActiveSelector] = useState<'left' | 'right' | null>(null);

  const handleOpenSearch = (position: 'left' | 'right') => {
    setActiveSelector(position);
    setIsSearchModalOpen(true);
  };

  const handleSelectPhone = (phone: Phone) => {
    if (activeSelector === 'left') {
      setPhone1(phone);
    } else {
      setPhone2(phone);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 text-transparent bg-clip-text">
          Compare Phones
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <PhoneSelector
            onSelect={() => handleOpenSearch('left')}
            selectedPhone={phone1}
            position="left"
          />
          <PhoneSelector
            onSelect={() => handleOpenSearch('right')}
            selectedPhone={phone2}
            position="right"
          />
        </div>

        {phone1 && phone2 && (
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-6 text-center text-gray-900 dark:text-gray-100">Specifications Comparison</h2>
            <div className="aspect-square w-full max-w-2xl mx-auto">
              <RadarChart basePhone={phone1} comparisonPhone={phone2} />
            </div>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">{phone1.name} Details</h3>
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p>Price: ₹{phone1.price.toLocaleString()}</p>
                  <p>RAM: {phone1.specs.ram}GB</p>
                  <p>Storage: {phone1.specs.storageGB}GB</p>
                  <p>Camera: {phone1.specs.cameraMP}MP</p>
                  <p>Battery: {phone1.specs.batteryMAh}mAh</p>
                  <p>Processor: {phone1.specs.processorGHz}GHz</p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">{phone2.name} Details</h3>
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p>Price: ₹{phone2.price.toLocaleString()}</p>
                  <p>RAM: {phone2.specs.ram}GB</p>
                  <p>Storage: {phone2.specs.storageGB}GB</p>
                  <p>Camera: {phone2.specs.cameraMP}MP</p>
                  <p>Battery: {phone2.specs.batteryMAh}mAh</p>
                  <p>Processor: {phone2.specs.processorGHz}GHz</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <PhoneSearchModal
          isOpen={isSearchModalOpen}
          onClose={() => setIsSearchModalOpen(false)}
          onSelect={handleSelectPhone}
        />
      </div>
      <Footer />
    </div>
  );
};