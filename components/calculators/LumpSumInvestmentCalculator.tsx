import React, { useState, useMemo } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip as ChartTooltip, Legend } from 'chart.js';
import Tooltip from '../Tooltip';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, ChartTooltip, Legend);

const LumpSumInvestmentCalculator: React.FC = () => {
    const { language, theme } = useLanguage();
    const [principal, setPrincipal] = useState(100000);
    const [rate, setRate] = useState(12);
    const [years, setYears] = useState(10);

    const calculationResults = useMemo(() => {
        const P = principal;
        const r = rate / 100;
        
        const labels = [];
        const valueData = [];

        for(let year = 0; year <= years; year++) {
            const amount = P * Math.pow((1 + r), year);
            labels.push(year === 0 ? (language === 'en' ? 'Start' : 'ప్రారంభం') : `${language === 'en' ? 'Year' : 'సం' } ${year}`);
            valueData.push(amount);
        }

        const finalMaturityValue = valueData[valueData.length - 1] || P;
        const finalTotalInterest = finalMaturityValue - P;

        return {
            maturityValue: finalMaturityValue,
            totalInterest: finalTotalInterest,
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
                    }
                ]
            }
        };
    }, [principal, rate, years, language]);

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
                    <label htmlFor="principal" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">{language === 'en' ? 'Total Investment' : 'మొత్తం పెట్టుబడి'}</label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 dark:text-gray-400">₹</span>
                        <input id="principal" type="number" value={principal} onChange={e => setPrincipal(Number(e.target.value))} className="w-full p-3 pl-8 border rounded-lg bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-primary transition"/>
                    </div>
                    <input aria-label={language === 'en' ? 'Total Investment slider' : 'మొత్తం పెట్టుబడి స్లైడర్'} type="range" min="10000" max="10000000" step="10000" value={principal} onChange={e => setPrincipal(Number(e.target.value))} className="w-full mt-2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary"/>
                </div>
                <div>
                    <label htmlFor="rate" className="flex items-center text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                         {language === 'en' ? 'Expected Return Rate (p.a.)' : 'అంచనా రాబడి రేటు (సం.)'}
                         <Tooltip text={language === 'en' ? 'The annual rate of return you expect from your investment. For equity mutual funds, a long-term average is often estimated between 10-14%.' : 'మీ పెట్టుబడి నుండి మీరు ఆశించే వార్షిక రాబడి రేటు. ఈక్విటీ మ్యూచువల్ ఫండ్ల కోసం, దీర్ఘకాలిక సగటు తరచుగా 10-14% మధ్య అంచనా వేయబడుతుంది.'} />
                    </label>
                    <div className="relative">
                        <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 dark:text-gray-400">%</span>
                        <input id="rate" type="number" value={rate} onChange={e => setRate(Number(e.target.value))} className="w-full p-3 pr-8 border rounded-lg bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-primary transition"/>
                    </div>
                    <input aria-label={language === 'en' ? 'Expected Return Rate slider' : 'అంచనా రాబడి రేటు స్లైడర్'} type="range" min="1" max="30" step="0.5" value={rate} onChange={e => setRate(Number(e.target.value))} className="w-full mt-2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary"/>
                </div>
                <div>
                    <label htmlFor="years" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">{language === 'en' ? 'Time Period (Years)' : 'కాలపరిమితి (సంవత్సరాలు)'}</label>
                    <div className="relative">
                        <input id="years" type="number" value={years} onChange={e => setYears(Number(e.target.value))} className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-primary transition"/>
                    </div>
                    <input aria-label={language === 'en' ? 'Time Period slider' : 'కాలపరిమితి స్లైడర్'} type="range" min="1" max="40" value={years} onChange={e => setYears(Number(e.target.value))} className="w-full mt-2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary"/>
                </div>
            </div>

            {/* Results and Chart Section */}
            <div className="lg:col-span-3 space-y-8">
                <div role="status" aria-live="polite">
                    <div className="bg-light dark:bg-slate-800 p-6 rounded-lg text-center space-y-6">
                         <div>
                            <p className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Total Value' : 'మొత్తం విలువ'}</p>
                            <p className="text-4xl font-bold text-primary dark:text-blue-400">{formatCurrency(calculationResults.maturityValue)}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Invested Amount' : 'పెట్టుబడి మొత్తం'}</p>
                                <p className="text-2xl font-semibold text-gray-800 dark:text-gray-200">{formatCurrency(principal)}</p>
                            </div>
                            <div>
                                <p className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Est. Returns' : 'అంచనా రాబడి'}</p>
                                <p className="text-2xl font-semibold text-green-600 dark:text-green-500">{formatCurrency(calculationResults.totalInterest)}</p>
                            </div>
                        </div>
                    </div>
                </div>

                 <div className="bg-white dark:bg-dark p-4 sm:p-6 rounded-lg shadow-inner border border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-bold text-primary dark:text-blue-300 mb-4 text-center">{language === 'en' ? 'Investment Growth Over Time' : 'కాలక్రమేణా పెట్టుబడి వృద్ధి'}</h3>
                    <div className="h-64 md:h-80" role="img" aria-label={language === 'en' ? 'Line chart showing lump sum investment growth over the selected time period.' : 'ఎంచుకున్న కాల వ్యవధిలో ఏకమొత్తం పెట్టుబడి వృద్ధిని చూపే లైన్ చార్ట్.'}>
                        <Line data={calculationResults.chartData} options={chartOptions} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LumpSumInvestmentCalculator;