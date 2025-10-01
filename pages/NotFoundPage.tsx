import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { updateMetaTags } from '../utils/seo';

const NotFoundPage: React.FC = () => {
    const { language } = useLanguage();

    useEffect(() => {
        const title = language === 'en' 
            ? '404 Not Found | Telugu Finance Platform' 
            : '404 పేజీ కనుగొనబడలేదు | తెలుగుఫైనాన్స్';
        const description = language === 'en'
            ? 'The page you are looking for does not exist. Please return to the homepage to explore our financial tools and guides.'
            : 'మీరు వెతుకుతున్న పేజీ ఉనికిలో లేదు. మా ఆర్థిక సాధనాలు మరియు గైడ్‌లను అన్వేషించడానికి దయచేసి హోమ్‌పేజీకి తిరిగి వెళ్లండి.';
        updateMetaTags(title, description);
    }, [language]);

  return (
    <div className="text-center py-20">
      <h1 className="text-6xl font-extrabold text-primary dark:text-blue-400 mb-4">404</h1>
      <h2 className="text-3xl font-bold text-dark dark:text-gray-200 mb-4">
        {language === 'en' ? 'Page Not Found' : 'పేజీ కనుగొనబడలేదు'}
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        {language === 'en' ? 'Sorry, the page you are looking for does not exist.' : 'క్షమించండి, మీరు వెతుకుతున్న పేజీ ఉనికిలో లేదు.'}
      </p>
      <Link
        to="/"
        className="bg-secondary text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
      >
        {language === 'en' ? 'Go to Homepage' : 'హోమ్‌పేజీకి వెళ్లండి'}
      </Link>
    </div>
  );
};

export default NotFoundPage;