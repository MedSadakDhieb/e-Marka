import React from 'react';

interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectFieldProps {
  label: string;
  value: string | number;
  options: SelectOption[];
  onChange: (value: string | number) => void;
  required?: boolean;
  disabled?: boolean;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  value,
  options,
  onChange,
  required = false,
  disabled = false,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => {
          const val = e.target.value;
          // Convert to number if it's a numeric string
          const parsedVal = /^\d+$/.test(val) ? parseInt(val, 10) : val;
          onChange(parsedVal);
        }}
        disabled={disabled}
        required={required}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 
                   bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                   focus:outline-none focus:ring-2 focus:ring-primary-500 
                   disabled:opacity-60 disabled:cursor-not-allowed
                   transition duration-200"
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};