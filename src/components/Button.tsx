// src/components/common/Button.tsx

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'success' | 'error';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  children,
  className = '',
  ...props
}) => {
  const baseStyles = 'btn inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantStyles = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'btn-ghost',
    success: 'btn-success',
    error: 'btn-error',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <div className="spinner h-4 w-4" />
      )}
      {children}
    </button>
  );
};

export default Button;
