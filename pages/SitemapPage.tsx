import React, { useState, useEffect } from 'react';
import { SITEMAP_DATA } from '../constants';
import { PageData } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';

const GRAPHQL_URL = 'https://wp.amadeinandhra.com/graphql';

// Query to get all post slugs for the sitemap
const GET_SITEMAP_POSTS_QUERY = `
  query GetSitemapPosts {
    posts(first: 1000) {
      nodes {
        slug
        modified
      }
    }
  }
`;

interface PostNode {
    slug: string;
    modified: string;
}

const SitemapPage: React.FC = () => {
    const [sitemapXml, setSitemapXml] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const generateSitemap = async () => {
            try {
                // --- Step 1: Define Base URL and static pages ---
                const baseUrl = window.location.origin;
                const today = new Date().toISOString().split('T')[0];

                let urls: string[] = [];

                const addUrl = (path: string, lastmod = today) => {
                    const fullUrl = `${baseUrl}/#${path}`;
                    urls.push(`
    <url>
        <loc>${fullUrl}</loc>
        <lastmod>${lastmod}</lastmod>
    </url>`);
                };

                // Add main static pages
                addUrl('/');
                addUrl('/learn');
                addUrl('/meaning');
                addUrl('/news');
                addUrl('/calculators');
                addUrl('/guides');
                addUrl('/about');
                addUrl('/contact');
                addUrl('/faq');
                addUrl('/legal/privacy-policy');
                addUrl('/legal/terms-of-use');
                addUrl('/legal/disclaimer');
                addUrl('/learn/sample-post');


                // Add all pages from constants.ts
                const allStaticPages: PageData[] = [
                    ...SITEMAP_DATA.learn.flatMap(c => c.pages),
                    ...SITEMAP_DATA.calculators.flatMap(c => c.pages),
                    ...SITEMAP_DATA.tips,
                    ...SITEMAP_DATA.interactiveGuides,
                ];
                allStaticPages.forEach(page => addUrl(page.path));

                // --- Step 2: Fetch dynamic post slugs from WordPress ---
                const response = await fetch(GRAPHQL_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ query: GET_SITEMAP_POSTS_QUERY }),
                });

                if (!response.ok) {
                    throw new Error('Network response from GraphQL was not ok');
                }
                const jsonResponse = await response.json();
                if (jsonResponse.errors) {
                    throw new Error(jsonResponse.errors[0].message);
                }
                
                const posts: PostNode[] = jsonResponse.data.posts.nodes;
                posts.forEach(post => {
                    addUrl(`/post/${post.slug}`, post.modified.split('T')[0]);
                });

                // --- Step 3: Assemble the final XML ---
                const xmlString = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('')}
</urlset>`;

                setSitemapXml(xmlString);
            } catch (e: any) {
                setError(`Failed to generate sitemap: ${e.message}`);
            } finally {
                setIsLoading(false);
            }
        };

        generateSitemap();
    }, []);

    if (isLoading) {
        return <LoadingSpinner />;
    }
    
    if (error) {
        return <p className="text-red-500">{error}</p>;
    }
    
    // Render the XML as preformatted text. The browser will handle the content-type.
    return (
        <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all', color: 'inherit' }}>
            {sitemapXml}
        </pre>
    );
};

export default SitemapPage;