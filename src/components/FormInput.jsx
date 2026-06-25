import React from 'react';

export default function FormInput({
  label,
  id,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  icon: Icon,
  required = false,
  options = [],
  className = '',
  ...props
}) {
  const baseInputStyles = `block w-full pr-4 py-3 bg-slate-50 border rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all sm:text-sm
    ${Icon ? 'pl-11' : 'pl-4'}
    ${error ? 'border-red-400 focus:ring-red-400' : 'border-slate-200'}
  `;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className={`absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors
            ${error ? 'text-red-400' : 'text-slate-400'}
          `}>
            <Icon className="h-5 w-5" />
          </div>
        )}

        {type === 'select' ? (
          <select
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className={`${baseInputStyles} appearance-none cursor-pointer`}
            {...props}
          >
            {placeholder && <option value="" disabled>{placeholder}</option>}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            id={id}
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            className={baseInputStyles}
            {...props}
          />
        )}

        {type === 'select' && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-xs text-red-500 font-medium animate-fadeIn">
          {error}
        </p>
      )}
    </div>
  );
}
