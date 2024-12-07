import React from 'react';

interface Option {
  value: string | number;
  label: string;
}

interface SelectProps {
  id: string;
  name: string;
  label?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  options: Option[];
  placeholder?: string;
  className?: string;
}

const Select: React.FC<SelectProps> = ({
  id,
  name,
  label,
  value,
  onChange,
  onBlur,
  error,
  required = false,
  disabled = false,
  options,
  placeholder = 'Select an option',
  className = '',
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        required={required}
        className={`w-full px-3 py-2.5 border bg-white rounded-md focus:outline-none focus:ring focus:ring-neutral-200 ${
          error
            ? 'border-red-500 focus:ring-red-200'
            : 'border-gray-300 focus:border-neutral-500'
        } ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''} ${className}`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Select;
