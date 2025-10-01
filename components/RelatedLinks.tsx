import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Link as LinkType } from '../types';

interface RelatedLinksProps {
  links: LinkType[];
}

const RelatedLinks: React.FC<RelatedLinksProps> = ({ links }) => {
  const { language } = useLanguage();

  if (!links || links.length === 0) {
    return null;
  }

  return (
    <div className="mt-12 bg-blue-50 dark:bg-slate-800 p-6 rounded-lg">
      <h3 className="text-xl font-bold text-primary dark:text-blue-300 mb-4">
        {language === 'en' ? 'Related Tools & Reads' : 'సంబంధిత సాధనాలు & కథనాలు'}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {links.map((link, index) => (
          <RouterLink
            key={index}
            to={link.path}
            className="block p-4 bg-white dark:bg-dark rounded-md shadow-sm hover:shadow-md hover:bg-gray-50 dark:hover:bg-slate-700 transition-all"
          >
            <p className="font-semibold text-secondary dark:text-blue-400">{link.title[language]}</p>
            <span className="text-sm text-gray-500 dark:text-gray-400">{language === 'en' ? 'Explore now' : 'ఇప్పుడే అన్వేషించండి'} &rarr;</span>
          </RouterLink>
        ))}
      </div>
    </div>
  );
};

export default RelatedLinks;