import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { updateMetaTags } from '../utils/seo';
import Breadcrumbs from '../components/Breadcrumbs';
import { PageData, PageType } from '../types';
import { SAMPLE_POST_DATA } from '../constants/samplePost';

const SamplePostPage: React.FC = () => {
  const { language } = useLanguage();

  const title = SAMPLE_POST_DATA.title[language];
  const content = SAMPLE_POST_DATA.content[language];

  useEffect(() => {
    updateMetaTags(`${title} | Telugu Finance Platform`, 'A sample article about mutual funds.');
  }, [title]);
  
  const breadcrumbData: PageData = {
    path: '/learn/sample-post',
    type: PageType.LEARN,
    title: SAMPLE_POST_DATA.title,
    description: { en: '', te: '' },
    category: { en: 'Sample Article', te: 'నమూనా వ్యాసం' },
    interlinks: []
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Breadcrumbs pageData={breadcrumbData} />
      <div className="bg-white dark:bg-dark p-6 sm:p-8 rounded-lg shadow-xl mt-4">
        <article
            className="prose dark:prose-invert lg:prose-lg"
            dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
};

export default SamplePostPage;