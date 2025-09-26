import React from 'react';

interface FormInputProps {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  className?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = false,
  className = ''
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
      <input
        type={type}
        className={`w-full px-4 py-3 text-black rounded-2xl border transition-all duration-300 bg-white/80 backdrop-blur-sm ${
          error 
            ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
            : 'border-gray-200 focus:border-[#007ea7] focus:ring-2 focus:ring-[#007ea7]/20'
        }`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
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
