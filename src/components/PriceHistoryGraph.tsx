import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { phones } from '../data/phones';

interface PriceHistoryGraphProps {
  phoneId: string;
  isExpanded: boolean;
  onToggle: () => void;
}

interface PriceHistory {
  month: string;
  price: number;
}

const generatePriceHistory = (phoneId: string): PriceHistory[] => {
  const phone = phones.find(p => p.id === phoneId);
  if (!phone) return [];

  const currentPrice = phone.price;
  const maxVariation = currentPrice * 0.05; // 5% maximum variation
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  
  let lastPrice = currentPrice;
  return months.map(month => {
    // Generate a price that's within ±5% of the last price
    const variation = (Math.random() * maxVariation * 2) - maxVariation;
    lastPrice = Math.round(lastPrice + variation);
    
    // Ensure price stays within reasonable bounds
    if (lastPrice > currentPrice * 1.1) lastPrice = currentPrice * 1.1;
    if (lastPrice < currentPrice * 0.9) lastPrice = currentPrice * 0.9;
    
    return {
      month,
      price: Math.round(lastPrice)
    };
  });
};

export const PriceHistoryGraph: React.FC<PriceHistoryGraphProps> = ({ phoneId, isExpanded, onToggle }) => {
  const priceHistory = generatePriceHistory(phoneId);
  const phone = phones.find(p => p.id === phoneId);
  const currentPrice = phone?.price || 0;

  // Calculate min and max for YAxis domain
  const minPrice = Math.min(...priceHistory.map(h => h.price));
  const maxPrice = Math.max(...priceHistory.map(h => h.price));
  const padding = (maxPrice - minPrice) * 0.1; // 10% padding

  return (
    <div className="mt-4">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-2 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
      >
        <span className="text-sm font-medium text-purple-700">Price History</span>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-purple-700" />
        ) : (
          <ChevronDown className="w-4 h-4 text-purple-700" />
        )}
      </button>

      {isExpanded && (
        <div className="mt-4 p-4 bg-white rounded-lg shadow-lg animate-fadeIn">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={priceHistory}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis 
                  domain={[
                    Math.floor((minPrice - padding) / 1000) * 1000,
                    Math.ceil((maxPrice + padding) / 1000) * 1000
                  ]}
                  tickFormatter={(value) => `₹${(value / 1000)}k`}
                />
                <Tooltip
                  formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Price']}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  dot={{ fill: '#8b5cf6' }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 text-sm text-gray-500 text-center">
            Current Price: ₹{currentPrice.toLocaleString()}
          </div>
        </div>
      )}
    </div>
  );
};