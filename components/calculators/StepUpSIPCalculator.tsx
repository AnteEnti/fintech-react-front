import React, { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip as ChartTooltip, Legend } from 'chart.js';
import Tooltip from '../Tooltip';
import { createValidator } from '../../utils/validation';
import useBreakpoint from '../../hooks/useBreakpoint';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, ChartTooltip, Legend);

interface CalculatorProps {
    initialState?: Record<string, any>;
    onStateChange: (state: Record<string, any>) => void;
}

// FIX: Replaced destructuring with default empty object for `initialState` with optional chaining to prevent TypeScript errors when properties are accessed.
const StepUpSIPCalculator: React.FC<CalculatorProps> = ({ initialState, onStateChange }) => {
    const { language, theme } = useLanguage();
    const [monthlyInvestment, setMonthlyInvestment] = useState(initialState?.monthlyInvestment || 10000);
    const [stepUpPercentage, setStepUpPercentage] = useState(initialState?.stepUpPercentage || 10);
    const [expectedReturn, setExpectedReturn] = useState(initialState?.expectedReturn || 12);
    const [timePeriod, setTimePeriod] = useState(initialState?.timePeriod || 10);
    const [errors, setErrors] = useState({ monthlyInvestment: '', stepUpPercentage: '', expectedReturn: '', timePeriod: '' });
    
    const validator = createValidator(language);
    const isMd = useBreakpoint('md');

    useEffect(() => {
        onStateChange({ monthlyInvestment, stepUpPercentage, expectedReturn, timePeriod });
    }, [monthlyInvestment, stepUpPercentage, expectedReturn, timePeriod, onStateChange]);

    const handleValidation = (field: string, value: number) => {
        let error = validator.isPositive(value);
        if (!error && (field === 'expectedReturn' || field === 'stepUpPercentage')) {
            error = validator.isInRange(value, 1, 30);
        }
        setErrors(prev => ({ ...prev, [field]: error || '' }));
    }

    const calculationResults = useMemo(() => {
        let totalInvested = 0;
        let totalValue = 0;
        const monthlyRate = expectedReturn / 100 / 12;

        const labels = [];
        const investedData = [];
        const valueData = [];

        for (let year = 1; year <= timePeriod; year++) {
            const annualInvestmentIncrease = Math.pow(1 + stepUpPercentage / 100, year - 1);
            const currentMonthlySip = monthlyInvestment * annualInvestmentIncrease;

            for (let month = 1; month <= 12; month++) {
                totalValue = totalValue * (1 + monthlyRate) + currentMonthlySip;
                totalInvested += currentMonthlySip;
            }
            
            labels.push(`${language === 'en' ? 'Year' : 'సం' } ${year}`);
            investedData.push(totalInvested);
            valueData.push(totalValue);
        }

        const finalReturns = totalValue - totalInvested;

        return {
            totalInvested,
            estimatedReturns: finalReturns,
            totalValue,
            chartData: {
                labels,
                datasets: [
                    {
                        label: language === 'en' ? 'Total Value' : 'మొత్తం విలువ',
                        data: valueData,
                        borderColor: '#1e40af',
                        backgroundColor: 'rgba(30, 64, 175, 0.2)',
                        fill: true,
                        tension: 0.3,
                    },
                    {
                        label: language === 'en' ? 'Invested Amount' : 'పెట్టుబడి మొత్తం',
                        data: investedData,
                        borderColor: '#9ca3af',
                        backgroundColor: 'rgba(156, 163, 175, 0.2)',
                        fill: false,
                        tension: 0.3,
                    }
                ]
            }
        };
    }, [monthlyInvestment, stepUpPercentage, expectedReturn, timePeriod, language]);
    
    // FIX: Cast legend position to a specific string literal type to resolve TypeScript error.
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                ticks: { color: theme === 'dark' ? '#cbd5e1' : '#4b5563' },
                grid: { color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }
            },
            y: {
                ticks: { color: theme === 'dark' ? '#cbd5e1' : '#4b5563' },
                grid: { color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }
            }
        },
        plugins: {
            legend: {
                position: (isMd ? 'right' : 'top') as ('top' | 'right'),
                labels: { color: theme === 'dark' ? '#e2e8f0' : '#374151' }
            }
        }
    };

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
                    <label htmlFor="monthlyInvestment" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">{language === 'en' ? 'Initial Monthly Investment' : 'ప్రారంభ నెలవారీ పెట్టుబడి'}</label>
                    <div className="relative">
                       <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 dark:text-gray-400">₹</span>
                       <input id="monthlyInvestment" type="number" value={monthlyInvestment} onChange={e => { setMonthlyInvestment(Number(e.target.value)); handleValidation('monthlyInvestment', Number(e.target.value)) }} className={`w-full p-3 pl-8 border rounded-lg bg-gray-50 dark:bg-slate-700 focus:ring-2 focus:ring-primary focus:border-primary transition ${errors.monthlyInvestment ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}/>
                    </div>
                </div>
                 <div>
                    <label htmlFor="stepUpPercentage" className="flex items-center text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        {language === 'en' ? 'Annual Step-up (%)' : 'వార్షిక స్టెప్-అప్ (%)'}
                        <Tooltip text={language === 'en' ? 'The percentage by which you increase your monthly SIP amount each year.' : 'ప్రతి సంవత్సరం మీరు మీ నెలవారీ SIP మొత్తాన్ని పెంచే శాతం.'} />
                    </label>
                    <div className="relative">
                        <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 dark:text-gray-400">%</span>
                        <input id="stepUpPercentage" type="number" value={stepUpPercentage} onChange={e => { setStepUpPercentage(Number(e.target.value)); handleValidation('stepUpPercentage', Number(e.target.value)) }} className={`w-full p-3 pr-8 border rounded-lg bg-gray-50 dark:bg-slate-700 focus:ring-2 focus:ring-primary focus:border-primary transition ${errors.stepUpPercentage ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}/>
                    </div>
                </div>
                <div>
                    <label htmlFor="expectedReturn" className="flex items-center text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        {language === 'en' ? 'Expected Return Rate (p.a.)' : 'అంచనా రాబడి రేటు (సం.)'}
                    </label>
                    <div className="relative">
                        <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 dark:text-gray-400">%</span>
                        <input id="expectedReturn" type="number" value={expectedReturn} onChange={e => { setExpectedReturn(Number(e.target.value)); handleValidation('expectedReturn', Number(e.target.value)) }} className={`w-full p-3 pr-8 border rounded-lg bg-gray-50 dark:bg-slate-700 focus:ring-2 focus:ring-primary focus:border-primary transition ${errors.expectedReturn ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}/>
                    </div>
                </div>
                <div>
                    <label htmlFor="timePeriod" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">{language === 'en' ? 'Time Period (Years)' : 'కాలపరిమితి (సంవత్సరాలు)'}</label>
                    <input id="timePeriod" type="number" value={timePeriod} onChange={e => { setTimePeriod(Number(e.target.value)); handleValidation('timePeriod', Number(e.target.value)) }} className={`w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700 focus:ring-2 focus:ring-primary focus:border-primary transition ${errors.timePeriod ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}/>
                </div>
            </div>

            {/* Results and Chart Section */}
            <div className="lg:col-span-3 space-y-8">
                 <div role="status" aria-live="polite" className="bg-light dark:bg-slate-800 p-6 rounded-lg space-y-6">
                    <div className="text-center">
                        <p className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Total Value' : 'మొత్తం విలువ'}</p>
                        <p className="text-4xl font-bold text-primary dark:text-blue-400">{formatCurrency(calculationResults.totalValue)}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                            <p className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Invested Amount' : 'పెట్టుబడి మొత్తం'}</p>
                            <p className="text-2xl font-semibold text-gray-800 dark:text-gray-200">{formatCurrency(calculationResults.totalInvested)}</p>
                        </div>
                        <div>
                            <p className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Est. Returns' : 'అంచనా రాబడి'}</p>
                            <p className="text-2xl font-semibold text-green-600 dark:text-green-500">{formatCurrency(calculationResults.estimatedReturns)}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-dark p-4 sm:p-6 rounded-lg shadow-inner border border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-bold text-primary dark:text-blue-300 mb-4 text-center">{language === 'en' ? 'Investment Growth Over Time' : 'కాలక్రమేణా పెట్టుబడి వృద్ధి'}</h3>
                    <div className="h-64 md:h-80" role="img" aria-label={language === 'en' ? 'Line chart showing investment growth over the selected time period.' : 'ఎంచుకున్న కాల వ్యవధిలో పెట్టుబడి వృద్ధిని చూపే లైన్ చార్ట్.'}>
                        <Line data={calculationResults.chartData} options={chartOptions} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StepUpSIPCalculator;