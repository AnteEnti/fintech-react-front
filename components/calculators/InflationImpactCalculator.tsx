import React, { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip as ChartTooltip, Legend } from 'chart.js';
import Tooltip from '../Tooltip';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, ChartTooltip, Legend);

interface CalculatorProps {
    initialState?: Record<string, any>;
    onStateChange: (state: Record<string, any>) => void;
}

const InflationImpactCalculator: React.FC<CalculatorProps> = ({ initialState, onStateChange }) => {
    const { language, theme } = useLanguage();
    const [presentValue, setPresentValue] = useState(initialState?.presentValue || 100000);
    const [inflationRate, setInflationRate] = useState(initialState?.inflationRate || 6);
    const [years, setYears] = useState(initialState?.years || 10);

    useEffect(() => {
        onStateChange({ presentValue, inflationRate, years });
    }, [presentValue, inflationRate, years, onStateChange]);
    
    const { futureValue, lossOfPower, chartData } = useMemo(() => {
        const rate = inflationRate / 100;
        const fv = presentValue / Math.pow(1 + rate, years);
        const loss = presentValue - fv;

        const labels = Array.from({ length: years + 1 }, (_, i) => `${language === 'en' ? 'Year' : 'సం'} ${i}`);
        const data = Array.from({ length: years + 1 }, (_, i) => presentValue / Math.pow(1 + rate, i));

        return {
            futureValue: fv,
            lossOfPower: loss,
            chartData: {
                labels,
                datasets: [
                    {
                        label: language === 'en' ? 'Purchasing Power' : 'కొనుగోలు శక్తి',
                        data: data,
                        borderColor: '#ef4444',
                        backgroundColor: 'rgba(239, 68, 68, 0.2)',
                        fill: true,
                        tension: 0.3,
                    }
                ]
            }
        };
    }, [presentValue, inflationRate, years, language]);
    
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: { ticks: { color: theme === 'dark' ? '#cbd5e1' : '#4b5563' } },
            y: { ticks: { color: theme === 'dark' ? '#cbd5e1' : '#4b5563' } }
        },
        plugins: {
            legend: { labels: { color: theme === 'dark' ? '#e2e8f0' : '#374151' } }
        }
    };
    
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0,
        }).format(value);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Input Section */}
            <div className="lg:col-span-2 space-y-6">
                <div>
                    <label htmlFor="presentValue" className="block text-sm font-medium mb-2">{language === 'en' ? 'Present Value of Money' : 'డబ్బు ప్రస్తుత విలువ'}</label>
                    <input id="presentValue" type="number" value={presentValue} onChange={e => setPresentValue(Number(e.target.value))} className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700"/>
                </div>
                 <div>
                    <label htmlFor="inflationRate" className="flex items-center text-sm font-medium mb-2">
                        {language === 'en' ? 'Annual Inflation Rate (%)' : 'వార్షిక ద్రవ్యోల్బణం రేటు (%)'}
                        <Tooltip text={language === 'en' ? 'The average rate at which prices increase and purchasing power decreases.' : 'ధరలు పెరిగి, కొనుగోలు శక్తి తగ్గే సగటు రేటు.'} />
                    </label>
                    <input id="inflationRate" type="number" value={inflationRate} onChange={e => setInflationRate(Number(e.target.value))} className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700"/>
                </div>
                 <div>
                    <label htmlFor="years" className="block text-sm font-medium mb-2">{language === 'en' ? 'Number of Years' : 'సంవత్సరాల సంఖ్య'}</label>
                    <input id="years" type="number" value={years} onChange={e => setYears(Number(e.target.value))} className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700"/>
                </div>
            </div>

            {/* Results Section */}
            <div className="lg:col-span-3 space-y-8">
                <div role="status" aria-live="polite" className="bg-light dark:bg-slate-800 p-6 rounded-lg text-center">
                    <p className="text-gray-600 dark:text-gray-400">{language === 'en' ? `Future Value (in ${years} years)` : `${years} సంవత్సరాలలో భవిష్యత్ విలువ`}</p>
                    <p className="text-4xl font-bold text-primary dark:text-blue-400 my-2">{formatCurrency(futureValue)}</p>
                    <p className="text-sm text-gray-500">
                        {language === 'en' 
                            ? `Today's ${formatCurrency(presentValue)} will have the purchasing power of ${formatCurrency(futureValue)}.` 
                            : `నేటి ${formatCurrency(presentValue)}కి ${formatCurrency(futureValue)} కొనుగోలు శక్తి ఉంటుంది.`}
                    </p>
                </div>

                <div className="bg-white dark:bg-dark p-4 sm:p-6 rounded-lg shadow-inner border border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-bold text-primary dark:text-blue-300 mb-4 text-center">{language === 'en' ? 'Loss of Purchasing Power Over Time' : 'కాలక్రమేణా కొనుగోలు శక్తి కోల్పోవడం'}</h3>
                    <div className="h-64 md:h-80" role="img">
                        <Line data={chartData} options={chartOptions} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InflationImpactCalculator;