import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { updateMetaTags } from '../utils/seo';
import LoadingSpinner from '../components/LoadingSpinner';
import Breadcrumbs from '../components/Breadcrumbs';
import { PageData, PageType } from '../types';

const GRAPHQL_URL = 'https://wp.amadeinandhra.com/graphql';

const GET_POST_QUERY = `
  query GetPostBySlug($slug: String!) {
    posts(where: {name: $slug}) {
      nodes {
        englishtitle
        telugutitle
        englishcontent
        telugucontent
      }
    }
  }
`;

const PostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  
  const [postTitle, setPostTitle] = useState<string>('');
  const [content, setContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [breadcrumbData, setBreadcrumbData] = useState<PageData | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
        setIsLoading(true);
        setError(null);
        setContent(null);
        setPostTitle('');
        setBreadcrumbData(null);

        if (!slug) {
            setError(language === 'en' ? 'Could not find post identifier.' : 'పోస్ట్ ఐడెంటిఫైయర్ కనుగొనబడలేదు.');
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
                throw new Error('Post not found.');
            }
            
            const enTitle = post.englishtitle || 'Post';
            const teTitle = post.telugutitle || 'పోస్ట్';
            const finalTitle = language === 'te' ? teTitle : enTitle;
            const htmlContent = language === 'te' ? post.telugucontent : post.englishcontent;

            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = finalTitle;
            const cleanedTitle = tempDiv.textContent || tempDiv.innerText || '';
            
            setContent(htmlContent || '');
            setPostTitle(cleanedTitle);
            updateMetaTags(`${cleanedTitle} | Telugu Finance Platform`, 'A post from our blog.');
            
            // Create a mock PageData object for the Breadcrumbs component
            setBreadcrumbData({
                path: `/post/${slug}`,
                type: PageType.LEARN, // Assuming posts belong under a general "learn" or "blog" category
                title: { en: enTitle, te: teTitle },
                description: { en: '', te: '' },
                category: { en: 'Blog', te: 'బ్లాగ్' },
                interlinks: []
            });


        } catch (e: any) {
            setError(language === 'en' ? `Failed to load post: ${e.message}` : `పోస్ట్ లోడ్ చేయడంలో విఫలమైంది: ${e.message}`);
        } finally {
            setIsLoading(false);
        }
    };
    
    fetchContent();
  }, [slug, language]);

  return (
    <div className="max-w-4xl mx-auto">
      {breadcrumbData && <Breadcrumbs pageData={breadcrumbData} />}
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
    </div>
  );
};

export default PostPage;