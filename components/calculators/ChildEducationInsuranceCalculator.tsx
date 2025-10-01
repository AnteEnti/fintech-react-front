import React, { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import Tooltip from '../Tooltip';

interface CalculatorProps {
    initialState?: Record<string, any>;
    onStateChange: (state: Record<string, any>) => void;
}

const ChildEducationInsuranceCalculator: React.FC<CalculatorProps> = ({ initialState, onStateChange }) => {
    const { language } = useLanguage();
    
    const [childAge, setChildAge] = useState(initialState?.childAge || 5);
    const [goalAge, setGoalAge] = useState(initialState?.goalAge || 18);
    const [currentCost, setCurrentCost] = useState(initialState?.currentCost || 1000000);
    const [inflation, setInflation] = useState(initialState?.inflation || 8);
    const [expectedReturn, setExpectedReturn] = useState(initialState?.expectedReturn || 12);

    useEffect(() => {
        onStateChange({ childAge, goalAge, currentCost, inflation, expectedReturn });
    }, [childAge, goalAge, currentCost, inflation, expectedReturn, onStateChange]);

    const { targetCorpus, requiredSip } = useMemo(() => {
        const yearsToGoal = Math.max(0, goalAge - childAge);
        const futureCost = currentCost * Math.pow(1 + inflation / 100, yearsToGoal);

        const i = expectedReturn / 100 / 12;
        const n = yearsToGoal * 12;
        
        let sip = 0;
        if (i > 0 && n > 0) {
            sip = (futureCost * i) / (Math.pow(1 + i, n) - 1);
        }
        
        return {
            targetCorpus: futureCost,
            requiredSip: sip,
        };
    }, [childAge, goalAge, currentCost, inflation, expectedReturn]);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Input Section */}
            <div className="lg:col-span-2 space-y-6">
                <div>
                    <label className="block text-sm font-medium mb-2">{language === 'en' ? "Child's Current Age" : 'పిల్లల ప్రస్తుత వయస్సు'}</label>
                    <input type="number" value={childAge} onChange={e => setChildAge(Number(e.target.value))} className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700"/>
                </div>
                 <div>
                    <label className="block text-sm font-medium mb-2">{language === 'en' ? 'Age for Goal' : 'లక్ష్యం కోసం వయస్సు'}</label>
                    <input type="number" value={goalAge} onChange={e => setGoalAge(Number(e.target.value))} className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700"/>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">{language === 'en' ? 'Current Cost of Education' : 'ప్రస్తుత విద్యా ఖర్చు'}</label>
                    <input type="number" value={currentCost} onChange={e => setCurrentCost(Number(e.target.value))} className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700"/>
                </div>
                <div>
                    <label className="flex items-center text-sm font-medium mb-2">
                        {language === 'en' ? 'Education Inflation (%)' : 'విద్యా ద్రవ్యోల్బణం (%)'}
                        <Tooltip text={language === 'en' ? 'The annual rate at which education costs are expected to rise.' : 'విద్యా ఖర్చులు ఏటా పెరిగే అంచనా రేటు.'} />
                    </label>
                    <input type="number" value={inflation} onChange={e => setInflation(Number(e.target.value))} className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700"/>
                </div>
                 <div>
                    <label className="block text-sm font-medium mb-2">{language === 'en' ? 'Expected Return on Investment (%)' : 'పెట్టుబడిపై అంచనా రాబడి (%)'}</label>
                    <input type="number" value={expectedReturn} onChange={e => setExpectedReturn(Number(e.target.value))} className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700"/>
                </div>
            </div>
            
            {/* Results Section */}
            <div className="lg:col-span-3">
                <div role="status" aria-live="polite" className="bg-light dark:bg-slate-800 p-8 rounded-lg space-y-8 sticky top-24">
                    <div className="text-center">
                        <p className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Target Education Corpus' : 'లక్ష్య విద్యా నిధి'}</p>
                        <p className="text-4xl font-bold text-primary dark:text-blue-400 my-2">{formatCurrency(targetCorpus)}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Required Monthly Investment' : 'అవసరమైన నెలవారీ పెట్టుబడి'}</p>
                        <p className="text-3xl font-semibold text-green-600 dark:text-green-500">{formatCurrency(requiredSip)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChildEducationInsuranceCalculator;