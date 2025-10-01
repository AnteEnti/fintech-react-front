import React, { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip as ChartTooltip, Legend } from 'chart.js';
import Tooltip from '../Tooltip';
import { createValidator } from '../../utils/validation';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, ChartTooltip, Legend);

interface CalculatorProps {
    initialState?: Record<string, any>;
    onStateChange: (state: Record<string, any>) => void;
}

// FIX: Replaced destructuring with default empty object for `initialState` with optional chaining to prevent TypeScript errors when properties are accessed.
const SIPCalculator: React.FC<CalculatorProps> = ({ initialState, onStateChange }) => {
    const { language, theme } = useLanguage();
    const [monthlyInvestment, setMonthlyInvestment] = useState(initialState?.monthlyInvestment || 10000);
    const [expectedReturn, setExpectedReturn] = useState(initialState?.expectedReturn || 12);
    const [timePeriod, setTimePeriod] = useState(initialState?.timePeriod || 10);
    const [errors, setErrors] = useState({ monthlyInvestment: '', expectedReturn: '', timePeriod: '' });
    
    const validator = createValidator(language);

    useEffect(() => {
        onStateChange({ monthlyInvestment, expectedReturn, timePeriod });
    }, [monthlyInvestment, expectedReturn, timePeriod, onStateChange]);

    const handleValidation = (field: string, value: number) => {
        let error = null;
        switch(field) {
            case 'monthlyInvestment':
                error = validator.isInRange(value, 500, 100000) || validator.isPositive(value);
                break;
            case 'expectedReturn':
                error = validator.isInRange(value, 1, 30) || validator.isPositive(value);
                break;
            case 'timePeriod':
                error = validator.isInRange(value, 1, 40) || validator.isPositive(value);
                break;
        }
        setErrors(prev => ({ ...prev, [field]: error || '' }));
    }

    const calculationResults = useMemo(() => {
        const i = expectedReturn / 100 / 12;
        const M = monthlyInvestment;
        
        const labels = [];
        const investedData = [];
        const valueData = [];

        for(let year = 1; year <= timePeriod; year++) {
            const n = year * 12;
            const futureValue = M * (((Math.pow(1 + i, n) - 1) / i) * (1 + i));
            const investedAmount = M * n;
            labels.push(`${language === 'en' ? 'Year' : 'సం' } ${year}`);
            investedData.push(investedAmount);
            valueData.push(futureValue);
        }

        const finalInvestedAmount = M * (timePeriod * 12);
        const finalFutureValue = valueData[valueData.length - 1] || 0;
        const finalReturns = finalFutureValue - finalInvestedAmount;

        return {
            totalInvested: finalInvestedAmount,
            estimatedReturns: finalReturns,
            totalValue: finalFutureValue,
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
    }, [monthlyInvestment, expectedReturn, timePeriod, language]);
    
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
                       <input id="monthlyInvestment" type="number" value={monthlyInvestment} onChange={e => { setMonthlyInvestment(Number(e.target.value)); handleValidation('monthlyInvestment', Number(e.target.value)) }} className={`w-full p-3 pl-8 border rounded-lg bg-gray-50 dark:bg-slate-700 focus:ring-2 focus:ring-primary focus:border-primary transition ${errors.monthlyInvestment ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}/>
                    </div>
                    {errors.monthlyInvestment && <p className="text-red-500 text-xs mt-1">{errors.monthlyInvestment}</p>}
                    <input aria-label={language === 'en' ? 'Monthly Investment slider' : 'నెలవారీ పెట్టుబడి స్లైడర్'} type="range" min="500" max="100000" step="500" value={monthlyInvestment} onChange={e => { setMonthlyInvestment(Number(e.target.value)); handleValidation('monthlyInvestment', Number(e.target.value)) }} className="w-full mt-2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary"/>
                </div>
                <div>
                    <label htmlFor="expectedReturn" className="flex items-center text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        {language === 'en' ? 'Expected Return Rate (p.a.)' : 'అంచనా రాబడి రేటు (సం.)'}
                        <Tooltip text={language === 'en' ? 'The annual rate of return you expect from your investment. For equity mutual funds, a long-term average is often estimated between 10-14%.' : 'మీ పెట్టుబడి నుండి మీరు ఆశించే వార్షిక రాబడి రేటు. ఈక్విటీ మ్యూచువల్ ఫండ్ల కోసం, దీర్ఘకాలిక సగటు తరచుగా 10-14% మధ్య అంచనా వేయబడుతుంది.'} />
                    </label>
                    <div className="relative">
                        <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 dark:text-gray-400">%</span>
                        <input id="expectedReturn" type="number" value={expectedReturn} onChange={e => { setExpectedReturn(Number(e.target.value)); handleValidation('expectedReturn', Number(e.target.value)) }} className={`w-full p-3 pr-8 border rounded-lg bg-gray-50 dark:bg-slate-700 focus:ring-2 focus:ring-primary focus:border-primary transition ${errors.expectedReturn ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}/>
                    </div>
                    {errors.expectedReturn && <p className="text-red-500 text-xs mt-1">{errors.expectedReturn}</p>}
                    <input aria-label={language === 'en' ? 'Expected Return Rate slider' : 'అంచనా రాబడి రేటు స్లైడర్'} type="range" min="1" max="30" step="0.5" value={expectedReturn} onChange={e => { setExpectedReturn(Number(e.target.value)); handleValidation('expectedReturn', Number(e.target.value)) }} className="w-full mt-2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary"/>
                </div>
                <div>
                    <label htmlFor="timePeriod" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">{language === 'en' ? 'Time Period (Years)' : 'కాలపరిమితి (సంవత్సరాలు)'}</label>
                    <div className="relative">
                        <input id="timePeriod" type="number" value={timePeriod} onChange={e => { setTimePeriod(Number(e.target.value)); handleValidation('timePeriod', Number(e.target.value)) }} className={`w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700 focus:ring-2 focus:ring-primary focus:border-primary transition ${errors.timePeriod ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}/>
                    </div>
                    {errors.timePeriod && <p className="text-red-500 text-xs mt-1">{errors.timePeriod}</p>}
                    <input aria-label={language === 'en' ? 'Time Period slider' : 'కాలపరిమితి స్లైడర్'} type="range" min="1" max="40" value={timePeriod} onChange={e => { setTimePeriod(Number(e.target.value)); handleValidation('timePeriod', Number(e.target.value)) }} className="w-full mt-2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary"/>
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

export default SIPCalculator;