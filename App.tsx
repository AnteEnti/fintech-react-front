import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useParams, useLocation, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ContentPage from './pages/ContentPage';
import CalculatorPage from './pages/CalculatorPage';
import NotFoundPage from './pages/NotFoundPage';
import { findPageDataByPath } from './constants';
import StaticPage from './pages/StaticPage';
import { useLanguage } from './context/LanguageContext';
import { updateMetaTags } from './utils/seo';
import DashboardPage from './pages/DashboardPage';
import InteractiveGuidePage from './pages/InteractiveGuidePage';
import { useAuth } from './context/AuthContext';
import CalculatorsListPage from './pages/CalculatorsListPage';

const App: React.FC = () => {
  const { theme } = useLanguage();

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'light' ? 'dark' : 'light');
    root.classList.add(theme);
  }, [theme]);

  return (
    <HashRouter>
      <div className="bg-light dark:bg-slate-900 min-h-screen flex flex-col font-sans text-dark dark:text-gray-300">
        <Header />
        <main id="main-content" tabIndex={-1} className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* Content Pages */}
            <Route path="/learn/:category/:topic" element={<ContentPageWrapper />} />
            <Route path="/compare/:topic" element={<ContentPageWrapper />} />
            <Route path="/tips/:topic" element={<ContentPageWrapper />} />
            
            {/* Calculator Pages */}
            <Route path="/calculators" element={<CalculatorsListPage />} />
            <Route path="/calculators/:group/:tool" element={<CalculatorPageWrapper />} />

            {/* Interactive Guides */}
            <Route path="/guides/:topic" element={<InteractiveGuidePageWrapper />} />

            {/* Static Pages */}
            <Route path="/about" element={<StaticPage pageKey="about" />} />
            <Route path="/contact" element={<StaticPage pageKey="contact" />} />
            <Route path="/faq" element={<StaticPage pageKey="faq" />} />
            <Route path="/legal/:topic" element={<StaticPage pageKey="legal" />} />

            {/* User Pages */}
            <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

// FIX: Changed children type from JSX.Element to React.ReactElement to resolve "Cannot find namespace 'JSX'" error.
const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }
    return children;
};


const ContentPageWrapper: React.FC = () => {
    const location = useLocation();
    const { language } = useLanguage();
    const path = location.pathname;
    const pageData = findPageDataByPath(path);
    
    useEffect(() => {
        if (pageData) {
            updateMetaTags(
                `${pageData.title[language]} | Telugu Finance Platform`,
                pageData.description[language]
            );
        }
    }, [pageData, language]);

    if (!pageData) return <NotFoundPage />;
    return <ContentPage pageData={pageData} />;
};

const CalculatorPageWrapper: React.FC = () => {
    const params = useParams();
    const { language } = useLanguage();
    const location = useLocation();
    const path = `/calculators/${params.group}/${params.tool}`;
    const pageData = findPageDataByPath(path);
    
    useEffect(() => {
        if (pageData) {
            updateMetaTags(
                `${pageData.title[language]} | Telugu Finance Platform`,
                pageData.description[language]
            );
        }
    }, [pageData, language]);

    if (!pageData) return <NotFoundPage />;
    return <CalculatorPage key={location.key} pageData={pageData} />;
}

const InteractiveGuidePageWrapper: React.FC = () => {
    const location = useLocation();
    const { language } = useLanguage();
    const path = location.pathname;
    const pageData = findPageDataByPath(path);

    useEffect(() => {
        if (pageData) {
            updateMetaTags(
                `${pageData.title[language]} | Telugu Finance Platform`,
                pageData.description[language]
            );
        }
    }, [pageData, language]);

    if (!pageData) return <NotFoundPage />;
    return <InteractiveGuidePage pageData={pageData} />;
};

export default App;