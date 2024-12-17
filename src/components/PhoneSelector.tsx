import React from 'react';
import { Phone } from '../types/phone';
import { Plus } from 'lucide-react';

interface PhoneSelectorProps {
  onSelect: () => void;
  selectedPhone: Phone | null;
  position: 'left' | 'right';
}

export const PhoneSelector: React.FC<PhoneSelectorProps> = ({
  onSelect,
  selectedPhone,
  position,
}) => {
  return (
    <div className="flex-1">
      {!selectedPhone ? (
        <button
          onClick={onSelect}
          className="w-full h-[400px] border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center gap-4 hover:border-purple-400 hover:bg-purple-50 transition-all group"
        >
          <Plus className="w-12 h-12 text-gray-400 group-hover:text-purple-500 transition-colors" />
          <span className="text-gray-500 group-hover:text-purple-600 font-medium">
            Add Phone to Compare
          </span>
        </button>
      ) : (
        <div className="relative group">
          <div className="absolute -top-2 -right-2 z-10">
            <button
              onClick={onSelect}
              className="bg-purple-100 hover:bg-purple-200 text-purple-600 p-2 rounded-lg transition-colors"
            >
              Change
            </button>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">{selectedPhone.name}</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="font-semibold">₹{selectedPhone.price.toLocaleString()}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Camera</p>
                  <p className="font-semibold">{selectedPhone.specs.cameraMP}MP</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Storage</p>
                  <p className="font-semibold">{selectedPhone.specs.storageGB}GB</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">RAM</p>
                  <p className="font-semibold">{selectedPhone.specs.ram}GB</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};