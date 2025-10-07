import React, { useState, useMemo } from 'react';
import { useLanguage } from '../../../context/LanguageContext';

const PersonalLoanGuide: React.FC = () => {
    const { language } = useLanguage();
    const [reason, setReason] = useState('emergency');
    const [income, setIncome] = useState('80000');
    const [currentEmi, setCurrentEmi] = useState('10000');
    const [newEmi, setNewEmi] = useState('15000');

    const dtiRatio = useMemo(() => {
        const totalEmi = (Number(currentEmi) || 0) + (Number(newEmi) || 0);
        const monthlyIncome = Number(income) || 1;
        return (totalEmi / monthlyIncome) * 100;
    }, [income, currentEmi, newEmi]);

    let recommendation, advice, colorClass;
    if (dtiRatio > 50) {
        recommendation = { en: 'Warning: High Risk', te: 'హెచ్చరిక: అధిక ప్రమాదం' };
        advice = { en: 'This loan would push your total EMIs above 50% of your income, which is financially risky. Try to reduce the loan amount or reconsider.', te: 'ఈ రుణం మీ మొత్తం EMIలను మీ ఆదాయంలో 50% కంటే పైకి నెడుతుంది, ఇది ఆర్థికంగా ప్రమాదకరంగా పరిగణించబడుతుంది. రుణ మొత్తాన్ని తగ్గించడానికి లేదా పునఃపరిశీలించడానికి ప్రయత్నించండి.' };
        colorClass = 'red';
    } else if (reason === 'luxury') {
        recommendation = { en: 'Caution Advised', te: 'జాగ్రత్త సలహా' };
        advice = { en: 'While affordable, taking a high-interest loan for non-essential spending is generally not recommended. Consider saving for this goal instead.', te: 'స్థోమత ఉన్నప్పటికీ, అనవసరమైన ఖర్చుల కోసం అధిక-వడ్డీ రుణం తీసుకోవడం సాధారణంగా సిఫార్సు చేయబడదు. బదులుగా ఈ లక్ష్యం కోసం పొదుపు చేయడాన్ని పరిగణించండి.' };
        colorClass = 'yellow';
    } else {
        recommendation = { en: 'Proceed with Caution', te: 'జాగ్రత్తతో కొనసాగండి' };
        advice = { en: 'The loan seems affordable based on your DTI ratio. Ensure you have a clear repayment plan.', te: 'మీ DTI నిష్పత్తి ఆధారంగా రుణం సరసమైనదిగా కనిపిస్తుంది. మీకు స్పష్టమైన తిరిగి చెల్లింపు ప్రణాళిక ఉందని నిర్ధారించుకోండి.' };
        colorClass = 'green';
    }
    
     const introContent = {
        what: { en: "This guide serves as a responsible financial checklist to help you decide if taking a personal loan is a sensible decision for your current situation.", te: "ఈ గైడ్ మీ ప్రస్తుత పరిస్థితికి వ్యక్తిగత రుణం తీసుకోవడం ఒక తెలివైన నిర్ణయమా అని నిర్ణయించడంలో మీకు సహాయపడటానికి ఒక బాధ్యతాయుతమైన ఆర్థిక చెక్‌లిస్ట్‌గా పనిచేస్తుంది." },
        why: { en: "Personal loans often come with high interest rates. While they offer quick access to cash, taking one without careful consideration can lead to a debt trap and strain your finances.", te: "వ్యక్తిగత రుణాలు తరచుగా అధిక వడ్డీ రేట్లతో వస్తాయి. అవి నగదుకు శీఘ్ర ప్రాప్యతను అందించినప్పటికీ, జాగ్రత్తగా పరిశీలించకుండా ఒకటి తీసుకోవడం అప్పుల ఊబికి దారితీయవచ్చు మరియు మీ ఆర్థిక వ్యవహారాలను దెబ్బతీయవచ్చు." },
        who: { en: "Anyone considering a personal loan for any reason, be it a medical emergency, debt consolidation, or a large discretionary purchase.", te: "వైద్య అత్యవసరం, అప్పుల ఏకీకరణ లేదా పెద్ద విచక్షణతో కూడిన కొనుగోలు వంటి ఏ కారణానికైనా వ్యక్తిగత రుణాన్ని పరిగణనలోకి తీసుకుంటున్న ఎవరైనా." },
        how: { en: "The tool assesses two key factors: the reason for the loan and its impact on your Debt-to-Income (DTI) ratio. Based on these, it provides a clear recommendation—'Proceed', 'Caution', or 'Warning'—to guide you away from financially risky decisions.", te: "ఈ సాధనం రెండు కీలక కారకాలను అంచనా వేస్తుంది: రుణం కోసం కారణం మరియు మీ డెట్-టు-ఇన్కమ్ (DTI) నిష్పత్తిపై దాని ప్రభావం. వీటి ఆధారంగా, ఇది ఆర్థికంగా ప్రమాదకరమైన నిర్ణయాల నుండి మిమ్మల్ని దూరం చేయడానికి స్పష్టమైన సిఫార్సు—'కొనసాగండి', 'జాగ్రత్త', లేదా 'హెచ్చరిక'—అందిస్తుంది." }
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
                            <label htmlFor="loanReason" className="block text-sm font-medium mb-1">{language === 'en' ? 'Reason for Loan' : 'రుణానికి కారణం'}</label>
                            <select id="loanReason" value={reason} onChange={e => setReason(e.target.value)} className="w-full p-2 border rounded">
                                <option value="emergency">{language === 'en' ? 'Medical Emergency' : 'వైద్య అత్యవసరం'}</option>
                                <option value="consolidation">{language === 'en' ? 'Debt Consolidation' : 'అప్పుల ఏకీకరణ'}</option>
                                <option value="luxury">{language === 'en' ? 'Vacation / Luxury Purchase' : 'విహారయాత్ర / విలాసవంతమైన కొనుగోలు'}</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="monthlyIncome" className="block text-sm font-medium mb-1">{language==='en'?'Monthly Income':'నెలవారీ ఆదాయం'}</label>
                            <input id="monthlyIncome" value={income} onChange={e => setIncome(e.target.value)} type="number" className="p-2 border rounded w-full"/>
                        </div>
                        <div>
                            <label htmlFor="currentEmi" className="block text-sm font-medium mb-1">{language==='en'?'Current EMIs':'ప్రస్తుత EMIలు'}</label>
                            <input id="currentEmi" value={currentEmi} onChange={e => setCurrentEmi(e.target.value)} type="number" className="p-2 border rounded w-full"/>
                        </div>
                        <div>
                            <label htmlFor="newEmi" className="block text-sm font-medium mb-1">{language==='en'?'New Loan EMI':'కొత్త లోన్ EMI'}</label>
                            <input id="newEmi" value={newEmi} onChange={e => setNewEmi(e.target.value)} type="number" className="p-2 border rounded w-full"/>
                        </div>
                    </div>
                    <div className="mt-6 border-t pt-6">
                        <div className={`p-4 rounded-lg text-center ${colorClass === 'red' ? 'bg-red-100 dark:bg-red-900' : colorClass === 'yellow' ? 'bg-yellow-100 dark:bg-yellow-900' : 'bg-green-100 dark:bg-green-900'}`}>
                            <h3 className={`text-2xl font-bold ${colorClass === 'red' ? 'text-red-700 dark:text-red-300' : colorClass === 'yellow' ? 'text-yellow-800 dark:text-yellow-300' : 'text-green-700 dark:text-green-300'}`}>{recommendation[language]}</h3>
                            <p className="mt-2">{advice[language]}</p>
                            <p className="font-bold mt-4">{language === 'en' ? 'Your new Debt-to-Income Ratio will be' : 'మీ కొత్త డెట్-టు-ఇన్కమ్ నిష్పత్తి ఉంటుంది'}: {dtiRatio.toFixed(2)}%</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalLoanGuide;