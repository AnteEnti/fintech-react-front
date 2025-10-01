import React, { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import Tooltip from '../Tooltip';

interface CalculatorProps {
    initialState?: Record<string, any>;
    onStateChange: (state: Record<string, any>) => void;
}

const AccidentInsuranceCoverageCalculator: React.FC<CalculatorProps> = ({ initialState, onStateChange }) => {
    const { language } = useLanguage();

    const [annualIncome, setAnnualIncome] = useState(initialState?.annualIncome || 1200000);
    const [outstandingLoans, setOutstandingLoans] = useState(initialState?.outstandingLoans || 500000);
    
    useEffect(() => {
        onStateChange({ annualIncome, outstandingLoans });
    }, [annualIncome, outstandingLoans, onStateChange]);

    const { recommendedDeathCover, recommendedPtdCover } = useMemo(() => {
        // Rule of thumb: Accidental Death cover should be ~12-15 times annual income.
        const deathCover = annualIncome * 12 + outstandingLoans;
        // Permanent Total Disability (PTD) cover is often recommended to be 100-125% of the death cover.
        const ptdCover = deathCover * 1.25;
        
        return {
            recommendedDeathCover: deathCover,
            recommendedPtdCover: ptdCover,
        };
    }, [annualIncome, outstandingLoans]);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Input Section */}
            <div className="lg:col-span-2 space-y-6">
                <div>
                    <label htmlFor="annualIncome" className="block text-sm font-medium mb-2">{language === 'en' ? 'Your Annual Income' : 'మీ వార్షిక ఆదాయం'}</label>
                    <input id="annualIncome" type="number" value={annualIncome} onChange={e => setAnnualIncome(Number(e.target.value))} className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700"/>
                </div>
                <div>
                    <label htmlFor="outstandingLoans" className="block text-sm font-medium mb-2">{language === 'en' ? 'Total Outstanding Loans' : 'మొత్తం బాకీ ఉన్న లోన్లు'}</label>
                    <input id="outstandingLoans" type="number" value={outstandingLoans} onChange={e => setOutstandingLoans(Number(e.target.value))} className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700"/>
                </div>
            </div>
            
            {/* Results Section */}
            <div className="lg:col-span-3">
                <div role="status" aria-live="polite" className="bg-light dark:bg-slate-800 p-8 rounded-lg space-y-8 sticky top-24">
                    <div className="text-center">
                        <p className="flex items-center justify-center text-gray-600 dark:text-gray-400">
                            {language === 'en' ? 'Recommended Accidental Death Cover' : 'సిఫార్సు చేయబడిన ప్రమాద మరణ కవర్'}
                            <Tooltip text={language === 'en' ? 'Covers your family\'s financial needs and clears your debts in case of an unfortunate demise due to an accident.' : 'ప్రమాదం కారణంగా దురదృష్టవశాత్తు మరణించిన సందర్భంలో మీ కుటుంబ ఆర్థిక అవసరాలను కవర్ చేస్తుంది మరియు మీ అప్పులను తీరుస్తుంది.'} />
                        </p>
                        <p className="text-4xl font-bold text-primary dark:text-blue-400 my-2">{formatCurrency(recommendedDeathCover)}</p>
                    </div>
                    <div className="text-center">
                        <p className="flex items-center justify-center text-gray-600 dark:text-gray-400">
                            {language === 'en' ? 'Recommended Permanent Total Disability Cover' : 'సిఫార్సు చేయబడిన శాశ్వత మొత్తం వైకల్యం కవర్'}
                             <Tooltip text={language === 'en' ? 'Provides financial support in case an accident leads to a permanent disability, resulting in loss of income.' : 'ప్రమాదం శాశ్వత వైకల్యానికి దారితీసి, ఆదాయాన్ని కోల్పోయిన సందర్భంలో ఆర్థిక సహాయాన్ని అందిస్తుంది.'} />
                        </p>
                        <p className="text-3xl font-semibold text-secondary dark:text-blue-500">{formatCurrency(recommendedPtdCover)}</p>
                    </div>
                     <p className="text-xs text-center text-gray-500 pt-4 border-t dark:border-gray-700">
                        {language === 'en' 
                            ? 'This is a general recommendation. Consult a financial advisor for a personalized plan.' 
                            : 'ఇది ఒక సాధారణ సిఫార్సు. వ్యక్తిగతీకరించిన ప్రణాళిక కోసం ఒక ఆర్థిక సలహాదారుని సంప్రదించండి.'
                        }
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AccidentInsuranceCoverageCalculator;