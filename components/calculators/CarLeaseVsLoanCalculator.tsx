import React, { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import Tooltip from '../Tooltip';

interface CalculatorProps {
    initialState?: Record<string, any>;
    onStateChange: (state: Record<string, any>) => void;
}

// FIX: Replaced destructuring with default empty object for `initialState` with optional chaining to prevent TypeScript errors when properties are accessed.
const CarLeaseVsLoanCalculator: React.FC<CalculatorProps> = ({ initialState, onStateChange }) => {
    const { language } = useLanguage();

    // Common
    const [carPrice, setCarPrice] = useState(initialState?.carPrice || 1500000);
    const [downPayment, setDownPayment] = useState(initialState?.downPayment || 300000);
    const [term, setTerm] = useState(initialState?.term || 5); // Years

    // Loan
    const [loanRate, setLoanRate] = useState(initialState?.loanRate || 9);
    
    // Lease
    const [monthlyLease, setMonthlyLease] = useState(initialState?.monthlyLease || 25000);
    
    useEffect(() => {
        onStateChange({ carPrice, downPayment, term, loanRate, monthlyLease });
    }, [carPrice, downPayment, term, loanRate, monthlyLease, onStateChange]);
    

    const { totalLoanCost, totalLeaseCost, monthlyEmi } = useMemo(() => {
        // Loan Calculation
        const P = carPrice - downPayment;
        const R = loanRate / 12 / 100;
        const N = term * 12;
        
        let emi = 0;
        let loanCost = downPayment;
        if (P > 0 && R > 0 && N > 0) {
            emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
            loanCost = (emi * N) + downPayment;
        }

        // Lease Calculation
        const leaseCost = (monthlyLease * N) + downPayment;

        return {
            totalLoanCost: loanCost,
            totalLeaseCost: leaseCost,
            monthlyEmi: emi
        };
    }, [carPrice, downPayment, term, loanRate, monthlyLease]);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    return (
        <div className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Loan Inputs */}
                <div className="space-y-4 p-6 bg-blue-50 dark:bg-slate-800 rounded-lg">
                     <h3 className="text-xl font-semibold text-primary dark:text-blue-300">{language === 'en' ? 'Buying with a Loan' : 'లోన్‌తో కొనడం'}</h3>
                     <div>
                        <label htmlFor="carPrice" className="block text-sm font-medium mb-1">{language === 'en' ? 'Car On-Road Price' : 'కారు ఆన్-రోడ్ ధర'}</label>
                        <input id="carPrice" type="number" value={carPrice} onChange={e => setCarPrice(Number(e.target.value))} className="w-full p-2 border rounded-lg bg-white dark:bg-slate-700"/>
                    </div>
                     <div>
                        <label htmlFor="downPayment" className="block text-sm font-medium mb-1">{language === 'en' ? 'Down Payment' : 'డౌన్ పేమెంట్'}</label>
                        <input id="downPayment" type="number" value={downPayment} onChange={e => setDownPayment(Number(e.target.value))} className="w-full p-2 border rounded-lg bg-white dark:bg-slate-700"/>
                    </div>
                     <div>
                        <label htmlFor="term" className="block text-sm font-medium mb-1">{language === 'en' ? 'Loan/Lease Term (Years)' : 'లోన్/లీజు కాలపరిమితి (సంవత్సరాలు)'}</label>
                        <input id="term" type="number" value={term} onChange={e => setTerm(Number(e.target.value))} className="w-full p-2 border rounded-lg bg-white dark:bg-slate-700"/>
                    </div>
                    <div>
                        <label htmlFor="loanRate" className="block text-sm font-medium mb-1">{language === 'en' ? 'Loan Interest Rate (%)' : 'లోన్ వడ్డీ రేటు (%)'}</label>
                        <input id="loanRate" type="number" value={loanRate} onChange={e => setLoanRate(Number(e.target.value))} className="w-full p-2 border rounded-lg bg-white dark:bg-slate-700"/>
                    </div>
                </div>

                {/* Lease Inputs */}
                <div className="space-y-4 p-6 bg-orange-50 dark:bg-slate-800 rounded-lg">
                    <h3 className="text-xl font-semibold text-accent dark:text-orange-400">{language === 'en' ? 'Leasing a Car' : 'కారును లీజుకు తీసుకోవడం'}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Fill in the common details on the left, and the lease payment below.' : 'ఎడమ వైపున సాధారణ వివరాలను మరియు క్రింద లీజు చెల్లింపును పూరించండి.'}</p>
                    <div>
                        <label htmlFor="monthlyLease" className="flex items-center text-sm font-medium mb-1">
                            {language === 'en' ? 'Monthly Lease Payment' : 'నెలవారీ లీజు చెల్లింపు'}
                             <Tooltip text={language === 'en' ? 'The fixed monthly amount you pay to lease the car.' : 'కారును లీజుకు తీసుకోవడానికి మీరు చెల్లించే స్థిర నెలవారీ మొత్తం.'} />
                        </label>
                        <input id="monthlyLease" type="number" value={monthlyLease} onChange={e => setMonthlyLease(Number(e.target.value))} className="w-full p-2 border rounded-lg bg-white dark:bg-slate-700"/>
                    </div>
                </div>
            </div>

             {/* Results Section */}
            <div role="status" aria-live="polite" className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                <div className="bg-light dark:bg-dark p-6 rounded-lg text-center border-2 border-primary">
                    <h4 className="text-lg font-bold mb-4">{language === 'en' ? 'Loan Summary' : 'లోన్ సారాంశం'}</h4>
                    <p className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Monthly EMI' : 'నెలవారీ EMI'}</p>
                    <p className="text-3xl font-bold text-primary dark:text-blue-400 mb-4">{formatCurrency(monthlyEmi)}</p>
                    <p className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Total Cost of Ownership' : 'మొత్తం యాజమాన్య ఖర్చు'}</p>
                    <p className="text-3xl font-bold">{formatCurrency(totalLoanCost)}</p>
                </div>
                 <div className="bg-light dark:bg-dark p-6 rounded-lg text-center border-2 border-accent">
                    <h4 className="text-lg font-bold mb-4">{language === 'en' ? 'Lease Summary' : 'లీజు సారాంశం'}</h4>
                    <p className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Monthly Payment' : 'నెలవారీ చెల్లింపు'}</p>
                    <p className="text-3xl font-bold text-accent dark:text-orange-400 mb-4">{formatCurrency(monthlyLease)}</p>
                    <p className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Total Cost of Leasing' : 'లీజు మొత్తం ఖర్చు'}</p>
                    <p className="text-3xl font-bold">{formatCurrency(totalLeaseCost)}</p>
                </div>
            </div>
             <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                {language === 'en' 
                    ? 'Note: Loan results in ownership of the car, which has a resale value not factored here. Leasing does not.' 
                    : 'గమనిక: లోన్ ఫలితంగా కారు యాజమాన్యం వస్తుంది, దానికి ఇక్కడ పరిగణించని పునఃవిక్రయం విలువ ఉంటుంది. లీజుకు ఉండదు.'
                }
            </p>
        </div>
    );
};

export default CarLeaseVsLoanCalculator;
