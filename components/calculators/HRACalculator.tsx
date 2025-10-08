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
const HRACalculator: React.FC<CalculatorProps> = ({ initialState, onStateChange }) => {
    const { language, theme } = useLanguage();
    const [basicSalary, setBasicSalary] = useState(initialState?.basicSalary || 50000); // Monthly
    const [hraReceived, setHraReceived] = useState(initialState?.hraReceived || 25000); // Monthly
    const [rentPaid, setRentPaid] = useState(initialState?.rentPaid || 20000); // Monthly
    const [isMetro, setIsMetro] = useState(initialState?.isMetro !== undefined ? initialState?.isMetro : true);
    const [errors, setErrors] = useState({ basicSalary: '', hraReceived: '', rentPaid: '' });
    
    const validator = createValidator(language);
    const isMd = useBreakpoint('md');

    useEffect(() => {
        onStateChange({ basicSalary, hraReceived, rentPaid, isMetro });
    }, [basicSalary, hraReceived, rentPaid, isMetro, onStateChange]);
    
    const handleValidation = (field: string, value: number) => {
        const error = validator.isNonNegative(value);
        setErrors(prev => ({ ...prev, [field]: error || '' }));
    };

    const { exemptHRA, taxableHRA } = useMemo(() => {
        const annualBasic = basicSalary * 12;
        const annualHRA = hraReceived * 12;
        const annualRent = rentPaid * 12;

        const condition1 = annualHRA;
        const condition2 = isMetro ? annualBasic * 0.5 : annualBasic * 0.4;
        const condition3 = Math.max(0, annualRent - annualBasic * 0.1);

        const exemptedAmount = Math.min(condition1, condition2, condition3);
        const taxableAmount = Math.max(0, annualHRA - exemptedAmount);

        return {
            exemptHRA: exemptedAmount,
            taxableHRA: taxableAmount,
        };
    }, [basicSalary, hraReceived, rentPaid, isMetro]);
    
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
            language === 'en' ? 'Exempted HRA' : 'మినహాయింపు HRA',
            language === 'en' ? 'Taxable HRA' : 'పన్ను విధించదగిన HRA',
        ],
        datasets: [{
            data: [exemptHRA, taxableHRA],
            backgroundColor: ['#22c55e', '#ef4444'],
            hoverBackgroundColor: ['#16a34a', '#dc2626'],
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
                    <label htmlFor="basicSalary" className="flex items-center text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                       {language === 'en' ? 'Basic Salary (Monthly)' : 'ప్రాథమిక జీతం (నెలవారీ)'}
                       <Tooltip text={language === 'en' ? 'Your basic salary, excluding any allowances.' : 'ఏవైనా భత్యాలు మినహాయించి మీ ప్రాథమిక జీతం.'} />
                    </label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 dark:text-gray-400">₹</span>
                        <input id="basicSalary" type="number" value={basicSalary} onChange={e => { setBasicSalary(Number(e.target.value)); handleValidation('basicSalary', Number(e.target.value)); }} className={`w-full p-3 pl-8 border rounded-lg bg-gray-50 dark:bg-slate-700 focus:ring-2 focus:ring-primary focus:border-primary transition ${errors.basicSalary ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}/>
                    </div>
                     {errors.basicSalary && <p className="text-red-500 text-xs mt-1">{errors.basicSalary}</p>}
                </div>
                <div>
                    <label htmlFor="hraReceived" className="flex items-center text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                       {language === 'en' ? 'HRA Received (Monthly)' : 'అందుకున్న HRA (నెలవారీ)'}
                       <Tooltip text={language === 'en' ? 'The House Rent Allowance component of your salary.' : 'మీ జీతంలో ఇంటి అద్దె భత్యం భాగం.'} />
                    </label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 dark:text-gray-400">₹</span>
                        <input id="hraReceived" type="number" value={hraReceived} onChange={e => { setHraReceived(Number(e.target.value)); handleValidation('hraReceived', Number(e.target.value)); }} className={`w-full p-3 pl-8 border rounded-lg bg-gray-50 dark:bg-slate-700 focus:ring-2 focus:ring-primary focus:border-primary transition ${errors.hraReceived ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}/>
                    </div>
                    {errors.hraReceived && <p className="text-red-500 text-xs mt-1">{errors.hraReceived}</p>}
                </div>
                <div>
                    <label htmlFor="rentPaid" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">{language === 'en' ? 'Rent Paid (Monthly)' : 'చెల్లించిన అద్దె (నెలవారీ)'}</label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 dark:text-gray-400">₹</span>
                        <input id="rentPaid" type="number" value={rentPaid} onChange={e => { setRentPaid(Number(e.target.value)); handleValidation('rentPaid', Number(e.target.value)); }} className={`w-full p-3 pl-8 border rounded-lg bg-gray-50 dark:bg-slate-700 focus:ring-2 focus:ring-primary focus:border-primary transition ${errors.rentPaid ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}/>
                    </div>
                     {errors.rentPaid && <p className="text-red-500 text-xs mt-1">{errors.rentPaid}</p>}
                </div>
                <div className="flex flex-col justify-center pt-2">
                    <div className="flex items-center">
                        <input type="checkbox" id="metro" checked={isMetro} onChange={e => setIsMetro(e.target.checked)} className="h-5 w-5 rounded text-primary focus:ring-primary"/>
                        <label htmlFor="metro" className="ml-2 font-medium text-gray-700 dark:text-gray-300">{language === 'en' ? 'Live in a Metro City?' : 'మెట్రో నగరంలో నివసిస్తున్నారా?'}</label>
                         <Tooltip text={language === 'en' ? 'Metro cities include Mumbai, Delhi, Kolkata, and Chennai.' : 'మెట్రో నగరాలలో ముంబై, ఢిల్లీ, కోల్‌కతా మరియు చెన్నై ఉన్నాయి.'} />
                    </div>
                    <div className={`transition-opacity duration-300 ease-in-out ${isMetro ? 'opacity-100' : 'opacity-0'}`}>
                        <p className="text-xs text-gray-500 mt-1 pl-7">
                          {language === 'en' ? '50% of basic salary will be used for calculation.' : '50% ప్రాథమిక జీతం లెక్కింపు కోసం ఉపయోగించబడుతుంది.'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Results and Chart Section */}
            <div className="lg:col-span-3 space-y-8">
                <div role="status" aria-live="polite">
                    <div className="bg-light dark:bg-slate-800 p-6 rounded-lg text-center">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Exempted HRA (Yearly)' : 'మినహాయింపు HRA (వార్షిక)'}</p>
                                <p className="text-3xl font-bold text-green-600 dark:text-green-500">{formatCurrency(exemptHRA)}</p>
                            </div>
                            <div>
                                <p className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Taxable HRA (Yearly)' : 'పన్ను విధించదగిన HRA (వార్షిక)'}</p>
                                <p className="text-3xl font-bold text-red-600 dark:text-red-500">{formatCurrency(taxableHRA)}</p>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-4">{language === 'en' ? 'HRA exemption is the minimum of: Actual HRA, Rent paid - 10% of basic, and 40%/50% of basic salary.' : 'HRA మినహాయింపు వీటిలో కనిష్టం: అసలు HRA, చెల్లించిన అద్దె - 10% బేసిక్, మరియు 40%/50% బేసిక్ జీతం.'}</p>
                    </div>
                </div>

                {(exemptHRA > 0 || taxableHRA > 0) && (
                    <div className="bg-white dark:bg-dark p-4 sm:p-6 rounded-lg shadow-inner border border-gray-200 dark:border-gray-700">
                        <h3 className="text-xl font-bold text-primary dark:text-blue-300 mb-4 text-center">{language === 'en' ? 'HRA Breakdown' : 'HRA విచ్ఛిన్నం'}</h3>
                        <div className="h-64 mx-auto" style={{maxWidth: '400px'}} role="img" aria-label={language === 'en' ? 'Pie chart showing the breakdown of exempted versus taxable HRA.' : 'మినహాయింపు మరియు పన్ను విధించదగిన HRA యొక్క విచ్ఛిన్నం చూపే పై చార్ట్.'}>
                            <Pie data={pieChartData} options={chartOptions as any} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HRACalculator;