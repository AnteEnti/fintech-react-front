import React, { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import Tooltip from '../Tooltip';
import { createValidator } from '../../utils/validation';

interface CalculatorProps {
    initialState?: Record<string, any>;
    onStateChange: (state: Record<string, any>) => void;
}

const FreelancerIncomeTaxCalculator: React.FC<CalculatorProps> = ({ initialState, onStateChange }) => {
    const { language } = useLanguage();
    const [grossIncome, setGrossIncome] = useState(initialState?.grossIncome || 1500000);
    const [use44ADA, setUse44ADA] = useState(initialState?.use44ADA !== undefined ? initialState.use44ADA : true);
    const [businessExpenses, setBusinessExpenses] = useState(initialState?.businessExpenses || 400000);
    const [errors, setErrors] = useState({ grossIncome: '', businessExpenses: '' });
    
    const validator = createValidator(language);

    useEffect(() => {
        onStateChange({ grossIncome, use44ADA, businessExpenses });
    }, [grossIncome, use44ADA, businessExpenses, onStateChange]);

    const handleValidation = (field: string, value: number) => {
        const error = validator.isNonNegative(value);
        setErrors(prev => ({ ...prev, [field]: error || '' }));
    };

    const { taxableIncome, taxPayable } = useMemo(() => {
        const income = use44ADA ? Math.max(grossIncome * 0.5, grossIncome - businessExpenses) : grossIncome - businessExpenses;
        let taxable = Math.max(0, income);

        // Simplified New Tax Regime calculation
        if (taxable <= 300000) {
            return { taxableIncome: taxable, taxPayable: 0 };
        }
        
        let tax = 0;
        if (taxable > 300000) tax += Math.min(300000, taxable - 300000) * 0.05;
        if (taxable > 600000) tax += Math.min(300000, taxable - 600000) * 0.10;
        if (taxable > 900000) tax += Math.min(300000, taxable - 900000) * 0.15;
        if (taxable > 1200000) tax += Math.min(300000, taxable - 1200000) * 0.20;
        if (taxable > 1500000) tax += (taxable - 1500000) * 0.30;
        
        const cess = tax * 0.04;
        const totalTax = tax + cess;

        return { taxableIncome: taxable, taxPayable: totalTax };
    }, [grossIncome, use44ADA, businessExpenses]);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            <div className="lg:col-span-2 space-y-6">
                <div>
                    <label htmlFor="grossIncome" className="block text-sm font-medium mb-2">{language === 'en' ? 'Gross Annual Income' : 'స్థూల వార్షిక ఆదాయం'}</label>
                    <input id="grossIncome" type="number" value={grossIncome} onChange={e => { setGrossIncome(Number(e.target.value)); handleValidation('grossIncome', Number(e.target.value)) }} className={`w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700 ${errors.grossIncome ? 'border-red-500' : ''}`}/>
                </div>
                <div className="flex items-center pt-2">
                    <input type="checkbox" id="use44ada" checked={use44ADA} onChange={e => setUse44ADA(e.target.checked)} className="h-5 w-5 rounded text-primary focus:ring-primary"/>
                    <label htmlFor="use44ada" className="ml-2 font-medium">{language === 'en' ? 'Use Presumptive Taxation (44ADA)' : 'ప్రిజంప్టివ్ టాక్సేషన్ (44ADA) ఉపయోగించండి'}</label>
                    <Tooltip text={language === 'en' ? 'Declare 50% of your gross income as profit. Simpler compliance, no need to maintain books.' : 'మీ స్థూల ఆదాయంలో 50% లాభంగా ప్రకటించండి. సరళమైన వర్తింపు, పుస్తకాలను నిర్వహించాల్సిన అవసరం లేదు.'} />
                </div>
                <div className={`transition-opacity duration-300 ${use44ADA ? 'opacity-50' : 'opacity-100'}`}>
                    <label htmlFor="businessExpenses" className="block text-sm font-medium mb-2">{language === 'en' ? 'Total Annual Business Expenses' : 'మొత్తం వార్షిక వ్యాపార ఖర్చులు'}</label>
                    <input id="businessExpenses" type="number" value={businessExpenses} onChange={e => { setBusinessExpenses(Number(e.target.value)); handleValidation('businessExpenses', Number(e.target.value)) }} disabled={use44ADA} className={`w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700 ${errors.businessExpenses ? 'border-red-500' : ''} disabled:cursor-not-allowed`}/>
                </div>
            </div>

            <div className="lg:col-span-3">
                <div role="status" aria-live="polite" className="bg-light dark:bg-slate-800 p-8 rounded-lg space-y-6 sticky top-24">
                    <div className="text-center">
                        <p className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Estimated Tax Payable' : 'అంచనా వేసిన పన్ను'}</p>
                        <p className="text-5xl font-bold text-primary dark:text-blue-400">{formatCurrency(taxPayable)}</p>
                    </div>
                    <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between">
                            <span>{language === 'en' ? 'Taxable Income' : 'పన్ను విధించదగిన ఆదాయం'}</span>
                            <span className="font-semibold text-lg">{formatCurrency(taxableIncome)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FreelancerIncomeTaxCalculator;