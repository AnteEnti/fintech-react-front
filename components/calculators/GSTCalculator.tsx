import React, { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { createValidator } from '../../utils/validation';

interface CalculatorProps {
    initialState?: Record<string, any>;
    onStateChange: (state: Record<string, any>) => void;
}

// FIX: Replaced destructuring with default empty object for `initialState` with optional chaining to prevent TypeScript errors when properties are accessed.
const GSTCalculator: React.FC<CalculatorProps> = ({ initialState, onStateChange }) => {
    const { language } = useLanguage();
    const [amount, setAmount] = useState(initialState?.amount || 1000);
    const [gstRate, setGstRate] = useState(initialState?.gstRate || 18);
    const [calculationType, setCalculationType] = useState(initialState?.calculationType || 'add'); // 'add' or 'remove'
    const [error, setError] = useState('');

    const validator = createValidator(language);

    useEffect(() => {
        onStateChange({ amount, gstRate, calculationType });
    }, [amount, gstRate, calculationType, onStateChange]);

    const handleValidation = (value: number) => {
        setError(validator.isPositive(value) || '');
    };

    const { baseAmount, gstAmount, totalAmount } = useMemo(() => {
        let base = 0, gst = 0, total = 0;
        const rate = gstRate / 100;

        if (calculationType === 'add') {
            base = amount;
            gst = amount * rate;
            total = base + gst;
        } else { // remove GST
            total = amount;
            base = amount / (1 + rate);
            gst = total - base;
        }

        return {
            baseAmount: base,
            gstAmount: gst,
            totalAmount: total
        };
    }, [amount, gstRate, calculationType]);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(value);
    };

    const gstRates = [5, 12, 18, 28];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Input Section */}
            <div className="lg:col-span-2 space-y-6">
                <div>
                    <label htmlFor="amount" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">{language === 'en' ? 'Amount' : 'మొత్తం'}</label>
                    <div className="relative">
                       <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 dark:text-gray-400">₹</span>
                       <input id="amount" type="number" value={amount} onChange={e => { setAmount(Number(e.target.value)); handleValidation(Number(e.target.value)) }} className={`w-full p-3 pl-8 border rounded-lg bg-gray-50 dark:bg-slate-700 ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}/>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">{language === 'en' ? 'GST Rate' : 'GST రేటు'}</label>
                    <div className="flex flex-wrap gap-2">
                        {gstRates.map(rate => (
                            <button
                                key={rate}
                                onClick={() => setGstRate(rate)}
                                className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${gstRate === rate ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600'}`}
                            >
                                {rate}%
                            </button>
                        ))}
                    </div>
                </div>
                <div>
                    <fieldset>
                        <legend className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">{language === 'en' ? 'Calculation Type' : 'గణన రకం'}</legend>
                        <div className="flex gap-4">
                            <div className="flex items-center">
                                <input type="radio" id="addGst" name="calcType" value="add" checked={calculationType === 'add'} onChange={e => setCalculationType(e.target.value)} className="h-4 w-4 text-primary focus:ring-primary border-gray-300"/>
                                <label htmlFor="addGst" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">{language === 'en' ? 'Add GST' : 'GST జోడించు'}</label>
                            </div>
                            <div className="flex items-center">
                                <input type="radio" id="removeGst" name="calcType" value="remove" checked={calculationType === 'remove'} onChange={e => setCalculationType(e.target.value)} className="h-4 w-4 text-primary focus:ring-primary border-gray-300"/>
                                <label htmlFor="removeGst" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">{language === 'en' ? 'Remove GST' : 'GST తీసివేయి'}</label>
                            </div>
                        </div>
                    </fieldset>
                </div>
            </div>

            {/* Results Section */}
            <div className="lg:col-span-3">
                <div role="status" aria-live="polite" className="bg-light dark:bg-slate-800 p-8 rounded-lg space-y-6 sticky top-24">
                    <div className="text-center">
                        <p className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Total Amount (Inc. GST)' : 'మొత్తం మొత్తం (GST తో)'}</p>
                        <p className="text-4xl font-bold text-primary dark:text-blue-400">{formatCurrency(totalAmount)}</p>
                    </div>
                     <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Base Amount' : 'ప్రాథమిక మొత్తం'}</span>
                            <span className="font-semibold text-lg">{formatCurrency(baseAmount)}</span>
                        </div>
                         <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'GST Amount' : 'GST మొత్తం'} ({gstRate}%)</span>
                            <span className="font-semibold text-lg">{formatCurrency(gstAmount)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GSTCalculator;
