import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const { login, signup } = useAuth();
  const [isLoginView, setIsLoginView] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); // Note: Password is for UI simulation only
  const [error, setError] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!username) {
        setError(language === 'en' ? 'Username is required.' : 'వినియోగదారు పేరు అవసరం.');
        return;
    }
    
    let success = false;
    if (isLoginView) {
        success = login(username);
        if(!success) setError(language === 'en' ? 'Login failed. User not found.' : 'లాగిన్ విఫలమైంది. వినియోగదారు కనుగొనబడలేదు.');
    } else {
        success = signup(username);
        if(!success) setError(language === 'en' ? 'Signup failed. Username already exists.' : 'సైన్అప్ విఫలమైంది. వినియోగదారు పేరు ఇప్పటికే ఉంది.');
    }

    if (success) {
        setUsername('');
        setPassword('');
        onClose();
    }
  };
  
  if (!isOpen) return null;

  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
    >
      <div 
        className="bg-white dark:bg-dark p-8 rounded-lg shadow-2xl w-full max-w-sm"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
            <h2 id="auth-modal-title" className="text-2xl font-bold text-primary dark:text-blue-300">
                {isLoginView 
                    ? (language === 'en' ? 'Login' : 'లాగిన్') 
                    : (language === 'en' ? 'Sign Up' : 'సైన్ అప్')
                }
            </h2>
            <button onClick={onClose} aria-label="Close modal">&times;</button>
        </div>
        
        <div className="border-b border-gray-200 dark:border-gray-700 mb-4">
            <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                <button
                    onClick={() => setIsLoginView(true)}
                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${isLoginView ? 'border-primary text-primary dark:border-blue-400 dark:text-blue-300' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                >
                    {language === 'en' ? 'Login' : 'లాగిన్'}
                </button>
                 <button
                    onClick={() => setIsLoginView(false)}
                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${!isLoginView ? 'border-primary text-primary dark:border-blue-400 dark:text-blue-300' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                >
                    {language === 'en' ? 'Sign Up' : 'సైన్ అప్'}
                </button>
            </nav>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
            <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{language === 'en' ? 'Username' : 'వినియోగదారు పేరు'}</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm"
                />
            </div>
             <div>
                <label htmlFor="password"className="block text-sm font-medium text-gray-700 dark:text-gray-300">{language === 'en' ? 'Password' : 'పాస్వర్డ్'}</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm"
                />
                 <p className="text-xs text-gray-500 mt-1">{language === 'en' ? 'Note: For demo purposes, any password will work.' : 'గమనిక: డెమో ప్రయోజనాల కోసం, ఏదైనా పాస్‌వర్డ్ పనిచేస్తుంది.'}</p>
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button type="submit" className="w-full bg-secondary text-white py-2 px-4 rounded-md hover:bg-blue-700">
                {isLoginView ? (language === 'en' ? 'Log In' : 'లాగిన్ అవ్వండి') : (language === 'en' ? 'Create Account' : 'ఖాతాను సృష్టించండి')}
            </button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;