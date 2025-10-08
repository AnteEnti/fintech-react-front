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
const FDCalculator: React.FC<CalculatorProps> = ({ initialState, onStateChange }) => {
    const { language, theme } = useLanguage();
    const [principal, setPrincipal] = useState(initialState?.principal || 100000);
    const [rate, setRate] = useState(initialState?.rate || 7.0);
    const [years, setYears] = useState(initialState?.years || 5);
    const [errors, setErrors] = useState({ principal: '', rate: '', years: '' });

    const validator = createValidator(language);
    const isMd = useBreakpoint('md');

    useEffect(() => {
        onStateChange({ principal, rate, years });
    }, [principal, rate, years, onStateChange]);

    const handleValidation = (field: string, value: number) => {
        let error = validator.isPositive(value);
        setErrors(prev => ({ ...prev, [field]: error || '' }));
    };

    const { maturityValue, totalInterest } = useMemo(() => {
        const P = principal;
        const r = rate / 100;
        const n = 4; // Compounded quarterly
        const t = years;

        const amount = P * Math.pow((1 + r / n), n * t);
        const interest = amount - P;
        
        return {
            maturityValue: amount,
            totalInterest: interest,
        };
    }, [principal, rate, years]);

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
            data: [principal, totalInterest],
            backgroundColor: ['#1e40af', '#22c55e'],
            hoverBackgroundColor: ['#1d4ed8', '#16a34a'],
            borderWidth: 2,
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
            },
            tooltip: {
                callbacks: {
                    label: function(context: any) {
                        let label = context.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed !== null) {
                            label += formatCurrency(context.parsed);
                        }
                        return label;
                    }
                }
            }
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Input Section */}
            <div className="lg:col-span-2 space-y-6">
                 <div>
                    <label htmlFor="principal" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">{language === 'en' ? 'Principal Amount' : 'అసలు మొత్తం'}</label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 dark:text-gray-400">₹</span>
                        <input id="principal" type="number" value={principal} onChange={e => { setPrincipal(Number(e.target.value)); handleValidation('principal', Number(e.target.value)); }} className={`w-full p-3 pl-8 border rounded-lg bg-gray-50 dark:bg-slate-700 focus:ring-2 focus:ring-primary focus:border-primary transition ${errors.principal ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}/>
                    </div>
                    {errors.principal && <p className="text-red-500 text-xs mt-1">{errors.principal}</p>}
                    <input aria-label={language === 'en' ? 'Principal Amount slider' : 'అసలు మొత్తం స్లైడర్'} type="range" min="5000" max="10000000" step="5000" value={principal} onChange={e => { setPrincipal(Number(e.target.value)); handleValidation('principal', Number(e.target.value)); }} className="w-full mt-2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary"/>
                </div>
                <div>
                    <label htmlFor="rate" className="flex items-center text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        {language === 'en' ? 'Annual Interest Rate (%)' : 'వార్షిక వడ్డీ రేటు (%)'}
                        <Tooltip text={language === 'en' ? 'The fixed interest rate for the entire tenure of the deposit.' : 'డిపాజిట్ యొక్క మొత్తం కాలానికి స్థిర వడ్డీ రేటు.'} />
                    </label>
                    <div className="relative">
                        <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 dark:text-gray-400">%</span>
                        <input id="rate" type="number" value={rate} onChange={e => { setRate(Number(e.target.value)); handleValidation('rate', Number(e.target.value)); }} className={`w-full p-3 pr-8 border rounded-lg bg-gray-50 dark:bg-slate-700 focus:ring-2 focus:ring-primary focus:border-primary transition ${errors.rate ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}/>
                    </div>
                     {errors.rate && <p className="text-red-500 text-xs mt-1">{errors.rate}</p>}
                     <input aria-label={language === 'en' ? 'Annual Interest Rate slider' : 'వార్షిక వడ్డీ రేటు స్లైడర్'} type="range" min="3" max="12" step="0.1" value={rate} onChange={e => { setRate(Number(e.target.value)); handleValidation('rate', Number(e.target.value)); }} className="w-full mt-2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary"/>
                </div>
                <div>
                    <label htmlFor="years" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">{language === 'en' ? 'Tenure (Years)' : 'కాలపరిమితి (సంవత్సరాలు)'}</label>
                    <div className="relative">
                       <input id="years" type="number" value={years} onChange={e => { setYears(Number(e.target.value)); handleValidation('years', Number(e.target.value)); }} className={`w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700 focus:ring-2 focus:ring-primary focus:border-primary transition ${errors.years ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}/>
                    </div>
                    {errors.years && <p className="text-red-500 text-xs mt-1">{errors.years}</p>}
                    <input aria-label={language === 'en' ? 'Tenure slider' : 'కాలపరిమితి స్లైడర్'} type="range" min="1" max="10" value={years} onChange={e => { setYears(Number(e.target.value)); handleValidation('years', Number(e.target.value)); }} className="w-full mt-2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary"/>
                </div>
            </div>

            {/* Results and Chart Section */}
            <div className="lg:col-span-3 space-y-8">
                <div role="status" aria-live="polite" className="bg-light dark:bg-slate-800 p-6 rounded-lg space-y-6">
                    <div className="text-center">
                        <p className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Maturity Value' : 'మెచ్యూరిటీ విలువ'}</p>
                        <p className="text-4xl font-bold text-primary dark:text-blue-400">{formatCurrency(maturityValue)}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                            <p className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Invested Amount' : 'పెట్టుబడి మొత్తం'}</p>
                            <p className="text-2xl font-semibold text-gray-800 dark:text-gray-200">{formatCurrency(principal)}</p>
                        </div>
                        <div>
                            <p className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Total Interest' : 'మొత్తం వడ్డీ'}</p>
                            <p className="text-2xl font-semibold text-green-600 dark:text-green-500">{formatCurrency(totalInterest)}</p>
                        </div>
                    </div>
                </div>

                {totalInterest > 0 && (
                    <div className="bg-white dark:bg-dark p-4 sm:p-6 rounded-lg shadow-inner border border-gray-200 dark:border-gray-700">
                        <h3 className="text-xl font-bold text-primary dark:text-blue-300 mb-4 text-center">{language === 'en' ? 'Investment Breakdown' : 'పెట్టుబడి విచ్ఛిన్నం'}</h3>
                        <div className="h-64 mx-auto" style={{maxWidth: '400px'}} role="img" aria-label={language === 'en' ? 'Pie chart showing the breakdown of principal versus total interest earned.' : 'అసలు మరియు సంపాదించిన మొత్తం వడ్డీ యొక్క విచ్ఛిన్నం చూపే పై చార్ట్.'}>
                            <Pie data={pieChartData} options={chartOptions as any} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FDCalculator;