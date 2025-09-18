import React from 'react';

interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  onFocus?: () => void;
  required?: boolean;
  disabled?: boolean;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  onFocus,
  required = false,
  disabled = false
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
      <input
        type={type}
        name={name}
        className={`w-full px-4 py-3 text-black rounded-2xl border transition-all duration-300 bg-white/80 backdrop-blur-sm ${
          error 
            ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
            : 'border-gray-200 focus:border-[#F66B4C] focus:ring-2 focus:ring-[#F66B4C]/20'
        } ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        disabled={disabled}
        style={{ fontFamily: 'Satoshi, sans-serif' }}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1" style={{ fontFamily: 'Satoshi, sans-serif' }}>
          {error}
        </p>
      )}
    </div>
  );
};
