import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { SitemapCategory } from '../types';
import { useLanguage } from '../context/LanguageContext';
import useBreakpoint from '../hooks/useBreakpoint';

interface SidebarProps {
  title: string;
  categories: SitemapCategory[];
  currentPath: string;
}

const ChevronDownIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);


const Sidebar: React.FC<SidebarProps> = ({ title, categories, currentPath }) => {
  const { language } = useLanguage();
  const isDesktop = useBreakpoint('lg');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navContainerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // We only want this behavior on desktop
    if (isDesktop && navContainerRef.current) {
        // NavLink automatically adds aria-current="page" to the active link
        const activeLink = navContainerRef.current.querySelector<HTMLElement>('[aria-current="page"]');

        if (activeLink) {
            // Scroll the active link into the center of the view
            activeLink.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }
  }, [currentPath, isDesktop]); // Re-run when the path or breakpoint changes

  const NavContent = () => (
    <nav ref={navContainerRef} className="space-y-4">
      {categories.map((category, index) => (
        <div key={index}>
          <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">{category.name[language]}</h4>
          <ul className="space-y-1 border-l-2 border-gray-200 dark:border-gray-700">
            {category.pages.map((page) => (
              <li key={page.path}>
                <NavLink
                  to={page.path}
                  className={({ isActive }) =>
                    `block pl-4 py-1.5 text-sm transition-colors border-l-2 -ml-0.5 ${
                      isActive
                        ? 'border-secondary dark:border-blue-400 text-secondary dark:text-blue-300 font-semibold bg-blue-50 dark:bg-slate-700'
                        : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-secondary dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-slate-700'
                    }`
                  }
                  onClick={() => setIsMobileMenuOpen(false)} // Close menu on navigation
                >
                  {page.title[language]}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );

  if (isDesktop) {
      return (
        <aside className="w-full lg:w-64 xl:w-72 flex-shrink-0">
          <div className="bg-white dark:bg-dark p-6 rounded-lg shadow-lg sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
            <h3 className="text-xl font-bold text-primary dark:text-blue-300 mb-4">{title}</h3>
            <NavContent />
          </div>
        </aside>
      );
  }

  return (
    <div className="w-full lg:hidden mb-6">
        <div className="bg-white dark:bg-dark p-4 rounded-lg shadow-lg">
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-full flex justify-between items-center"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-nav-menu"
            >
                <h3 className="text-lg font-bold text-primary dark:text-blue-300">
                    {language === 'en' ? `Explore ${title}` : `${title} అన్వేషించండి`}
                </h3>
                <span className={`transform transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-180' : ''}`}>
                    <ChevronDownIcon />
                </span>
            </button>
            <div
                id="mobile-nav-menu"
                className={`overflow-hidden transition-all duration-500 ease-in-out ${isMobileMenuOpen ? 'max-h-[1500px] mt-4 opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <NavContent />
            </div>
        </div>
    </div>
  );
};

export default Sidebar;