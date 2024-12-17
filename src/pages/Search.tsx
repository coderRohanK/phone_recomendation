import React, { useState, useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { PhoneCard } from '../components/PhoneCard';
import { DownloadButton } from '../components/DownloadButton';
import { phones } from '../data/phones';
import { Phone } from '../types/phone';
import { Search as SearchIcon, SlidersHorizontal, X } from 'lucide-react';

export const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    company: '',
    minRam: 0,
    minStorage: 0,
    minCamera: 0,
    maxPrice: 200000,
    minPrice: 0,
  });

  const [filteredPhones, setFilteredPhones] = useState<Phone[]>(phones);

  const companies = Array.from(new Set(phones.map(phone => phone.company)));

  useEffect(() => {
    const filtered = phones.filter(phone => {
      const matchesSearch = phone.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          phone.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCompany = !filters.company || phone.company === filters.company;
      const matchesRam = phone.specs.ram >= filters.minRam;
      const matchesStorage = phone.specs.storageGB >= filters.minStorage;
      const matchesCamera = phone.specs.cameraMP >= filters.minCamera;
      const matchesPrice = phone.price >= filters.minPrice && phone.price <= filters.maxPrice;

      return matchesSearch && matchesCompany && matchesRam && matchesStorage && 
             matchesCamera && matchesPrice;
    });

    setFilteredPhones(filtered);
  }, [searchTerm, filters]);

  const clearFilters = () => {
    setFilters({
      company: '',
      minRam: 0,
      minStorage: 0,
      minCamera: 0,
      maxPrice: 200000,
      minPrice: 0,
    });
  };

  const isFiltered = searchTerm !== '' || 
    filters.company !== '' || 
    filters.minRam !== 0 || 
    filters.minStorage !== 0 || 
    filters.minCamera !== 0 || 
    filters.minPrice !== 0 || 
    filters.maxPrice !== 200000;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 relative">
              <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search phones by name or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent outline-none transition-all"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
            >
              <SlidersHorizontal className="w-5 h-5" />
              Filters
            </button>
          </div>

          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600 dark:text-gray-300">
              {filteredPhones.length} phones found
            </p>
            <div className="flex gap-4">
              <DownloadButton phones={phones} isFiltered={false} />
              {isFiltered && <DownloadButton phones={filteredPhones} isFiltered={true} />}
            </div>
          </div>

          {showFilters && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg animate-fadeIn">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 flex items-center gap-1"
                >
                  <X className="w-4 h-4" />
                  Clear all
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Company
                  </label>
                  <select
                    value={filters.company}
                    onChange={(e) => setFilters({ ...filters, company: e.target.value })}
                    className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-2.5"
                  >
                    <option value="">All Companies</option>
                    {companies.map((company, index) => (
                      <option key={`company-${index}`} value={company}>
                        {company}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Minimum RAM (GB)
                  </label>
                  <select
                    value={filters.minRam}
                    onChange={(e) => setFilters({ ...filters, minRam: Number(e.target.value) })}
                    className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-2.5"
                  >
                    <option value="0">Any RAM</option>
                    <option value="4">4 GB</option>
                    <option value="6">6 GB</option>
                    <option value="8">8 GB</option>
                    <option value="12">12 GB</option>
                    <option value="16">16 GB</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Minimum Storage (GB)
                  </label>
                  <select
                    value={filters.minStorage}
                    onChange={(e) => setFilters({ ...filters, minStorage: Number(e.target.value) })}
                    className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-2.5"
                  >
                    <option value="0">Any Storage</option>
                    <option value="64">64 GB</option>
                    <option value="128">128 GB</option>
                    <option value="256">256 GB</option>
                    <option value="512">512 GB</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Minimum Camera (MP)
                  </label>
                  <select
                    value={filters.minCamera}
                    onChange={(e) => setFilters({ ...filters, minCamera: Number(e.target.value) })}
                    className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-2.5"
                  >
                    <option value="0">Any Camera</option>
                    <option value="12">12 MP</option>
                    <option value="48">48 MP</option>
                    <option value="50">50 MP</option>
                    <option value="108">108 MP</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Price Range (₹)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={(e) => setFilters({ ...filters, minPrice: Number(e.target.value) })}
                      className="w-1/2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-2.5"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
                      className="w-1/2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-2.5"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPhones.map((phone) => (
            <PhoneCard key={phone.id} phone={phone} />
          ))}
        </div>

        {filteredPhones.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">No phones match your search criteria.</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};