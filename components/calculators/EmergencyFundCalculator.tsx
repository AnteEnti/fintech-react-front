import React, { useState, useMemo } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip as ChartTooltip, Legend } from 'chart.js';
import Tooltip from '../Tooltip';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ChartTooltip, Legend);

const EmergencyFundCalculator: React.FC = () => {
    const { language, theme } = useLanguage();
    const [monthlyExpenses, setMonthlyExpenses] = useState(40000);
    const [coverageMonths, setCoverageMonths] = useState(6);

    const targetFund = useMemo(() => {
        return monthlyExpenses * coverageMonths;
    }, [monthlyExpenses, coverageMonths]);
    
    const chartData = useMemo(() => {
        const coverageOptions = [3, 6, 9, 12];
        const data = coverageOptions.map(months => monthlyExpenses * months);
        const labels = coverageOptions.map(months => `${months} ${language === 'en' ? 'Months' : 'నెలలు'}`);
        return {
            labels,
            datasets: [
                {
                    label: language === 'en' ? 'Emergency Fund Size' : 'అత్యవసర నిధి పరిమాణం',
                    data: data,
                    backgroundColor: [
                        'rgba(250, 204, 21, 0.6)',  // 3 months
                        'rgba(34, 197, 94, 0.6)', // 6 months (Recommended)
                        'rgba(59, 130, 246, 0.6)', // 9 months
                        'rgba(30, 64, 175, 0.6)'   // 12 months
                    ],
                    borderColor: [
                         '#facc15',
                         '#22c55e',
                         '#3b82f6',
                         '#1e40af'
                    ],
                    borderWidth: 1,
                }
            ]
        }
    }, [monthlyExpenses, language]);

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                ticks: { color: theme === 'dark' ? '#cbd5e1' : '#4b5563' },
                grid: { display: false }
            },
            y: {
                ticks: { color: theme === 'dark' ? '#cbd5e1' : '#4b5563' },
                grid: { color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }
            }
        },
        plugins: {
            legend: {
                display: false
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
                    <label htmlFor="monthlyExpenses" className="flex items-center text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                       {language === 'en' ? 'Monthly Essential Expenses' : 'నెలవారీ అవసరమైన ఖర్చులు'}
                       <Tooltip text={language === 'en' ? 'Include only necessary expenses like rent, utilities, loan EMIs, groceries, etc. Exclude discretionary spending.' : 'అద్దె, యుటిలిటీలు, లోన్ EMIలు, కిరాణా సామాగ్రి మొదలైన అవసరమైన ఖర్చులను మాత్రమే చేర్చండి. విచక్షణతో కూడిన ఖర్చులను మినహాయించండి.'} />
                    </label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 dark:text-gray-400">₹</span>
                        <input id="monthlyExpenses" type="number" value={monthlyExpenses} onChange={e => setMonthlyExpenses(Number(e.target.value))} className="w-full p-3 pl-8 border rounded-lg bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-primary transition"/>
                    </div>
                    <input aria-label={language === 'en' ? 'Monthly Essential Expenses slider' : 'నెలవారీ అవసరమైన ఖర్చులు స్లైడర్'} type="range" min="10000" max="200000" step="1000" value={monthlyExpenses} onChange={e => setMonthlyExpenses(Number(e.target.value))} className="w-full mt-2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary"/>
                </div>
                <div>
                    <label htmlFor="coverageMonths" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">{language === 'en' ? 'Months of Coverage' : 'కవరేజ్ నెలలు'}</label>
                    <select id="coverageMonths" value={coverageMonths} onChange={e => setCoverageMonths(Number(e.target.value))} className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-primary transition">
                        <option value="3">3 {language === 'en' ? 'Months' : 'నెలలు'} ({language === 'en' ? 'Basic' : 'ప్రాథమికం'})</option>
                        <option value="6">6 {language === 'en' ? 'Months' : 'నెలలు'} ({language === 'en' ? 'Recommended' : 'సిఫార్సు చేయబడింది'})</option>
                        <option value="9">9 {language === 'en' ? 'Months' : 'నెలలు'} ({language === 'en' ? 'Conservative' : 'సంప్రదాయవాద'})</option>
                        <option value="12">12 {language === 'en' ? 'Months' : 'నెలలు'} ({language === 'en' ? 'Very Safe' : 'చాలా సురక్షితం'})</option>
                    </select>
                </div>
            </div>
            
            {/* Results and Chart Section */}
            <div className="lg:col-span-3 space-y-8">
                <div role="status" aria-live="polite">
                    <div className="bg-light dark:bg-slate-800 p-6 rounded-lg text-center">
                        <p className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Recommended Emergency Fund' : 'సిఫార్సు చేయబడిన అత్యవసర నిధి'}</p>
                        <p className="text-4xl font-extrabold text-primary dark:text-blue-300 my-2">{formatCurrency(targetFund)}</p>
                        <p className="text-sm text-gray-500">{language === 'en' ? 'This fund should be kept in a liquid, easily accessible account.' : 'ఈ నిధిని ద్రవ, సులభంగా అందుబాటులో ఉండే ఖాతాలో ఉంచాలి.'}</p>
                    </div>
                </div>

                <div className="bg-white dark:bg-dark p-4 sm:p-6 rounded-lg shadow-inner border border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-bold text-primary dark:text-blue-300 mb-4 text-center">{language === 'en' ? 'Fund Size Comparison' : 'నిధి పరిమాణం పోలిక'}</h3>
                    <div className="h-64 md:h-80" role="img" aria-label={language === 'en' ? 'Bar chart comparing the required emergency fund size for different coverage periods: 3, 6, 9, and 12 months.' : 'వివిధ కవరేజ్ కాలాల కోసం అవసరమైన అత్యవసర నిధి పరిమాణాన్ని పోల్చే బార్ చార్ట్: 3, 6, 9, మరియు 12 నెలలు.'}>
                        <Bar data={chartData} options={chartOptions} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmergencyFundCalculator;