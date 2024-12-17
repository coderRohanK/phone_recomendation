import React from 'react';
import { Download } from 'lucide-react';
import { Phone } from '../types/phone';
import { generatePhonePDF } from '../utils/pdfGenerator';

interface DownloadButtonProps {
  phones: Phone[];
  isFiltered: boolean;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({ phones, isFiltered }) => {
  const handleDownload = () => {
    generatePhonePDF(phones, isFiltered);
  };

  return (
    <button
      onClick={handleDownload}
      className="flex items-center gap-2 px-4 py-2 bg-purple-600 dark:bg-purple-500 text-white rounded-lg hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors"
    >
      <Download className="w-4 h-4" />
      <span>Download {isFiltered ? 'Filtered' : 'Complete'} Dataset</span>
    </button>
  );
};