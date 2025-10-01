import React, { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import Tooltip from '../Tooltip';

interface CalculatorProps {
    initialState?: Record<string, any>;
    onStateChange: (state: Record<string, any>) => void;
}

// FIX: Replaced destructuring with default empty object for `initialState` with optional chaining to prevent TypeScript errors when properties are accessed.
const TermPlanCalculator: React.FC<CalculatorProps> = ({ initialState, onStateChange }) => {
    const { language } = useLanguage();
    
    // Needs Analysis
    const [annualIncome, setAnnualIncome] = useState(initialState?.annualIncome || 1000000);
    const [outstandingLoans, setOutstandingLoans] = useState(initialState?.outstandingLoans || 500000);
    const [yearsToSupport, setYearsToSupport] = useState(initialState?.yearsToSupport || 15);

    // Premium Estimation
    const [age, setAge] = useState(initialState?.age || 30);
    const [isSmoker, setIsSmoker] = useState(initialState?.isSmoker !== undefined ? initialState?.isSmoker : false);
    const [coverAmount, setCoverAmount] = useState(initialState?.coverAmount || 10000000);
    const [policyTerm, setPolicyTerm] = useState(initialState?.policyTerm || 30);
    
    const requiredCover = useMemo(() => {
        return (annualIncome * yearsToSupport) + outstandingLoans;
    }, [annualIncome, outstandingLoans, yearsToSupport]);
    
    useEffect(() => {
        setCoverAmount(requiredCover);
    }, [requiredCover]);
    
    useEffect(() => {
        onStateChange({ annualIncome, outstandingLoans, yearsToSupport, age, isSmoker, coverAmount, policyTerm });
    }, [annualIncome, outstandingLoans, yearsToSupport, age, isSmoker, coverAmount, policyTerm, onStateChange]);

    const estimatedPremium = useMemo(() => {
        const basePremium = (coverAmount / 100000) * 40;
        const ageFactor = (age - 25) * 120;
        const smokerFactor = isSmoker ? 1.6 : 1;
        const termFactor = 1 + ((policyTerm - 10) / 10) * 0.2; // Increase premium for longer terms
        
        return Math.max(0, (basePremium + ageFactor) * smokerFactor * termFactor);
    }, [coverAmount, age, isSmoker, policyTerm]);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
    };

    return (
        <div className="space-y-12">
            {/* Needs Analysis Section */}
            <section className="bg-white dark:bg-dark p-6 rounded-lg shadow-inner border border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-bold text-primary dark:text-blue-300 mb-4">{language === 'en' ? 'Step 1: How much cover do you need?' : 'దశ 1: మీకు ఎంత కవర్ అవసరం?'}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-1">{language === 'en' ? 'Annual Income' : 'వార్షిక ఆదాయం'}</label>
                        <input type="number" value={annualIncome} onChange={e => setAnnualIncome(Number(e.target.value))} className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-slate-700"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">{language === 'en' ? 'Outstanding Loans' : 'బాకీ ఉన్న లోన్లు'}</label>
                        <input type="number" value={outstandingLoans} onChange={e => setOutstandingLoans(Number(e.target.value))} className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-slate-700"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">{language === 'en' ? 'Years of Income to Replace' : 'భర్తీ చేయాల్సిన ఆదాయ సంవత్సరాలు'}</label>
                        <input type="number" value={yearsToSupport} onChange={e => setYearsToSupport(Number(e.target.value))} className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-slate-700"/>
                    </div>
                </div>
                <div className="mt-6 bg-light dark:bg-slate-800 p-4 rounded-lg text-center">
                    <p className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Recommended Life Cover' : 'సిఫార్సు చేయబడిన జీవిత బీమా'}</p>
                    <p className="text-3xl font-bold text-secondary dark:text-blue-400">{formatCurrency(requiredCover)}</p>
                </div>
            </section>

            {/* Premium Estimation Section */}
            <section className="bg-white dark:bg-dark p-6 rounded-lg shadow-inner border border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-bold text-primary dark:text-blue-300 mb-4">{language === 'en' ? 'Step 2: Estimate your premium' : 'దశ 2: మీ ప్రీమియంను అంచనా వేయండి'}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                     <div>
                        <label className="block text-sm font-medium mb-1">{language === 'en' ? 'Your Age' : 'మీ వయస్సు'}</label>
                        <input type="number" value={age} onChange={e => setAge(Number(e.target.value))} className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-slate-700"/>
                    </div>
                     <div>
                        <label className="block text-sm font-medium mb-1">{language === 'en' ? 'Life Cover Amount' : 'జీవిత బీమా మొత్తం'}</label>
                        <input type="number" value={coverAmount} onChange={e => setCoverAmount(Number(e.target.value))} className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-slate-700"/>
                    </div>
                     <div>
                        <label className="block text-sm font-medium mb-1">{language === 'en' ? 'Policy Term (Years)' : 'పాలసీ కాలపరిమితి (సంవత్సరాలు)'}</label>
                        <input type="number" value={policyTerm} onChange={e => setPolicyTerm(Number(e.target.value))} className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-slate-700"/>
                    </div>
                     <div className="flex items-center pt-6">
                        <input type="checkbox" id="smoker" checked={isSmoker} onChange={e => setIsSmoker(e.target.checked)} className="h-5 w-5 rounded text-primary focus:ring-primary"/>
                        <label htmlFor="smoker" className="ml-2 font-medium text-gray-700 dark:text-gray-300">{language === 'en' ? 'I am a smoker' : 'నేను ధూమపానం చేస్తాను'}</label>
                    </div>
                </div>
                <div className="mt-6 bg-light dark:bg-slate-800 p-4 rounded-lg text-center">
                    <p className="flex items-center justify-center text-gray-600 dark:text-gray-400">
                        {language === 'en' ? 'Estimated Annual Premium' : 'అంచనా వార్షిక ప్రీమియం'}
                        <Tooltip text={language === 'en' ? 'This is a rough estimate. Actual premium depends on health, lifestyle, and insurer.' : 'ఇది ఒక సుమారు అంచనా. వాస్తవ ప్రీమియం ఆరోగ్యం, జీవనశైలి మరియు బీమా సంస్థపై ఆధారపడి ఉంటుంది.'} />
                    </p>
                    <p className="text-3xl font-bold text-secondary dark:text-blue-400">{formatCurrency(estimatedPremium)}</p>
                </div>
            </section>
        </div>
    );
};

export default TermPlanCalculator;