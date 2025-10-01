import React, { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import Tooltip from '../Tooltip';

interface CalculatorProps {
    initialState?: Record<string, any>;
    onStateChange: (state: Record<string, any>) => void;
}

// FIX: Replaced destructuring with default empty object for `initialState` with optional chaining to prevent TypeScript errors when properties are accessed.
const HousePropertyIncomeTaxCalculator: React.FC<CalculatorProps> = ({ initialState, onStateChange }) => {
    const { language } = useLanguage();
    const [grossRent, setGrossRent] = useState(initialState?.grossRent || 240000); // Annual
    const [municipalTaxes, setMunicipalTaxes] = useState(initialState?.municipalTaxes || 10000); // Annual
    const [homeLoanInterest, setHomeLoanInterest] = useState(initialState?.homeLoanInterest || 150000); // Annual

    useEffect(() => {
        onStateChange({ grossRent, municipalTaxes, homeLoanInterest });
    }, [grossRent, municipalTaxes, homeLoanInterest, onStateChange]);

    const {
        netAnnualValue,
        standardDeduction,
        finalIncome
    } = useMemo(() => {
        const nav = Math.max(0, grossRent - municipalTaxes);
        const deduction = nav * 0.30;
        const income = nav - deduction - homeLoanInterest;
        return {
            netAnnualValue: nav,
            standardDeduction: deduction,
            finalIncome: income
        };
    }, [grossRent, municipalTaxes, homeLoanInterest]);

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
                    <label htmlFor="grossRent" className="block text-sm font-medium mb-2">{language === 'en' ? 'Gross Annual Rent Received' : 'అందుకున్న స్థూల వార్షిక అద్దె'}</label>
                    <input id="grossRent" type="number" value={grossRent} onChange={e => setGrossRent(Number(e.target.value))} className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700"/>
                </div>
                <div>
                    <label htmlFor="municipalTaxes" className="block text-sm font-medium mb-2">{language === 'en' ? 'Municipal Taxes Paid (Annual)' : 'చెల్లించిన మునిసిపల్ పన్నులు (వార్షిక)'}</label>
                    <input id="municipalTaxes" type="number" value={municipalTaxes} onChange={e => setMunicipalTaxes(Number(e.target.value))} className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700"/>
                </div>
                <div>
                    <label htmlFor="homeLoanInterest" className="flex items-center text-sm font-medium mb-2">
                        {language === 'en' ? 'Interest on Home Loan (Annual)' : 'గృహ రుణంపై వడ్డీ (వార్షిక)'}
                        <Tooltip text={language === 'en' ? 'Enter the total interest portion of your home loan EMIs paid during the year for this property.' : 'ఈ ఆస్తి కోసం సంవత్సరంలో చెల్లించిన మీ గృహ రుణ EMIల మొత్తం వడ్డీ భాగాన్ని నమోదు చేయండి.'} />
                    </label>
                    <input id="homeLoanInterest" type="number" value={homeLoanInterest} onChange={e => setHomeLoanInterest(Number(e.target.value))} className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700"/>
                </div>
            </div>

            {/* Results Section */}
            <div className="lg:col-span-3">
                 <div role="status" aria-live="polite" className="bg-light dark:bg-slate-800 p-6 rounded-lg space-y-6 sticky top-24">
                    <div className="text-center pb-4 border-b dark:border-gray-700">
                        <p className="text-gray-600 dark:text-gray-400">{finalIncome >= 0 ? (language === 'en' ? 'Taxable Income from House Property' : 'గృహ ఆస్తి నుండి పన్ను విధించదగిన ఆదాయం') : (language === 'en' ? 'Loss from House Property' : 'గృహ ఆస్తి నుండి నష్టం')}</p>
                        <p className={`text-4xl font-bold ${finalIncome >= 0 ? 'text-primary dark:text-blue-400' : 'text-red-500'}`}>{formatCurrency(Math.abs(finalIncome))}</p>
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span>{language === 'en' ? 'Gross Annual Rent' : 'స్థూల వార్షిక అద్దె'}</span>
                            <span>{formatCurrency(grossRent)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>(-) {language === 'en' ? 'Municipal Taxes' : 'మునిసిపల్ పన్నులు'}</span>
                            <span>{formatCurrency(municipalTaxes)}</span>
                        </div>
                        <div className="flex justify-between font-bold border-t pt-2 dark:border-gray-700">
                            <span>{language === 'en' ? 'Net Annual Value (NAV)' : 'నికర వార్షిక విలువ (NAV)'}</span>
                            <span>{formatCurrency(netAnnualValue)}</span>
                        </div>
                         <div className="flex justify-between">
                            <span>(-) {language === 'en' ? 'Standard Deduction (30%)' : 'ప్రామాణిక తగ్గింపు (30%)'}</span>
                            <span>{formatCurrency(standardDeduction)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>(-) {language === 'en' ? 'Interest on Home Loan' : 'గృహ రుణంపై వడ్డీ'}</span>
                            <span>{formatCurrency(homeLoanInterest)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HousePropertyIncomeTaxCalculator;
