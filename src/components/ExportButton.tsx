import React from 'react';
import { Download } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ExportButtonProps {
  onExport: (format: 'pdf' | 'csv' | 'image') => void;
}

const ExportButton: React.FC<ExportButtonProps> = ({ onExport }) => {
  const { t } = useTranslation();

  return (
    <div className="relative inline-block">
      <button
        className="bg-white border border-gray-300 rounded-lg py-2 px-4 flex items-center space-x-2 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
        onClick={() => onExport('pdf')}
      >
        <Download className="h-4 w-4" />
        <span>{t('header.export.title')}</span>
      </button>
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg hidden group-hover:block">
        <button
          onClick={() => onExport('pdf')}
          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
        >
          {t('header.export.pdf')}
        </button>
        <button
          onClick={() => onExport('csv')}
          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
        >
          {t('header.export.csv')}
        </button>
        <button
          onClick={() => onExport('image')}
          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
        >
          {t('header.export.image')}
        </button>
      </div>
    </div>
  );
};

export default ExportButton;