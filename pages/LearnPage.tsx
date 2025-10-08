import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { updateMetaTags } from '../utils/seo';
import LoadingSpinner from '../components/LoadingSpinner';

const ChevronRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
    </svg>
);

const GRAPHQL_URL = 'https://wp.amadeinandhra.com/graphql';

const GET_LEARN_SITEMAP_QUERY = `
  query GetLearnSectionSitemap {
    category(id: "learn", idType: SLUG) {
      name
      children(first: 100) {
        nodes {
          name
          slug
          posts(first: 100) {
            nodes {
              slug
              englishtitle
              telugutitle
              englishexcerpt
              teluguexcerpt
            }
          }
        }
      }
    }
  }
`;

interface PostNode {
  slug: string;
  englishtitle: string;
  telugutitle: string;
  englishexcerpt: string;
  teluguexcerpt: string;
}

interface CategoryNode {
  name: string;
  slug: string;
  posts: { nodes: PostNode[] };
}

const LearnPage: React.FC = () => {
    const { language } = useLanguage();
    const [categories, setCategories] = useState<CategoryNode[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const title = language === 'en' 
            ? 'Learn | Telugu Finance Platform' 
            : 'తెలుసుకోండి | తెలుగుఫైనాన్స్';
        const description = language === 'en'
            ? 'Explore articles on money basics, investing, and other financial topics to improve your knowledge.'
            : 'డబ్బు ప్రాథమికాలు, పెట్టుబడి మరియు ఇతర ఆర్థిక అంశాలపై కథనాలను అన్వేషించి మీ జ్ఞానాన్ని మెరుగుపరచుకోండి.';
        updateMetaTags(title, description);
    }, [language]);

    useEffect(() => {
        const fetchLearnContent = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(GRAPHQL_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        query: GET_LEARN_SITEMAP_QUERY,
                    })
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const jsonResponse = await response.json();

                if (jsonResponse.errors) {
                    const userFriendlyError = jsonResponse.errors.map((err: any) => err.message).join(' ');
                    throw new Error(userFriendlyError);
                }

                if (jsonResponse.data && jsonResponse.data.category && jsonResponse.data.category.children) {
                   setCategories(jsonResponse.data.category.children.nodes);
                } else {
                    throw new Error("Could not find the 'learn' parent category or its children. Please ensure a parent category with the slug 'learn' exists in WordPress.");
                }

            } catch (e: any) {
                setError(language === 'en' ? `Failed to load content: ${e.message}` : `కంటెంట్ లోడ్ చేయడంలో విఫలమైంది: ${e.message}`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchLearnContent();
    }, [language]);

    const renderContent = () => {
        if (isLoading) {
            return <LoadingSpinner />;
        }

        if (error) {
            return <p className="text-red-500 text-center py-8">{error}</p>;
        }
        
        const categoriesWithPosts = categories.filter(
            category => category.posts && category.posts.nodes && category.posts.nodes.length > 0
        );

        if (categoriesWithPosts.length === 0) {
            return (
                <div className="text-center py-10">
                    <p className="text-gray-500">{language === 'en' ? 'No articles found.' : 'కథనాలు ఏవీ కనుగొనబడలేదు.'}</p>
                    <p className="text-sm text-gray-400 mt-2">{language === 'en' ? 'Add posts to child categories under "Learn" in WordPress to see them here.' : 'WordPress లో "Learn" క్రింద ఉన్న చైల్డ్ కేటగిరీలకు పోస్ట్‌లను జోడించండి.'}</p>
                </div>
            );
        }

        return categoriesWithPosts.map(category => {
            const categoryName = category.name;

            return (
                <section key={category.slug}>
                    <h2 className="text-3xl font-bold mb-6 text-secondary dark:text-blue-400 border-b-2 border-secondary/20 pb-2">
                        {categoryName}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {category.posts.nodes.map(post => {
                            const postTitle = language === 'te' ? post.telugutitle : post.englishtitle;
                            const postExcerpt = language === 'te' ? post.teluguexcerpt : post.englishexcerpt;

                            // In case excerpt contains HTML, clean it for display.
                            const tempDiv = document.createElement("div");
                            tempDiv.innerHTML = postExcerpt || '';
                            const cleanExcerpt = tempDiv.textContent || tempDiv.innerText || "";

                            return (
                                <Link
                                    to={`/post/${post.slug}`}
                                    key={post.slug}
                                    className="group block p-6 bg-white dark:bg-dark rounded-lg shadow-lg hover:shadow-xl hover:border-primary dark:hover:border-blue-400 border-2 border-transparent transition-all duration-300"
                                >
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2 group-hover:text-primary dark:group-hover:text-blue-300" dangerouslySetInnerHTML={{ __html: postTitle || '' }}/>
                                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                                        {cleanExcerpt}
                                    </p>
                                    <div className="flex items-center font-semibold text-accent dark:text-orange-400">
                                        <span>{language === 'en' ? 'Read more' : 'ఇంకా చదవండి'}</span>
                                        <ChevronRightIcon />
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </section>
            );
        });
    }

    return (
        <div className="space-y-12">
            <header className="text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold text-primary dark:text-blue-300">
                    {language === 'en' ? 'Learn About Finance' : 'ఫైనాన్స్ గురించి తెలుసుకోండి'}
                </h1>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                    {language === 'en' 
                        ? 'Browse our collection of articles designed to make complex financial topics easy to understand.' 
                        : 'సంక్లిష్టమైన ఆర్థిక అంశాలను సులభంగా అర్థమయ్యేలా రూపొందించిన మా కథనాల సేకరణను బ్రౌజ్ చేయండి.'}
                </p>
            </header>
            
            <div className="space-y-12">
                {renderContent()}
            </div>
        </div>
    );
};

export default LearnPage;