import React, { useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { SITEMAP_DATA } from '../constants';
import { PageData } from '../types';
import { updateMetaTags } from '../utils/seo';
import CalculatorIcon from '../components/icons/CalculatorIcons';

const allPages: PageData[] = [
  ...SITEMAP_DATA.learn.flatMap(c => c.pages),
  ...SITEMAP_DATA.calculators.flatMap(c => c.pages),
  ...SITEMAP_DATA.comparisons,
  ...SITEMAP_DATA.tips,
  ...SITEMAP_DATA.interactiveGuides,
];

const SearchResultsPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const { language } = useLanguage();
    const query = searchParams.get('q') || '';

    useEffect(() => {
        const title = language === 'en' 
            ? `Search results for "${query}"` 
            : `"${query}" కోసం శోధన ఫలితాలు`;
        const description = language === 'en'
            ? `Find financial calculators, articles, and guides related to "${query}".`
            : `"${query}"కి సంబంధించిన ఆర్థిక కాలిక్యులేటర్లు, కథనాలు మరియు గైడ్‌లను కనుగొనండి.`;
        updateMetaTags(title, description);
    }, [query, language]);

    const searchResults = useMemo(() => {
        if (!query.trim()) {
            return [];
        }

        const lowerCaseQuery = query.toLowerCase();

        return allPages.filter(page => {
            const titleEn = page.title.en.toLowerCase();
            const titleTe = page.title.te.toLowerCase();
            const descEn = page.description.en.toLowerCase();
            const descTe = page.description.te.toLowerCase();

            return (
                titleEn.includes(lowerCaseQuery) ||
                titleTe.includes(lowerCaseQuery) ||
                descEn.includes(lowerCaseQuery) ||
                descTe.includes(lowerCaseQuery)
            );
        });
    }, [query]);

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <header>
                <h1 className="text-3xl md:text-4xl font-extrabold text-primary dark:text-blue-300">
                    {language === 'en' ? 'Search Results' : 'శోధన ఫలితాలు'}
                </h1>
                {query && (
                    <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
                        {language === 'en' ? `Found ${searchResults.length} results for ` : `${searchResults.length} ఫలితాలు కనుగొనబడ్డాయి `}
                        <span className="font-semibold text-secondary dark:text-blue-400">"{query}"</span>
                    </p>
                )}
            </header>
            
            {searchResults.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {searchResults.map(page => (
                        <Link
                            to={page.path}
                            key={page.path}
                            className="group block p-6 bg-white dark:bg-dark rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-transform duration-300"
                        >
                             <div className="flex items-start gap-4">
                                {page.icon && (
                                    <div className="flex-shrink-0">
                                        <CalculatorIcon name={page.icon} className="w-8 h-8 text-primary dark:text-blue-400" />
                                    </div>
                                )}
                                <div className="flex-grow">
                                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-1 group-hover:text-secondary dark:group-hover:text-blue-400">
                                        {page.title[language]}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                        {page.description[language]}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 bg-white dark:bg-dark rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300">
                        {language === 'en' ? 'No results found' : 'ఫలితాలు ఏమీ కనుగొనబడలేదు'}
                    </h2>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                        {language === 'en' ? 'Try searching for something else.' : 'మరొకదాని కోసం శోధించడానికి ప్రయత్నించండి.'}
                    </p>
                </div>
            )}
        </div>
    );
};

export default SearchResultsPage;