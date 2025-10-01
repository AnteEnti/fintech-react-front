import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import AuthModal from './auth/AuthModal';

const SunIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);

const MoonIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
);

const HamburgerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
  </svg>
);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);


const Header: React.FC = () => {
  const { language, toggleLanguage, theme, toggleTheme } = useLanguage();
  const { isAuthenticated, user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false); // Close mobile menu on route change
  }, [location]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
        document.body.style.overflow = 'auto';
        window.removeEventListener('keydown', handleEsc);
    };
  }, [isMobileMenuOpen]);


  const navItems = [
    { path: '/', label: { en: 'Home', te: 'హోమ్' } },
    { path: '/learn/money-basics/what-is-budgeting', label: { en: 'Learn', te: 'తెలుసుకోండి' } },
    { path: '/calculators/investment/sip', label: { en: 'Calculators', te: 'కాలిక్యులేటర్లు' } },
    { path: '/guides/choosing-first-mutual-fund', label: { en: 'Guides', te: 'గైడ్‌లు' } },
    { path: '/compare/mf-vs-fd', label: { en: 'Comparisons', te: 'పోలికలు' } },
  ];

  const NavLinks = ({ isMobile }: { isMobile?: boolean }) => (
    <>
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `font-medium transition-colors ${
                isMobile 
                ? `block text-lg py-3 text-center ${isActive ? 'text-accent' : 'text-gray-700 dark:text-gray-200 hover:text-accent'}`
                : `text-base ${isActive ? 'text-secondary dark:text-blue-300' : 'text-gray-600 dark:text-gray-300 hover:text-secondary dark:hover:text-blue-300'}`
            }`
          }
        >
          {item.label[language]}
        </NavLink>
      ))}
      {isAuthenticated && (
        <NavLink to="/dashboard" className={({ isActive }) =>
            `font-medium transition-colors ${
                isMobile 
                ? `block text-lg py-3 text-center ${isActive ? 'text-accent' : 'text-gray-700 dark:text-gray-200 hover:text-accent'}`
                : `text-base ${isActive ? 'text-secondary dark:text-blue-300' : 'text-gray-600 dark:text-gray-300 hover:text-secondary dark:hover:text-blue-300'}`
            }`
          }
        >
            {language === 'en' ? 'Dashboard' : 'డాష్‌బోర్డ్'}
        </NavLink>
      )}
    </>
  );

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only bg-accent text-white font-bold py-3 px-4 absolute top-0 left-0 z-50">
        {language === 'en' ? 'Skip to main content' : 'ప్రధాన కంటెంట్‌కు వెళ్లండి'}
      </a>
      <header className="bg-white dark:bg-dark shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <NavLink to="/" className="text-2xl font-bold text-primary dark:text-blue-400">
              {language === 'en' ? 'TeluguFinance' : 'తెలుగుఫైనాన్స్'}
            </NavLink>
            <nav className="hidden md:flex items-center space-x-6">
              <NavLinks />
            </nav>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 text-gray-600 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <MoonIcon /> : <SunIcon />}
              </button>
              <button
                onClick={toggleLanguage}
                className="px-3 py-2 text-sm font-semibold text-white bg-accent rounded-md hover:bg-orange-600 transition-colors"
              >
                {language === 'en' ? 'తెలుగు' : 'English'}
              </button>

              {isAuthenticated ? (
                <button
                    onClick={logout}
                    className="hidden sm:block px-3 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                    {language === 'en' ? 'Logout' : 'లాగ్ అవుట్'}
                </button>
              ) : (
                <button
                    onClick={() => setIsAuthModalOpen(true)}
                    className="hidden sm:block px-3 py-2 text-sm font-semibold text-white bg-secondary rounded-md hover:bg-blue-700 transition-colors"
                >
                    {language === 'en' ? 'Login' : 'లాగిన్'}
                </button>
              )}

              <div className="md:hidden">
                  <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-gray-600 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700" aria-label="Open navigation menu">
                    <HamburgerIcon />
                  </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`fixed inset-0 bg-white dark:bg-dark z-50 transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
            <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
                <span className="text-2xl font-bold text-primary dark:text-blue-400">
                    {language === 'en' ? 'Menu' : 'మెనూ'}
                </span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-600 dark:text-gray-300 rounded-md" aria-label="Close navigation menu">
                    <CloseIcon />
                </button>
            </div>
            <nav className="flex flex-col items-center justify-center h-full space-y-6 -mt-16">
                <NavLinks isMobile />
                <div className="pt-6">
                    {isAuthenticated ? (
                        <button
                            onClick={logout}
                            className="px-6 py-3 text-lg font-semibold text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                        >
                             {language === 'en' ? 'Logout' : 'లాగ్ అవుట్'}
                        </button>
                    ) : (
                        <button
                            onClick={() => setIsAuthModalOpen(true)}
                            className="px-6 py-3 text-lg font-semibold text-white bg-secondary rounded-md hover:bg-blue-700 transition-colors"
                        >
                            {language === 'en' ? 'Login / Sign Up' : 'లాగిన్ / సైన్ అప్'}
                        </button>
                    )}
                </div>
            </nav>
        </div>
      </header>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
};

export default Header;