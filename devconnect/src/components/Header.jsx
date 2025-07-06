import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Smart sticky header logic
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 10) {
        setShowHeader(true);
      } else if (currentScrollY > lastScrollY) {
        setShowHeader(false); // Hide on scroll down
      } else {
        setShowHeader(true); // Show on scroll up
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Dispatch a custom event to open the auth modal
  const openAuthModal = () => {
    window.dispatchEvent(new CustomEvent('open-auth-modal'));
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`bg-white sticky top-0 z-50 transition-transform duration-300 ${showHeader ? 'translate-y-0' : '-translate-y-full'}`} style={{ willChange: 'transform' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center h-16">
            <Link to="/" className="flex items-center h-full">
              <h1
                className="text-2xl font-bold text-black tracking-tight transition-all duration-300 cursor-pointer hover:text-blue-700 hover:-translate-y-1 flex items-center h-full"
                style={{ letterSpacing: '-0.03em', fontFamily: 'Inter, sans-serif', lineHeight: '1.2' }}
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