import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { SITEMAP_DATA } from '../constants';
import { updateMetaTags } from '../utils/seo';

const HomePage: React.FC = () => {
  const { language } = useLanguage();

  useEffect(() => {
    const title = language === 'en' 
      ? 'Your Guide to Financial Freedom | Telugu Finance Platform' 
      : 'మీ ఆర్థిక స్వేచ్ఛకు మార్గదర్శి | తెలుగుఫైనాన్స్';
    const description = language === 'en'
      ? 'Understand money, investments, and taxes in simple Telugu and English. Use our free calculators and guides to plan your financial future.'
      : 'డబ్బు, పెట్టుబడులు మరియు పన్నులను సరళమైన తెలుగు మరియు ఆంగ్లంలో అర్థం చేసుకోండి. మీ ఆర్థిక భవిష్యత్తును ప్లాన్ చేయడానికి మా ఉచిత కాలిక్యులేటర్లు మరియు గైడ్‌లను ఉపయోగించండి.';
    updateMetaTags(title, description);
  }, [language]);

  const featuredCalculators = SITEMAP_DATA.calculators.flatMap(c => c.pages).slice(0, 3);
  const trendingTopics = SITEMAP_DATA.learn.flatMap(c => c.pages).slice(0, 3);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center bg-white dark:bg-dark p-12 rounded-lg shadow-lg">
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary dark:text-blue-300 mb-4">
          {language === 'en' ? 'Your Guide to Financial Freedom' : 'మీ ఆర్థిక స్వేచ్ఛకు మార్గదర్శి'}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
          {language === 'en'
            ? 'Understand money, investments, and taxes in simple Telugu and English. Start your journey towards a secure financial future.'
            : 'డబ్బు, పెట్టుబడులు మరియు పన్నులను సరళమైన తెలుగు మరియు ఆంగ్లంలో అర్థం చేసుకోండి. సురక్షితమైన ఆర్థిక భవిష్యత్తు వైపు మీ ప్రయాణాన్ని ప్రారంభించండి.'}
        </p>
        <Link
          to="/learn/money-basics/what-is-budgeting"
          className="bg-accent text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-orange-600 transition-transform transform hover:scale-105"
        >
          {language === 'en' ? 'Start Learning' : 'నేర్చుకోవడం ప్రారంభించండి'}
        </Link>
      </section>

      {/* Featured Calculators Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8">
          {language === 'en' ? 'Popular Financial Calculators' : 'ప్రసిద్ధ ఆర్థిక కాలిక్యులేటర్లు'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredCalculators.map((calc) => (
            <Link to={calc.path} key={calc.path} className="block p-6 bg-white dark:bg-dark rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all">
              <h3 className="text-xl font-bold text-secondary dark:text-blue-400 mb-2">{calc.title[language]}</h3>
              <p className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Calculate your numbers instantly.' : 'మీ సంఖ్యలను తక్షణమే లెక్కించండి.'}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Topics Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8">
          {language === 'en' ? 'Trending Topics' : 'ట్రెండింగ్ అంశాలు'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trendingTopics.map((topic) => (
            <Link to={topic.path} key={topic.path} className="block p-6 bg-white dark:bg-dark rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all">
              <h3 className="text-xl font-bold text-secondary dark:text-blue-400 mb-2">{topic.title[language]}</h3>
              <p className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Read our latest guide.' : 'మా తాజా గైడ్ చదవండి.'}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;