import React, { useState, useMemo } from 'react';
import { useLanguage } from '../../../context/LanguageContext';

const SmallBusinessTaxPlanner: React.FC = () => {
    const { language } = useLanguage();
    const [receipts, setReceipts] = useState('4000000');
    const [expenses, setExpenses] = useState('1500000');

    const { presumptiveTax, actualTax } = useMemo(() => {
        const gross = Number(receipts) || 0;
        const exp = Number(expenses) || 0;

        const calculateTax = (income: number) => {
            let taxable = Math.max(0, income);
            if (taxable <= 300000) return 0;
            let tax = 0;
            if (taxable > 300000) tax += Math.min(300000, taxable - 300000) * 0.05;
            if (taxable > 600000) tax += Math.min(300000, taxable - 600000) * 0.10;
            if (taxable > 900000) tax += Math.min(300000, taxable - 900000) * 0.15;
            if (taxable > 1200000) tax += Math.min(300000, taxable - 1200000) * 0.20;
            if (taxable > 1500000) tax += (taxable - 1500000) * 0.30;
            return tax * 1.04;
        };

        const presumptiveIncome = gross * 0.5;
        const pTax = calculateTax(presumptiveIncome);

        const actualIncome = gross - exp;
        const aTax = calculateTax(actualIncome);

        return { presumptiveTax: pTax, actualTax: aTax };
    }, [receipts, expenses]);

    const formatCurrency = (value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
    const winner = presumptiveTax <= actualTax ? 'presumptive' : 'actual';

    const introContent = {
        what: { en: "This guide helps eligible professionals and freelancers choose between two methods for calculating their taxable income: the Presumptive Scheme (Section 44ADA) or the normal method of deducting actual expenses.", te: "ఈ గైడ్ అర్హత ఉన్న నిపుణులు మరియు ఫ్రీలాన్సర్లు తమ పన్ను విధించదగిన ఆదాయాన్ని లెక్కించడానికి రెండు పద్ధతుల మధ్య ఎంచుకోవడంలో సహాయపడుతుంది: ప్రిజంప్టివ్ స్కీమ్ (సెక్షన్ 44ADA) లేదా వాస్తవ ఖర్చులను తీసివేసే సాధారణ పద్ధతి." },
        why: { en: "The Presumptive Scheme simplifies tax filing by allowing you to declare 50% of your gross receipts as income, without needing to maintain detailed account books. However, if your actual expenses are more than 50%, the normal method could save you more tax.", te: "ప్రిజంప్టివ్ స్కీమ్ మీ స్థూల రసీదులలో 50% ఆదాయంగా ప్రకటించడానికి మిమ్మల్ని అనుమతించడం ద్వారా పన్ను ఫైలింగ్‌ను సులభతరం చేస్తుంది, వివరణాత్మక ఖాతా పుస్తకాలను నిర్వహించాల్సిన అవసరం లేకుండా. అయితే, మీ వాస్తవ ఖర్చులు 50% కంటే ఎక్కువగా ఉంటే, సాధారణ పద్ధతి మీకు ఎక్కువ పన్ను ఆదా చేయగలదు." },
        who: { en: "Specified professionals (like doctors, lawyers, engineers, etc.) and freelancers with gross annual receipts up to ₹50 Lakhs.", te: "నిర్దిష్ట నిపుణులు (వైద్యులు, న్యాయవాదులు, ఇంజనీర్లు, మొదలైనవి) మరియు ₹50 లక్షల వరకు స్థూల వార్షిక రసీదులు ఉన్న ఫ్రీలాన్సర్లు." },
        how: { en: "This tool calculates your tax liability under both scenarios. By entering your total receipts and actual business expenses, it provides a direct comparison, clearly showing which method is more tax-efficient for you.", te: "ఈ సాధనం రెండు దృశ్యాల కింద మీ పన్ను బాధ్యతను గణిస్తుంది. మీ మొత్తం రసీదులు మరియు వాస్తవ వ్యాపార ఖర్చులను నమోదు చేయడం ద్వారా, ఇది ప్రత్యక్ష పోలికను అందిస్తుంది, మీకు ఏ పద్ధతి మరింత పన్ను-సమర్థవంతమైనదో స్పష్టంగా చూపిస్తుంది." }
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
                            <label htmlFor="grossReceipts" className="block text-sm font-medium mb-1">{language==='en'?'Gross Annual Receipts':'స్థూల వార్షిక రసీదులు'}</label>
                            <input id="grossReceipts" value={receipts} onChange={e => setReceipts(e.target.value)} type="number" className="p-2 border rounded w-full"/>
                        </div>
                        <div>
                            <label htmlFor="businessExpenses" className="block text-sm font-medium mb-1">{language==='en'?'Actual Business Expenses':'వాస్తవ వ్యాపార ఖర్చులు'}</label>
                            <input id="businessExpenses" value={expenses} onChange={e => setExpenses(e.target.value)} type="number" className="p-2 border rounded w-full"/>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                        <div className={`p-4 rounded-lg text-center ${winner === 'presumptive' ? 'bg-green-100 dark:bg-green-900 border-2 border-green-500' : 'bg-gray-100 dark:bg-slate-700'}`}>
                            <h4 className="font-bold">{language==='en'?'Presumptive (44ADA)':'ప్రిజంప్టివ్ (44ADA)'}</h4>
                            <p className="text-2xl font-bold">{formatCurrency(presumptiveTax)}</p>
                            <p className="text-xs">{language==='en'?'(Tax on 50% of income)':'(ఆదాయంలో 50%పై పన్ను)'}</p>
                        </div>
                        <div className={`p-4 rounded-lg text-center ${winner === 'actual' ? 'bg-green-100 dark:bg-green-900 border-2 border-green-500' : 'bg-gray-100 dark:bg-slate-700'}`}>
                            <h4 className="font-bold">{language==='en'?'Actual Expenses Method':'వాస్తవ ఖర్చుల పద్ధతి'}</h4>
                            <p className="text-2xl font-bold">{formatCurrency(actualTax)}</p>
                            <p className="text-xs">{language==='en'?'(Requires bookkeeping)':'(బుక్‌కీపింగ్ అవసరం)'}</p>
                        </div>
                    </div>
                    <p className="text-center font-semibold mt-4 text-lg">{language === 'en' ? 'The' : ''} <span className="text-secondary dark:text-blue-400">{winner === 'presumptive' ? 'Presumptive Scheme' : 'Actual Expenses Method'}</span> {language === 'en' ? 'seems more beneficial for you.' : ' మీకు మరింత ప్రయోజనకరంగా ఉంది.'}</p>
                </div>
            </div>
        </div>
    );
};

export default SmallBusinessTaxPlanner;