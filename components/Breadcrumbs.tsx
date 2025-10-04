import React from 'react';
import { Link } from 'react-router-dom';
import { PageData } from '../types';
import { useLanguage } from '../context/LanguageContext';

const ChevronRightIcon = () => (
    <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
    </svg>
);


interface BreadcrumbsProps {
  pageData: PageData;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ pageData }) => {
  const { language } = useLanguage();

  const getBreadcrumbs = () => {
    const crumbs = [{ title: language === 'en' ? 'Home' : 'హోమ్', path: '/' }];
    let typeDisplay = '';
    
    switch(pageData.type) {
        case 'LEARN': typeDisplay = language === 'en' ? 'Learn' : 'తెలుసుకోండి'; break;
        case 'CALCULATOR': typeDisplay = language === 'en' ? 'Calculators' : 'కాలిక్యులేటర్లు'; break;
        case 'COMPARISON': typeDisplay = language === 'en' ? 'Comparisons' : 'పోలికలు'; break;
        case 'TIP': typeDisplay = language === 'en' ? 'Tips' : 'చిట్కాలు'; break;
        default: break;
    }
    
    if (typeDisplay) {
        crumbs.push({ title: typeDisplay, path: '#' });
    }
    if (pageData.category) {
        crumbs.push({ title: pageData.category[language], path: '#' });
    }
    if (pageData.group) {
        crumbs.push({ title: pageData.group[language], path: '#' });
    }
    crumbs.push({ title: pageData.title[language], path: pageData.path });
    
    return crumbs;
  };
  
  const crumbs = getBreadcrumbs();

  return (
    <nav aria-label="breadcrumb" className="mb-4 text-sm">
      <ol className="list-none p-0 inline-flex items-center space-x-2">
        {crumbs.map((crumb, index) => (
          <li key={index} className="flex items-center">
            {index < crumbs.length - 1 ? (
              <Link to={crumb.path} className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-blue-300">
                {crumb.title}
              </Link>
            ) : (
              <span className="text-gray-800 dark:text-gray-200 font-medium">{crumb.title}</span>
            )}
            {index < crumbs.length - 1 && (
              <ChevronRightIcon />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;