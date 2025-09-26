import React from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface FormSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  error?: string;
  required?: boolean;
  className?: string;
  placeholder?: string;
}

export const FormSelect: React.FC<FormSelectProps> = ({
  label,
  value,
  onChange,
  options,
  error,
  required = false,
  className = '',
  placeholder
}) => {
  return (
    <div className={className}>
      <label 
        className="block text-sm font-medium text-gray-700 mb-2"
        style={{ fontFamily: 'Satoshi, sans-serif' }}
      >
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <select
        className={`w-full px-4 py-3 text-black rounded-2xl border transition-all duration-300 bg-white/80 backdrop-blur-sm ${
          error 
            ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
            : 'border-gray-200 focus:border-[#007ea7] focus:ring-2 focus:ring-[#007ea7]/20'
        }`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ fontFamily: 'Satoshi, sans-serif' }}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-red-500 text-sm mt-1" style={{ fontFamily: 'Satoshi, sans-serif' }}>
          {error}
        </p>
      )}
    </div>
  );
};
