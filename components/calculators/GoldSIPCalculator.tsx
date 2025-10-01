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
const GoldSIPCalculator: React.FC<CalculatorProps> = ({ initialState, onStateChange }) => {
    const { language, theme } = useLanguage();
    const [monthlyInvestment, setMonthlyInvestment] = useState(initialState?.monthlyInvestment || 5000);
    const [expectedGrowth, setExpectedGrowth] = useState(initialState?.expectedGrowth || 8);
    const [timePeriod, setTimePeriod] = useState(initialState?.timePeriod || 10);
    const [errors, setErrors] = useState({ monthlyInvestment: '', expectedGrowth: '', timePeriod: '' });
    
    const validator = createValidator(language);
    const isMd = useBreakpoint('md');

    useEffect(() => {
        onStateChange({ monthlyInvestment, expectedGrowth, timePeriod });
    }, [monthlyInvestment, expectedGrowth, timePeriod, onStateChange]);

    const handleValidation = (field: string, value: number) => {
        let error = validator.isPositive(value);
        if (!error && field === 'expectedGrowth') {
            error = validator.isInRange(value, 1, 25);
        }
        setErrors(prev => ({ ...prev, [field]: error || '' }));
    }

    const calculationResults = useMemo(() => {
        const i = expectedGrowth / 100 / 12;
        const M = monthlyInvestment;
        const n = timePeriod * 12;

        const futureValue = M * (((Math.pow(1 + i, n) - 1) / i) * (1 + i));
        const investedAmount = M * n;
        const returns = futureValue - investedAmount;

        const labels = [];
        const valueData = [];
        for (let year = 1; year <= timePeriod; year++) {
            const currentN = year * 12;
            const fvYear = M * (((Math.pow(1 + i, currentN) - 1) / i) * (1 + i));
            labels.push(`${language === 'en' ? 'Year' : 'సం' } ${year}`);
            valueData.push(fvYear);
        }

        return {
            totalInvested: investedAmount,
            estimatedReturns: returns,
            totalValue: futureValue,
            chartData: {
                labels,
                datasets: [
                    {
                        label: language === 'en' ? 'Total Gold Value' : 'మొత్తం బంగారం విలువ',
                        data: valueData,
                        borderColor: '#facc15',
                        backgroundColor: 'rgba(250, 204, 21, 0.2)',
                        fill: true,
                        tension: 0.3,
                    }
                ]
            }
        };
    }, [monthlyInvestment, expectedGrowth, timePeriod, language]);
    
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
                    <label htmlFor="monthlyInvestment" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">{language === 'en' ? 'Monthly Investment' : 'నెలవారీ పెట్టుబడి'}</label>
                    <div className="relative">
                       <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 dark:text-gray-400">₹</span>
                       <input id="monthlyInvestment" type="number" value={monthlyInvestment} onChange={e => { setMonthlyInvestment(Number(e.target.value)); handleValidation('monthlyInvestment', Number(e.target.value)) }} className={`w-full p-3 pl-8 border rounded-lg bg-gray-50 dark:bg-slate-700 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition ${errors.monthlyInvestment ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}/>
                    </div>
                </div>
                <div>
                    <label htmlFor="expectedGrowth" className="flex items-center text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        {language === 'en' ? 'Expected Annual Growth (%)' : 'అంచనా వార్షిక వృద్ధి (%)'}
                        <Tooltip text={language === 'en' ? 'The historical long-term average return on gold has been around 8-10% per year in INR.' : 'INRలో బంగారంపై చారిత్రక దీర్ఘకాలిక సగటు రాబడి సంవత్సరానికి సుమారు 8-10%గా ఉంది.'} />
                    </label>
                    <div className="relative">
                        <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 dark:text-gray-400">%</span>
                        <input id="expectedGrowth" type="number" value={expectedGrowth} onChange={e => { setExpectedGrowth(Number(e.target.value)); handleValidation('expectedGrowth', Number(e.target.value)) }} className={`w-full p-3 pr-8 border rounded-lg bg-gray-50 dark:bg-slate-700 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition ${errors.expectedGrowth ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}/>
                    </div>
                </div>
                <div>
                    <label htmlFor="timePeriod" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">{language === 'en' ? 'Time Period (Years)' : 'కాలపరిమితి (సంవత్సరాలు)'}</label>
                    <input id="timePeriod" type="number" value={timePeriod} onChange={e => { setTimePeriod(Number(e.target.value)); handleValidation('timePeriod', Number(e.target.value)) }} className={`w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition ${errors.timePeriod ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}/>
                </div>
            </div>

            {/* Results and Chart Section */}
            <div className="lg:col-span-3 space-y-8">
                 <div role="status" aria-live="polite" className="bg-amber-50 dark:bg-slate-800 p-6 rounded-lg space-y-6">
                    <div className="text-center">
                        <p className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Total Gold Value' : 'మొత్తం బంగారం విలువ'}</p>
                        <p className="text-4xl font-bold text-amber-600 dark:text-amber-400">{formatCurrency(calculationResults.totalValue)}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                            <p className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Total Investment' : 'మొత్తం పెట్టుబడి'}</p>
                            <p className="text-2xl font-semibold text-gray-800 dark:text-gray-200">{formatCurrency(calculationResults.totalInvested)}</p>
                        </div>
                        <div>
                            <p className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Est. Returns' : 'అంచనా రాబడి'}</p>
                            <p className="text-2xl font-semibold text-green-600 dark:text-green-500">{formatCurrency(calculationResults.estimatedReturns)}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-dark p-4 sm:p-6 rounded-lg shadow-inner border border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-bold text-amber-600 dark:text-amber-400 mb-4 text-center">{language === 'en' ? 'Gold Value Growth' : 'బంగారం విలువ వృద్ధి'}</h3>
                    <div className="h-64 md:h-80" role="img" aria-label={language === 'en' ? 'Line chart showing gold investment growth over the selected time period.' : 'ఎంచుకున్న కాల వ్యవధిలో బంగారం పెట్టుబడి వృద్ధిని చూపే లైన్ చార్ట్.'}>
                        <Line data={calculationResults.chartData} options={chartOptions} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GoldSIPCalculator;