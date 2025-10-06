import React from 'react';

// Importar los logos reales
import logoPrimary from '../assets/images/logos/Logo Phiteca R.png';
import logoWhite from '../assets/images/logos/Logo Phiteca R compacto.png';
import logoDark from '../assets/images/logos/Logo Phiteca R compacto Azul.png';
import logoIcon from '../assets/images/logos/Logo anagrama con R.png';

interface LogoProps {
  variant?: 'primary' | 'white' | 'dark' | 'icon';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  className = '',
  showText = true 
}) => {
  const sizeClasses = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-12',
    xl: 'h-16'
  };

  const logoMap = {
    primary: logoPrimary,
    white: logoWhite,
    dark: logoDark,
    icon: logoIcon
  };

  // Si es solo icono, usar el icono real
  if (variant === 'icon') {
    return (
      <div className={`${sizeClasses[size]} ${className}`}>
        <img 
          src={logoIcon} 
          alt="PHITECA Icon" 
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  // Para logos completos, usar las imágenes reales
  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <img 
        src={logoMap[variant]} 
        alt="PHITECA Logo" 
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default Logo;
