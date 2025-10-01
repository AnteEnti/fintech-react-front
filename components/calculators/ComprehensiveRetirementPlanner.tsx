import React, { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip as ChartTooltip, Legend, Filler } from 'chart.js';
import Tooltip from '../Tooltip';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, ChartTooltip, Legend, Filler);

interface PlannerProps {
    initialState?: Record<string, any>;
    onStateChange: (state: Record<string, any>) => void;
}

// FIX: Replaced destructuring with default empty object for `initialState` with optional chaining to prevent TypeScript errors when properties are accessed.
const ComprehensiveRetirementPlanner: React.FC<PlannerProps> = ({ initialState, onStateChange }) => {
    const { language, theme } = useLanguage();
    const [step, setStep] = useState(1);

    const [currentAge, setCurrentAge] = useState(initialState?.currentAge || 30);
    const [retirementAge, setRetirementAge] = useState(initialState?.retirementAge || 60);
    const [lifeExpectancy, setLifeExpectancy] = useState(initialState?.lifeExpectancy || 85);

    const [monthlyExpenses, setMonthlyExpenses] = useState(initialState?.monthlyExpenses || 50000);
    const [preRetirementInflation, setPreRetirementInflation] = useState(initialState?.preRetirementInflation || 6);
    const [postRetirementInflation, setPostRetirementInflation] = useState(initialState?.postRetirementInflation || 5);

    const [existingCorpus, setExistingCorpus] = useState(initialState?.existingCorpus || 500000);
    const [preRetirementReturn, setPreRetirementReturn] = useState(initialState?.preRetirementReturn || 12);
    const [postRetirementReturn, setPostRetirementReturn] = useState(initialState?.postRetirementReturn || 7);

    useEffect(() => {
        onStateChange({ currentAge, retirementAge, lifeExpectancy, monthlyExpenses, preRetirementInflation, postRetirementInflation, existingCorpus, preRetirementReturn, postRetirementReturn });
    }, [currentAge, retirementAge, lifeExpectancy, monthlyExpenses, preRetirementInflation, postRetirementInflation, existingCorpus, preRetirementReturn, postRetirementReturn, onStateChange]);

    const {
        requiredCorpus,
        futureValueOfExistingCorpus,
        corpusShortfall,
        requiredSip
    } = useMemo(() => {
        const yearsToRetire = retirementAge - currentAge;
        const yearsInRetirement = lifeExpectancy - retirementAge;

        const expensesAtRetirement = monthlyExpenses * Math.pow(1 + preRetirementInflation / 100, yearsToRetire);
        
        const realRateOfReturn = ((1 + postRetirementReturn / 100) / (1 + postRetirementInflation / 100)) - 1;
        
        const annualExpenses = expensesAtRetirement * 12;

        const corpus = (annualExpenses / realRateOfReturn) * (1 - Math.pow(1 + realRateOfReturn, -yearsInRetirement));

        const futureCorpus = existingCorpus * Math.pow(1 + preRetirementReturn / 100, yearsToRetire);
        
        const shortfall = Math.max(0, corpus - futureCorpus);

        const monthlyPreRetirementReturn = preRetirementReturn / 100 / 12;
        const totalMonths = yearsToRetire * 12;
        
        const sip = shortfall > 0 ? (shortfall * monthlyPreRetirementReturn) / (Math.pow(1 + monthlyPreRetirementReturn, totalMonths) - 1) : 0;

        return {
            requiredCorpus: corpus,
            futureValueOfExistingCorpus: futureCorpus,
            corpusShortfall: shortfall,
            requiredSip: sip
        };
    }, [currentAge, retirementAge, lifeExpectancy, monthlyExpenses, preRetirementInflation, postRetirementInflation, existingCorpus, preRetirementReturn, postRetirementReturn]);


    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
    };

    const nextStep = () => setStep(s => Math.min(s + 1, 4));
    const prevStep = () => setStep(s => Math.max(s - 1, 1));
    
    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-center">{language === 'en' ? 'Step 1: Personal Details' : 'దశ 1: వ్యక్తిగత వివరాలు'}</h3>
                        <div>
                            <label htmlFor="currentAge" className="block text-sm font-medium mb-2">{language === 'en' ? 'Current Age' : 'ప్రస్తుత వయస్సు'}</label>
                            <input id="currentAge" type="number" value={currentAge} onChange={e => setCurrentAge(Number(e.target.value))} className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700"/>
                        </div>
                        <div>
                            <label htmlFor="retirementAge" className="block text-sm font-medium mb-2">{language === 'en' ? 'Desired Retirement Age' : 'కోరుకున్న పదవీ విరమణ వయస్సు'}</label>
                            <input id="retirementAge" type="number" value={retirementAge} onChange={e => setRetirementAge(Number(e.target.value))} className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700"/>
                        </div>
                        <div>
                            <label htmlFor="lifeExpectancy" className="block text-sm font-medium mb-2">{language === 'en' ? 'Life Expectancy' : 'ఆయుర్దాయం'}</label>
                            <input id="lifeExpectancy" type="number" value={lifeExpectancy} onChange={e => setLifeExpectancy(Number(e.target.value))} className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700"/>
                        </div>
                    </div>
                );
            case 2:
                return (
                     <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-center">{language === 'en' ? 'Step 2: Expenses & Inflation' : 'దశ 2: ఖర్చులు & ద్రవ్యోల్బణం'}</h3>
                        <div>
                            <label htmlFor="monthlyExpenses" className="block text-sm font-medium mb-2">{language === 'en' ? 'Current Monthly Expenses' : 'ప్రస్తుత నెలవారీ ఖర్చులు'}</label>
                            <input id="monthlyExpenses" type="number" value={monthlyExpenses} onChange={e => setMonthlyExpenses(Number(e.target.value))} className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700"/>
                        </div>
                        <div>
                            <label htmlFor="preRetirementInflation" className="flex items-center text-sm font-medium mb-2">{language === 'en' ? 'Inflation Rate (Pre-Retirement)' : 'ద్రవ్యోల్బణం రేటు (పదవీ విరమణకు ముందు)'} <Tooltip text={language === 'en' ? 'Expected annual inflation rate until you retire.' : 'మీరు పదవీ విరమణ చేసే వరకు అంచనా వేసిన వార్షిక ద్రవ్యోల్బణం రేటు.'} /></label>
                            <input id="preRetirementInflation" type="number" value={preRetirementInflation} onChange={e => setPreRetirementInflation(Number(e.target.value))} className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700"/>
                        </div>
                        <div>
                            <label htmlFor="postRetirementInflation" className="flex items-center text-sm font-medium mb-2">{language === 'en' ? 'Inflation Rate (Post-Retirement)' : 'ద్రవ్యోల్బణం రేటు (పదవీ విరమణ తర్వాత)'} <Tooltip text={language === 'en' ? 'Expected annual inflation rate during your retirement years.' : 'మీ పదవీ విరమణ సంవత్సరాలలో అంచనా వేసిన వార్షిక ద్రవ్యోల్బణం రేటు.'} /></label>
                            <input id="postRetirementInflation" type="number" value={postRetirementInflation} onChange={e => setPostRetirementInflation(Number(e.target.value))} className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700"/>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-center">{language === 'en' ? 'Step 3: Existing Assets' : 'దశ 3: ఇప్పటికే ఉన్న ఆస్తులు'}</h3>
                        <div>
                            <label htmlFor="existingCorpus" className="block text-sm font-medium mb-2">{language === 'en' ? 'Existing Retirement Savings' : 'ఇప్పటికే ఉన్న పదవీ విరమణ పొదుపులు'}</label>
                            <input id="existingCorpus" type="number" value={existingCorpus} onChange={e => setExistingCorpus(Number(e.target.value))} className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700"/>
                        </div>
                        <div>
                            <label htmlFor="preRetirementReturn" className="flex items-center text-sm font-medium mb-2">{language === 'en' ? 'Return Rate on Investment (Pre-Retirement)' : 'పెట్టుబడిపై రాబడి రేటు (పదవీ విరమణకు ముందు)'} <Tooltip text={language === 'en' ? 'Expected annual return on your investments until retirement.' : 'పదవీ విరమణ వరకు మీ పెట్టుబడులపై అంచనా వేసిన వార్షిక రాబడి.'} /></label>
                            <input id="preRetirementReturn" type="number" value={preRetirementReturn} onChange={e => setPreRetirementReturn(Number(e.target.value))} className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700"/>
                        </div>
                        <div>
                            <label htmlFor="postRetirementReturn" className="flex items-center text-sm font-medium mb-2">{language === 'en' ? 'Return Rate on Investment (Post-Retirement)' : 'పెట్టుబడిపై రాబడి రేటు (పదవీ విరమణ తర్వాత)'} <Tooltip text={language === 'en' ? 'Expected annual return on your corpus during retirement (usually lower risk).' : 'పదవీ విరమణ సమయంలో మీ నిధిపై అంచనా వేసిన వార్షిక రాబడి (సాధారణంగా తక్కువ ప్రమాదం).'} /></label>
                            <input id="postRetirementReturn" type="number" value={postRetirementReturn} onChange={e => setPostRetirementReturn(Number(e.target.value))} className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700"/>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="space-y-6 text-center">
                         <h3 className="text-xl font-semibold">{language === 'en' ? 'Your Retirement Plan' : 'మీ పదవీ విరమణ ప్రణాళిక'}</h3>
                         <div className="bg-light dark:bg-slate-800 p-6 rounded-lg space-y-4">
                            <div>
                                <p className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Retirement Corpus Needed' : 'అవసరమైన పదవీ విరమణ నిధి'}</p>
                                <p className="text-2xl font-bold text-primary dark:text-blue-400">{formatCurrency(requiredCorpus)}</p>
                            </div>
                            <div>
                                <p className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Shortfall After Existing Savings' : 'ఇప్పటికే ఉన్న పొదుపుల తర్వాత లోటు'}</p>
                                <p className="text-2xl font-bold text-red-500">{formatCurrency(corpusShortfall)}</p>
                            </div>
                             <div>
                                <p className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Required Monthly Investment (SIP)' : 'అవసరమైన నెలవారీ పెట్టుబడి (SIP)'}</p>
                                <p className="text-3xl font-extrabold text-green-600">{formatCurrency(requiredSip)}</p>
                            </div>
                         </div>
                    </div>
                );
            default: return null;
        }
    }

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: `${(step / 4) * 100}%`, transition: 'width 0.3s ease-in-out' }}></div>
            </div>
            
            <div className="bg-white dark:bg-dark p-6 rounded-lg shadow-inner border border-gray-200 dark:border-gray-700 min-h-[300px]">
                {renderStep()}
            </div>

            <div className="flex justify-between">
                <button onClick={prevStep} disabled={step === 1} className="px-6 py-2 bg-gray-300 dark:bg-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed">{language === 'en' ? 'Back' : 'వెనుకకు'}</button>
                <button onClick={nextStep} disabled={step === 4} className="px-6 py-2 bg-secondary text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed">{language === 'en' ? 'Next' : 'తదుపరి'}</button>
            </div>
        </div>
    );
};

export default ComprehensiveRetirementPlanner;