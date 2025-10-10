import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { updateMetaTags } from '../utils/seo';
import LoadingSpinner from '../components/LoadingSpinner';
import { marked } from 'marked';

const ChevronRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
    </svg>
);

const GRAPHQL_URL = 'https://wp.amadeinandhra.com/graphql';

const GET_MEANING_POSTS_QUERY = `
  query GetMeaningPosts {
    posts(where: {categoryName: "Meaning"}, first: 100) {
      nodes {
        slug
        englishtitle
        telugutitle
        englishexcerpt
        teluguexcerpt
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

const MeaningPage: React.FC = () => {
    const { language } = useLanguage();
    const [posts, setPosts] = useState<PostNode[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const title = language === 'en' 
            ? 'Meaning | Telugu Finance Platform' 
            : 'అర్థం | తెలుగుఫైనాన్స్';
        const description = language === 'en'
            ? 'Understand the meaning of common financial terms like SIP, EMI, and more in simple language.'
            : 'SIP, EMI మరియు మరిన్ని సాధారణ ఆర్థిక పదాల అర్థాన్ని సరళమైన భాషలో అర్థం చేసుకోండి.';
        updateMetaTags(title, description);
    }, [language]);

    useEffect(() => {
        const fetchContent = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(GRAPHQL_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ query: GET_MEANING_POSTS_QUERY })
                });

                if (!response.ok) throw new Error('Network response was not ok');

                const jsonResponse = await response.json();
                if (jsonResponse.errors) throw new Error(jsonResponse.errors.map((err: any) => err.message).join(' '));

                if (jsonResponse.data && jsonResponse.data.posts) {
                   setPosts(jsonResponse.data.posts.nodes);
                } else {
                    throw new Error("Could not find posts in 'Meaning' category.");
                }

            } catch (e: any) {
                setError(language === 'en' ? `Failed to load content: ${e.message}` : `కంటెంట్ లోడ్ చేయడంలో విఫలమైంది: ${e.message}`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchContent();
    }, [language]);

    const renderContent = () => {
        if (isLoading) return <LoadingSpinner />;
        if (error) return <p className="text-red-500 text-center py-8">{error}</p>;
        if (posts.length === 0) {
             return (
                <div className="text-center py-10">
                    <p className="text-gray-500">{language === 'en' ? 'No articles found in this section yet.' : 'ఈ విభాగంలో ఇంకా కథనాలు ఏవీ కనుగొనబడలేదు.'}</p>
                    <p className="text-sm text-gray-400 mt-2">{language === 'en' ? 'Add posts to the "Meaning" category in WordPress to see them here.' : 'WordPress లో "Meaning" వర్గానికి పోస్ట్‌లను జోడించండి.'}</p>
                </div>
            );
        }

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {posts.map(post => {
                    const postTitle = language === 'te' ? post.telugutitle : post.englishtitle;
                    const markdownExcerpt = language === 'te' ? post.teluguexcerpt : post.englishexcerpt;

                    const htmlExcerpt = marked.parse(markdownExcerpt || '') as string;
                    const tempDiv = document.createElement("div");
                    tempDiv.innerHTML = htmlExcerpt;
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
        );
    };

    return (
        <div className="space-y-12">
            <header className="text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold text-primary dark:text-blue-300">
                    {language === 'en' ? 'Financial Meanings' : 'ఆర్థిక అర్థాలు'}
                </h1>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                    {language === 'en' 
                        ? 'Confused about a financial term? Find simple explanations for complex topics here.' 
                        : 'ఒక ఆర్థిక పదం గురించి గందరగోళంగా ఉన్నారా? ఇక్కడ సంక్లిష్టమైన అంశాలకు సరళమైన వివరణలను కనుగొనండి.'}
                </p>
            </header>
            
            <section>
                {renderContent()}
            </section>
        </div>
    );
};

export default MeaningPage;
