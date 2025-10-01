import React, { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import Tooltip from '../Tooltip';

interface CalculatorProps {
    initialState?: Record<string, any>;
    onStateChange: (state: Record<string, any>) => void;
}

// FIX: Replaced destructuring with default empty object for `initialState` with optional chaining to prevent TypeScript errors when properties are accessed.
const BalanceTransferCalculator: React.FC<CalculatorProps> = ({ initialState, onStateChange }) => {
    const { language } = useLanguage();
    // Existing Loan
    const [outstandingPrincipal, setOutstandingPrincipal] = useState(initialState?.outstandingPrincipal || 2000000);
    const [existingRate, setExistingRate] = useState(initialState?.existingRate || 9.5);
    const [remainingTenure, setRemainingTenure] = useState(initialState?.remainingTenure || 15); // Years

    // New Loan Offer
    const [newRate, setNewRate] = useState(initialState?.newRate || 8.5);
    const [processingFee, setProcessingFee] = useState(initialState?.processingFee || 1); // Percentage

    useEffect(() => {
        onStateChange({ outstandingPrincipal, existingRate, remainingTenure, newRate, processingFee });
    }, [outstandingPrincipal, existingRate, remainingTenure, newRate, processingFee, onStateChange]);
    
    const { totalSavings, newEmi, oldEmi } = useMemo(() => {
        const P = outstandingPrincipal;
        const R1 = existingRate / 12 / 100;
        const N = remainingTenure * 12;

        if (P <= 0 || N <= 0) return { totalSavings: 0, newEmi: 0, oldEmi: 0 };
        
        // Old loan calculation
        const emi1 = (P * R1 * Math.pow(1 + R1, N)) / (Math.pow(1 + R1, N) - 1);
        const totalPayment1 = emi1 * N;

        // New loan calculation
        const R2 = newRate / 12 / 100;
        const feeAmount = (P * processingFee) / 100;
        const emi2 = (P * R2 * Math.pow(1 + R2, N)) / (Math.pow(1 + R2, N) - 1);
        const totalPayment2 = (emi2 * N) + feeAmount;

        const savings = totalPayment1 - totalPayment2;
        
        return {
            totalSavings: savings,
            newEmi: emi2,
            oldEmi: emi1,
        };

    }, [outstandingPrincipal, existingRate, remainingTenure, newRate, processingFee]);
    
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Input Section */}
            <div className="space-y-8">
                <div>
                    <h3 className="text-xl font-semibold text-primary dark:text-blue-300 mb-4 border-b pb-2">{language === 'en' ? 'Existing Loan Details' : 'ఇప్పటికే ఉన్న లోన్ వివరాలు'}</h3>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="outstandingPrincipal" className="block text-sm font-medium mb-1">{language === 'en' ? 'Outstanding Principal' : 'బాకీ ఉన్న అసలు'}</label>
                            <input id="outstandingPrincipal" type="number" value={outstandingPrincipal} onChange={e => setOutstandingPrincipal(Number(e.target.value))} className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-slate-700"/>
                        </div>
                        <div>
                            <label htmlFor="existingRate" className="block text-sm font-medium mb-1">{language === 'en' ? 'Existing Interest Rate (%)' : 'ఇప్పటికే ఉన్న వడ్డీ రేటు (%)'}</label>
                            <input id="existingRate" type="number" step="0.01" value={existingRate} onChange={e => setExistingRate(Number(e.target.value))} className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-slate-700"/>
                        </div>
                        <div>
                            <label htmlFor="remainingTenure" className="block text-sm font-medium mb-1">{language === 'en' ? 'Remaining Tenure (Years)' : 'మిగిలిన కాలపరిమితి (సంవత్సరాలు)'}</label>
                            <input id="remainingTenure" type="number" value={remainingTenure} onChange={e => setRemainingTenure(Number(e.target.value))} className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-slate-700"/>
                        </div>
                    </div>
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-primary dark:text-blue-300 mb-4 border-b pb-2">{language === 'en' ? 'New Loan Offer' : 'కొత్త లోన్ ఆఫర్'}</h3>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="newRate" className="block text-sm font-medium mb-1">{language === 'en' ? 'New Interest Rate (%)' : 'కొత్త వడ్డీ రేటు (%)'}</label>
                            <input id="newRate" type="number" step="0.01" value={newRate} onChange={e => setNewRate(Number(e.target.value))} className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-slate-700"/>
                        </div>
                        <div>
                            <label htmlFor="processingFee" className="flex items-center text-sm font-medium mb-1">
                                {language === 'en' ? 'Processing Fee (%)' : 'ప్రాసెసింగ్ ఫీజు (%)'}
                                <Tooltip text={language === 'en' ? 'The fee charged by the new lender to process your balance transfer application.' : 'మీ బ్యాలెన్స్ బదిలీ దరఖాస్తును ప్రాసెస్ చేయడానికి కొత్త రుణదాత వసూలు చేసే రుసుము.'} />
                            </label>
                            <input id="processingFee" type="number" step="0.1" value={processingFee} onChange={e => setProcessingFee(Number(e.target.value))} className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-slate-700"/>
                        </div>
                    </div>
                </div>
            </div>

            {/* Results Section */}
            <div>
                 <div role="status" aria-live="polite" className="bg-light dark:bg-slate-800 p-8 rounded-lg space-y-8 sticky top-24">
                    <div className="text-center">
                        <p className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Total Potential Savings' : 'మొత్తం సంభావ్య పొదుపు'}</p>
                        <p className={`text-5xl font-bold ${totalSavings > 0 ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
                            {formatCurrency(totalSavings)}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-center">
                         <div>
                            <p className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Old EMI' : 'పాత EMI'}</p>
                            <p className="text-2xl font-semibold line-through">{formatCurrency(oldEmi)}</p>
                        </div>
                        <div>
                            <p className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'New EMI' : 'కొత్త EMI'}</p>
                            <p className="text-2xl font-semibold text-primary dark:text-blue-400">{formatCurrency(newEmi)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BalanceTransferCalculator;
