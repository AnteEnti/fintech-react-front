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

const ChildEducationCostCalculator: React.FC<CalculatorProps> = ({ initialState, onStateChange }) => {
    const { language, theme } = useLanguage();
    const [currentCost, setCurrentCost] = useState(initialState?.currentCost || 1500000);
    const [yearsToGoal, setYearsToGoal] = useState(initialState?.yearsToGoal || 15);
    const [inflation, setInflation] = useState(initialState?.inflation || 8);
    const [expectedReturn, setExpectedReturn] = useState(initialState?.expectedReturn || 12);

    useEffect(() => {
        onStateChange({ currentCost, yearsToGoal, inflation, expectedReturn });
    }, [currentCost, yearsToGoal, inflation, expectedReturn, onStateChange]);

    const { targetCorpus, requiredSip, chartData } = useMemo(() => {
        const futureCost = currentCost * Math.pow(1 + inflation / 100, yearsToGoal);
        
        const i = expectedReturn / 100 / 12;
        const n = yearsToGoal * 12;
        
        let sip = 0;
        if (i > 0 && n > 0) {
            sip = (futureCost * i) / (Math.pow(1 + i, n) - 1);
        }

        const labels = Array.from({ length: yearsToGoal + 1 }, (_, year) => `${language === 'en' ? 'Year' : 'సం'} ${year}`);
        const corpusData = Array.from({ length: yearsToGoal + 1 }, (_, year) => {
            const months = year * 12;
            return sip * (((Math.pow(1 + i, months) - 1) / i) * (1 + i));
        });

        const chart = {
            labels,
            datasets: [
                {
                    label: language === 'en' ? 'Your Investment Growth' : 'మీ పెట్టుబడి వృద్ధి',
                    data: corpusData,
                    borderColor: '#1e40af',
                    backgroundColor: 'rgba(30, 64, 175, 0.2)',
                    fill: true,
                    tension: 0.3,
                },
            ]
        };
        
        return {
            targetCorpus: futureCost,
            requiredSip: sip,
            chartData: chart
        };
    }, [currentCost, yearsToGoal, inflation, expectedReturn, language]);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
    };

    const chartOptions = {
        responsive: true, maintainAspectRatio: false,
        scales: {
            x: { ticks: { color: theme === 'dark' ? '#cbd5e1' : '#4b5563' } },
            y: { ticks: { color: theme === 'dark' ? '#cbd5e1' : '#4b5563' } }
        },
        plugins: { legend: { labels: { color: theme === 'dark' ? '#e2e8f0' : '#374151' } } }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            <div className="lg:col-span-2 space-y-6">
                <div>
                    <label className="block text-sm font-medium mb-2">{language === 'en' ? 'Current Cost of Education' : 'ప్రస్తుత విద్యా ఖర్చు'}</label>
                    <input type="number" value={currentCost} onChange={e => setCurrentCost(Number(e.target.value))} className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700"/>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">{language === 'en' ? 'Years Until Goal' : 'లక్ష్యానికి సంవత్సరాలు'}</label>
                    <input type="number" value={yearsToGoal} onChange={e => setYearsToGoal(Number(e.target.value))} className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700"/>
                </div>
                <div>
                    <label className="flex items-center text-sm font-medium mb-2">
                        {language === 'en' ? 'Education Inflation (%)' : 'విద్యా ద్రవ్యోల్బణం (%)'}
                        <Tooltip text={language === 'en' ? 'The annual rate at which education costs are expected to rise. This is often higher than general inflation.' : 'విద్యా ఖర్చులు ఏటా పెరిగే అంచనా రేటు. ఇది తరచుగా సాధారణ ద్రవ్యోల్బణం కంటే ఎక్కువగా ఉంటుంది.'} />
                    </label>
                    <input type="number" value={inflation} onChange={e => setInflation(Number(e.target.value))} className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700"/>
                </div>
                 <div>
                    <label className="block text-sm font-medium mb-2">{language === 'en' ? 'Expected Return on Investment (%)' : 'పెట్టుబడిపై అంచనా రాబడి (%)'}</label>
                    <input type="number" value={expectedReturn} onChange={e => setExpectedReturn(Number(e.target.value))} className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700"/>
                </div>
            </div>
            
            <div className="lg:col-span-3 space-y-8">
                <div role="status" aria-live="polite" className="bg-light dark:bg-slate-800 p-6 rounded-lg text-center space-y-6">
                    <div>
                        <p className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Future Cost of Education' : 'భవిష్యత్ విద్యా ఖర్చు'}</p>
                        <p className="text-4xl font-bold text-primary dark:text-blue-400 my-2">{formatCurrency(targetCorpus)}</p>
                    </div>
                    <div>
                        <p className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Required Monthly Investment (SIP)' : 'అవసరమైన నెలవారీ పెట్టుబడి (SIP)'}</p>
                        <p className="text-3xl font-semibold text-green-600 dark:text-green-500">{formatCurrency(requiredSip)}</p>
                    </div>
                </div>
                <div className="bg-white dark:bg-dark p-4 sm:p-6 rounded-lg shadow-inner border dark:border-gray-700">
                    <h3 className="text-xl font-bold text-primary dark:text-blue-300 mb-4 text-center">{language === 'en' ? 'Investment Growth Projection' : 'పెట్టుబడి వృద్ధి అంచనా'}</h3>
                    <div className="h-64 md:h-80" role="img">
                        <Line data={chartData} options={chartOptions} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChildEducationCostCalculator;