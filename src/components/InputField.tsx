import React, { useState } from 'react';
import { X } from 'lucide-react';

interface InputFieldProps {
  value: string;
  onChange: (value: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({ value, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    onChange('');
  };

  return (
    <div className="relative">
      <label 
        htmlFor="qr-input" 
        className={`absolute left-3 transition-all duration-200 pointer-events-none
          ${isFocused || value ? 'text-xs -translate-y-2 text-blue-600' : 'text-sm translate-y-3 text-slate-500'}`}
      >
        Enter text or URL
      </label>
      
      <input
        id="qr-input"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder=""
        className={`w-full px-3 pt-6 pb-2 rounded-lg border transition-all duration-200 outline-none
          ${isFocused 
            ? 'border-blue-500 shadow-sm ring-2 ring-blue-100' 
            : 'border-slate-300 hover:border-slate-400'}`}
      />
      
      {value && (
        <button 
          onClick={handleClear} 
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-200"
          aria-label="Clear input"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default InputField;