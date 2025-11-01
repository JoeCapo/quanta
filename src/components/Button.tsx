// src/components/common/Button.tsx

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "success" | "error";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  children: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      children,
      className = "",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "btn inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variantStyles = {
      primary: "btn-primary",
      secondary: "btn-secondary",
      ghost: "btn-ghost",
      success: "btn-success",
      error: "btn-error",
    };

    const sizeStyles = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <div className="spinner h-4 w-4" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
