import React, { useMemo } from 'react';
import { PageData } from '../types';
import { useLanguage } from '../context/LanguageContext';
import Breadcrumbs from '../components/Breadcrumbs';
import RelatedLinks from '../components/RelatedLinks';
import BookmarkButton from '../components/BookmarkButton';
import ChoosingMutualFundGuide from '../components/interactive/ChoosingMutualFundGuide';

interface InteractiveGuidePageProps {
  pageData: PageData;
}

const guideComponents: { [key: string]: React.FC } = {
    ChoosingMutualFundGuide,
};

const InteractiveGuidePage: React.FC<InteractiveGuidePageProps> = ({ pageData }) => {
  const { language } = useLanguage();

  const GuideComponent = useMemo(() => {
    if (pageData.componentName && guideComponents[pageData.componentName]) {
      return guideComponents[pageData.componentName];
    }
    return () => <div>Guide not found.</div>;
  }, [pageData.componentName]);

  return (
    <div className="max-w-4xl mx-auto">
        <Breadcrumbs pageData={pageData} />
        <article className="bg-white dark:bg-dark p-6 sm:p-8 rounded-lg shadow-lg">
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-3xl md:text-4xl font-extrabold text-primary dark:text-blue-300">{pageData.title[language]}</h1>
            <BookmarkButton pagePath={pageData.path} />
          </div>
          <GuideComponent />
          <RelatedLinks links={pageData.interlinks} />
        </article>
      </div>
  );
};

export default InteractiveGuidePage;