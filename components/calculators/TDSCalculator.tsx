import React, { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';

interface CalculatorProps {
    initialState?: Record<string, any>;
    onStateChange: (state: Record<string, any>) => void;
}

// FIX: Replaced destructuring with default empty object for `initialState` with optional chaining to prevent TypeScript errors when properties are accessed.
const TDSCalculator: React.FC<CalculatorProps> = ({ initialState, onStateChange }) => {
    const { language } = useLanguage();
    const [interestIncome, setInterestIncome] = useState(initialState?.interestIncome || 55000);
    const [isSenior, setIsSenior] = useState(initialState?.isSenior !== undefined ? initialState?.isSenior : false);

    useEffect(() => {
        onStateChange({ interestIncome, isSenior });
    }, [interestIncome, isSenior, onStateChange]);

    const { tdsAmount, tdsRate, threshold } = useMemo(() => {
        const limit = isSenior ? 50000 : 40000;
        let rate = 0;
        let tds = 0;

        if (interestIncome > limit) {
            rate = 10; // Assuming PAN is provided
            tds = interestIncome * (rate / 100);
        }

        return {
            tdsAmount: tds,
            tdsRate: rate,
            threshold: limit
        };
    }, [interestIncome, isSenior]);
    
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
                    <label htmlFor="interestIncome" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">{language === 'en' ? 'Total Annual Interest from FDs' : 'FDల నుండి మొత్తం వార్షిక వడ్డీ'}</label>
                    <div className="relative">
                       <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 dark:text-gray-400">₹</span>
                       <input id="interestIncome" type="number" value={interestIncome} onChange={e => setInterestIncome(Number(e.target.value))} className="w-full p-3 pl-8 border rounded-lg bg-gray-50 dark:bg-slate-700"/>
                    </div>
                </div>
                 <div className="flex items-center pt-2">
                    <input type="checkbox" id="senior" checked={isSenior} onChange={e => setIsSenior(e.target.checked)} className="h-5 w-5 rounded text-primary focus:ring-primary"/>
                    <label htmlFor="senior" className="ml-2 font-medium text-gray-700 dark:text-gray-300">{language === 'en' ? 'I am a senior citizen' : 'నేను సీనియర్ సిటిజన్‌ని'}</label>
                </div>
            </div>

            {/* Results Section */}
            <div className="lg:col-span-3">
                 <div role="status" aria-live="polite" className="bg-light dark:bg-slate-800 p-8 rounded-lg space-y-8 sticky top-24">
                    <div className="text-center">
                        <p className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Tax Deducted at Source (TDS)' : 'మూలం వద్ద పన్ను మినహాయింపు (TDS)'}</p>
                        <p className="text-5xl font-bold text-primary dark:text-blue-400">{formatCurrency(tdsAmount)}</p>
                    </div>
                    <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Applicable TDS Rate' : 'వర్తించే TDS రేటు'}</span>
                            <span className="font-semibold text-lg">{tdsRate}%</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'TDS Threshold' : 'TDS పరిమితి'}</span>
                            <span className="font-semibold text-lg">{formatCurrency(threshold)}</span>
                        </div>
                    </div>
                     <p className="text-xs text-gray-500 text-center">{language === 'en' ? 'Note: Assumes PAN is linked. Without PAN, the TDS rate is 20%.' : 'గమనిక: PAN లింక్ చేయబడిందని భావించబడింది. PAN లేకుండా, TDS రేటు 20%.'}</p>
                </div>
            </div>
        </div>
    );
};

export default TDSCalculator;