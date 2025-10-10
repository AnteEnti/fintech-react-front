import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import LoadingSpinner from '../components/LoadingSpinner';

const WORDPRESS_DRAFT_URL = 'https://wp.amadeinandhra.com/wp-admin/post-new.php';
// Switched to a more reliable Google News feed for finance in India
const RSS_FEED_URL = 'https://news.google.com/rss/search?q=finance+market+news+india&hl=en-IN&gl=IN&ceid=IN:en';
const RSS_TO_JSON_API = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_FEED_URL)}`;


interface NewsItem {
    title: string;
    pubDate: string;
    link: string;
    description: string;
    content: string;
}

const NewsApprovalPage: React.FC = () => {
    const { language } = useLanguage();
    const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNews = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(RSS_TO_JSON_API);
                if (!response.ok) {
                    throw new Error('Failed to fetch news feed. The third-party RSS service might be down.');
                }
                const data = await response.json();
                if (data.status !== 'ok') {
                    throw new Error(data.message || 'Error parsing news feed.');
                }
                setNewsItems(data.items);
            } catch (e: any) {
                setError(e.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchNews();
    }, []);

    const handleCreateDraft = (item: NewsItem) => {
        const title = encodeURIComponent(item.title);

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = item.content; // Use item.content which contains the snippet
        const cleanContent = tempDiv.textContent || tempDiv.innerText || '';

        const content = `<!-- wp:paragraph -->
<p>${cleanContent}</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><em>Source: <a href="${item.link}" target="_blank" rel="noopener noreferrer">Read More</a></em></p>
<!-- /wp:paragraph -->`;
        
        const encodedContent = encodeURIComponent(content);
        const url = `${WORDPRESS_DRAFT_URL}?post_title=${title}&content=${encodedContent}&post_category[]=3`; // Category ID for "News" is 3
        window.open(url, '_blank');
    };

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <header>
                <h1 className="text-3xl md:text-4xl font-extrabold text-primary dark:text-blue-300">
                    {language === 'en' ? 'News Feed Approval' : 'వార్తల ఫీడ్ ఆమోదం'}
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                    {language === 'en' ? 'Fetch the latest news and create drafts in WordPress. You can then translate, edit, and publish them.' : 'తాజా వార్తలను పొందండి మరియు WordPressలో డ్రాఫ్ట్‌లను సృష్టించండి. మీరు వాటిని అనువదించవచ్చు, సవరించవచ్చు మరియు ప్రచురించవచ్చు.'}
                </p>
            </header>

            <div className="bg-white dark:bg-dark p-6 rounded-lg shadow-lg">
                {isLoading && <LoadingSpinner />}
                {error && <p className="text-red-500 text-center">{error}</p>}
                {!isLoading && newsItems.length > 0 && (
                    <div className="space-y-6">
                        {newsItems.map((item, index) => (
                            <div key={index} className="p-4 border dark:border-gray-700 rounded-lg flex flex-col md:flex-row justify-between items-start gap-4">
                                <div className="flex-grow">
                                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">{item.title}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(item.pubDate).toLocaleString()}</p>
                                    <p 
                                        className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-3"
                                        dangerouslySetInnerHTML={{ __html: item.content }}
                                    />
                                </div>
                                <div className="flex-shrink-0 mt-4 md:mt-0">
                                    <button 
                                        onClick={() => handleCreateDraft(item)}
                                        className="bg-secondary text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                                    >
                                        {language === 'en' ? 'Create Draft' : 'డ్రాఫ్ట్ సృష్టించు'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default NewsApprovalPage;