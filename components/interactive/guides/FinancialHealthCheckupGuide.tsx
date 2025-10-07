import React, { useState } from 'react';
import { useLanguage } from '../../../context/LanguageContext';

const FinancialHealthCheckupGuide: React.FC = () => {
    const { language } = useLanguage();
    const [income, setIncome] = useState('100000');
    const [expenses, setExpenses] = useState('60000');
    const [savings, setSavings] = useState('500000');
    const [debt, setDebt] = useState('100000');
    
    const calculateScore = () => {
        let score = 0;
        const monthlyIncome = Number(income) || 1;
        const monthlyExpenses = Number(expenses) || 0;
        const totalSavings = Number(savings) || 0;
        const totalDebt = Number(debt) || 0;

        const savingsRate = (monthlyIncome - monthlyExpenses) / monthlyIncome;
        if (savingsRate >= 0.3) score += 35;
        else if (savingsRate >= 0.15) score += 20;

        const emergencyFundMonths = monthlyExpenses > 0 ? totalSavings / monthlyExpenses : 0;
        if (emergencyFundMonths >= 6) score += 30;
        else if (emergencyFundMonths >= 3) score += 15;

        const debtToIncome = (totalDebt / (monthlyIncome * 12)) || 0;
        if (debtToIncome <= 0.2) score += 35;
        else if (debtToIncome <= 0.4) score += 20;
        
        return Math.min(100, Math.round(score));
    };
    
    const score = calculateScore();
    let feedback = '';
    let feedbackColor = '';

    if (score >= 70) {
        feedback = language === 'en' ? 'Excellent! Your finances are in great shape.' : 'అద్భుతం! మీ ఆర్థిక పరిస్థితి చాలా బాగుంది.';
        feedbackColor = 'text-green-500';
    } else if (score >= 40) {
        feedback = language === 'en' ? 'Good job. There are some areas you can improve.' : 'మంచి పని. మీరు మెరుగుపరచగల కొన్ని ప్రాంతాలు ఉన్నాయి.';
        feedbackColor = 'text-yellow-500';
    } else {
        feedback = language === 'en' ? "Let's work on it. This is a great starting point for improvement." : 'దానిపై పని చేద్దాం. మెరుగుదల కోసం ఇది ఒక గొప్ప ప్రారంభ స్థానం.';
        feedbackColor = 'text-red-500';
    }

    const introContent = {
        title: { en: "About the Financial Health Check-up", te: "ఆర్థిక ఆరోగ్య తనిఖీ గురించి" },
        what: {
            en: "A financial health check-up is a quick evaluation of your current financial situation using key indicators like your savings rate, emergency fund status, and debt levels.",
            te: "ఆర్థిక ఆరోగ్య తనిఖీ అనేది మీ పొదుపు రేటు, అత్యవసర నిధి స్థితి మరియు అప్పుల స్థాయిల వంటి కీలక సూచికలను ఉపయోగించి మీ ప్రస్తుత ఆర్థిక పరిస్థితి యొక్క శీఘ్ర మూల్యాంకనం."
        },
        why: {
            en: "It provides a simple, high-level snapshot of where you stand financially. Just like a regular health check-up, it helps you identify areas of strength and weakness, so you can make informed decisions.",
            te: "ఇది మీరు ఆర్థికంగా ఎక్కడ ఉన్నారో ఒక సరళమైన, ఉన్నత-స్థాయి స్నాప్‌షాట్‌ను అందిస్తుంది. సాధారణ ఆరోగ్య తనిఖీలాగే, ఇది బలాలు మరియు బలహీనతల ప్రాంతాలను గుర్తించడంలో మీకు సహాయపడుతుంది, తద్వారా మీరు సమాచారంతో కూడిన నిర్ణయాలు తీసుకోవచ్చు."
        },
        who: {
            en: "Everyone! Whether you're just starting your career or have been managing money for years, a quick check-up can provide valuable insights and keep you on track.",
            te: "ప్రతిఒక్కరూ! మీరు మీ కెరీర్‌ను ఇప్పుడే ప్రారంభిస్తున్నా లేదా సంవత్సరాలుగా డబ్బును నిర్వహిస్తున్నా, ఒక శీఘ్ర తనిఖీ విలువైన అంతర్దృష్టులను అందిస్తుంది మరియు మిమ్మల్ని ట్రాక్‌లో ఉంచుతుంది."
        },
        how: {
            en: "This tool simplifies the process by asking for four basic numbers. It then calculates a score out of 100 based on common financial health benchmarks, giving you an instant, easy-to-understand result and feedback.",
            te: "ఈ సాధనం నాలుగు ప్రాథమిక సంఖ్యలను అడగడం ద్వారా ప్రక్రియను సులభతరం చేస్తుంది. ఇది సాధారణ ఆర్థిక ఆరోగ్య ప్రమాణాల ఆధారంగా 100కి ఒక స్కోర్‌ను గణిస్తుంది, మీకు తక్షణ, సులభంగా అర్థమయ్యే ఫలితం మరియు అభిప్రాయాన్ని ఇస్తుంది."
        }
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
                            <label htmlFor="monthlyIncome" className="block text-sm font-medium mb-1">{language === 'en' ? 'Monthly Income (Post-Tax)' : 'నెలసరి ఆదాయం (పన్ను తర్వాత)'}</label>
                            <input id="monthlyIncome" type="number" value={income} onChange={e => setIncome(e.target.value)} className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-slate-700"/>
                        </div>
                        <div>
                            <label htmlFor="monthlyExpenses" className="block text-sm font-medium mb-1">{language === 'en' ? 'Monthly Expenses' : 'నెలసరి ఖర్చులు'}</label>
                            <input id="monthlyExpenses" type="number" value={expenses} onChange={e => setExpenses(e.target.value)} className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-slate-700"/>
                        </div>
                        <div>
                            <label htmlFor="totalSavings" className="block text-sm font-medium mb-1">{language === 'en' ? 'Total Liquid Savings (Emergency Fund)' : 'మొత్తం లిక్విడ్ పొదుపు (అత్యవసర నిధి)'}</label>
                            <input id="totalSavings" type="number" value={savings} onChange={e => setSavings(e.target.value)} className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-slate-700"/>
                        </div>
                        <div>
                            <label htmlFor="totalDebt" className="block text-sm font-medium mb-1">{language === 'en' ? 'Total Debt (excluding Home Loan)' : 'మొత్తం అప్పు (గృహ రుణం మినహా)'}</label>
                            <input id="totalDebt" type="number" value={debt} onChange={e => setDebt(e.target.value)} className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-slate-700"/>
                        </div>
                    </div>
                    <div className="text-center border-t pt-6">
                        <h3 className="text-2xl font-bold mb-4">{language === 'en' ? 'Your Financial Health Score' : 'మీ ఆర్థిక ఆరోగ్య స్కోర్'}</h3>
                        <p className={`text-6xl font-extrabold ${feedbackColor}`}>{score} <span className="text-4xl text-gray-500">/ 100</span></p>
                        <p className="mt-4 text-lg">{feedback}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FinancialHealthCheckupGuide;