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
const IncomeTaxCalculator: React.FC<CalculatorProps> = ({ initialState, onStateChange }) => {
    const { language, theme } = useLanguage();
    const [annualIncome, setAnnualIncome] = useState(initialState?.annualIncome || 1000000);
    const [isSalaried, setIsSalaried] = useState(initialState?.isSalaried !== undefined ? initialState?.isSalaried : true);
    const [error, setError] = useState('');
    
    const validator = createValidator(language);
    const isMd = useBreakpoint('md');

    useEffect(() => {
        onStateChange({ annualIncome, isSalaried });
    }, [annualIncome, isSalaried, onStateChange]);

    const handleValidation = (value: number) => {
        setError(validator.isNonNegative(value) || '');
    };

    const taxPayable = useMemo(() => {
        // Using New Tax Regime (Default) AY 2024-25
        const standardDeduction = isSalaried ? 50000 : 0;
        let taxableIncome = annualIncome - standardDeduction;

        if (taxableIncome <= 700000) {
            // Rebate under 87A makes tax zero
            return 0;
        }

        let tax = 0;
        // Slab 1: 0 - 3L -> 0 tax
        if (taxableIncome > 300000) {
            // Slab 2: 3L - 6L -> 5%
            tax += Math.min(300000, taxableIncome - 300000) * 0.05;
        }
        if (taxableIncome > 600000) {
            // Slab 3: 6L - 9L -> 10%
            tax += Math.min(300000, taxableIncome - 600000) * 0.10;
        }
        if (taxableIncome > 900000) {
            // Slab 4: 9L - 12L -> 15%
            tax += Math.min(300000, taxableIncome - 900000) * 0.15;
        }
        if (taxableIncome > 1200000) {
            // Slab 5: 12L - 15L -> 20%
            tax += Math.min(300000, taxableIncome - 1200000) * 0.20;
        }
        if (taxableIncome > 1500000) {
            // Slab 6: > 15L -> 30%
            tax += (taxableIncome - 1500000) * 0.30;
        }
        
        // Health and Education Cess @ 4%
        const cess = tax * 0.04;
        return tax + cess;
    }, [annualIncome, isSalaried]);

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
            language === 'en' ? 'Net Income (Post-Tax)' : 'నికర ఆదాయం (పన్ను తర్వాత)',
            language === 'en' ? 'Total Tax Payable' : 'చెల్లించవలసిన మొత్తం పన్ను',
        ],
        datasets: [{
            data: [annualIncome - taxPayable, taxPayable],
            backgroundColor: ['#22c55e', '#ef4444'],
            hoverBackgroundColor: ['#16a34a', '#dc2626'],
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
                position: (isMd ? 'right' : 'top') as ('top' | 'right'),
                labels: { color: theme === 'dark' ? '#e2e8f0' : '#374151' }
            }
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Input Section */}
            <div className="lg:col-span-2 space-y-6">
                <div>
                    <label htmlFor="annualIncome" className="flex items-center text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        {language === 'en' ? 'Your Annual Income' : 'మీ వార్షిక ఆదాయం'}
                        <Tooltip text={language === 'en' ? 'Enter your gross annual income before any deductions.' : 'ఎటువంటి తగ్గింపులకు ముందు మీ స్థూల వార్షిక ఆదాయాన్ని నమోదు చేయండి.'} />
                    </label>
                     <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 dark:text-gray-400">₹</span>
                        <input id="annualIncome" type="number" value={annualIncome} onChange={e => { setAnnualIncome(Number(e.target.value)); handleValidation(Number(e.target.value)) }} className={`w-full p-3 pl-8 border rounded-lg bg-gray-50 dark:bg-slate-700 focus:ring-2 focus:ring-primary focus:border-primary transition ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}/>
                    </div>
                    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                    <input aria-label={language === 'en' ? 'Annual Income slider' : 'వార్షిక ఆదాయం స్లైడర్'} type="range" min="250000" max="5000000" step="10000" value={annualIncome} onChange={e => { setAnnualIncome(Number(e.target.value)); handleValidation(Number(e.target.value)) }} className="w-full mt-2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary"/>
                </div>
                <div className="flex flex-col">
                    <div className="flex items-center">
                        <input type="checkbox" id="salaried" checked={isSalaried} onChange={e => setIsSalaried(e.target.checked)} className="h-5 w-5 rounded text-primary focus:ring-primary"/>
                        <label htmlFor="salaried" className="ml-2 font-medium text-gray-700 dark:text-gray-300">{language === 'en' ? 'I am a salaried employee' : 'నేను జీతభత్యాల ఉద్యోగిని'}</label>
                         <Tooltip text={language === 'en' ? 'Salaried individuals are eligible for a standard deduction of ₹50,000 under the new tax regime.' : 'జీతం తీసుకునే వ్యక్తులు కొత్త పన్ను విధానం కింద ₹50,000 స్టాండర్డ్ డిడక్షన్‌కు అర్హులు.'} />
                    </div>
                </div>

                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isSalaried ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="p-3 bg-blue-50 dark:bg-slate-700 rounded-lg border border-blue-200 dark:border-blue-600">
                        <p className="text-sm text-blue-800 dark:text-blue-300">
                            {language === 'en' ? `A standard deduction of ${formatCurrency(50000)} has been applied.` : `${formatCurrency(50000)} ప్రామాణిక తగ్గింపు వర్తింపజేయబడింది.`}
                        </p>
                    </div>
                </div>
            </div>

            {/* Results and Chart Section */}
            <div className="lg:col-span-3 space-y-8">
                <div role="status" aria-live="polite" className="bg-light dark:bg-slate-800 p-6 rounded-lg text-center">
                    <p className="flex items-center justify-center text-gray-600 dark:text-gray-400">
                        {language === 'en' ? 'Total Tax Payable (New Regime)' : 'చెల్లించవలసిన మొత్తం పన్ను (కొత్త విధానం)'}
                        <Tooltip text={language === 'en' ? 'Calculation is as per the default New Tax Regime for AY 2024-25.' : 'గణన AY 2024-25 కోసం డిఫాల్ట్ కొత్త పన్ను విధానం ప్రకారం ఉంటుంది.'} />
                    </p>
                    <p className="text-4xl font-bold text-primary dark:text-blue-400">{formatCurrency(taxPayable)}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">{language === 'en' ? 'Includes 4% Health & Education Cess. Rebate u/s 87A applied.' : '4% ఆరోగ్య & విద్యా సెస్సుతో సహా. 87A కింద రిబేట్ వర్తిస్తుంది.'}</p>
                </div>
            
                {taxPayable > 0 && (
                     <div className="bg-white dark:bg-dark p-4 sm:p-6 rounded-lg shadow-inner border border-gray-200 dark:border-gray-700">
                        <h3 className="text-xl font-bold text-primary dark:text-blue-300 mb-4 text-center">{language === 'en' ? 'Income Breakdown' : 'ఆదాయ విచ్ఛిన్నం'}</h3>
                        <div className="h-64 mx-auto" style={{maxWidth: '400px'}} role="img" aria-label={language === 'en' ? 'Pie chart showing the breakdown of post-tax income versus total tax payable.' : 'పన్ను తర్వాత ఆదాయం మరియు చెల్లించవలసిన మొత్తం పన్ను యొక్క విచ్ఛిన్నం చూపే పై చార్ట్.'}>
                            <Pie data={pieChartData} options={chartOptions} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default IncomeTaxCalculator;