import React, { useState, useMemo } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip as ChartTooltip, Legend } from 'chart.js';
import Tooltip from '../Tooltip';
import useBreakpoint from '../../hooks/useBreakpoint';

ChartJS.register(ArcElement, ChartTooltip, Legend);

const PPFCalculator: React.FC = () => {
    const { language, theme } = useLanguage();
    const [yearlyInvestment, setYearlyInvestment] = useState(150000);
    const [timePeriod, setTimePeriod] = useState(15);
    const [interestRate, setInterestRate] = useState(7.1); // Current PPF rate
    const isMd = useBreakpoint('md');

    const { maturityValue, totalInvestment, totalInterest } = useMemo(() => {
        let balance = 0;
        let totalInvested = 0;
        
        for (let i = 0; i < timePeriod; i++) {
            totalInvested += yearlyInvestment;
            balance += yearlyInvestment;
            balance *= (1 + interestRate / 100);
        }

        return {
            maturityValue: balance,
            totalInvestment: totalInvested,
            totalInterest: balance - totalInvested,
        };
    }, [yearlyInvestment, timePeriod, interestRate]);

    const handleInvestmentChange = (value: number) => {
        setYearlyInvestment(Math.min(value, 150000)); // PPF max limit
    };
    
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
            language === 'en' ? 'Total Investment' : 'మొత్తం పెట్టుబడి',
            language === 'en' ? 'Total Interest' : 'మొత్తం వడ్డీ',
        ],
        datasets: [{
            data: [totalInvestment, totalInterest],
            backgroundColor: ['#1e40af', '#22c55e'],
            hoverBackgroundColor: ['#1d4ed8', '#16a34a'],
            borderWidth: 2,
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
                    <label htmlFor="yearlyInvestment" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">{language === 'en' ? 'Yearly Investment' : 'వార్షిక పెట్టుబడి'}</label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 dark:text-gray-400">₹</span>
                        <input id="yearlyInvestment" type="number" value={yearlyInvestment} onChange={e => handleInvestmentChange(Number(e.target.value))} className="w-full p-3 pl-8 border rounded-lg bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-primary transition"/>
                    </div>
                    <input aria-label={language === 'en' ? 'Yearly Investment slider' : 'వార్షిక పెట్టుబడి స్లైడర్'} type="range" min="500" max="150000" step="500" value={yearlyInvestment} onChange={e => handleInvestmentChange(Number(e.target.value))} className="w-full mt-2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary"/>
                </div>
                <div>
                    <label htmlFor="interestRate" className="flex items-center text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                       {language === 'en' ? 'Interest Rate (p.a.)' : 'వడ్డీ రేటు (సం.)'}
                       <Tooltip text={language === 'en' ? 'The PPF interest rate is set by the Government of India and is subject to change every quarter.' : 'PPF వడ్డీ రేటును భారత ప్రభుత్వం నిర్ధారిస్తుంది మరియు ప్రతి త్రైమాసికంలో మార్పుకు లోబడి ఉంటుంది.'} />
                    </label>
                     <div className="relative">
                        <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 dark:text-gray-400">%</span>
                        <input id="interestRate" type="number" value={interestRate} onChange={e => setInterestRate(Number(e.target.value))} className="w-full p-3 pr-8 border rounded-lg bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-primary transition"/>
                    </div>
                     <input aria-label={language === 'en' ? 'Interest Rate slider' : 'వడ్డీ రేటు స్లైడర్'} type="range" min="5" max="10" step="0.1" value={interestRate} onChange={e => setInterestRate(Number(e.target.value))} className="w-full mt-2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary"/>
                </div>
                <div>
                    <label htmlFor="timePeriod" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">{language === 'en' ? 'Time Period (Years)' : 'కాలపరిమితి (సంవత్సరాలు)'}</label>
                    <div className="relative">
                       <input id="timePeriod" type="number" value={timePeriod} onChange={e => setTimePeriod(Number(e.target.value))} className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-primary transition"/>
                    </div>
                    <input aria-label={language === 'en' ? 'Time Period slider' : 'కాలపరిమితి స్లైడర్'} type="range" min="15" max="50" step="5" value={timePeriod} onChange={e => setTimePeriod(Number(e.target.value))} className="w-full mt-2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary"/>
                </div>
            </div>
            {/* Results and Chart Section */}
            <div className="lg:col-span-3 space-y-8">
                <div role="status" aria-live="polite">
                    <div className="bg-light dark:bg-slate-800 p-6 rounded-lg text-center space-y-6">
                        <div>
                            <p className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Maturity Value' : 'మెచ్యూరిటీ విలువ'}</p>
                            <p className="text-4xl font-bold text-primary dark:text-blue-400">{formatCurrency(maturityValue)}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Total Investment' : 'మొత్తం పెట్టుబడి'}</p>
                                <p className="text-2xl font-semibold text-gray-800 dark:text-gray-200">{formatCurrency(totalInvestment)}</p>
                            </div>
                            <div>
                                <p className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Total Interest' : 'మొత్తం వడ్డీ'}</p>
                                <p className="text-2xl font-semibold text-green-600 dark:text-green-500">{formatCurrency(totalInterest)}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {totalInterest > 0 && (
                     <div className="bg-white dark:bg-dark p-4 sm:p-6 rounded-lg shadow-inner border border-gray-200 dark:border-gray-700">
                        <h3 className="text-xl font-bold text-primary dark:text-blue-300 mb-4 text-center">{language === 'en' ? 'Investment Breakdown' : 'పెట్టుబడి విచ్ఛిన్నం'}</h3>
                        <div className="h-64 mx-auto" style={{maxWidth: '400px'}} role="img" aria-label={language === 'en' ? 'Pie chart showing the breakdown of total investment versus total interest.' : 'మొత్తం పెట్టుబడి మరియు మొత్తం వడ్డీ యొక్క విచ్ఛిన్నం చూపే పై చార్ట్.'}>
                            <Pie data={pieChartData} options={chartOptions} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PPFCalculator;