import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

interface CalculatorProps {
    initialState?: Record<string, any>;
    onStateChange: (state: Record<string, any>) => void;
}

const MutualFundXIRRCalculator: React.FC<CalculatorProps> = ({ onStateChange }) => {
    const { language } = useLanguage();

    React.useEffect(() => {
        onStateChange({});
    }, [onStateChange]);

    return (
        <div className="flex justify-center items-center h-64 bg-gray-50 dark:bg-slate-800 rounded-lg">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-primary dark:text-blue-300 mb-2">
                    {language === 'en' ? 'Coming Soon!' : 'త్వరలో వస్తుంది!'}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                    {language === 'en'
                        ? 'This calculator is under construction and will be available shortly.'
                        : 'ఈ కాలిక్యులేటర్ నిర్మాణంలో ఉంది మరియు త్వరలో అందుబాటులో ఉంటుంది.'}
                </p>
            </div>
        </div>
    );
};

export default MutualFundXIRRCalculator;
