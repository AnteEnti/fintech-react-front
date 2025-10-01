import React, { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import Tooltip from '../Tooltip';
import { createValidator } from '../../utils/validation';

interface CalculatorProps {
    initialState?: Record<string, any>;
    onStateChange: (state: Record<string, any>) => void;
}

// FIX: Replaced destructuring with default empty object for `initialState` with optional chaining to prevent TypeScript errors when properties are accessed.
const LoanEligibilityCalculator: React.FC<CalculatorProps> = ({ initialState, onStateChange }) => {
    const { language } = useLanguage();
    const [monthlyIncome, setMonthlyIncome] = useState(initialState?.monthlyIncome || 80000);
    const [currentEmi, setCurrentEmi] = useState(initialState?.currentEmi || 10000);
    const [interestRate, setInterestRate] = useState(initialState?.interestRate || 9);
    const [loanTenure, setLoanTenure] = useState(initialState?.loanTenure || 20);
    const [errors, setErrors] = useState({ monthlyIncome: '', currentEmi: '', interestRate: '', loanTenure: '' });

    const validator = createValidator(language);

    useEffect(() => {
        onStateChange({ monthlyIncome, currentEmi, interestRate, loanTenure });
    }, [monthlyIncome, currentEmi, interestRate, loanTenure, onStateChange]);

    const handleValidation = (field: string, value: number) => {
        const error = validator.isPositive(value);
        setErrors(prev => ({ ...prev, [field]: error || '' }));
    };

    const { eligibleLoanAmount, maxEmi } = useMemo(() => {
        // Lenders typically cap EMIs at 50% of net monthly income
        const maxPossibleEmi = (monthlyIncome * 0.50) - currentEmi;
        
        if (maxPossibleEmi <= 0) {
            return { eligibleLoanAmount: 0, maxEmi: 0 };
        }

        const R = interestRate / 12 / 100;
        const N = loanTenure * 12;

        if (R > 0 && N > 0) {
            const loanAmount = (maxPossibleEmi / R) * (1 - Math.pow(1 + R, -N));
            return { eligibleLoanAmount: loanAmount, maxEmi: maxPossibleEmi };
        }
        
        return { eligibleLoanAmount: 0, maxEmi: maxPossibleEmi };
    }, [monthlyIncome, currentEmi, interestRate, loanTenure]);
    
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Input Section */}
            <div className="lg:col-span-2 space-y-6">
                <div>
                    <label htmlFor="monthlyIncome" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">{language === 'en' ? 'Net Monthly Income' : 'నికర నెలవారీ ఆదాయం'}</label>
                    <div className="relative">
                       <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 dark:text-gray-400">₹</span>
                       <input id="monthlyIncome" type="number" value={monthlyIncome} onChange={e => { setMonthlyIncome(Number(e.target.value)); handleValidation('monthlyIncome', Number(e.target.value)) }} className={`w-full p-3 pl-8 border rounded-lg bg-gray-50 dark:bg-slate-700 ${errors.monthlyIncome ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}/>
                    </div>
                </div>
                <div>
                    <label htmlFor="currentEmi" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">{language === 'en' ? 'Current Monthly EMIs' : 'ప్రస్తుత నెలవారీ EMIలు'}</label>
                    <div className="relative">
                       <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 dark:text-gray-400">₹</span>
                       <input id="currentEmi" type="number" value={currentEmi} onChange={e => { setCurrentEmi(Number(e.target.value)); handleValidation('currentEmi', Number(e.target.value)) }} className={`w-full p-3 pl-8 border rounded-lg bg-gray-50 dark:bg-slate-700 ${errors.currentEmi ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}/>
                    </div>
                </div>
                <div>
                    <label htmlFor="interestRate" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">{language === 'en' ? 'Interest Rate (p.a.)' : 'వడ్డీ రేటు (సం.)'}</label>
                    <div className="relative">
                        <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 dark:text-gray-400">%</span>
                        <input id="interestRate" type="number" value={interestRate} onChange={e => { setInterestRate(Number(e.target.value)); handleValidation('interestRate', Number(e.target.value)) }} className={`w-full p-3 pr-8 border rounded-lg bg-gray-50 dark:bg-slate-700 ${errors.interestRate ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}/>
                    </div>
                </div>
                <div>
                    <label htmlFor="loanTenure" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">{language === 'en' ? 'Loan Tenure (Years)' : 'లోన్ కాలపరిమితి (సంవత్సరాలు)'}</label>
                    <input id="loanTenure" type="number" value={loanTenure} onChange={e => { setLoanTenure(Number(e.target.value)); handleValidation('loanTenure', Number(e.target.value)) }} className={`w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700 ${errors.loanTenure ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}/>
                </div>
            </div>

            {/* Results Section */}
            <div className="lg:col-span-3">
                 <div role="status" aria-live="polite" className="bg-light dark:bg-slate-800 p-8 rounded-lg space-y-8 sticky top-24">
                    <div className="text-center">
                        <p className="flex items-center justify-center text-gray-600 dark:text-gray-400">
                            {language === 'en' ? 'Eligible Loan Amount' : 'అర్హత ఉన్న లోన్ మొత్తం'}
                            <Tooltip text={language === 'en' ? 'This is an estimate. The final amount may vary based on your credit score and lender policies.' : 'ఇది ఒక అంచనా మాత్రమే. మీ క్రెడిట్ స్కోర్ మరియు రుణదాత విధానాల ఆధారంగా తుది మొత్తం మారవచ్చు.'} />
                        </p>
                        <p className="text-5xl font-bold text-primary dark:text-blue-400">{formatCurrency(eligibleLoanAmount)}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Maximum EMI you can afford' : 'మీరు భరించగల గరిష్ట EMI'}</p>
                        <p className="text-3xl font-semibold text-green-600 dark:text-green-500">{formatCurrency(maxEmi)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoanEligibilityCalculator;