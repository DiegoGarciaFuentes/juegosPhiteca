import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

interface NavigationProps {
  variant?: 'light' | 'dark';
  className?: string;
}

const Navigation: React.FC<NavigationProps> = ({
  variant = 'light',
  className = '',
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navClasses = variant === 'light' 
    ? 'bg-white shadow-lg border-b-2 border-phiteca-complement'
    : 'bg-phiteca-secondary shadow-lg border-b-2 border-phiteca-complement';
  
  const linkClasses = variant === 'light'
    ? 'text-phiteca-primary hover:text-phiteca-accent transition-colors font-medium'
    : 'text-phiteca-primary hover:text-phiteca-accent transition-colors font-medium';
  
  const mobileLinkClasses = variant === 'light'
    ? 'block px-3 py-2 text-phiteca-primary hover:text-phiteca-accent hover:bg-phiteca-complement hover:bg-opacity-20 rounded-md transition-colors'
    : 'block px-3 py-2 text-phiteca-primary hover:text-phiteca-accent hover:bg-phiteca-complement hover:bg-opacity-20 rounded-md transition-colors';
  
  const buttonClasses = variant === 'light'
    ? 'text-phiteca-primary hover:text-phiteca-accent focus:outline-none'
    : 'text-phiteca-primary hover:text-phiteca-accent focus:outline-none';
  
  const mobileMenuClasses = variant === 'light'
    ? 'md:hidden bg-white border-t border-phiteca-complement'
    : 'md:hidden bg-phiteca-secondary border-t border-phiteca-complement';

  return (
    <nav className={`${navClasses} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="hover:opacity-80 transition-opacity">
                <Logo variant="primary" size="md" />
              </Link>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={linkClasses}>Inicio</Link>
            <Link to="/games" className={linkClasses}>Juegos</Link>
            <Link to="/about" className={linkClasses}>Acerca de</Link>
            <Link to="/contact" className={linkClasses}>Contacto</Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={buttonClasses}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className={mobileMenuClasses}>
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/" className={mobileLinkClasses}>Inicio</Link>
              <Link to="/games" className={mobileLinkClasses}>Juegos</Link>
              <Link to="/about" className={mobileLinkClasses}>Acerca de</Link>
              <Link to="/contact" className={mobileLinkClasses}>Contacto</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
