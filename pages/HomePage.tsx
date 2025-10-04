import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { updateMetaTags } from '../utils/seo';

// --- SVG Icons for the new design ---
const SearchIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const BookIcon = () => (
    <svg className="w-12 h-12 mb-4 text-primary dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
);

const CalculatorIcon = () => (
    <svg className="w-12 h-12 mb-4 text-primary dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M12 7h.01M15 7h.01M15 14h.01M18 17h.01M18 14h.01M18 11h.01M18 7h.01M6 5a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2H6z" />
    </svg>
);

const CompassIcon = () => (
    <svg className="w-12 h-12 mb-4 text-primary dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
);

const LanguageIcon = () => (
    <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m4 13-4-4L5 17m0 0h14M5 17a2 2 0 002 2h2a2 2 0 002-2m-4-4V3" />
    </svg>
);

const ToolsIcon = () => (
    <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);
const SimpleIcon = () => (
    <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.085a2 2 0 00-1.736.93L5 9m7 1v3.345c0 .256.12.5.33.667l2 1.5a.5.5 0 00.67-.333L16 12" />
    </svg>
);


const HomePage: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const title = language === 'en' 
      ? 'Your Guide to Financial Freedom | Telugu Finance Platform' 
      : 'మీ ఆర్థిక స్వేచ్ఛకు మార్గదర్శి | తెలుగుఫైనాన్స్';
    const description = language === 'en'
      ? 'Understand money, investments, and taxes in simple Telugu and English. Use our free calculators and guides to plan your financial future.'
      : 'డబ్బు, పెట్టుబడులు మరియు పన్నులను సరళమైన తెలుగు మరియు ఆంగ్లంలో అర్థం చేసుకోండి. మీ ఆర్థిక భవిష్యత్తును ప్లాన్ చేయడానికి మా ఉచిత కాలిక్యులేటర్లు మరియు గైడ్‌లను ఉపయోగించండి.';
    updateMetaTags(title, description);
  }, [language]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
        navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const whyUsPoints = [
      {
          icon: <LanguageIcon />,
          title: { en: "Dual Language", te: "ద్విభాషా" },
          description: { en: "All content is available in both English and Telugu.", te: "మొత్తం కంటెంట్ ఇంగ్లీష్ మరియు తెలుగు రెండింటిలోనూ అందుబాటులో ఉంది." }
      },
      {
          icon: <ToolsIcon />,
          title: { en: "Free & Powerful Tools", te: "ఉచిత & శక్తివంతమైన సాధనాలు" },
          description: { en: "From SIP to Income Tax, use our calculators for free.", te: "SIP నుండి ఆదాయపు పన్ను వరకు, మా కాలిక్యులేటర్లను ఉచితంగా ఉపయోగించండి." }
      },
      {
          icon: <SimpleIcon />,
          title: { en: "Simplified for You", te: "మీ కోసం సరళీకృతం" },
          description: { en: "We break down complex financial topics into easy-to-understand guides.", te: "మేము సంక్లిష్ట ఆర్థిక అంశాలను సులభంగా అర్థమయ్యే గైడ్‌లుగా విభజిస్తాము." }
      }
  ];

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="text-center py-12 md:py-20">
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary dark:text-blue-300 mb-4">
          {language === 'en' ? 'Navigate Your Financial Future' : 'మీ ఆర్థిక భవిష్యత్తును నావిగేట్ చేయండి'}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
          {language === 'en'
            ? 'Your one-stop destination for financial tools, guides, and knowledge in a language you understand.'
            : 'మీకు అర్థమయ్యే భాషలో ఆర్థిక సాధనాలు, గైడ్‌లు మరియు జ్ఞానం కోసం మీ వన్-స్టాప్ గమ్యం.'}
        </p>
        <div className="max-w-xl mx-auto">
            <form onSubmit={handleSearch} className="relative">
                <input 
                    type="search" 
                    placeholder={language === 'en' ? 'Search for calculators, articles...' : 'కాలిక్యులేటర్లు, కథనాల కోసం శోధించండి...'}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full p-4 pr-12 text-gray-700 border rounded-full bg-white dark:bg-dark focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button type="submit" aria-label={language === 'en' ? 'Search' : 'శోధన'} className="absolute top-0 right-0 h-full flex items-center pr-4">
                    <SearchIcon />
                </button>
            </form>
        </div>
      </section>

      {/* Featured Categories Section */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to="/learn/money-basics/what-is-budgeting" className="group text-center p-8 bg-white dark:bg-dark rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-transform duration-300">
                <BookIcon />
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">{language === 'en' ? 'Learn' : 'తెలుసుకోండి'}</h3>
                <p className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Master the basics of finance with our simple articles.' : 'మా సరళమైన కథనాలతో ఫైనాన్స్ యొక్క ప్రాథమికాలను నేర్చుకోండి.'}</p>
            </Link>
            <Link to="/calculators" className="group text-center p-8 bg-white dark:bg-dark rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-transform duration-300">
                <CalculatorIcon />
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">{language === 'en' ? 'Calculate' : 'లెక్కించండి'}</h3>
                <p className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Plan your investments and taxes with our powerful tools.' : 'మా శక్తివంతమైన సాధనాలతో మీ పెట్టుబడులు మరియు పన్నులను ప్లాన్ చేయండి.'}</p>
            </Link>
            <Link to="/guides/choosing-first-mutual-fund" className="group text-center p-8 bg-white dark:bg-dark rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-transform duration-300">
                <CompassIcon />
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">{language === 'en' ? 'Guides' : 'గైడ్‌లు'}</h3>
                <p className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Interactive step-by-step guides for your financial journey.' : 'మీ ఆర్థిక ప్రయాణం కోసం ఇంటరాక్టివ్ దశల వారీ గైడ్‌లు.'}</p>
            </Link>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="bg-light dark:bg-slate-800 py-16 rounded-lg">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">{language === 'en' ? 'Why Choose TeluguFinance?' : 'తెలుగుఫైనాన్స్‌ను ఎందుకు ఎంచుకోవాలి?'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
                {whyUsPoints.map((point, index) => (
                    <div key={index} className="flex flex-col items-center">
                        {point.icon}
                        <h4 className="text-xl font-semibold mt-4 mb-2">{point.title[language]}</h4>
                        <p className="text-gray-600 dark:text-gray-400">{point.description[language]}</p>
                    </div>
                ))}
            </div>
          </div>
      </section>

      {/* Final CTA Section */}
       <section className="text-center py-12">
        <h2 className="text-3xl font-bold mb-4">
          {language === 'en' ? 'Ready to Take Control?' : 'నియంత్రణ తీసుకోవడానికి సిద్ధంగా ఉన్నారా?'}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto mb-8">
          {language === 'en' ? 'Explore our full suite of calculators and start making smarter financial decisions today.' : 'మా పూర్తి కాలిక్యులేటర్ల సూట్‌ను అన్వేషించండి మరియు ఈరోజే తెలివైన ఆర్థిక నిర్ణయాలు తీసుకోవడం ప్రారంభించండి.'}
        </p>
        <Link
          to="/calculators"
          className="bg-accent text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-orange-600 transition-transform transform hover:scale-105 inline-block"
        >
          {language === 'en' ? 'Explore All Calculators' : 'అన్ని కాలిక్యులేటర్లను అన్వేషించండి'}
        </Link>
      </section>
    </div>
  );
};

export default HomePage;