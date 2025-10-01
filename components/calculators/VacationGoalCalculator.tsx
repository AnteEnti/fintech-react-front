import React, { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import Tooltip from '../Tooltip';

interface CalculatorProps {
    initialState?: Record<string, any>;
    onStateChange: (state: Record<string, any>) => void;
}

interface CostFields {
    flights: string;
    accommodation: string;
    activities: string;
    food: string;
    misc: string;
}

const VacationGoalCalculator: React.FC<CalculatorProps> = ({ initialState, onStateChange }) => {
    const { language } = useLanguage();
    
    const [costs, setCosts] = useState<CostFields>(initialState?.costs || {
        flights: '50000',
        accommodation: '60000',
        activities: '30000',
        food: '40000',
        misc: '20000',
    });
    const [timelineMonths, setTimelineMonths] = useState<number>(initialState?.timelineMonths || 18);
    const [currentSavings, setCurrentSavings] = useState<number>(initialState?.currentSavings || 10000);

    useEffect(() => {
        onStateChange({ costs, timelineMonths, currentSavings });
    }, [costs, timelineMonths, currentSavings, onStateChange]);

    const handleCostChange = (field: keyof CostFields, value: string) => {
        setCosts(prev => ({...prev, [field]: value}));
    };
    
    const {
        totalCost,
        remainingAmount,
        requiredMonthlySavings,
        progressPercentage
    } = useMemo(() => {
        // FIX: Explicitly type the arguments of the reduce function to ensure the result is a number.
        const total = Object.values(costs).reduce((sum: number, val: string) => sum + (Number(val) || 0), 0);
        const remaining = Math.max(0, total - currentSavings);
        
        // FIX: Prevent division by zero if timeline is 0 months.
        const monthlySavings = timelineMonths > 0 ? remaining / timelineMonths : 0;
        
        // FIX: Prevent division by zero if total cost is 0.
        const progress = total > 0 ? (currentSavings / total) * 100 : 0;

        return {
            totalCost: total,
            remainingAmount: remaining,
            requiredMonthlySavings: monthlySavings,
            progressPercentage: Math.min(100, progress) // Cap at 100%
        };
    }, [costs, timelineMonths, currentSavings]);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            <div className="lg:col-span-3">
                <h3 className="text-xl font-semibold mb-4">{language === 'en' ? 'Estimate Your Trip Cost' : 'మీ యాత్ర ఖర్చును అంచనా వేయండి'}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">{language === 'en' ? 'Flights / Travel' : 'విమానాలు / ప్రయాణం'}</label>
                        <input type="number" value={costs.flights} onChange={e => handleCostChange('flights', e.target.value)} className="w-full p-2 border rounded bg-gray-50 dark:bg-slate-700"/>
                    </div>
                     <div>
                        <label className="block text-sm font-medium mb-1">{language === 'en' ? 'Accommodation' : 'వసతి'}</label>
                        <input type="number" value={costs.accommodation} onChange={e => handleCostChange('accommodation', e.target.value)} className="w-full p-2 border rounded bg-gray-50 dark:bg-slate-700"/>
                    </div>
                     <div>
                        <label className="block text-sm font-medium mb-1">{language === 'en' ? 'Activities & Tours' : 'కార్యకలాపాలు & పర్యటనలు'}</label>
                        <input type="number" value={costs.activities} onChange={e => handleCostChange('activities', e.target.value)} className="w-full p-2 border rounded bg-gray-50 dark:bg-slate-700"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">{language === 'en' ? 'Food & Drinks' : 'ఆహారం & పానీయాలు'}</label>
                        <input type="number" value={costs.food} onChange={e => handleCostChange('food', e.target.value)} className="w-full p-2 border rounded bg-gray-50 dark:bg-slate-700"/>
                    </div>
                     <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">{language === 'en' ? 'Miscellaneous (Shopping, etc.)' : 'ఇతరాలు (షాపింగ్, మొదలైనవి)'}</label>
                        <input type="number" value={costs.misc} onChange={e => handleCostChange('misc', e.target.value)} className="w-full p-2 border rounded bg-gray-50 dark:bg-slate-700"/>
                    </div>
                </div>
                 <h3 className="text-xl font-semibold mt-8 mb-4">{language === 'en' ? 'Your Savings Plan' : 'మీ పొదుపు ప్రణాళిక'}</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">{language === 'en' ? 'When do you plan to travel? (Months)' : 'మీరు ఎప్పుడు ప్రయాణించాలని ప్లాన్ చేస్తున్నారు? (నెలలు)'}</label>
                        <input type="number" value={timelineMonths} onChange={e => setTimelineMonths(Number(e.target.value))} className="w-full p-2 border rounded bg-gray-50 dark:bg-slate-700"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">{language === 'en' ? 'Current Savings for this trip' : 'ఈ యాత్ర కోసం ప్రస్తుత పొదుపు'}</label>
                        <input type="number" value={currentSavings} onChange={e => setCurrentSavings(Number(e.target.value))} className="w-full p-2 border rounded bg-gray-50 dark:bg-slate-700"/>
                    </div>
                </div>
            </div>
            
            <div className="lg:col-span-2">
                <div role="status" aria-live="polite" className="bg-light dark:bg-slate-800 p-6 rounded-lg space-y-6 sticky top-24">
                    <div className="text-center">
                        <p className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Required Monthly Savings' : 'అవసరమైన నెలవారీ పొదుపు'}</p>
                        <p className="text-4xl font-bold text-primary dark:text-blue-400 my-2">{formatCurrency(requiredMonthlySavings)}</p>
                    </div>
                    <div className="bg-white dark:bg-dark p-4 rounded-lg shadow-inner border dark:border-gray-700">
                        <h4 className="text-lg font-semibold text-center mb-4">{language === 'en' ? 'Trip Goal Progress' : 'యాత్ర లక్ష్య పురోగతి'}</h4>
                        <div className="space-y-2">
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-5">
                                <div className="bg-accent h-5 rounded-full text-center text-white text-xs flex items-center justify-center" style={{ width: `${progressPercentage}%` }}>
                                   {progressPercentage > 10 && <span>{progressPercentage.toFixed(0)}%</span>}
                                </div>
                            </div>
                            <div className="flex justify-between font-medium text-sm">
                                <span>{formatCurrency(currentSavings)}</span>
                                <span>{formatCurrency(totalCost)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VacationGoalCalculator;