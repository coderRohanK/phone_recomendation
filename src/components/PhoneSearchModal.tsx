import React, { useState, useEffect } from 'react';
import { Phone } from '../types/phone';
import { Search, X } from 'lucide-react';
import { phones } from '../data/phones';

interface PhoneSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (phone: Phone) => void;
}

export const PhoneSearchModal: React.FC<PhoneSearchModalProps> = ({
  isOpen,
  onClose,
  onSelect,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPhones, setFilteredPhones] = useState<Phone[]>(phones);

  useEffect(() => {
    const filtered = phones.filter(
      phone =>
        phone.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        phone.company.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPhones(filtered);
  }, [searchTerm]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold">Select a Phone</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search phones..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            />
          </div>
        </div>
        <div className="overflow-y-auto max-h-[60vh] p-4">
          <div className="grid grid-cols-1 gap-4">
            {filteredPhones.map((phone) => (
              <button
                key={phone.id}
                onClick={() => {
                  onSelect(phone);
                  onClose();
                }}
                className="flex items-center gap-4 p-4 hover:bg-purple-50 rounded-lg transition-colors text-left"
              >
                <div>
                  <h3 className="font-medium">{phone.name}</h3>
                  <p className="text-sm text-gray-500">₹{phone.price.toLocaleString()}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};