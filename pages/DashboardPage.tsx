import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import * as userService from '../services/userService';
import { SavedCalculation } from '../types';
import { findPageDataByPath } from '../constants';

const DashboardPage: React.FC = () => {
    const { language } = useLanguage();
    const { user } = useAuth();
    const [bookmarks, setBookmarks] = useState<string[]>([]);
    const [calculations, setCalculations] = useState<SavedCalculation[]>([]);

    useEffect(() => {
        setBookmarks(userService.getBookmarks());
        setCalculations(userService.getSavedCalculations());
    }, []);

    const handleDeleteCalculation = (id: string) => {
        userService.deleteCalculation(id);
        setCalculations(userService.getSavedCalculations());
    };

    const handleRemoveBookmark = (path: string) => {
        userService.removeBookmark(path);
        setBookmarks(userService.getBookmarks());
    }

    const formatCurrency = (value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);

    const isAdmin = user?.roles?.some(role => ['administrator', 'editor', 'author'].includes(role));

    return (
        <div className="space-y-12">
            <header>
                <h1 className="text-4xl font-extrabold text-primary dark:text-blue-300">
                    {language === 'en' ? 'My Dashboard' : 'నా డాష్‌బోర్డ్'}
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
                    {language === 'en' ? `Welcome back, ${user?.username}!` : `తిరిగి స్వాగతం, ${user?.username}!`}
                </p>
            </header>
            
            {/* Admin Section */}
            {isAdmin && (
                <section>
                    <h2 className="text-3xl font-bold mb-6">{language === 'en' ? 'Admin Tools' : 'అడ్మిన్ సాధనాలు'}</h2>
                    <div className="bg-white dark:bg-dark p-6 rounded-lg shadow-lg">
                        <h3 className="font-bold text-secondary dark:text-blue-400 text-lg mb-2">{language === 'en' ? 'News Feed Management' : 'వార్తల ఫీడ్ నిర్వహణ'}</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">{language === 'en' ? 'Fetch latest financial news and create drafts in WordPress for approval.' : 'తాజా ఆర్థిక వార్తలను పొందండి మరియు ఆమోదం కోసం WordPressలో డ్రాఫ్ట్‌లను సృష్టించండి.'}</p>
                        <Link to="/admin/news-approval" className="bg-accent text-white font-bold py-2 px-4 rounded-md hover:bg-orange-600 transition-colors">
                            {language === 'en' ? 'Go to News Approval' : 'వార్తల ఆమోదానికి వెళ్లండి'}
                        </Link>
                    </div>
                </section>
            )}

            {/* Saved Calculations */}
            <section>
                <h2 className="text-3xl font-bold mb-6">{language === 'en' ? 'Saved Calculations' : 'సేవ్ చేసిన గణనలు'}</h2>
                {calculations.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {calculations.map(calc => {
                            const params = new URLSearchParams();
                            params.set('inputs', encodeURIComponent(JSON.stringify(calc.inputs)));
                            return (
                                <div key={calc.id} className="bg-white dark:bg-dark p-6 rounded-lg shadow-lg relative">
                                    <h3 className="font-bold text-secondary dark:text-blue-400 text-lg mb-2">{calc.pageTitle[language]}</h3>
                                    <p className="text-xs text-gray-500 mb-4">{language === 'en' ? 'Saved on:' : 'సేవ్ చేసినది:'} {calc.date}</p>
                                    <div className="text-sm space-y-1 mb-4">
                                        {Object.entries(calc.inputs).map(([key, value]) => (
                                            <div key={key} className="flex justify-between">
                                                <span className="text-gray-600 dark:text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                                                <span className="font-medium">{typeof value === 'number' && key.toLowerCase().includes('amount') ? formatCurrency(value) : value.toString()}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <Link to={`${calc.path}?${params.toString()}`} className="text-primary dark:text-blue-300 font-semibold hover:underline">
                                            {language === 'en' ? 'View/Edit' : 'చూడండి/సవరించండి'} &rarr;
                                        </Link>
                                        <button onClick={() => handleDeleteCalculation(calc.id)} className="text-red-500 hover:text-red-700 text-xs">{language === 'en' ? 'Delete' : 'తొలగించు'}</button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <p className="text-gray-500">{language === 'en' ? 'You have no saved calculations.' : 'మీరు ఏ గణనలను సేవ్ చేయలేదు.'}</p>
                )}
            </section>
            
            {/* Bookmarked Pages */}
            <section>
                <h2 className="text-3xl font-bold mb-6">{language === 'en' ? 'My Bookmarks' : 'నా బుక్‌మార్క్‌లు'}</h2>
                {bookmarks.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {bookmarks.map(path => {
                            const pageData = findPageDataByPath(path);
                            if (!pageData) return null;
                            return (
                                <div key={path} className="bg-white dark:bg-dark p-4 rounded-lg shadow-lg flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold text-secondary dark:text-blue-400">{pageData.title[language]}</p>
                                        <Link to={path} className="text-sm text-primary dark:text-blue-300 hover:underline">
                                            {language === 'en' ? 'Go to page' : 'పేజీకి వెళ్లండి'} &rarr;
                                        </Link>
                                    </div>
                                    <button onClick={() => handleRemoveBookmark(path)} className="text-gray-400 hover:text-red-500 text-sm">{language === 'en' ? 'Remove' : 'తొలగించు'}</button>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <p className="text-gray-500">{language === 'en' ? 'You have no bookmarked pages.' : 'మీరు ఏ పేజీలను బుక్‌మార్క్ చేయలేదు.'}</p>
                )}
            </section>

        </div>
    );
};

export default DashboardPage;