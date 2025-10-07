import React, { useState, useMemo } from 'react';
import { useLanguage } from '../../../context/LanguageContext';

const CarPurchasePlanner: React.FC = () => {
    const { language } = useLanguage();
    const [price, setPrice] = useState('1200000');
    const [rate, setRate] = useState('9.5');
    const [tenure, setTenure] = useState('5');

    const calculateEmi = (p: number, r: number, n: number) => {
        if (p <= 0 || r <= 0 || n <= 0) return { emi: 0, interest: 0 };
        const R = (r / 100) / 12;
        const emi = (p * R * Math.pow(1 + R, n)) / (Math.pow(1 + R, n) - 1);
        const totalInterest = (emi * n) - p;
        return { emi, interest: totalInterest };
    };

    const scenarios = useMemo(() => {
        const p = Number(price);
        const r = Number(rate);
        const n = Number(tenure) * 12;
        
        const downPayments = [p * 0.2, p * 0.4, p * 0.6];
        return downPayments.map(dp => {
            const loanAmount = p - dp;
            const { emi, interest } = calculateEmi(loanAmount, r, n);
            return { dp, loanAmount, emi, interest };
        });
    }, [price, rate, tenure]);

    const formatCurrency = (value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);

    const introContent = {
        what: { en: "This guide helps you analyze the financial impact of different down payment choices when buying a car on loan.", te: "ఈ గైడ్ కారును లోన్‌పై కొనుగోలు చేసేటప్పుడు వివిధ డౌన్ పేమెంట్ ఎంపికల ఆర్థిక ప్రభావాన్ని విశ్లేషించడంలో మీకు సహాయపడుతుంది." },
        why: { en: "The down payment is a crucial decision. A higher down payment reduces your loan amount, leading to a lower EMI and less total interest paid. However, it also reduces your immediate liquidity. This tool helps you see the trade-offs.", te: "డౌన్ పేమెంట్ ఒక కీలకమైన నిర్ణయం. అధిక డౌన్ పేమెంట్ మీ లోన్ మొత్తాన్ని తగ్గిస్తుంది, ఇది తక్కువ EMIకి మరియు తక్కువ మొత్తం వడ్డీ చెల్లింపుకు దారితీస్తుంది. అయితే, ఇది మీ తక్షణ ద్రవ్యత్వాన్ని కూడా తగ్గిస్తుంది. ఈ సాధనం మీకు ట్రేడ్-ఆఫ్‌లను చూడటానికి సహాయపడుతుంది." },
        who: { en: "Anyone planning to buy a car with financing and wants to understand how their down payment affects their monthly budget and total cost.", te: "ఫైనాన్సింగ్‌తో కారు కొనాలని ప్లాన్ చేస్తున్న మరియు వారి డౌన్ పేమెంట్ వారి నెలవారీ బడ్జెట్ మరియు మొత్తం ఖర్చును ఎలా ప్రభావితం చేస్తుందో అర్థం చేసుకోవాలనుకుంటున్న ఎవరైనా." },
        how: { en: "After you input the car's price and loan terms, this tool automatically generates three scenarios with different down payment amounts (20%, 40%, 60%). It presents a clear table comparing the EMI and total interest for each, making it easy to decide which option best suits your budget.", te: "మీరు కారు ధర మరియు లోన్ నిబంధనలను ఇన్‌పుట్ చేసిన తర్వాత, ఈ సాధనం వివిధ డౌన్ పేమెంట్ మొత్తాలతో (20%, 40%, 60%) మూడు దృశ్యాలను స్వయంచాలకంగా ఉత్పత్తి చేస్తుంది. ఇది ప్రతిదానికి EMI మరియు మొత్తం వడ్డీని పోల్చి చూపే స్పష్టమైన పట్టికను అందిస్తుంది, మీ బడ్జెట్‌కు ఏ ఎంపిక ఉత్తమంగా సరిపోతుందో నిర్ణయించుకోవడం సులభం చేస్తుంది." }
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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label htmlFor="carPrice" className="block text-sm font-medium mb-1">{language==='en'?'Car On-Road Price':'కారు ఆన్-రోడ్ ధర'}</label>
                            <input id="carPrice" value={price} onChange={e => setPrice(e.target.value)} type="number" className="p-2 border rounded w-full"/>
                        </div>
                        <div>
                            <label htmlFor="loanRate" className="block text-sm font-medium mb-1">{language==='en'?'Loan Rate %':'లోన్ రేటు %'}</label>
                            <input id="loanRate" value={rate} onChange={e => setRate(e.target.value)} type="number" className="p-2 border rounded w-full"/>
                        </div>
                        <div>
                            <label htmlFor="loanTenure" className="block text-sm font-medium mb-1">{language==='en'?'Loan Tenure (Yrs)':'లోన్ కాలపరిమితి (సం)'}</label>
                            <input id="loanTenure" value={tenure} onChange={e => setTenure(e.target.value)} type="number" className="p-2 border rounded w-full"/>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-center">
                            <thead className="bg-gray-100 dark:bg-slate-800">
                                <tr>
                                    <th className="p-2"></th>
                                    {scenarios.map((s, i) => <th key={i} className="p-2">{language==='en'?'Scenario':'సన్నివేశం'} {i+1}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b dark:border-gray-700"><td className="p-2 text-left font-semibold">{language==='en'?'Down Payment':'డౌన్ పేమెంట్'}</td>{scenarios.map((s,i) => <td key={i} className="p-2">{formatCurrency(s.dp)}</td>)}</tr>
                                <tr className="border-b dark:border-gray-700"><td className="p-2 text-left font-semibold">{language==='en'?'Loan Amount':'రుణ మొత్తం'}</td>{scenarios.map((s,i) => <td key={i} className="p-2">{formatCurrency(s.loanAmount)}</td>)}</tr>
                                <tr className="border-b dark:border-gray-700"><td className="p-2 text-left font-semibold">{language==='en'?'Monthly EMI':'నెలవారీ EMI'}</td>{scenarios.map((s,i) => <td key={i} className="p-2 font-bold text-primary dark:text-blue-400">{formatCurrency(s.emi)}</td>)}</tr>
                                <tr className="border-b dark:border-gray-700"><td className="p-2 text-left font-semibold">{language==='en'?'Total Interest':'మొత్తం వడ్డీ'}</td>{scenarios.map((s,i) => <td key={i} className="p-2 text-red-500">{formatCurrency(s.interest)}</td>)}</tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarPurchasePlanner;