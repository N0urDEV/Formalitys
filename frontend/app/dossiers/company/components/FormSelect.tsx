import React from 'react';

interface FormSelectProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  error?: string;
  onFocus?: () => void;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
}

export const FormSelect: React.FC<FormSelectProps> = ({
  label,
  name,
  value,
  onChange,
  options,
  error,
  onFocus,
  required = false,
  disabled = false,
  placeholder
}) => {
  return (
    <div>
      <label 
        className="block text-sm font-medium text-gray-700 mb-2"
        style={{ fontFamily: 'Satoshi, sans-serif' }}
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <select
        name={name}
        className={`w-full px-4 py-3 text-black rounded-2xl border transition-all duration-300 bg-white/80 backdrop-blur-sm ${
          error 
            ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
            : 'border-gray-200 focus:border-[#F66B4C] focus:ring-2 focus:ring-[#F66B4C]/20'
        } ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        disabled={disabled}
        style={{ fontFamily: 'Satoshi, sans-serif' }}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
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
