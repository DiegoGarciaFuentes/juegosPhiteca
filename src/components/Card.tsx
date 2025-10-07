import React from 'react';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'gradient' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  hover = false,
}) => {
  const baseClasses = 'rounded-xl shadow-lg transition-all duration-200';
  
  const variantClasses = {
    default: 'bg-white/95 border-2 border-phiteca-complement',
    gradient: 'bg-gradient-to-br from-purple-500 to-pink-500 text-white',
    outline: 'bg-phiteca-secondary border-2 border-phiteca-primary',
  };
  
  const sizeClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };
  
  const hoverClasses = hover ? 'hover:shadow-xl hover:transform hover:-translate-y-1' : '';
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${hoverClasses} ${className}`;
  
  return (
    <div className={classes}>
      {children}
    </div>
  );
};

export default Card;
