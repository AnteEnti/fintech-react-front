import React, { useState, useMemo } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip as ChartTooltip, Legend } from 'chart.js';
import Tooltip from '../Tooltip';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, ChartTooltip, Legend);

const RetirementCorpusCalculator: React.FC = () => {
    const { language, theme } = useLanguage();
    const [currentAge, setCurrentAge] = useState(30);
    const [retirementAge, setRetirementAge] = useState(60);
    const [monthlyExpenses, setMonthlyExpenses] = useState(50000);
    const [inflationRate, setInflationRate] = useState(6);

    const { yearsToRetirement, futureMonthlyExpenses, requiredCorpus, chartData } = useMemo(() => {
        const years = Math.max(0, retirementAge - currentAge);
        
        const labels = [];
        const expenseData = [];
        for (let i = 0; i <= years; i++) {
            labels.push(`${language === 'en' ? 'Age' : 'వయస్సు'} ${currentAge + i}`);
            const futureExpensesValue = monthlyExpenses * Math.pow(1 + inflationRate / 100, i);
            expenseData.push(futureExpensesValue);
        }

        const finalFutureExpenses = expenseData[expenseData.length - 1] || monthlyExpenses;
        const requiredFund = finalFutureExpenses * 12 * 25;

        return {
            yearsToRetirement: years,
            futureMonthlyExpenses: finalFutureExpenses,
            requiredCorpus: requiredFund,
            chartData: {
                labels,
                datasets: [
                    {
                        label: language === 'en' ? 'Projected Monthly Expenses' : 'అంచనా వేసిన నెలవారీ ఖర్చులు',
                        data: expenseData,
                        borderColor: '#f97316',
                        backgroundColor: 'rgba(249, 115, 22, 0.2)',
                        fill: true,
                        tension: 0.3,
                    }
                ]
            }
        };
    }, [currentAge, retirementAge, monthlyExpenses, inflationRate, language]);

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
            <div className="lg:col-span-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="currentAge" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">{language === 'en' ? 'Current Age' : 'ప్రస్తుత వయస్సు'}</label>
                        <input id="currentAge" type="number" value={currentAge} onChange={e => setCurrentAge(Number(e.target.value))} className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-primary transition"/>
                    </div>
                    <div>
                        <label htmlFor="retirementAge" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">{language === 'en' ? 'Retirement Age' : 'పదవీ విరమణ వయస్సు'}</label>
                        <input id="retirementAge" type="number" value={retirementAge} onChange={e => setRetirementAge(Number(e.target.value))} className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-primary transition"/>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="monthlyExpenses" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">{language === 'en' ? 'Current Monthly Expenses' : 'ప్రస్తుత నెలవారీ ఖర్చులు'}</label>
                         <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 dark:text-gray-400">₹</span>
                            <input id="monthlyExpenses" type="number" value={monthlyExpenses} onChange={e => setMonthlyExpenses(Number(e.target.value))} className="w-full p-3 pl-8 border rounded-lg bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-primary transition"/>
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="inflationRate" className="flex items-center text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                           {language === 'en' ? 'Expected Inflation (%)' : 'అంచనా ద్రవ్యోల్బణం (%)'}
                           <Tooltip text={language === 'en' ? 'The average rate at which the price of goods and services is expected to increase per year.' : 'వస్తువులు మరియు సేవల ధర సంవత్సరానికి పెరిగే సగటు రేటు.'} />
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 dark:text-gray-400">%</span>
                            <input id="inflationRate" type="number" value={inflationRate} onChange={e => setInflationRate(Number(e.target.value))} className="w-full p-3 pr-8 border rounded-lg bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-primary transition"/>
                        </div>
                    </div>
                </div>
            </div>

            {/* Results and Chart Section */}
            <div className="lg:col-span-3 space-y-8">
                <div role="status" aria-live="polite">
                    <div className="bg-light dark:bg-slate-800 p-6 rounded-lg text-center space-y-6">
                        <div>
                            <p className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Estimated Retirement Corpus Needed' : 'అవసరమైన అంచనా పదవీ విరమణ నిధి'}</p>
                            <p className="text-4xl font-extrabold text-primary dark:text-blue-300">{formatCurrency(requiredCorpus)}</p>
                            <p className="text-xs text-gray-500 mt-2">{language === 'en' ? 'Based on the 4% withdrawal rule.' : '4% ఉపసంహరణ నియమం ఆధారంగా.'}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                             <div>
                                <p className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'To retire in' : 'పదవీ విరమణకు'}</p>
                                <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{yearsToRetirement} {language === 'en' ? 'Years' : 'సంవత్సరాలు'}</p>
                            </div>
                            <div>
                                <p className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Future Monthly Expenses' : 'భవిష్యత్ నెలవారీ ఖర్చులు'}</p>
                                <p className="text-2xl font-bold text-secondary dark:text-blue-400">{formatCurrency(futureMonthlyExpenses)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            
                {yearsToRetirement > 0 && (
                     <div className="bg-white dark:bg-dark p-4 sm:p-6 rounded-lg shadow-inner border border-gray-200 dark:border-gray-700">
                        <h3 className="text-xl font-bold text-primary dark:text-blue-300 mb-4 text-center">{language === 'en' ? 'Growth of Monthly Expenses (due to Inflation)' : 'నెలవారీ ఖర్చుల పెరుగుదల (ద్రవ్యోల్బణం కారణంగా)'}</h3>
                        <div className="h-64 md:h-80" role="img" aria-label={language === 'en' ? 'Line chart showing the projected growth of monthly expenses until retirement due to inflation.' : 'ద్రవ్యోల్బణం కారణంగా పదవీ విరమణ వరకు నెలవారీ ఖర్చుల అంచనా పెరుగుదలను చూపే లైన్ చార్ట్.'}>
                            <Line data={chartData} options={chartOptions} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RetirementCorpusCalculator;