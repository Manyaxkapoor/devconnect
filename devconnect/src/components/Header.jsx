import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Dispatch a custom event to open the auth modal
  const openAuthModal = () => {
    window.dispatchEvent(new CustomEvent('open-auth-modal'));
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <h1
                className="font-sans text-2xl font-bold text-black transition-all duration-300 bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 transform hover:scale-105"
                style={{ fontFamily: 'Inter, sans-serif', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'black' }}
              >
                DevConnect
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-secondary-600 hover:text-primary-600 font-medium transition-colors duration-200 rounded-lg px-3 py-1 hover:bg-gray-100"
            >
              Home
            </Link>
            <a 
              href="#about" 
              className="text-secondary-600 hover:text-primary-600 font-medium transition-colors duration-200 rounded-lg px-3 py-1 hover:bg-gray-100"
            >
              About
            </a>
            <Link 
              to="/projects" 
              className="text-secondary-600 hover:text-primary-600 font-medium transition-colors duration-200 rounded-lg px-3 py-1 hover:bg-gray-100"
            >
              Projects
            </Link>
            <Link 
              to="/profile" 
              className="text-secondary-600 hover:text-primary-600 font-medium transition-colors duration-200 rounded-lg px-3 py-1 hover:bg-gray-100"
            >
              Profile
            </Link>
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex items-center">
            <button onClick={openAuthModal} className="bg-black hover:bg-gray-800 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200 flex items-center space-x-2">
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
              <Link 
                to="/" 
                className="block px-3 py-2 text-secondary-600 hover:text-primary-600 font-medium transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <a 
                href="#about" 
                className="block px-3 py-2 text-secondary-600 hover:text-primary-600 font-medium transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </a>
              <Link 
                to="/projects" 
                className="block px-3 py-2 text-secondary-600 hover:text-primary-600 font-medium transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Projects
              </Link>
              <Link 
                to="/profile" 
                className="block px-3 py-2 text-secondary-600 hover:text-primary-600 font-medium transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Profile
              </Link>
              <div className="pt-4">
                <button onClick={openAuthModal} className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
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