import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  to?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  target?: string;
  rel?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  to,
  onClick,
  className = '',
  disabled = false,
  target,
  rel,
}) => {
  const baseClasses = 'font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none';
  
  const variantClasses = {
    primary: 'bg-phiteca-accent hover:bg-phiteca-tertiary text-phiteca-primary',
    secondary: 'bg-phiteca-secondary hover:bg-phiteca-complement text-phiteca-primary',
    outline: 'border-2 border-phiteca-complement text-phiteca-primary hover:bg-phiteca-complement hover:text-phiteca-secondary',
  };
  
  const sizeClasses = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-3 px-8 text-base',
    lg: 'py-4 px-10 text-lg',
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  
  // Si es un enlace externo
  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={classes}
      >
        {children}
      </a>
    );
  }
  
  // Si es un enlace interno
  if (to) {
    return (
      <Link
        to={to}
        className={classes}
      >
        {children}
      </Link>
    );
  }
  
  // Si es un botón
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
};

export default Button;
