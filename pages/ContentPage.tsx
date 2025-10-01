import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { generateContent } from '../services/geminiService';
import { useLanguage } from '../context/LanguageContext';
import { PageData, PageType } from '../types';
import Sidebar from '../components/Sidebar';
import Breadcrumbs from '../components/Breadcrumbs';
import RelatedLinks from '../components/RelatedLinks';
import LoadingSpinner from '../components/LoadingSpinner';
import { SITEMAP_DATA } from '../constants';
import BookmarkButton from '../components/BookmarkButton';

// A simple markdown to HTML converter
import { marked } from 'marked';

interface ContentPageProps {
  pageData: PageData;
}

const ContentPage: React.FC<ContentPageProps> = ({ pageData }) => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const { language } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      const generatedContent = await generateContent(pageData, language);
      setContent(generatedContent);
      setLoading(false);
    };

    fetchContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageData.path, language]);

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

  const parsedContent = useMemo(() => {
    if (content) {
      return { __html: marked.parse(content) as string };
    }
    return { __html: '' };
  }, [content]);

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
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div 
                className="prose max-w-none text-gray-700 dark:text-gray-300
                           dark:prose-headings:text-gray-200 
                           dark:prose-strong:text-gray-200
                           dark:prose-a:text-blue-400
                           dark:prose-blockquote:text-gray-400
                           dark:prose-code:text-gray-300
                           dark:prose-th:text-gray-200"
                dangerouslySetInnerHTML={parsedContent} 
            />
          )}
          <RelatedLinks links={pageData.interlinks} />
        </article>
      </div>
    </div>
  );
};

export default ContentPage;