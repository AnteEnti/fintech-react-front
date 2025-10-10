import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { updateMetaTags } from '../utils/seo';
import LoadingSpinner from '../components/LoadingSpinner';
import Breadcrumbs from '../components/Breadcrumbs';
import { PageData, PageType } from '../types';
import { marked } from 'marked';

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
  const [rawMarkdown, setRawMarkdown] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [breadcrumbData, setBreadcrumbData] = useState<PageData | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
        setIsLoading(true);
        setError(null);
        setRawMarkdown(null);
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
            
            const enTitleRaw = post.englishtitle || 'Post';
            const teTitleRaw = post.telugutitle || 'పోస్ట్';
            const finalTitleRaw = language === 'te' ? teTitleRaw : enTitleRaw;

            const markdownContent = language === 'te' ? post.telugucontent : post.englishcontent;

            const cleanHtml = (html: string) => {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = html;
                return tempDiv.textContent || tempDiv.innerText || '';
            }

            const cleanedTitleForMeta = cleanHtml(finalTitleRaw);
            const cleanedEnTitle = cleanHtml(enTitleRaw);
            const cleanedTeTitle = cleanHtml(teTitleRaw);
            
            setRawMarkdown(markdownContent || '');
            setPostTitle(finalTitleRaw);
            updateMetaTags(`${cleanedTitleForMeta} | Telugu Finance Platform`, 'A post from our blog.');
            
            setBreadcrumbData({
                path: `/post/${slug}`,
                type: PageType.LEARN,
                title: { en: cleanedEnTitle, te: cleanedTeTitle },
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

  const { content, tocItems } = useMemo(() => {
    if (!rawMarkdown) return { content: null, tocItems: [] };

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

    const parsedContent = marked.parse(rawMarkdown, { renderer }) as string;
    return { content: parsedContent, tocItems: headings };
  }, [rawMarkdown]);

  return (
    <div className="max-w-4xl mx-auto">
      {breadcrumbData && <Breadcrumbs pageData={breadcrumbData} />}
      <div className="bg-white dark:bg-dark p-6 sm:p-8 rounded-lg shadow-xl mt-4">
        {isLoading && <LoadingSpinner />}
        {error && <p className="text-red-500 text-center py-8">{error}</p>}
        {!isLoading && !error && (
            <article className="prose dark:prose-invert lg:prose-lg max-w-none">
                {postTitle && <h1 dangerouslySetInnerHTML={{ __html: postTitle }} />}
                
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
                
                {content && <div dangerouslySetInnerHTML={{ __html: content }} />}
            </article>
        )}
      </div>
    </div>
  );
};

export default PostPage;