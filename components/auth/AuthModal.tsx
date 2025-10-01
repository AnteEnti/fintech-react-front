import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
    const { language } = useLanguage();
    const { login, signup } = useAuth();
    const [isLoginView, setIsLoginView] = useState(true);
    
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setError('');
            setUsername('');
            setEmail('');
            setPassword('');
            setLoading(false);
            setIsLoginView(true);
        }
    }, [isOpen]);

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        let result;
        if (isLoginView) {
            if (!username.trim() || !password.trim()) {
                setError(language === 'en' ? 'Username and password are required.' : 'వినియోగదారు పేరు మరియు పాస్‌వర్డ్ అవసరం.');
                setLoading(false);
                return;
            }
            result = await login(username, password);
        } else {
            if (!username.trim() || !email.trim() || !password.trim()) {
                setError(language === 'en' ? 'All fields are required.' : 'అన్ని ఫీల్డ్‌లు అవసరం.');
                setLoading(false);
                return;
            }
            result = await signup(username, email, password);
        }
        
        setLoading(false);

        if (result.success) {
            onClose();
        } else {
            // Strip HTML tags from the error message
            const message = result.message.replace(/<[^>]*>?/gm, '');
            setError(message);
        }
    };

    if (!isOpen) return null;

    const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4" onClick={handleClose}>
            <div className="bg-white dark:bg-dark p-8 rounded-lg shadow-xl w-full max-w-sm" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-bold text-center mb-6 text-primary dark:text-blue-300">
                    {isLoginView 
                        ? (language === 'en' ? 'Login' : 'లాగిన్')
                        : (language === 'en' ? 'Sign Up' : 'సైన్ అప్')
                    }
                </h2>
                <form onSubmit={handleAuth}>
                    <div className="space-y-4">
                        {!isLoginView && (
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                    {language === 'en' ? 'Email' : 'ఇమెయిల్'}
                                </label>
                                <input 
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700 focus:ring-2 focus:ring-primary focus:border-primary transition"
                                    required
                                />
                            </div>
                        )}
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                {language === 'en' ? 'Username' : 'వినియోగదారు పేరు'}
                            </label>
                            <input 
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700 focus:ring-2 focus:ring-primary focus:border-primary transition"
                                required
                                autoFocus
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                {language === 'en' ? 'Password' : 'పాస్‌వర్డ్'}
                            </label>
                            <input 
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700 focus:ring-2 focus:ring-primary focus:border-primary transition"
                                required
                            />
                        </div>
                    </div>

                    {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}

                    <button 
                        type="submit" 
                        className="w-full bg-secondary text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors mt-6 disabled:bg-gray-400"
                        disabled={loading}
                    >
                         {loading ? (language === 'en' ? 'Processing...' : 'ప్రాసెస్ అవుతోంది...') : (
                            isLoginView 
                                ? (language === 'en' ? 'Login' : 'లాగిన్')
                                : (language === 'en' ? 'Sign Up' : 'సైన్ అప్')
                         )}
                    </button>
                </form>
                <p className="text-center text-sm mt-6">
                    {isLoginView 
                        ? (language === 'en' ? "Don't have an account?" : 'ఖాతా లేదా?')
                        : (language === 'en' ? 'Already have an account?' : 'ఇప్పటికే ఖాతా ఉందా?')
                    }
                    <button onClick={() => setIsLoginView(!isLoginView)} className="font-semibold text-primary dark:text-blue-400 hover:underline ml-2">
                        {isLoginView
                            ? (language === 'en' ? 'Sign Up' : 'సైన్ అప్')
                            : (language === 'en' ? 'Login' : 'లాగిన్')
                        }
                    </button>
                </p>
            </div>
        </div>
    );
};

export default AuthModal;
