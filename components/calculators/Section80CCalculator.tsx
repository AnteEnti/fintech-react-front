import React, { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';

interface CalculatorProps {
    initialState?: Record<string, any>;
    onStateChange: (state: Record<string, any>) => void;
}

interface InvestmentFields {
    ppf: string;
    epf: string;
    elss: string;
    insurance: string;
    homeLoan: string;
    other: string;
}

const Section80CCalculator: React.FC<CalculatorProps> = ({ initialState, onStateChange }) => {
    const { language } = useLanguage();
    const [investments, setInvestments] = useState<InvestmentFields>(initialState?.investments || {
        ppf: '50000',
        epf: '60000',
        elss: '20000',
        insurance: '',
        homeLoan: '',
        other: ''
    });
    const [taxSlab, setTaxSlab] = useState<number>(initialState?.taxSlab || 30);

    useEffect(() => {
        onStateChange({ investments, taxSlab });
    }, [investments, taxSlab, onStateChange]);

    const handleInvestmentChange = (field: keyof InvestmentFields, value: string) => {
        setInvestments(prev => ({ ...prev, [field]: value }));
    };

    const { totalInvestment, eligibleDeduction, taxSaved } = useMemo(() => {
        // FIX: Explicitly type the accumulator and value in the reduce function to ensure the result is a number.
        const total = Object.values(investments).reduce((sum: number, val: string) => sum + (Number(val) || 0), 0);
        const deduction = Math.min(total, 150000);
        const saved = deduction * (taxSlab / 100);

        return {
            totalInvestment: total,
            eligibleDeduction: deduction,
            taxSaved: saved
        };
    }, [investments, taxSlab]);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    const deductionProgress = (eligibleDeduction / 150000) * 100;

    const InvestmentInput: React.FC<{ name: keyof InvestmentFields, label: string }> = ({ name, label }) => (
         <div>
            <label htmlFor={name} className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">{label}</label>
            <input
                id={name}
                type="number"
                value={investments[name]}
                onChange={e => handleInvestmentChange(name, e.target.value)}
                className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-slate-700"
            />
        </div>
    );

    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Input Section */}
            <div className="lg:col-span-3">
                <h3 className="text-lg font-semibold mb-4">{language === 'en' ? 'Enter Your 80C Investments' : 'మీ 80C పెట్టుబడులను నమోదు చేయండి'}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InvestmentInput name="epf" label={language === 'en' ? 'EPF/VPF Contribution' : 'EPF/VPF కంట్రిబ్యూషన్'} />
                    <InvestmentInput name="ppf" label={language === 'en' ? 'PPF Investment' : 'PPF పెట్టుబడి'} />
                    <InvestmentInput name="elss" label={language === 'en' ? 'ELSS Mutual Funds' : 'ELSS మ్యూచువల్ ఫండ్స్'} />
                    <InvestmentInput name="insurance" label={language === 'en' ? 'Life Insurance Premium' : 'జీవిత బీమా ప్రీమియం'} />
                    <InvestmentInput name="homeLoan" label={language === 'en' ? 'Home Loan Principal' : 'గృహ రుణం అసలు'} />
                    <InvestmentInput name="other" label={language === 'en' ? 'Other (NSC, FD, etc.)' : 'ఇతర (NSC, FD, మొదలైనవి)'} />
                </div>
                <div className="mt-6">
                    <label htmlFor="taxSlab" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">{language === 'en' ? 'Your Income Tax Slab' : 'మీ ఆదాయపు పన్ను స్లాబ్'}</label>
                     <select id="taxSlab" value={taxSlab} onChange={e => setTaxSlab(Number(e.target.value))} className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-slate-700">
                        <option value="5">5%</option>
                        <option value="10">10%</option>
                        <option value="15">15%</option>
                        <option value="20">20%</option>
                        <option value="30">30%</option>
                    </select>
                </div>
            </div>

            {/* Results Section */}
            <div className="lg:col-span-2">
                <div role="status" aria-live="polite" className="bg-light dark:bg-slate-800 p-6 rounded-lg space-y-6 sticky top-24">
                     <div className="text-center">
                        <p className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Potential Tax Saved' : 'ఆదా చేయగల పన్ను'}</p>
                        <p className="text-4xl font-bold text-green-600 dark:text-green-500">{formatCurrency(taxSaved)}</p>
                    </div>
                     <div className="space-y-4">
                        <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Total Investment' : 'మొత్తం పెట్టుబడి'}</span>
                            <span className="font-semibold">{formatCurrency(totalInvestment)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Eligible Deduction' : 'అర్హత ఉన్న తగ్గింపు'}</span>
                            <span className="font-semibold">{formatCurrency(eligibleDeduction)}</span>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{language === 'en' ? 'Deduction Limit Utilized' : 'తగ్గింపు పరిమితి వినియోగం'}</p>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                                <div className="bg-primary h-4 rounded-full" style={{ width: `${deductionProgress}%` }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Section80CCalculator;