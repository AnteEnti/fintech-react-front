import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { SITEMAP_DATA } from '../constants';
import { updateMetaTags } from '../utils/seo';
import CalculatorIcon from '../components/icons/CalculatorIcons';

const CalculatorsListPage: React.FC = () => {
    const { language } = useLanguage();

    useEffect(() => {
        const title = language === 'en' 
            ? 'Financial Calculators | Telugu Finance Platform' 
            : 'ఆర్థిక కాలిక్యులేటర్లు | తెలుగుఫైనాన్స్';
        const description = language === 'en'
            ? 'A comprehensive suite of financial calculators for SIP, EMI, income tax, retirement planning, and more. Plan your finances with ease.'
            : 'SIP, EMI, ఆదాయపు పన్ను, పదవీ విరమణ ప్రణాళిక మరియు మరిన్నింటి కోసం ఆర్థిక కాలిక్యులేటర్ల యొక్క సమగ్ర సూట్. మీ ఆర్థిక వ్యవహారాలను సులభంగా ప్లాన్ చేసుకోండి.';
        updateMetaTags(title, description);
    }, [language]);

    const allCalculators = SITEMAP_DATA.calculators.flatMap(category => category.pages);

    return (
        <div className="space-y-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-gray-200">
                {language === 'en' ? 'Calculators' : 'కాలిక్యులేటర్లు'}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {allCalculators.map(calc => (
                    <Link
                        to={calc.path}
                        key={calc.path}
                        className="relative block p-6 bg-white dark:bg-dark rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden h-48 flex flex-col"
                    >
                        <div className="flex-grow">
                            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">{calc.title[language]}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{calc.description[language]}</p>
                        </div>
                        <div className="absolute -bottom-4 -right-4 text-gray-100 dark:text-slate-800 opacity-90 pointer-events-none">
                           <CalculatorIcon name={calc.icon} className="w-24 h-24" />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CalculatorsListPage;