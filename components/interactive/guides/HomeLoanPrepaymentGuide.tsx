import React, { useState, useMemo } from 'react';
import { useLanguage } from '../../../context/LanguageContext';

const HomeLoanPrepaymentGuide: React.FC = () => {
    const { language } = useLanguage();
    const [loan, setLoan] = useState({ amount: '3000000', rate: '9', tenure: '15' });
    const [lumpSum, setLumpSum] = useState('500000');
    const [investmentReturn, setInvestmentReturn] = useState('12');

    const handleLoanChange = (field: keyof typeof loan, value: string) => {
        setLoan(prev => ({...prev, [field]: value}));
    };

    const { interestSaved, wealthGained, tenureReduced } = useMemo(() => {
        const P = Number(loan.amount);
        const R = (Number(loan.rate) / 100) / 12;
        const N = Number(loan.tenure) * 12;

        if (P <= 0 || R <= 0 || N <= 0) return { interestSaved: 0, wealthGained: 0, tenureReduced: '0' };
        
        const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
        const originalInterest = (emi * N) - P;
        
        const newP = P - Number(lumpSum);
        if (newP <= 0) {
            return { interestSaved: originalInterest, wealthGained: 0, tenureReduced: `${loan.tenure} years` };
        }
        const newN = Math.log(emi / (emi - newP * R)) / Math.log(1 + R);
        const newInterest = (emi * newN) - newP;
        const saved = originalInterest - newInterest;
        
        const monthsReduced = N - Math.ceil(newN);
        const years = Math.floor(monthsReduced / 12);
        const months = monthsReduced % 12;
        const tenureString = `${years} ${language === 'en' ? 'Yrs' : 'సం'} ${months} ${language === 'en' ? 'Mos' : 'నెల'}`;

        const invReturn = Number(investmentReturn) / 100;
        const time = monthsReduced / 12;
        const gained = Number(lumpSum) * Math.pow(1 + invReturn, time);

        return { interestSaved: saved, wealthGained: gained, tenureReduced: tenureString };
    }, [loan, lumpSum, investmentReturn, language]);
    
    const formatCurrency = (value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);

    const introContent = {
        what: { en: "This guide helps you analyze a common financial dilemma: whether to use a lump sum of money to pay off part of your home loan early (prepayment) or to invest it for potentially higher returns.", te: "ఈ గైడ్ ఒక సాధారణ ఆర్థిక సందిగ్ధతను విశ్లేషించడంలో మీకు సహాయపడుతుంది: మీ గృహ రుణంలో కొంత భాగాన్ని ముందుగా చెల్లించడానికి (ప్రీపేమెంట్) ఒక ఏకమొత్తాన్ని ఉపయోగించాలా లేదా అధిక రాబడి కోసం దానిని పెట్టుబడి పెట్టాలా." },
        why: { en: "The right decision can either save you a significant amount in interest payments or help you build more wealth over time. Prepayment offers a guaranteed, risk-free 'return' equal to your loan's interest rate, while investing offers potentially higher but unguaranteed returns.", te: "సరైన నిర్ణయం మీకు వడ్డీ చెల్లింపులలో గణనీయమైన మొత్తాన్ని ఆదా చేయగలదు లేదా కాలక్రమేణా ఎక్కువ సంపదను నిర్మించడంలో సహాయపడుతుంది. ప్రీపేమెంట్ మీ లోన్ వడ్డీ రేటుకు సమానమైన హామీ, ప్రమాద-రహిత 'రాబడి'ని అందిస్తుంది, అయితే పెట్టుబడి అధిక కానీ హామీ లేని రాబడిని అందిస్తుంది." },
        who: { en: "Home loan borrowers who have received a bonus, inheritance, or have accumulated a lump sum and are deciding on the most financially prudent way to use it.", te: "బోనస్, వారసత్వం పొందిన, లేదా ఒక ఏకమొత్తాన్ని కూడబెట్టిన మరియు దానిని ఉపయోగించడానికి అత్యంత ఆర్థికంగా వివేకవంతమైన మార్గంపై నిర్ణయం తీసుకుంటున్న గృహ రుణ గ్రహీతలు." },
        how: { en: "This tool quantifies both options. It calculates the total interest you would save and how much your loan tenure would be reduced by if you prepay. Simultaneously, it projects the potential wealth you could generate by investing the same amount, giving you a clear financial comparison to base your decision on.", te: "ఈ సాధనం రెండు ఎంపికలను లెక్కిస్తుంది. మీరు ముందుగా చెల్లిస్తే మీరు ఆదా చేసే మొత్తం వడ్డీని మరియు మీ లోన్ కాలపరిమితి ఎంత తగ్గుతుందో ఇది గణిస్తుంది. అదే సమయంలో, అదే మొత్తాన్ని పెట్టుబడి పెట్టడం ద్వారా మీరు సృష్టించగల సంభావ్య సంపదను ఇది అంచనా వేస్తుంది, మీ నిర్ణయానికి ఆధారం చేసుకోవడానికి మీకు స్పష్టమైన ఆర్థిక పోలికను ఇస్తుంది." }
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
                            <label htmlFor="loanAmount" className="block text-sm font-medium mb-1">{language==='en'?'Outstanding Loan':'బాకీ ఉన్న లోన్'}</label>
                            <input id="loanAmount" value={loan.amount} onChange={e => handleLoanChange('amount', e.target.value)} type="number" className="p-2 border rounded w-full"/>
                        </div>
                        <div>
                            <label htmlFor="loanRate" className="block text-sm font-medium mb-1">{language==='en'?'Rate (%)':'రేటు (%)'}</label>
                            <input id="loanRate" value={loan.rate} onChange={e => handleLoanChange('rate', e.target.value)} type="number" className="p-2 border rounded w-full"/>
                        </div>
                        <div>
                            <label htmlFor="loanTenure" className="block text-sm font-medium mb-1">{language==='en'?'Remaining Tenure (Yrs)':'మిగిలిన కాలపరిమితి (సం)'}</label>
                            <input id="loanTenure" value={loan.tenure} onChange={e => handleLoanChange('tenure', e.target.value)} type="number" className="p-2 border rounded w-full"/>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="prepaymentAmount" className="block text-sm font-medium mb-1">{language==='en'?'Prepayment Amount':'ప్రీపేమెంట్ మొత్తం'}</label>
                            <input id="prepaymentAmount" value={lumpSum} onChange={e => setLumpSum(e.target.value)} type="number" className="p-2 border rounded w-full"/>
                        </div>
                        <div>
                            <label htmlFor="investmentReturn" className="block text-sm font-medium mb-1">{language==='en'?'Expected Investment Return (%)':'అంచనా రాబడి (%)'}</label>
                            <input id="investmentReturn" value={investmentReturn} onChange={e => setInvestmentReturn(e.target.value)} type="number" className="p-2 border rounded w-full"/>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                        <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg text-center">
                            <h4 className="font-bold">{language==='en'?'Option 1: Pre-pay Loan':'ఎంపిక 1: రుణం ప్రీ-పే చేయండి'}</h4>
                            <p>{language==='en'?'Total Interest Saved':'మొత్తం ఆదా చేసిన వడ్డీ'}</p>
                            <p className="text-2xl font-bold text-green-700 dark:text-green-300">{formatCurrency(interestSaved)}</p>
                            <p className="text-sm mt-2">{language==='en'?'Tenure reduced by':'కాలపరిమితి తగ్గుదల'}: {tenureReduced}</p>
                        </div>
                        <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg text-center">
                            <h4 className="font-bold">{language==='en'?'Option 2: Invest':'ఎంపిక 2: పెట్టుబడి పెట్టండి'}</h4>
                            <p>{language==='en'?'Potential Wealth Gained':'సంభావ్యంగా సంపాదించిన సంపద'}</p>
                            <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{formatCurrency(wealthGained)}</p>
                            <p className="text-sm mt-2">{language==='en'?'In':'లో'} {tenureReduced}</p>
                        </div>
                    </div>
                    <p className="text-center font-semibold mt-4 text-lg">{wealthGained > interestSaved ? (language==='en'?'Investing appears more beneficial.' : 'పెట్టుబడి పెట్టడం మరింత ప్రయోజనకరంగా కనిపిస్తుంది.') : (language==='en'?'Pre-paying the loan offers guaranteed savings.' : 'రుణాన్ని ముందుగా చెల్లించడం హామీతో కూడిన పొదుపును అందిస్తుంది.')}</p>
                </div>
            </div>
        </div>
    );
};

export default HomeLoanPrepaymentGuide;