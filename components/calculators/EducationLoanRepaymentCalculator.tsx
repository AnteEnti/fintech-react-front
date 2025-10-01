import React, { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import Tooltip from '../Tooltip';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip as ChartTooltip, Legend } from 'chart.js';
import useBreakpoint from '../../hooks/useBreakpoint';

ChartJS.register(ArcElement, ChartTooltip, Legend);

interface CalculatorProps {
    initialState?: Record<string, any>;
    onStateChange: (state: Record<string, any>) => void;
}

// FIX: Replaced destructuring with default empty object for `initialState` with optional chaining to prevent TypeScript errors when properties are accessed.
const EducationLoanRepaymentCalculator: React.FC<CalculatorProps> = ({ initialState, onStateChange }) => {
    const { language, theme } = useLanguage();
    const [loanAmount, setLoanAmount] = useState(initialState?.loanAmount || 1000000);
    const [interestRate, setInterestRate] = useState(initialState?.interestRate || 10.5);
    const [loanTenure, setLoanTenure] = useState(initialState?.loanTenure || 10);
    const [moratoriumPeriod, setMoratoriumPeriod] = useState(initialState?.moratoriumPeriod || 12); // in Months
    
    const isMd = useBreakpoint('md');

    useEffect(() => {
        onStateChange({ loanAmount, interestRate, loanTenure, moratoriumPeriod });
    }, [loanAmount, interestRate, loanTenure, moratoriumPeriod, onStateChange]);
    
    const { emi, totalInterest, totalPayment, principalAfterMoratorium } = useMemo(() => {
        const P = loanAmount;
        const R = interestRate / 100;
        const T_moratorium = moratoriumPeriod / 12;

        if (P <= 0) return { emi: 0, totalInterest: 0, totalPayment: 0, principalAfterMoratorium: 0 };
        
        // Simple interest accrued during moratorium
        const moratoriumInterest = P * R * T_moratorium;
        const newPrincipal = P + moratoriumInterest;
        
        // EMI calculation on the new principal
        const R_monthly = interestRate / 12 / 100;
        const N = loanTenure * 12;
        
        const emiValue = (newPrincipal * R_monthly * Math.pow(1 + R_monthly, N)) / (Math.pow(1 + R_monthly, N) - 1);
        const totalPaymentValue = emiValue * N;
        const totalInterestValue = moratoriumInterest + (totalPaymentValue - newPrincipal);
        
        return {
            emi: emiValue,
            totalInterest: totalInterestValue,
            totalPayment: totalPaymentValue + P,
            principalAfterMoratorium: newPrincipal,
        };
    }, [loanAmount, interestRate, loanTenure, moratoriumPeriod]);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

     const pieChartData = {
        labels: [
            language === 'en' ? 'Original Principal' : 'అసలు ప్రిన్సిపాల్',
            language === 'en' ? 'Total Interest' : 'మొత్తం వడ్డీ',
        ],
        datasets: [{
            data: [loanAmount, totalInterest],
            backgroundColor: ['#1e40af', '#ef4444'],
            hoverBackgroundColor: ['#1d4ed8', '#dc2626'],
            borderWidth: 1,
            borderColor: theme === 'dark' ? '#1e293b' : '#fff',
        }]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: isMd ? 'right' : 'top',
                labels: { color: theme === 'dark' ? '#e2e8f0' : '#374151' }
            }
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Input Section */}
            <div className="lg:col-span-2 space-y-6">
                <div>
                    <label htmlFor="loanAmount" className="block text-sm font-medium mb-2">{language === 'en' ? 'Loan Amount' : 'లోన్ మొత్తం'}</label>
                    <input id="loanAmount" type="number" value={loanAmount} onChange={e => setLoanAmount(Number(e.target.value))} className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700"/>
                </div>
                <div>
                    <label htmlFor="interestRate" className="block text-sm font-medium mb-2">{language === 'en' ? 'Annual Interest Rate (%)' : 'వార్షిక వడ్డీ రేటు (%)'}</label>
                    <input id="interestRate" type="number" value={interestRate} onChange={e => setInterestRate(Number(e.target.value))} className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700"/>
                </div>
                <div>
                    <label htmlFor="loanTenure" className="block text-sm font-medium mb-2">{language === 'en' ? 'Repayment Tenure (Years)' : 'తిరిగి చెల్లింపు కాలపరిమితి (సంవత్సరాలు)'}</label>
                    <input id="loanTenure" type="number" value={loanTenure} onChange={e => setLoanTenure(Number(e.target.value))} className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700"/>
                </div>
                <div>
                    <label htmlFor="moratoriumPeriod" className="flex items-center text-sm font-medium mb-2">
                        {language === 'en' ? 'Moratorium Period (Months)' : 'మారటోరియం కాలం (నెలలు)'}
                        <Tooltip text={language === 'en' ? 'The period after your course ends before EMI payments begin. Interest is still calculated during this time.' : 'మీ కోర్సు ముగిసిన తర్వాత EMI చెల్లింపులు ప్రారంభమయ్యే ముందు కాలం. ఈ సమయంలో కూడా వడ్డీ లెక్కించబడుతుంది.'} />
                    </label>
                    <input id="moratoriumPeriod" type="number" value={moratoriumPeriod} onChange={e => setMoratoriumPeriod(Number(e.target.value))} className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700"/>
                </div>
            </div>

            {/* Results Section */}
            <div className="lg:col-span-3 space-y-8">
                <div role="status" aria-live="polite" className="bg-light dark:bg-slate-800 p-6 rounded-lg text-center space-y-6">
                    <div>
                        <p className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Your Monthly EMI' : 'మీ నెలవారీ EMI'}</p>
                        <p className="text-4xl font-bold text-primary dark:text-blue-400">{formatCurrency(emi)}</p>
                        <p className="text-xs text-gray-500 mt-1">{language === 'en' ? '(Starts after moratorium period)' : '(మారటోరియం కాలం తర్వాత ప్రారంభమవుతుంది)'}</p>
                    </div>
                    <div>
                        <p className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Total Interest Payable' : 'చెల్లించవలసిన మొత్తం వడ్డీ'}</p>
                        <p className="text-2xl font-semibold text-red-600 dark:text-red-500">{formatCurrency(totalInterest)}</p>
                    </div>
                </div>
                <div className="bg-white dark:bg-dark p-4 sm:p-6 rounded-lg shadow-inner border border-gray-200 dark:border-gray-700">
                     <h3 className="text-xl font-bold text-primary dark:text-blue-300 mb-4 text-center">{language === 'en' ? 'Loan Breakdown' : 'లోన్ విచ్ఛిన్నం'}</h3>
                     <div className="h-64 mx-auto" style={{maxWidth: '400px'}} role="img">
                        <Pie data={pieChartData} options={chartOptions} />
                     </div>
                </div>
            </div>
        </div>
    );
};

export default EducationLoanRepaymentCalculator;
