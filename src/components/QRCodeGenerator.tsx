import React, { useState, useRef, useCallback } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Download, RefreshCw } from 'lucide-react';
import InputField from './InputField';

const QRCodeGenerator: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const downloadQRCode = useCallback(() => {
    if (!qrRef.current) return;

    setIsDownloading(true);
    
    try {
      const canvas = qrRef.current.querySelector('canvas');
      if (!canvas) throw new Error('Canvas not found');

      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'qrcode.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading QR code:', error);
    } finally {
      setIsDownloading(false);
    }
  }, []);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 transform hover:shadow-xl">
        <div className="p-6">
          <h2 className="text-xl font-medium text-slate-800 mb-4">Generate QR Code</h2>
          <InputField value={inputValue} onChange={handleInputChange} />
          
          <div className="mt-8 mb-6">
            <div 
              ref={qrRef} 
              className={`flex justify-center items-center p-4 bg-slate-50 rounded-lg border border-slate-200 transition-all duration-300 ${!inputValue ? 'opacity-50' : 'opacity-100'}`}
            >
              {inputValue ? (
                <div className="p-2 bg-white rounded-md shadow-sm">
                  <QRCodeCanvas 
                    value={inputValue || 'https://example.com'} 
                    size={200}
                    level="H"
                    includeMargin={true}
                    className="transition-all duration-300"
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-[232px] w-[232px] text-slate-400">
                  <RefreshCw className="h-8 w-8 mb-2 opacity-50" />
                  <p className="text-sm">Enter text to generate QR code</p>
                </div>
              )}
            </div>
          </div>
          
          <button
            onClick={downloadQRCode}
            disabled={!inputValue || isDownloading}
            className={`w-full py-3 px-4 rounded-lg flex items-center justify-center space-x-2 text-white font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
              ${inputValue ? 'bg-blue-600 hover:bg-blue-700' : 'bg-slate-300 cursor-not-allowed'}`}
          >
            <Download className={`h-5 w-5 ${isDownloading ? 'animate-bounce' : ''}`} />
            <span>{isDownloading ? 'Downloading...' : 'Download QR Code'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;