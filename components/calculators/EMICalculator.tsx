import React, { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip as ChartTooltip, Legend } from 'chart.js';
import Tooltip from '../Tooltip';
import { createValidator } from '../../utils/validation';
import useBreakpoint from '../../hooks/useBreakpoint';

ChartJS.register(ArcElement, ChartTooltip, Legend);

interface CalculatorProps {
    initialState?: Record<string, any>;
    onStateChange: (state: Record<string, any>) => void;
}

// FIX: Replaced destructuring with default empty object for `initialState` with optional chaining to prevent TypeScript errors when properties are accessed.
const EMICalculator: React.FC<CalculatorProps> = ({ initialState, onStateChange }) => {
    const { language, theme } = useLanguage();
    const [loanAmount, setLoanAmount] = useState(initialState?.loanAmount || 2500000);
    const [interestRate, setInterestRate] = useState(initialState?.interestRate || 8.5);
    const [loanTenure, setLoanTenure] = useState(initialState?.loanTenure || 20);
    const [errors, setErrors] = useState({ loanAmount: '', interestRate: '', loanTenure: '' });

    const validator = createValidator(language);
    const isMd = useBreakpoint('md');

    useEffect(() => {
        onStateChange({ loanAmount, interestRate, loanTenure });
    }, [loanAmount, interestRate, loanTenure, onStateChange]);

    const handleValidation = (field: string, value: number) => {
        let error = validator.isPositive(value);
        setErrors(prev => ({ ...prev, [field]: error || '' }));
    };

    const { emi, totalInterest, totalPayment } = useMemo(() => {
        const P = loanAmount;
        const R = interestRate / 12 / 100;
        const N = loanTenure * 12;

        if (P > 0 && R > 0 && N > 0) {
            const emiValue = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
            const totalPaymentValue = emiValue * N;
            const totalInterestValue = totalPaymentValue - P;
            return {
                emi: emiValue,
                totalInterest: totalInterestValue,
                totalPayment: totalPaymentValue,
            };
        }
        return { emi: 0, totalInterest: 0, totalPayment: 0 };

    }, [loanAmount, interestRate, loanTenure]);
    
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    const pieChartData = {
        labels: [
            language === 'en' ? 'Principal Amount' : 'అసలు మొత్తం',
            language === 'en' ? 'Total Interest' : 'మొత్తం వడ్డీ',
        ],
        datasets: [{
            data: [loanAmount, totalInterest],
            backgroundColor: ['#1e40af', '#ef4444'],
            hoverBackgroundColor: ['#1d4ed8', '#dc2626'],
            borderWidth: 1,
            borderColor: theme === 'dark' ? '#1e293b' : '#fff',
        }]
    };

    // FIX: Cast legend position to a specific string literal type to resolve TypeScript error.
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: (isMd ? 'right' : 'top') as ('top' | 'right' | 'left' | 'bottom' | 'chartArea'),
                labels: { color: theme === 'dark' ? '#e2e8f0' : '#374151' }
            }
        }
    };

    return (
         <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Input Section */}
            <div className="lg:col-span-2 space-y-6">
                <div>
                    <label htmlFor="loanAmount" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">{language === 'en' ? 'Loan Amount' : 'లోన్ మొత్తం'}</label>
                    <div className="relative">
                       <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 dark:text-gray-400">₹</span>
                       <input id="loanAmount" type="number" value={loanAmount} onChange={e => { setLoanAmount(Number(e.target.value)); handleValidation('loanAmount', Number(e.target.value))}} className={`w-full p-3 pl-8 border rounded-lg bg-gray-50 dark:bg-slate-700 focus:ring-2 focus:ring-primary focus:border-primary transition ${errors.loanAmount ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}/>
                    </div>
                    {errors.loanAmount && <p className="text-red-500 text-xs mt-1">{errors.loanAmount}</p>}
                    <input aria-label={language === 'en' ? 'Loan Amount slider' : 'లోన్ మొత్తం స్లైడర్'} type="range" min="100000" max="20000000" step="50000" value={loanAmount} onChange={e => { setLoanAmount(Number(e.target.value)); handleValidation('loanAmount', Number(e.target.value))}} className="w-full mt-2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary"/>
                </div>
                <div>
                    <label htmlFor="interestRate" className="flex items-center text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        {language === 'en' ? 'Interest Rate (p.a.)' : 'వడ్డీ రేటు (సం.)'}
                         <Tooltip text={language === 'en' ? 'The annual interest rate for the loan.' : 'లోన్ కోసం వార్షిక వడ్డీ రేటు.'} />
                    </label>
                    <div className="relative">
                        <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 dark:text-gray-400">%</span>
                        <input id="interestRate" type="number" value={interestRate} onChange={e => { setInterestRate(Number(e.target.value)); handleValidation('interestRate', Number(e.target.value))}} className={`w-full p-3 pr-8 border rounded-lg bg-gray-50 dark:bg-slate-700 focus:ring-2 focus:ring-primary focus:border-primary transition ${errors.interestRate ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}/>
                    </div>
                    {errors.interestRate && <p className="text-red-500 text-xs mt-1">{errors.interestRate}</p>}
                    <input aria-label={language === 'en' ? 'Interest Rate slider' : 'వడ్డీ రేటు స్లైడర్'} type="range" min="5" max="20" step="0.1" value={interestRate} onChange={e => { setInterestRate(Number(e.target.value)); handleValidation('interestRate', Number(e.target.value))}} className="w-full mt-2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary"/>
                </div>
                <div>
                    <label htmlFor="loanTenure" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">{language === 'en' ? 'Loan Tenure (Years)' : 'లోన్ కాలపరిమితి (సంవత్సరాలు)'}</label>
                    <div className="relative">
                        <input id="loanTenure" type="number" value={loanTenure} onChange={e => { setLoanTenure(Number(e.target.value)); handleValidation('loanTenure', Number(e.target.value))}} className={`w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700 focus:ring-2 focus:ring-primary focus:border-primary transition ${errors.loanTenure ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}/>
                    </div>
                    {errors.loanTenure && <p className="text-red-500 text-xs mt-1">{errors.loanTenure}</p>}
                    <input aria-label={language === 'en' ? 'Loan Tenure slider' : 'లోన్ కాలపరిమితి స్లైడర్'} type="range" min="1" max="30" value={loanTenure} onChange={e => { setLoanTenure(Number(e.target.value)); handleValidation('loanTenure', Number(e.target.value))}} className="w-full mt-2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary"/>
                </div>
            </div>
            
            {/* Results and Chart Section */}
            <div className="lg:col-span-3 space-y-8">
                <div role="status" aria-live="polite" className="bg-light dark:bg-slate-800 p-6 rounded-lg space-y-6">
                    <div className="text-center">
                        <p className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Monthly EMI' : 'నెలవారీ EMI'}</p>
                        <p className="text-4xl font-bold text-primary dark:text-blue-400">{formatCurrency(emi)}</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Principal Amount' : 'అసలు మొత్తం'}</p>
                            <p className="text-xl font-semibold text-gray-800 dark:text-gray-200">{formatCurrency(loanAmount)}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Total Interest' : 'మొత్తం వడ్డీ'}</p>
                            <p className="text-xl font-semibold text-red-600 dark:text-red-500">{formatCurrency(totalInterest)}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Total Payment' : 'మొత్తం చెల్లింపు'}</p>
                            <p className="text-xl font-semibold text-gray-800 dark:text-gray-200">{formatCurrency(totalPayment)}</p>
                        </div>
                    </div>
                </div>
                
                <div className="bg-white dark:bg-dark p-4 sm:p-6 rounded-lg shadow-inner border border-gray-200 dark:border-gray-700">
                     <h3 className="text-xl font-bold text-primary dark:text-blue-300 mb-4 text-center">{language === 'en' ? 'Loan Breakdown' : 'లోన్ విచ్ఛిన్నం'}</h3>
                     <div className="h-64 mx-auto" style={{maxWidth: '400px'}} role="img" aria-label={language === 'en' ? 'Pie chart showing the breakdown of principal versus total interest.' : 'అసలు మరియు మొత్తం వడ్డీ యొక్క విచ్ఛన్నం చూపే పై చార్ట్.'}>
                        <Pie data={pieChartData} options={chartOptions as any} />
                     </div>
                </div>
            </div>
        </div>
    );
};

export default EMICalculator;