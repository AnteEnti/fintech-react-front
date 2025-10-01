import React, { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip as ChartTooltip, Legend } from 'chart.js';
import useBreakpoint from '../../hooks/useBreakpoint';

ChartJS.register(ArcElement, ChartTooltip, Legend);

interface CalculatorProps {
    initialState?: Record<string, any>;
    onStateChange: (state: Record<string, any>) => void;
}

// FIX: Replaced destructuring with default empty object for `initialState` with optional chaining to prevent TypeScript errors when properties are accessed.
const CreditCardInterestCalculator: React.FC<CalculatorProps> = ({ initialState, onStateChange }) => {
    const { language, theme } = useLanguage();
    const [outstandingBalance, setOutstandingBalance] = useState(initialState?.outstandingBalance || 50000);
    const [apr, setApr] = useState(initialState?.apr || 42); // Annual Percentage Rate
    const [minPaymentPercent, setMinPaymentPercent] = useState(initialState?.minPaymentPercent || 5);

    const isMd = useBreakpoint('md');

    useEffect(() => {
        onStateChange({ outstandingBalance, apr, minPaymentPercent });
    }, [outstandingBalance, apr, minPaymentPercent, onStateChange]);

    const { timeToPayOff, totalInterest } = useMemo(() => {
        const P = outstandingBalance;
        const monthlyRate = apr / 100 / 12;

        if (P <= 0 || monthlyRate <= 0) return { timeToPayOff: '0', totalInterest: 0 };
        
        // Simplified calculation for minimum payment scenario
        let balance = P;
        let months = 0;
        let interestPaid = 0;
        const maxMonths = 50 * 12; // 50 years cap to prevent infinite loop

        while (balance > 0 && months < maxMonths) {
            const interest = balance * monthlyRate;
            interestPaid += interest;
            const minPayment = Math.max(balance * (minPaymentPercent / 100), 100); // Assume min payment is 5% or Rs 100
            balance += interest - minPayment;
            months++;
        }

        if (months >= maxMonths) return { timeToPayOff: language === 'en' ? '50+ Yrs' : '50+ సం', totalInterest: interestPaid };

        const years = Math.floor(months / 12);
        const remainingMonths = months % 12;
        
        return {
            timeToPayOff: `${years} ${language === 'en' ? 'Yrs' : 'సం'} ${remainingMonths} ${language === 'en' ? 'Mos' : 'నెల'}`,
            totalInterest: interestPaid
        };
    }, [outstandingBalance, apr, minPaymentPercent, language]);
    
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
            data: [outstandingBalance, totalInterest],
            backgroundColor: ['#1e40af', '#ef4444'],
            hoverBackgroundColor: ['#1d4ed8', '#dc2626'],
            borderWidth: 1,
            borderColor: theme === 'dark' ? '#1e293b' : '#fff',
        }]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: isMd ? 'right' : 'top',
                labels: { color: theme === 'dark' ? '#e2e8f0' : '#374151' }
            }
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Input Section */}
            <div className="lg:col-span-2 space-y-6">
                 <div>
                    <label htmlFor="outstandingBalance" className="block text-sm font-medium mb-2">{language === 'en' ? 'Outstanding Balance' : 'బాకీ ఉన్న బ్యాలెన్స్'}</label>
                    <input id="outstandingBalance" type="number" value={outstandingBalance} onChange={e => setOutstandingBalance(Number(e.target.value))} className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700"/>
                </div>
                 <div>
                    <label htmlFor="apr" className="block text-sm font-medium mb-2">{language === 'en' ? 'Annual Interest Rate (APR %)' : 'వార్షిక వడ్డీ రేటు (APR %)'}</label>
                    <input id="apr" type="number" value={apr} onChange={e => setApr(Number(e.target.value))} className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700"/>
                </div>
                 <div>
                    <label htmlFor="minPaymentPercent" className="block text-sm font-medium mb-2">{language === 'en' ? 'Minimum Payment (%)' : 'కనీస చెల్లింపు (%)'}</label>
                    <input id="minPaymentPercent" type="number" value={minPaymentPercent} onChange={e => setMinPaymentPercent(Number(e.target.value))} className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700"/>
                </div>
            </div>

            {/* Results Section */}
            <div className="lg:col-span-3 space-y-8">
                 <div role="status" aria-live="polite" className="bg-light dark:bg-slate-800 p-6 rounded-lg space-y-6 text-center">
                    <div>
                        <p className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Time to Pay Off' : 'చెల్లించడానికి సమయం'}</p>
                        <p className="text-4xl font-bold text-primary dark:text-blue-400">{timeToPayOff}</p>
                    </div>
                     <div>
                        <p className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Total Interest Paid' : 'చెల్లించిన మొత్తం వడ్డీ'}</p>
                        <p className="text-3xl font-semibold text-red-600 dark:text-red-500">{formatCurrency(totalInterest)}</p>
                    </div>
                </div>
                 <div className="bg-white dark:bg-dark p-4 sm:p-6 rounded-lg shadow-inner border border-gray-200 dark:border-gray-700">
                     <h3 className="text-xl font-bold text-primary dark:text-blue-300 mb-4 text-center">{language === 'en' ? 'Payment Breakdown' : 'చెల్లింపు విచ్ఛిన్నం'}</h3>
                     <div className="h-64 mx-auto" style={{maxWidth: '400px'}} role="img" aria-label={language === 'en' ? 'Pie chart showing breakdown of principal vs total interest.' : 'అసలు మరియు మొత్తం వడ్డీ యొక్క విచ్ఛిన్నం చూపే పై చార్ట్.'}>
                        <Pie data={pieChartData} options={chartOptions} />
                     </div>
                </div>
            </div>
        </div>
    );
};

export default CreditCardInterestCalculator;
