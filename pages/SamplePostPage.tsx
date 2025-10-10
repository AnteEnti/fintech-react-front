import React, { useEffect, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { updateMetaTags } from '../utils/seo';
import Breadcrumbs from '../components/Breadcrumbs';
import { PageData, PageType } from '../types';
import { SAMPLE_POST_DATA } from '../constants/samplePost';
import { marked } from 'marked';

const SamplePostPage: React.FC = () => {
  const { language } = useLanguage();

  const rawContent = SAMPLE_POST_DATA.content[language];
  const pageTitle = SAMPLE_POST_DATA.title[language];
  const pageTitleObject = SAMPLE_POST_DATA.title;

  const { content, tocItems } = useMemo(() => {
    const headings: { text: string; slug: string }[] = [];
    const renderer = new marked.Renderer();
    const existingSlugs = new Set();

    renderer.heading = (text, level, raw) => {
        if (level === 2) {
            let slug = raw.toLowerCase().replace(/[^\w\u0c00-\u0c7f]+/g, '-');
            
            let slugCounter = 1;
            let uniqueSlug = slug;
            while (existingSlugs.has(uniqueSlug)) {
                uniqueSlug = `${slug}-${slugCounter}`;
                slugCounter++;
            }
            existingSlugs.add(uniqueSlug);

            headings.push({ text, slug: uniqueSlug });
            return `<h2 id="${uniqueSlug}">${text}</h2>`;
        }
        return `<h${level}>${text}</h${level}>`;
    };

    const parsedContent = marked.parse(rawContent, { renderer }) as string;
    return { content: parsedContent, tocItems: headings };
  }, [language, rawContent]);

  useEffect(() => {
    updateMetaTags(`${pageTitle} | Telugu Finance Platform`, 'A sample article about budgeting.');
  }, [pageTitle]);
  
  const breadcrumbData: PageData = {
    path: '/learn/sample-post',
    type: PageType.LEARN,
    title: pageTitleObject,
    description: { en: '', te: '' },
    category: { en: 'Money Basics', te: 'డబ్బు ప్రాథమికాలు' },
    interlinks: []
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Breadcrumbs pageData={breadcrumbData} />
      <div className="bg-white dark:bg-dark p-6 sm:p-8 rounded-lg shadow-xl mt-4">
        <span className="badge">
          {language === 'en' ? 'Money Basics' : 'డబ్బు ప్రాథమికాలు'}
        </span>
        <article className="prose dark:prose-invert lg:prose-lg max-w-none">
            <h1>{pageTitle}</h1>
            
            {tocItems.length > 0 && (
                <div className="toc">
                    <strong>{language === 'en' ? 'Table of Contents' : 'విషయ సూచిక'}:</strong>
                    {tocItems.map((item, index) => (
                        <React.Fragment key={item.slug}>
                            <a href={`#${item.slug}`}> {item.text}</a>
                            {index < tocItems.length - 1 && ' •'}
                        </React.Fragment>
                    ))}
                </div>
            )}

            <div dangerouslySetInnerHTML={{ __html: content }} />
        </article>
        <div className="tags" aria-label="tags">
            <span className="tag">{language === 'en' ? 'Budgeting' : 'బడ్జెట్'}</span>
            <span className="tag">{language === 'en' ? 'Money Basics' : 'మనీ బేసిక్స్'}</span>
            <span className="tag">50/30/20</span>
            <span className="tag">{language === 'en' ? 'Zero-based' : 'జీరో-బేస్డ్'}</span>
        </div>
      </div>
    </div>
  );
};

export default SamplePostPage;