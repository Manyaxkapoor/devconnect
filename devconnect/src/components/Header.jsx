import { useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-soft sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="font-display text-2xl font-bold text-primary-800">
              DevConnect
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a 
              href="#how-we-help" 
              className="text-secondary-600 hover:text-primary-600 font-medium transition-colors duration-200"
            >
              How we help?
            </a>
            <a 
              href="#about" 
              className="text-secondary-600 hover:text-primary-600 font-medium transition-colors duration-200"
            >
              About
            </a>
            <a 
              href="#contact" 
              className="text-secondary-600 hover:text-primary-600 font-medium transition-colors duration-200"
            >
              Contact
            </a>
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex items-center">
            <button className="bg-black hover:bg-gray-800 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200 flex items-center space-x-2">
              <span>Get Started</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-secondary-600 hover:text-primary-600 transition-colors duration-200"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden animate-slide-down">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-secondary-200">
              <a 
                href="#how-we-help" 
                className="block px-3 py-2 text-secondary-600 hover:text-primary-600 font-medium transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                How we help?
              </a>
              <a 
                href="#about" 
                className="block px-3 py-2 text-secondary-600 hover:text-primary-600 font-medium transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </a>
              <a 
                href="#contact" 
                className="block px-3 py-2 text-secondary-600 hover:text-primary-600 font-medium transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </a>
              <div className="pt-4">
                <button className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
                  <span>Get Started</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 