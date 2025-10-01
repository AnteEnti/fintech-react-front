import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'en' | 'te';
type Theme = 'light' | 'dark';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  toggleTheme: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('te');
  const [theme, setTheme] = useState<Theme>('light');

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'te' : 'en'));
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, setLanguage, theme, toggleTheme }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};