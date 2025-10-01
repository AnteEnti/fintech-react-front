import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { PageData, PageType } from '../types';
import Sidebar from '../components/Sidebar';
import Breadcrumbs from '../components/Breadcrumbs';
import RelatedLinks from '../components/RelatedLinks';
import { SITEMAP_DATA } from '../constants';
import BookmarkButton from '../components/BookmarkButton';

interface ContentPageProps {
  pageData: PageData;
}

const ContentPage: React.FC<ContentPageProps> = ({ pageData }) => {
  const { language } = useLanguage();
  const location = useLocation();

  const sidebarCategories = useMemo(() => {
      switch (pageData.type) {
          case PageType.LEARN: return SITEMAP_DATA.learn;
          case PageType.TIP: return [{ name: { en: 'All Tips', te: 'అన్ని చిట్కాలు' }, pages: SITEMAP_DATA.tips }];
          case PageType.COMPARISON: return [{ name: { en: 'All Comparisons', te: 'అన్ని పోలికలు' }, pages: SITEMAP_DATA.comparisons }];
          default: return [];
      }
  }, [pageData.type]);

  const sidebarTitle = useMemo(() => {
    switch (pageData.type) {
        case PageType.LEARN: return language === 'en' ? 'Topics' : 'అంశాలు';
        case PageType.TIP: return language === 'en' ? 'Tips' : 'చిట్కాలు';
        case PageType.COMPARISON: return language === 'en' ? 'Comparisons' : 'పోలికలు';
        default: return language === 'en' ? 'Menu' : 'మెనూ';
    }
  }, [pageData.type, language]);

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
      <Sidebar title={sidebarTitle} categories={sidebarCategories} currentPath={location.pathname} />
      <div className="flex-grow">
        <Breadcrumbs pageData={pageData} />
        <article className="bg-white dark:bg-dark p-6 sm:p-8 rounded-lg shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl md:text-4xl font-extrabold text-primary dark:text-blue-300">{pageData.title[language]}</h1>
            <BookmarkButton pagePath={pageData.path} />
          </div>
          
          <div className="prose max-w-none text-gray-700 dark:text-gray-300">
            <h2 className="text-xl font-semibold">
                {language === 'en' ? 'Content Placeholder' : 'కంటెంట్ ప్లేస్‌హోల్డర్'}
            </h2>
            <p>
                {language === 'en'
                    ? 'This is where dynamic content from your WordPress CMS will be displayed. The AI content generation has been removed.'
                    : 'మీ WordPress CMS నుండి డైనమిక్ కంటెంట్ ఇక్కడ ప్రదర్శించబడుతుంది. AI కంటెంట్ జనరేషన్ తీసివేయబడింది.'}
            </p>
            <p>
                {language === 'en'
                    ? 'To connect this page to WordPress, you would typically fetch the post data corresponding to this page\'s slug from the WordPress REST API and render the HTML content here.'
                    : 'ఈ పేజీని WordPressకి కనెక్ట్ చేయడానికి, మీరు సాధారణంగా WordPress REST API నుండి ఈ పేజీ స్లగ్‌కు సంబంధించిన పోస్ట్ డేటాను పొంది, ఇక్కడ HTML కంటెంట్‌ను రెండర్ చేస్తారు.'}
            </p>
          </div>

          <RelatedLinks links={pageData.interlinks} />
        </article>
      </div>
    </div>
  );
};

export default ContentPage;