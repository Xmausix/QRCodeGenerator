import React from 'react';
import { QrCode } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="py-6 px-4 sm:px-6 flex justify-center border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="flex items-center space-x-2">
        <QrCode className="h-6 w-6 text-blue-600" />
        <h1 className="text-xl font-semibold text-slate-800">QR Code Generator</h1>
      </div>
    </header>
  );
};

export default Header;