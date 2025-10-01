import React from 'react';
import { Link } from 'react-router-dom';
import { PageData } from '../types';
import { useLanguage } from '../context/LanguageContext';

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
    <nav aria-label="breadcrumb" className="mb-4 text-sm text-gray-600 dark:text-gray-400">
      <ol className="list-none p-0 inline-flex">
        {crumbs.map((crumb, index) => (
          <li key={index} className="flex items-center">
            {index < crumbs.length - 1 ? (
              <Link to={crumb.path} className="hover:text-primary dark:hover:text-blue-300">
                {crumb.title}
              </Link>
            ) : (
              <span className="text-gray-800 dark:text-gray-200 font-medium">{crumb.title}</span>
            )}
            {index < crumbs.length - 1 && (
              <span className="mx-2">/</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;