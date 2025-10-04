import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { updateMetaTags } from '../utils/seo';
import LoadingSpinner from '../components/LoadingSpinner';

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

  useEffect(() => {
    const fetchContent = async () => {
        setIsLoading(true);
        setError(null);
        setContent(null);
        setPostTitle('');

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
            
            const finalTitle = language === 'te' ? post.telugutitle : post.englishtitle;
            const finalContent = language === 'te' ? post.telugucontent : post.englishcontent;

            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = finalTitle || '';
            const cleanedTitle = tempDiv.textContent || tempDiv.innerText || '';

            setContent(finalContent);
            setPostTitle(cleanedTitle);
            updateMetaTags(`${cleanedTitle} | Telugu Finance Platform`, 'A post from our blog.');

        } catch (e: any) {
            setError(language === 'en' ? `Failed to load post: ${e.message}` : `పోస్ట్ లోడ్ చేయడంలో విఫలమైంది: ${e.message}`);
        } finally {
            setIsLoading(false);
        }
    };
    
    fetchContent();
  }, [slug, language]);

  const renderPostContent = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }
    if (error) {
      return <p className="text-red-500 text-center py-8">{error}</p>;
    }
    if (content) {
      return (
        <div
          className="prose max-w-none text-gray-700 dark:text-gray-300
                     prose-h1:text-primary dark:prose-h1:text-blue-300
                     prose-h2:text-secondary dark:prose-h2:text-blue-400
                     prose-a:text-accent hover:prose-a:text-orange-700
                     dark:prose-a:text-orange-400 dark:hover:prose-a:text-orange-300
                     dark:prose-strong:text-gray-200
                     dark:prose-blockquote:border-gray-600 dark:prose-blockquote:text-gray-400"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      );
    }
    return null;
  };

  return (
    <div className="max-w-4xl mx-auto">
        <article className="bg-white dark:bg-dark p-6 sm:p-8 rounded-lg shadow-lg min-h-[400px]">
          {postTitle && (
            <h1 className="text-3xl md:text-4xl font-extrabold text-primary dark:text-blue-300 mb-6">{postTitle}</h1>
          )}
          {renderPostContent()}
        </article>
      </div>
  );
};

export default PostPage;
