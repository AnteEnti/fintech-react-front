import React, { useState, useMemo } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import Tooltip from '../Tooltip';

const SavingsGoalTracker: React.FC = () => {
    const { language } = useLanguage();
    const [goalName, setGoalName] = useState('');
    const [targetAmount, setTargetAmount] = useState(500000);
    const [timelineYears, setTimelineYears] = useState(5);
    const [currentSavings, setCurrentSavings] = useState(50000);

    const {
        remainingAmount,
        requiredMonthlySavings,
        progressPercentage
    } = useMemo(() => {
        const target = Math.max(1, targetAmount); // Avoid division by zero
        const remaining = Math.max(0, target - currentSavings);
        const timelineMonths = Math.max(1, timelineYears * 12);
        
        const monthlySavings = remaining / timelineMonths;
        const progress = (currentSavings / target) * 100;

        return {
            remainingAmount: remaining,
            requiredMonthlySavings: monthlySavings,
            progressPercentage: Math.min(100, progress) // Cap at 100%
        };
    }, [targetAmount, timelineYears, currentSavings]);

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
            <div className="lg:col-span-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label htmlFor="goalName" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">{language === 'en' ? 'What are you saving for?' : 'దేనికోసం పొదుపు చేస్తున్నారు?'}</label>
                        <input 
                            id="goalName"
                            type="text" 
                            value={goalName} 
                            onChange={e => setGoalName(e.target.value)} 
                            placeholder={language === 'en' ? 'e.g., House Down Payment' : 'ఉదా., ఇంటి డౌన్ పేమెంట్'}
                            className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-primary transition"
                        />
                    </div>
                    <div>
                        <label htmlFor="targetAmount" className="flex items-center text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                           {language === 'en' ? 'Target Amount' : 'లక్ష్య మొత్తం'}
                           <Tooltip text={language === 'en' ? 'The total amount of money you want to save for your goal.' : 'మీ లక్ష్యం కోసం మీరు ఆదా చేయాలనుకుంటున్న మొత్తం డబ్బు.'} />
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 dark:text-gray-400">₹</span>
                            <input id="targetAmount" type="number" value={targetAmount} onChange={e => setTargetAmount(Number(e.target.value))} className="w-full p-3 pl-8 border rounded-lg bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-primary transition"/>
                        </div>
                        <input aria-label={language === 'en' ? 'Target Amount slider' : 'లక్ష్య మొత్తం స్లైడర్'} type="range" min="10000" max="10000000" step="10000" value={targetAmount} onChange={e => setTargetAmount(Number(e.target.value))} className="w-full mt-2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary"/>
                    </div>
                    <div>
                        <label htmlFor="timelineYears" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">{language === 'en' ? 'Timeline (Years)' : 'కాలపరిమితి (సంవత్సరాలు)'}</label>
                         <div className="relative">
                            <input id="timelineYears" type="number" value={timelineYears} onChange={e => setTimelineYears(Number(e.target.value))} className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-primary transition"/>
                        </div>
                        <input aria-label={language === 'en' ? 'Timeline slider' : 'కాలపరిమితి స్లైడర్'} type="range" min="1" max="20" step="1" value={timelineYears} onChange={e => setTimelineYears(Number(e.target.value))} className="w-full mt-2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary"/>
                    </div>
                    <div className="md:col-span-2">
                        <label htmlFor="currentSavings" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">{language === 'en' ? 'Current Savings' : 'ప్రస్తుత పొదుపు'}</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 dark:text-gray-400">₹</span>
                            <input id="currentSavings" type="number" value={currentSavings} onChange={e => setCurrentSavings(Number(e.target.value))} className="w-full p-3 pl-8 border rounded-lg bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-primary transition"/>
                        </div>
                        <input aria-label={language === 'en' ? 'Current Savings slider' : 'ప్రస్తుత పొదుపు స్లైడర్'} type="range" min="0" max={targetAmount} step="1000" value={currentSavings} onChange={e => setCurrentSavings(Number(e.target.value))} className="w-full mt-2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary"/>
                    </div>
                </div>
            </div>
            
            {/* Results and Progress Section */}
            <div className="lg:col-span-2 space-y-8">
                <div role="status" aria-live="polite">
                    <div className="bg-light dark:bg-slate-800 p-6 rounded-lg text-center">
                        <p className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Required Monthly Savings' : 'అవసరమైన నెలవారీ పొదుపు'}</p>
                        <p className="text-4xl font-extrabold text-primary dark:text-blue-300 my-2">{formatCurrency(requiredMonthlySavings)}</p>
                        <p className="text-sm text-gray-500">{language === 'en' ? `To reach your goal of ${formatCurrency(targetAmount)} in ${timelineYears} years.` : `${timelineYears} సంవత్సరాలలో మీ లక్ష్యం ${formatCurrency(targetAmount)} చేరుకోవడానికి.`}</p>
                    </div>
                </div>
                
                <div className="bg-white dark:bg-dark p-6 rounded-lg shadow-inner border border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-bold text-primary dark:text-blue-300 mb-4 text-center">
                        {goalName || (language === 'en' ? 'Your Goal Progress' : 'మీ లక్ష్య పురోగతి')}
                    </h3>
                    <div className="space-y-4">
                        <div
                            role="progressbar"
                            aria-label={goalName || (language === 'en' ? 'Savings goal progress' : 'పొదుపు లక్ష్య పురోగతి')}
                            aria-valuenow={progressPercentage}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-valuetext={`${progressPercentage.toFixed(0)}% complete`}
                            className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-6"
                        >
                            <div 
                                className="bg-green-500 h-6 rounded-full text-center text-white font-bold text-sm flex items-center justify-center transition-all duration-500"
                                style={{ width: `${progressPercentage}%` }}
                            >
                               {progressPercentage > 10 && <span aria-hidden="true">{progressPercentage.toFixed(0)}%</span>}
                            </div>
                        </div>
                        <div className="flex justify-between font-medium text-gray-700 dark:text-gray-300" aria-hidden="true">
                            <span>{formatCurrency(currentSavings)}</span>
                            <span>{formatCurrency(targetAmount)}</span>
                        </div>
                        <div className="text-center text-secondary dark:text-blue-400 font-semibold" role="status" aria-live="polite">
                            {progressPercentage >= 100 ? (language === 'en' ? 'Goal Achieved! 🎉' : 'లక్ష్యం సాధించబడింది! 🎉') : `${formatCurrency(remainingAmount)} ${language === 'en' ? 'more to go!' : 'ఇంకా అవసరం!'}`}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SavingsGoalTracker;