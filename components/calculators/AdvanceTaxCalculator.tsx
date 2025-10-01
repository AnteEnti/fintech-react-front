import React, { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';

interface CalculatorProps {
    initialState?: Record<string, any>;
    onStateChange: (state: Record<string, any>) => void;
}

// FIX: Replaced destructuring with default empty object for `initialState` with optional chaining to prevent TypeScript errors when properties are accessed.
const AdvanceTaxCalculator: React.FC<CalculatorProps> = ({ initialState, onStateChange }) => {
    const { language } = useLanguage();
    const [annualIncome, setAnnualIncome] = useState(initialState?.annualIncome || 1200000);
    const [deductions, setDeductions] = useState(initialState?.deductions || 150000);

    useEffect(() => {
        onStateChange({ annualIncome, deductions });
    }, [annualIncome, deductions, onStateChange]);

    const totalTax = useMemo(() => {
        // Using New Tax Regime logic for simplicity
        let taxableIncome = Math.max(0, annualIncome - deductions);
        if (taxableIncome <= 300000) return 0;

        let tax = 0;
        if (taxableIncome > 300000) tax += Math.min(300000, taxableIncome - 300000) * 0.05;
        if (taxableIncome > 600000) tax += Math.min(300000, taxableIncome - 600000) * 0.10;
        if (taxableIncome > 900000) tax += Math.min(300000, taxableIncome - 900000) * 0.15;
        if (taxableIncome > 1200000) tax += Math.min(300000, taxableIncome - 1200000) * 0.20;
        if (taxableIncome > 1500000) tax += (taxableIncome - 1500000) * 0.30;
        
        const cess = tax * 0.04;
        return tax + cess;
    }, [annualIncome, deductions]);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    const installments = [
        { due: language === 'en' ? 'By 15th June' : 'జూన్ 15 నాటికి', percent: 15, amount: totalTax * 0.15 },
        { due: language === 'en' ? 'By 15th September' : 'సెప్టెంబర్ 15 నాటికి', percent: 45, amount: totalTax * 0.45 },
        { due: language === 'en' ? 'By 15th December' : 'డిసెంబర్ 15 నాటికి', percent: 75, amount: totalTax * 0.75 },
        { due: language === 'en' ? 'By 15th March' : 'మార్చి 15 నాటికి', percent: 100, amount: totalTax },
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Input Section */}
            <div className="lg:col-span-2 space-y-6">
                 <div>
                    <label htmlFor="annualIncome" className="block text-sm font-medium mb-2">{language === 'en' ? 'Estimated Annual Income' : 'అంచనా వార్షిక ఆదాయం'}</label>
                    <input id="annualIncome" type="number" value={annualIncome} onChange={e => setAnnualIncome(Number(e.target.value))} className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700"/>
                </div>
                <div>
                    <label htmlFor="deductions" className="block text-sm font-medium mb-2">{language === 'en' ? 'Estimated Deductions (80C, etc.)' : 'అంచనా తగ్గింపులు (80C, మొదలైనవి)'}</label>
                    <input id="deductions" type="number" value={deductions} onChange={e => setDeductions(Number(e.target.value))} className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700"/>
                </div>
            </div>

            {/* Results Section */}
            <div className="lg:col-span-3">
                 <div role="status" aria-live="polite" className="bg-light dark:bg-slate-800 p-6 rounded-lg space-y-6 sticky top-24">
                    <div className="text-center mb-4">
                        <p className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Total Estimated Tax Liability' : 'మొత్తం అంచనా పన్ను బాధ్యత'}</p>
                        <p className="text-4xl font-bold text-primary dark:text-blue-400">{formatCurrency(totalTax)}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-3 text-center">{language === 'en' ? 'Advance Tax Installments' : 'అడ్వాన్స్ టాక్స్ వాయిదాలు'}</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-gray-100 dark:bg-slate-700">
                                    <tr>
                                        <th className="p-2">{language === 'en' ? 'Due Date' : 'గడువు తేదీ'}</th>
                                        <th className="p-2 text-right">{language === 'en' ? 'Payable' : 'చెల్లించవలసినది'}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {installments.map(inst => (
                                        <tr key={inst.due} className="border-b dark:border-gray-700">
                                            <td className="p-2">{inst.due} ({inst.percent}%)</td>
                                            <td className="p-2 text-right font-medium">{formatCurrency(inst.amount)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdvanceTaxCalculator;
