import React, { useMemo, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { PageData, PageType } from '../types';
import Sidebar from '../components/Sidebar';
import Breadcrumbs from '../components/Breadcrumbs';
import RelatedLinks from '../components/RelatedLinks';
import { SITEMAP_DATA } from '../constants';
import LoadingSpinner from '../components/LoadingSpinner';


interface ContentPageProps {
  pageData: PageData;
}

const GRAPHQL_URL = 'https://wp.amadeinandhra.com/graphql';

const GET_POST_QUERY = `
  query GetPostBySlug($slug: String!) {
    posts(where: {name: $slug}) {
      nodes {
        englishcontent
        telugucontent
      }
    }
  }
`;

const ContentPage: React.FC<ContentPageProps> = ({ pageData }) => {
  const { language } = useLanguage();
  const location = useLocation();

  const [content, setContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    const fetchContent = async () => {
        setIsLoading(true);
        setError(null);
        setContent(null);

        const slug = pageData.path.split('/').pop();

        if (!slug) {
            setError(language === 'en' ? 'Could not find content identifier.' : 'కంటెంట్ ఐడెంటిఫైయర్ కనుగొనబడలేదు.');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch(GRAPHQL_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    query: GET_POST_QUERY,
                    variables: { slug: slug },
                }),
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const jsonResponse = await response.json();

            if (jsonResponse.errors) {
                throw new Error(jsonResponse.errors[0].message || 'Error fetching from GraphQL.');
            }

            const post = jsonResponse.data.posts.nodes[0];
            
            if (!post) {
                throw new Error('Content not found for this topic.');
            }
            
            const htmlContent = language === 'te' ? post.telugucontent : post.englishcontent;
            setContent(htmlContent || '');

        } catch (e: any) {
            setError(language === 'en' ? `Failed to load content: ${e.message}` : `కంటెంట్ లోడ్ చేయడంలో విఫలమైంది: ${e.message}`);
        } finally {
            setIsLoading(false);
        }
    };
    
    fetchContent();
  }, [pageData.path, language]);

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 max-w-7xl mx-auto">
      <Sidebar title={sidebarTitle} categories={sidebarCategories} currentPath={location.pathname} />
      <div className="flex-grow min-w-0">
        <Breadcrumbs pageData={pageData} />
        <div className="bg-white dark:bg-dark p-6 sm:p-8 rounded-lg shadow-xl mt-4 min-h-[400px]">
          {isLoading && <LoadingSpinner />}
          {error && <p className="text-red-500 text-center py-8">{error}</p>}
          {content && (
              <article
                  className="prose dark:prose-invert lg:prose-lg"
                  dangerouslySetInnerHTML={{ __html: content }}
              />
          )}
        </div>
        <RelatedLinks links={pageData.interlinks} />
      </div>
    </div>
  );
};

export default ContentPage;