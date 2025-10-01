import React, { useState, useMemo } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip as ChartTooltip, Legend } from 'chart.js';
import Tooltip from '../Tooltip';
import useBreakpoint from '../../hooks/useBreakpoint';

ChartJS.register(ArcElement, ChartTooltip, Legend);

const LifeInsuranceNeedsCalculator: React.FC = () => {
    const { language, theme } = useLanguage();
    const [annualIncome, setAnnualIncome] = useState(1000000);
    const [outstandingLoans, setOutstandingLoans] = useState(500000);
    const [futureGoals, setFutureGoals] = useState(2000000); // e.g., child's education
    const [existingSavings, setExistingSavings] = useState(500000);
    const [existingCover, setExistingCover] = useState(2500000);
    const isMd = useBreakpoint('md');

    const { recommendedCover, incomeReplacement, totalNeeds } = useMemo(() => {
        // A common rule of thumb is 10-15 times annual income. Let's use that as a base.
        const incomeRep = annualIncome * 15;

        // Add liabilities and future goals
        const needs = incomeRep + outstandingLoans + futureGoals;

        // Subtract existing resources
        const coverNeeded = needs - existingSavings - existingCover;

        return {
            recommendedCover: Math.max(0, coverNeeded),
            incomeReplacement: incomeRep,
            totalNeeds: needs
        };

    }, [annualIncome, outstandingLoans, futureGoals, existingSavings, existingCover]);

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
            language === 'en' ? 'Income Replacement (15x)' : 'ఆదాయ భర్తీ (15x)',
            language === 'en' ? 'Outstanding Loans' : 'బాకీ ఉన్న లోన్లు',
            language === 'en' ? 'Future Goals' : 'భవిష్యత్ లక్ష్యాలు',
        ],
        datasets: [{
            data: [incomeReplacement, outstandingLoans, futureGoals],
            backgroundColor: ['#1e40af', '#f97316', '#16a34a'],
            hoverBackgroundColor: ['#1d4ed8', '#ea580c', '#15803d'],
            borderWidth: 2,
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
            <div className="lg:col-span-3">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                    {language === 'en' 
                        ? 'This calculator provides a rough estimate. It is not financial advice. Consult a professional for a detailed assessment.' 
                        : 'ఈ కాలిక్యులేటర్ సుమారు అంచనాను అందిస్తుంది. ఇది ఆర్థిక సలహా కాదు. వివరణాత్మక అంచనా కోసం ఒక నిపుణుడిని సంప్రదించండి.'
                    }
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="annualIncome" className="flex items-center text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                           {language === 'en' ? 'Your Annual Income' : 'మీ వార్షిక ఆదాయం'}
                           <Tooltip text={language === 'en' ? 'Your total yearly income from all sources. This helps estimate the amount needed to support your family.' : 'అన్ని మూలాల నుండి మీ మొత్తం వార్షిక ఆదాయం. ఇది మీ కుటుంబాన్ని పోషించడానికి అవసరమైన మొత్తాన్ని అంచనా వేయడానికి సహాయపడుతుంది.'} />
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 dark:text-gray-400">₹</span>
                            <input id="annualIncome" type="number" value={annualIncome} onChange={e => setAnnualIncome(Number(e.target.value))} className="w-full p-3 pl-8 border rounded-lg bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-primary transition"/>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="outstandingLoans" className="flex items-center text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                           {language === 'en' ? 'Outstanding Loans' : 'బాకీ ఉన్న లోన్లు'}
                           <Tooltip text={language === 'en' ? 'Total amount of all your current debts (Home Loan, Car Loan, Personal Loan, etc.).' : 'మీ ప్రస్తుత అన్ని అప్పుల మొత్తం (గృహ రుణం, కారు రుణం, వ్యక్తిగత రుణం, మొదలైనవి).'} />
                        </label>
                         <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 dark:text-gray-400">₹</span>
                            <input id="outstandingLoans" type="number" value={outstandingLoans} onChange={e => setOutstandingLoans(Number(e.target.value))} className="w-full p-3 pl-8 border rounded-lg bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-primary transition"/>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="futureGoals" className="flex items-center text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                           {language === 'en' ? 'Amount for Future Goals' : 'భవిష్యత్ లక్ష్యాల కోసం మొత్తం'}
                           <Tooltip text={language === 'en' ? 'Estimated cost for major future expenses like your child\'s higher education or marriage.' : 'మీ పిల్లల ఉన్నత విద్య లేదా వివాహం వంటి ప్రధాన భవిష్యత్ ఖర్చుల కోసం అంచనా వ్యయం.'} />
                        </label>
                         <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 dark:text-gray-400">₹</span>
                            <input id="futureGoals" type="number" value={futureGoals} onChange={e => setFutureGoals(Number(e.target.value))} className="w-full p-3 pl-8 border rounded-lg bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-primary transition"/>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="existingSavings" className="flex items-center text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                           {language === 'en' ? 'Existing Savings & Investments' : 'ఇప్పటికే ఉన్న పొదుపులు & పెట్టుబడులు'}
                           <Tooltip text={language === 'en' ? 'The total value of your current savings, FDs, mutual funds, etc., that can be used by your family.' : 'మీ కుటుంబం ఉపయోగించగల మీ ప్రస్తుత పొదుపులు, FDలు, మ్యూచువల్ ఫండ్స్ మొదలైన వాటి మొత్తం విలువ.'} />
                        </label>
                         <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 dark:text-gray-400">₹</span>
                            <input id="existingSavings" type="number" value={existingSavings} onChange={e => setExistingSavings(Number(e.target.value))} className="w-full p-3 pl-8 border rounded-lg bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-primary transition"/>
                        </div>
                    </div>
                    <div className="md:col-span-2">
                        <label htmlFor="existingCover" className="flex items-center text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                           {language === 'en' ? 'Existing Life Insurance Cover' : 'ఇప్పటికే ఉన్న జీవిత బీమా కవరేజ్'}
                           <Tooltip text={language === 'en' ? 'The sum assured of all life insurance policies you currently have.' : 'మీరు ప్రస్తుతం కలిగి ఉన్న అన్ని జీవిత బీమా పాలసీల హామీ మొత్తం.'} />
                        </label>
                         <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 dark:text-gray-400">₹</span>
                            <input id="existingCover" type="number" value={existingCover} onChange={e => setExistingCover(Number(e.target.value))} className="w-full p-3 pl-8 border rounded-lg bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-primary transition"/>
                        </div>
                    </div>
                </div>
            </div>

            {/* Results and Chart Section */}
            <div className="lg:col-span-2 space-y-8">
                <div role="status" aria-live="polite">
                    <div className="bg-light dark:bg-slate-800 p-6 rounded-lg text-center">
                        <p className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Recommended Additional Cover' : 'సిఫార్సు చేయబడిన అదనపు కవరేజ్'}</p>
                        <p className="text-4xl font-extrabold text-primary dark:text-blue-300 my-2">{formatCurrency(recommendedCover)}</p>
                        <p className="text-sm text-gray-500">{language === 'en' ? 'To protect your family\'s future.' : 'మీ కుటుంబ భవిష్యత్తును రక్షించడానికి.'}</p>
                    </div>
                </div>
            
                {totalNeeds > 0 && (
                     <div className="bg-white dark:bg-dark p-4 sm:p-6 rounded-lg shadow-inner border border-gray-200 dark:border-gray-700">
                        <h3 className="text-xl font-bold text-primary dark:text-blue-300 mb-4 text-center">{language === 'en' ? 'Breakdown of Total Needs' : 'మొత్తం అవసరాల విచ్ఛిన్నం'}</h3>
                        <div className="h-64 mx-auto" style={{maxWidth: '400px'}} role="img" aria-label={language === 'en' ? 'Pie chart showing the breakdown of total financial needs, including income replacement, loans, and future goals.' : 'ఆదాయ భర్తీ, రుణాలు మరియు భవిష్యత్ లక్ష్యాలతో సహా మొత్తం ఆర్థిక అవసరాల విచ్ఛిన్నం చూపే పై చార్ట్.'}>
                            <Pie data={pieChartData} options={chartOptions} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LifeInsuranceNeedsCalculator;