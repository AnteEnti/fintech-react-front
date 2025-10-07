import React, { useState, useMemo } from 'react';
import { useLanguage } from '../../../context/LanguageContext';

const TaxRegimeSelectorGuide: React.FC = () => {
    const { language } = useLanguage();
    const [income, setIncome] = useState('1200000');
    const [deductions, setDeductions] = useState({ '80c': '150000', hra: '50000', homeLoan: '0' });

    const handleDeductionChange = (field: keyof typeof deductions, value: string) => {
        setDeductions(prev => ({ ...prev, [field]: value }));
    };

    const { oldTax, newTax } = useMemo(() => {
        const inc = Number(income) || 0;
        const totalDeductions = Object.values(deductions).reduce((sum, val) => sum + (Number(val) || 0), 0) + 50000; // Standard Deduction for Old

        // Old Regime Calculation
        let taxableOld = Math.max(0, inc - totalDeductions);
        let tax1 = 0;
        if (taxableOld > 250000) tax1 += Math.min(250000, taxableOld - 250000) * 0.05;
        if (taxableOld > 500000) tax1 += Math.min(500000, taxableOld - 500000) * 0.20;
        if (taxableOld > 1000000) tax1 += (taxableOld - 1000000) * 0.30;
        if (taxableOld <= 500000) tax1 = 0; // Rebate
        const oldRegimeTax = tax1 > 0 ? tax1 * 1.04 : 0; // Cess

        // New Regime Calculation (AY 2024-25)
        let taxableNew = Math.max(0, inc - 50000); // Standard Deduction for New
        let tax2 = 0;
        if (taxableNew <= 700000) { // Rebate u/s 87A
             tax2 = 0;
        } else {
            if (taxableNew > 300000) tax2 += Math.min(300000, taxableNew - 300000) * 0.05;
            if (taxableNew > 600000) tax2 += Math.min(300000, taxableNew - 600000) * 0.10;
            if (taxableNew > 900000) tax2 += Math.min(300000, taxableNew - 900000) * 0.15;
            if (taxableNew > 1200000) tax2 += Math.min(300000, taxableNew - 1200000) * 0.20;
            if (taxableNew > 1500000) tax2 += (taxableNew - 1500000) * 0.30;
        }
        const newRegimeTax = tax2 > 0 ? tax2 * 1.04 : 0; // Cess

        return { oldTax: oldRegimeTax, newTax: newRegimeTax };
    }, [income, deductions]);

    const formatCurrency = (value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
    const winner = oldTax < newTax ? 'old' : 'new';
    
    const introContent = {
        what: { en: "India's income tax system offers two regimes: the Old Regime, which allows for numerous deductions and exemptions, and the New Regime, which offers lower tax rates but forgoes most deductions.", te: "భారతదేశ ఆదాయపు పన్ను వ్యవస్థ రెండు విధానాలను అందిస్తుంది: పాత విధానం, ఇది అనేక తగ్గింపులు మరియు మినహాయింపులను అనుమతిస్తుంది, మరియు కొత్త విధానం, ఇది తక్కువ పన్ను రేట్లను అందిస్తుంది కానీ చాలా తగ్గింపులను వదులుకుంటుంది." },
        why: { en: "Choosing the right regime can lead to significant tax savings. The best choice depends entirely on your income level and the deductions you are eligible to claim.", te: "సరైన విధానాన్ని ఎంచుకోవడం గణనీయమైన పన్ను ఆదాకు దారితీస్తుంది. ఉత్తమ ఎంపిక పూర్తిగా మీ ఆదాయ స్థాయి మరియు మీరు క్లెయిమ్ చేయడానికి అర్హత ఉన్న తగ్గింపులపై ఆధారపడి ఉంటుంది." },
        who: { en: "All individual taxpayers, especially salaried individuals who have common deductions like Section 80C, HRA, and home loan interest.", te: "అందరు వ్యక్తిగత పన్ను చెల్లింపుదారులు, ముఖ్యంగా సెక్షన్ 80C, HRA మరియు గృహ రుణ వడ్డీ వంటి సాధారణ తగ్గింపులు ఉన్న జీతభత్యాల వ్యక్తులు." },
        how: { en: "This tool does the heavy lifting for you. Simply enter your income and key deductions. It will instantly calculate your tax liability under both the Old and New regimes and declare a clear 'winner', showing you exactly how much you can save.", te: "ఈ సాధనం మీ కోసం బరువైన పని చేస్తుంది. మీ ఆదాయం మరియు కీలక తగ్గింపులను నమోదు చేయండి. ఇది పాత మరియు కొత్త విధానాల కింద మీ పన్ను బాధ్యతను తక్షణమే గణిస్తుంది మరియు స్పష్టమైన 'విజేత'ను ప్రకటిస్తుంది, మీరు ఎంత ఆదా చేయగలరో ఖచ్చితంగా చూపిస్తుంది." }
    };

    return (
        <div className="space-y-8">
            <details className="bg-light dark:bg-slate-800 p-4 rounded-lg cursor-pointer group" open>
                <summary className="font-semibold text-lg text-primary dark:text-blue-300 list-none flex justify-between items-center">
                    <span>{language === 'en' ? 'About This Guide' : 'ఈ గైడ్ గురించి'}</span>
                    <span className="group-open:rotate-90 transition-transform duration-200">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </span>
                </summary>
                <div className="mt-4 prose prose-sm max-w-none text-gray-700 dark:text-gray-300">
                    <h5 className="font-semibold">{language === 'en' ? 'What is it?' : 'ఇది ఏమిటి?'}</h5>
                    <p>{introContent.what[language]}</p>
                    <h5 className="font-semibold">{language === 'en' ? 'Why is it important?' : 'ఇది ఎందుకు ముఖ్యం?'}</h5>
                    <p>{introContent.why[language]}</p>
                    <h5 className="font-semibold">{language === 'en' ? 'Who should use this?' : 'దీనిని ఎవరు ఉపయోగించాలి?'}</h5>
                    <p>{introContent.who[language]}</p>
                    <h5 className="font-semibold">{language === 'en' ? 'How does this tool help?' : 'ఈ సాధనం ఎలా సహాయపడుతుంది?'}</h5>
                    <p>{introContent.how[language]}</p>
                </div>
            </details>
            
            <div>
                 <h3 className="text-2xl font-bold text-center mb-6 text-secondary dark:text-blue-400">
                    {language === 'en' ? 'Interactive Tool' : 'ఇంటరాక్టివ్ సాధనం'}
                </h3>
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="annualIncome" className="block text-sm font-medium mb-1">{language === 'en' ? 'Gross Annual Income' : 'స్థూల వార్షిక ఆదాయం'}</label>
                            <input id="annualIncome" value={income} onChange={e => setIncome(e.target.value)} type="number" className="w-full p-2 border rounded"/>
                        </div>
                        <div>
                            <label htmlFor="deductions80c" className="block text-sm font-medium mb-1">{language === 'en' ? '80C Deductions' : '80C తగ్గింపులు'}</label>
                            <input id="deductions80c" value={deductions['80c']} onChange={e => handleDeductionChange('80c', e.target.value)} type="number" className="w-full p-2 border rounded"/>
                        </div>
                        <div>
                            <label htmlFor="hraExemption" className="block text-sm font-medium mb-1">{language === 'en' ? 'HRA Exemption' : 'HRA మినహాయింపు'}</label>
                            <input id="hraExemption" value={deductions.hra} onChange={e => handleDeductionChange('hra', e.target.value)} type="number" className="w-full p-2 border rounded"/>
                        </div>
                        <div>
                            <label htmlFor="homeLoanInterest" className="block text-sm font-medium mb-1">{language === 'en' ? 'Home Loan Interest' : 'గృహ రుణం వడ్డీ'}</label>
                            <input id="homeLoanInterest" value={deductions.homeLoan} onChange={e => handleDeductionChange('homeLoan', e.target.value)} type="number" className="w-full p-2 border rounded"/>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                        <div className={`p-4 rounded-lg text-center ${winner === 'old' ? 'bg-green-100 dark:bg-green-900 border-2 border-green-500' : 'bg-gray-100 dark:bg-slate-700'}`}>
                            <h4 className="font-bold">{language==='en'?'Old Regime':'పాత విధానం'}</h4>
                            <p className="text-2xl font-bold">{formatCurrency(oldTax)}</p>
                        </div>
                        <div className={`p-4 rounded-lg text-center ${winner === 'new' ? 'bg-green-100 dark:bg-green-900 border-2 border-green-500' : 'bg-gray-100 dark:bg-slate-700'}`}>
                            <h4 className="font-bold">{language==='en'?'New Regime':'కొత్త విధానం'}</h4>
                            <p className="text-2xl font-bold">{formatCurrency(newTax)}</p>
                        </div>
                    </div>
                    <p className="text-center font-semibold mt-4 text-lg">{language === 'en' ? 'You save' : 'మీరు ఆదా చేస్తారు'} {formatCurrency(Math.abs(oldTax-newTax))} {language === 'en' ? 'with the' : 'తో'} <span className="text-secondary dark:text-blue-400">{winner === 'old' ? (language === 'en' ? 'Old Regime' : 'పాత విధానం') : (language === 'en' ? 'New Regime' : 'కొత్త విధానం')}</span>.</p>
                </div>
            </div>
        </div>
    );
};

export default TaxRegimeSelectorGuide;