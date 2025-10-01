import React, { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import Tooltip from '../Tooltip';
import { createValidator } from '../../utils/validation';

interface CalculatorProps {
    initialState?: Record<string, any>;
    onStateChange: (state: Record<string, any>) => void;
}

// FIX: Replaced destructuring with default empty object for `initialState` with optional chaining to prevent TypeScript errors when properties are accessed.
const LoanPrepaymentCalculator: React.FC<CalculatorProps> = ({ initialState, onStateChange }) => {
    const { language } = useLanguage();
    const [loanAmount, setLoanAmount] = useState(initialState?.loanAmount || 5000000);
    const [interestRate, setInterestRate] = useState(initialState?.interestRate || 9);
    const [loanTenure, setLoanTenure] = useState(initialState?.loanTenure || 20); // Years
    const [prepaymentAmount, setPrepaymentAmount] = useState(initialState?.prepaymentAmount || 500000);

    useEffect(() => {
        onStateChange({ loanAmount, interestRate, loanTenure, prepaymentAmount });
    }, [loanAmount, interestRate, loanTenure, prepaymentAmount, onStateChange]);

    const { 
        originalEmi, 
        interestSaved, 
        tenureReduced,
        originalTotalInterest,
        newTotalInterest
    } = useMemo(() => {
        const P = loanAmount;
        const R = interestRate / 12 / 100;
        let N = loanTenure * 12;

        if (P <= 0 || R <= 0 || N <= 0) {
            return { originalEmi: 0, interestSaved: 0, tenureReduced: '0', originalTotalInterest: 0, newTotalInterest: 0 };
        }
        
        const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
        const originalTotalPayment = emi * N;
        const originalInterest = originalTotalPayment - P;

        // After prepayment
        const newPrincipal = P - prepaymentAmount;
        if (newPrincipal <= 0) {
            return { originalEmi: emi, interestSaved: originalInterest, tenureReduced: `${loanTenure} years`, originalTotalInterest: originalInterest, newTotalInterest: 0 };
        }

        const newN = -Math.log(1 - (newPrincipal * R) / emi) / Math.log(1 + R);
        const newTotalPayment = emi * newN;
        const newInterest = newTotalPayment - newPrincipal;
        
        const totalNewInterestPaid = newInterest + (originalInterest - (originalTotalPayment - P)); // Simplified approximation

        const savedInterest = originalInterest - (newInterest);
        
        const monthsReduced = N - Math.ceil(newN);
        const years = Math.floor(monthsReduced / 12);
        const months = monthsReduced % 12;

        return {
            originalEmi: emi,
            interestSaved: savedInterest,
            tenureReduced: `${years} ${language === 'en' ? 'Yrs' : 'సం'} ${months} ${language === 'en' ? 'Mos' : 'నెల'}`,
            originalTotalInterest: originalInterest,
            newTotalInterest: newInterest,
        };

    }, [loanAmount, interestRate, loanTenure, prepaymentAmount, language]);
    
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
                    <label htmlFor="loanAmount" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">{language === 'en' ? 'Outstanding Loan Amount' : 'బాకీ ఉన్న లోన్ మొత్తం'}</label>
                    <div className="relative">
                       <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 dark:text-gray-400">₹</span>
                       <input id="loanAmount" type="number" value={loanAmount} onChange={e => setLoanAmount(Number(e.target.value))} className="w-full p-3 pl-8 border rounded-lg bg-gray-50 dark:bg-slate-700"/>
                    </div>
                </div>
                <div>
                    <label htmlFor="interestRate" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">{language === 'en' ? 'Interest Rate (p.a.)' : 'వడ్డీ రేటు (సం.)'}</label>
                    <div className="relative">
                        <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 dark:text-gray-400">%</span>
                        <input id="interestRate" type="number" value={interestRate} onChange={e => setInterestRate(Number(e.target.value))} className="w-full p-3 pr-8 border rounded-lg bg-gray-50 dark:bg-slate-700"/>
                    </div>
                </div>
                <div>
                    <label htmlFor="loanTenure" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">{language === 'en' ? 'Remaining Tenure (Years)' : 'మిగిలిన కాలపరిమితి (సంవత్సరాలు)'}</label>
                    <input id="loanTenure" type="number" value={loanTenure} onChange={e => setLoanTenure(Number(e.target.value))} className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700"/>
                </div>
                 <div>
                    <label htmlFor="prepaymentAmount" className="flex items-center text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        {language === 'en' ? 'One-time Prepayment Amount' : 'ఒకేసారి ప్రీపేమెంట్ మొత్తం'}
                         <Tooltip text={language === 'en' ? 'The lump sum amount you wish to pay towards your loan principal.' : 'మీ లోన్ అసలు కోసం మీరు చెల్లించాలనుకుంటున్న ఏకమొత్తం.'} />
                    </label>
                    <div className="relative">
                       <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 dark:text-gray-400">₹</span>
                       <input id="prepaymentAmount" type="number" value={prepaymentAmount} onChange={e => setPrepaymentAmount(Number(e.target.value))} className="w-full p-3 pl-8 border rounded-lg bg-gray-50 dark:bg-slate-700"/>
                    </div>
                </div>
            </div>

            {/* Results Section */}
            <div className="lg:col-span-3">
                 <div role="status" aria-live="polite" className="bg-light dark:bg-slate-800 p-8 rounded-lg space-y-8 sticky top-24">
                    <div className="text-center">
                        <p className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Total Interest Saved' : 'మొత్తం ఆదా చేసిన వడ్డీ'}</p>
                        <p className="text-5xl font-bold text-green-600 dark:text-green-500">{formatCurrency(interestSaved)}</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-center">
                         <div>
                            <p className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Tenure Reduced By' : 'కాలపరిమితి తగ్గుదల'}</p>
                            <p className="text-2xl font-semibold text-primary dark:text-blue-400">{tenureReduced}</p>
                        </div>
                        <div>
                            <p className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Your Current EMI' : 'మీ ప్రస్తుత EMI'}</p>
                            <p className="text-2xl font-semibold">{formatCurrency(originalEmi)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoanPrepaymentCalculator;
