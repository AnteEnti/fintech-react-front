import React, { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import Tooltip from '../Tooltip';
import { createValidator } from '../../utils/validation';

interface CalculatorProps {
    initialState?: Record<string, any>;
    onStateChange: (state: Record<string, any>) => void;
}

// FIX: Replaced destructuring with default empty object for `initialState` with optional chaining to prevent TypeScript errors when properties are accessed.
const DividendYieldCalculator: React.FC<CalculatorProps> = ({ initialState, onStateChange }) => {
    const { language } = useLanguage();
    const [annualDividend, setAnnualDividend] = useState(initialState?.annualDividend || 15);
    const [sharePrice, setSharePrice] = useState(initialState?.sharePrice || 1000);
    const [numShares, setNumShares] = useState(initialState?.numShares || 100);
    const [errors, setErrors] = useState({ annualDividend: '', sharePrice: '', numShares: '' });
    
    const validator = createValidator(language);

    useEffect(() => {
        onStateChange({ annualDividend, sharePrice, numShares });
    }, [annualDividend, sharePrice, numShares, onStateChange]);

    const handleValidation = (field: string, value: number) => {
        const error = validator.isPositive(value);
        setErrors(prev => ({ ...prev, [field]: error }));
    };

    const { dividendYield, totalAnnualIncome } = useMemo(() => {
        const yieldValue = sharePrice > 0 ? (annualDividend / sharePrice) * 100 : 0;
        const incomeValue = annualDividend * numShares;
        return {
            dividendYield: yieldValue,
            totalAnnualIncome: incomeValue,
        };
    }, [annualDividend, sharePrice, numShares]);
    
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
        }).format(value);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Input Section */}
            <div className="lg:col-span-2 space-y-6">
                <div>
                    <label htmlFor="annualDividend" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">{language === 'en' ? 'Annual Dividend per Share' : 'ఒక షేరుకు వార్షిక డివిడెండ్'}</label>
                    <div className="relative">
                       <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 dark:text-gray-400">₹</span>
                       <input id="annualDividend" type="number" value={annualDividend} onChange={e => { setAnnualDividend(Number(e.target.value)); handleValidation('annualDividend', Number(e.target.value)) }} className={`w-full p-3 pl-8 border rounded-lg bg-gray-50 dark:bg-slate-700 ${errors.annualDividend ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}/>
                    </div>
                </div>
                <div>
                    <label htmlFor="sharePrice" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">{language === 'en' ? 'Current Share Price' : 'ప్రస్తుత షేరు ధర'}</label>
                    <div className="relative">
                       <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 dark:text-gray-400">₹</span>
                       <input id="sharePrice" type="number" value={sharePrice} onChange={e => { setSharePrice(Number(e.target.value)); handleValidation('sharePrice', Number(e.target.value)) }} className={`w-full p-3 pl-8 border rounded-lg bg-gray-50 dark:bg-slate-700 ${errors.sharePrice ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}/>
                    </div>
                </div>
                <div>
                    <label htmlFor="numShares" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">{language === 'en' ? 'Number of Shares Owned' : 'సొంతమైన షేర్ల సంఖ్య'}</label>
                    <input id="numShares" type="number" value={numShares} onChange={e => { setNumShares(Number(e.target.value)); handleValidation('numShares', Number(e.target.value)) }} className={`w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700 ${errors.numShares ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}/>
                </div>
            </div>

            {/* Results Section */}
            <div className="lg:col-span-3">
                <div role="status" aria-live="polite" className="bg-light dark:bg-slate-800 p-8 rounded-lg space-y-8 sticky top-24">
                    <div className="text-center">
                        <p className="flex items-center justify-center text-gray-600 dark:text-gray-400">
                            {language === 'en' ? 'Dividend Yield' : 'డివిడెండ్ యీల్డ్'}
                            <Tooltip text={language === 'en' ? 'The percentage return you get from dividends relative to the share price.' : 'షేరు ధరకు సంబంధించి డివిడెండ్ల నుండి మీరు పొందే శాతం రాబడి.'} />
                        </p>
                        <p className="text-5xl font-bold text-primary dark:text-blue-400">{dividendYield.toFixed(2)}%</p>
                    </div>
                    <div className="text-center">
                        <p className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Total Annual Dividend Income' : 'మొత్తం వార్షిక డివిడెండ్ ఆదాయం'}</p>
                        <p className="text-3xl font-semibold text-green-600 dark:text-green-500">{formatCurrency(totalAnnualIncome)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DividendYieldCalculator;
