import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { SITEMAP_DATA } from '../constants';
import { updateMetaTags } from '../utils/seo';
import CalculatorIcon from '../components/icons/CalculatorIcons'; // Reusing for consistency

const GuidesListPage: React.FC = () => {
    const { language } = useLanguage();

    useEffect(() => {
        const title = language === 'en' 
            ? 'Interactive Financial Guides | Telugu Finance Platform' 
            : 'ఇంటరాక్టివ్ ఆర్థిక గైడ్‌లు | తెలుగుఫైనాన్స్';
        const description = language === 'en'
            ? 'Step-by-step interactive guides to help you make smart financial decisions. From choosing investments to planning for retirement.'
            : 'తెలివైన ఆర్థిక నిర్ణయాలు తీసుకోవడంలో మీకు సహాయపడటానికి దశల వారీ ఇంటరాక్టివ్ గైడ్‌లు. పెట్టుబడులను ఎంచుకోవడం నుండి పదవీ విరమణ కోసం ప్రణాళిక వేయడం వరకు.';
        updateMetaTags(title, description);
    }, [language]);

    const allGuides = SITEMAP_DATA.interactiveGuides;

    return (
        <div className="space-y-12">
            <header className="text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold text-primary dark:text-blue-300">
                    {language === 'en' ? 'Interactive Guides' : 'ఇంటరాక్టివ్ గైడ్‌లు'}
                </h1>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                    {language === 'en' 
                        ? 'Our guides ask you simple questions and provide personalized recommendations to help you navigate your financial journey.' 
                        : 'మా గైడ్‌లు మీకు సాధారణ ప్రశ్నలు అడుగుతాయి మరియు మీ ఆర్థిక ప్రయాణాన్ని నావిగేట్ చేయడంలో మీకు సహాయపడటానికి వ్యక్తిగతీకరించిన సిఫార్సులను అందిస్తాయి.'}
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {allGuides.map(guide => (
                    <Link
                        to={guide.path}
                        key={guide.path}
                        className="group relative block p-6 bg-white dark:bg-dark rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden min-h-48 flex flex-col"
                    >
                        <div className="flex-grow">
                            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">{guide.title[language]}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{guide.description[language]}</p>
                        </div>
                         <div className="absolute -bottom-4 -right-4 text-gray-100 dark:text-slate-800 opacity-90 pointer-events-none group-hover:opacity-100 group-hover:scale-110 transition-transform duration-300">
                           <CalculatorIcon name={guide.icon} className="w-24 h-24" />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default GuidesListPage;