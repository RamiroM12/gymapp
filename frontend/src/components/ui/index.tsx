import React, { useState } from 'react';
import { Skeleton as SkeletonComponent, SkeletonCard, SkeletonTableRow, SkeletonForm } from './Skeleton';

// Re-export skeleton components
export const Skeleton = SkeletonComponent;
export { SkeletonCard, SkeletonTableRow, SkeletonForm };

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md',
  children, 
  className = '',
  ...props 
}) => {
  const baseStyles = 'rounded-lg font-medium transition-all duration-200 inline-flex items-center justify-center gap-2';
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };
  
  const variants = {
    primary: 'bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] active:scale-[0.98] shadow-sm hover:shadow-md',
    secondary: 'bg-[var(--bg-tertiary)] text-[var(--text-primary)] hover:bg-[var(--border-color)] active:scale-[0.98]',
    danger: 'bg-[var(--danger)] text-white hover:opacity-90 active:scale-[0.98] shadow-sm',
  };

  return (
    <button 
      className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ 
  label, 
  error, 
  className = '', 
  ...props 
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
          {label}
        </label>
      )}
      <input
        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--accent)] outline-none transition-colors ${
          error ? 'border-[var(--danger)]' : 'border-[var(--border-color)]'
        } bg-[var(--bg-secondary)] text-[var(--text-primary)] ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm" style={{ color: 'var(--danger)' }}>{error}</p>
      )}
    </div>
  );
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: number | string; label: string }[];
}

export const Select: React.FC<SelectProps> = ({ 
  label, 
  options, 
  className = '', 
  ...props 
}) => {
  return (
    <div className={label ? "mb-4" : ""}>
      {label && (
        <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
          {label}
        </label>
      )}
      <select
        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--accent)] outline-none transition-colors bg-[var(--bg-secondary)] text-[var(--text-primary)] border-[var(--border-color)] ${className}`}
        {...props}
      >
        <option value="">Seleccionar...</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({ children, className = '', style }) => {
  return (
    <div className={`rounded-xl p-6 transition-all duration-300 hover:shadow-lg ${className}`}
         style={{ 
           backgroundColor: 'var(--bg-secondary)', 
           color: 'var(--text-primary)',
           border: '1px solid var(--border-color)',
           boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
           ...style
         }}>
      {children}
    </div>
  );
};

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'error' | 'info';
}

export const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'info' 
}) => {
  const variants = {
    success: 'bg-[var(--success)]/20 text-[var(--success)]',
    warning: 'bg-[var(--warning)]/20 text-[var(--warning)]',
    error: 'bg-[var(--danger)]/20 text-[var(--danger)]',
    info: 'bg-[var(--accent)]/20 text-[var(--accent)]',
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
};

interface LoadingProps {
  message?: string;
}

export const Loading: React.FC<LoadingProps> = ({ 
  message = 'Cargando...' 
}) => {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: 'var(--accent)' }}></div>
      <span className="ml-3" style={{ color: 'var(--text-secondary)' }}>{message}</span>
    </div>
  );
};

interface AutocompleteProps {
  label?: string;
  placeholder?: string;
  value: number;
  onChange: (value: number) => void;
  options: { value: number; label: string }[];
  error?: string;
}

export const Autocomplete: React.FC<AutocompleteProps> = ({
  label,
  placeholder = 'Buscar...',
  value,
  onChange,
  options,
  error
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const selectedOption = options.find(opt => opt.value === value);

  const filteredOptions = options.filter(opt => 
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (optionValue: number, optionLabel: string) => {
    onChange(optionValue);
    setSearch(optionLabel);
    setIsOpen(false);
  };

  return (
    <div className="mb-4 relative">
      {label && (
        <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
          {label}
        </label>
      )}
      <input
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setIsOpen(true);
          if (e.target.value === '') {
            onChange(0);
          }
        }}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        placeholder={selectedOption ? selectedOption.label : placeholder}
        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--accent)] outline-none transition-colors ${
          error ? 'border-[var(--danger)]' : 'border-[var(--border-color)]'
        } bg-[var(--bg-secondary)] text-[var(--text-primary)]`}
      />
      {isOpen && filteredOptions.length > 0 && (
        <ul className="absolute z-10 w-full border rounded-lg mt-1 max-h-48 overflow-y-auto shadow-lg" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
          {filteredOptions.map(opt => (
            <li
              key={opt.value}
              onClick={() => handleSelect(opt.value, opt.label)}
              className="px-3 py-2 cursor-pointer text-sm transition-colors hover:bg-[var(--bg-tertiary)]"
              style={{ color: 'var(--text-primary)' }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
      {error && (
        <p className="mt-1 text-sm" style={{ color: 'var(--danger)' }}>{error}</p>
      )}
    </div>
  );
};

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange
}) => {
  if (totalPages <= 1) return null;

  const pages: (number | string)[] = [];
  
  // Always show first page
  pages.push(1);
  
  // Add ellipsis and pages around current
  for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
    if (!pages.includes(i)) {
      pages.push(i);
    }
  }
  
  // Add ellipsis if needed
  if (currentPage > 2 && totalPages > 3) {
    pages.splice(1, 0, '...');
  }
  
  // Always show last page if more than 1
  if (totalPages > 1 && !pages.includes(totalPages)) {
    if (totalPages > 2 && currentPage < totalPages - 1) {
      pages.splice(pages.length - 1, 0, '...');
    }
    pages.push(totalPages);
  }

  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded border disabled:opacity-50 disabled:cursor-not-allowed transition-colors hover:bg-[var(--bg-tertiary)]"
        style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
      >
        Anterior
      </button>
      
      {pages.map((page, index) => (
        typeof page === 'number' ? (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded transition-colors ${
              page === currentPage
                ? ''
                : 'border hover:bg-[var(--bg-tertiary)]'
            }`}
            style={page === currentPage 
              ? { backgroundColor: 'var(--accent)', color: 'white' }
              : { borderColor: 'var(--border-color)', color: 'var(--text-primary)' }
            }
          >
            {page}
          </button>
        ) : (
          <span key={index} className="px-2" style={{ color: 'var(--text-muted)' }}>...</span>
        )
      ))}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded border disabled:opacity-50 disabled:cursor-not-allowed transition-colors hover:bg-[var(--bg-tertiary)]"
        style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
      >
        Siguiente
      </button>
    </div>
  );
};