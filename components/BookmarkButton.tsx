import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import * as userService from '../services/userService';

interface BookmarkButtonProps {
    pagePath: string;
}

const BookmarkIcon: React.FC<{ filled?: boolean }> = ({ filled }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={filled ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
    </svg>
);


const BookmarkButton: React.FC<BookmarkButtonProps> = ({ pagePath }) => {
    const { isAuthenticated } = useAuth();
    const [isBookmarked, setIsBookmarked] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            setIsBookmarked(userService.isBookmarked(pagePath));
        }
    }, [isAuthenticated, pagePath]);

    const handleToggleBookmark = () => {
        if (!isAuthenticated) return; // Or prompt to login
        
        if (isBookmarked) {
            userService.removeBookmark(pagePath);
            setIsBookmarked(false);
        } else {
            userService.addBookmark(pagePath);
            setIsBookmarked(true);
        }
    };

    if (!isAuthenticated) {
        return null;
    }

    return (
        <button
            onClick={handleToggleBookmark}
            className={`p-2 rounded-full transition-colors ${isBookmarked ? 'text-accent' : 'text-gray-400 hover:text-accent hover:bg-orange-100 dark:hover:bg-slate-700'}`}
            aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
        >
            <BookmarkIcon filled={isBookmarked} />
        </button>
    );
};

export default BookmarkButton;