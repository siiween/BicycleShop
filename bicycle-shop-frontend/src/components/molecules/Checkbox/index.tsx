import React from 'react';

interface CheckboxProps {
  id: string;
  name: string;
  label?: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  name,
  label,
  checked,
  onChange,
  error,
  required = false,
  disabled = false,
  className = '',
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        id={id}
        name={name}
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        required={required}
        className={`h-5 w-5 my-2 text-rose-600 border-gray-300 rounded focus:ring focus:ring-rose-200 ${
          disabled ? 'bg-gray-100 cursor-not-allowed' : ''
        } ${className}`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Checkbox;
