import React, { useState } from 'react';
import { useLanguage } from '../../../context/LanguageContext';

// FIX: Define an interface for checklist items to ensure proper type inference.
interface ChecklistItem {
    text: { en: string; te: string };
    checked: boolean;
}

const FirstTimeTaxFilerGuide: React.FC = () => {
    const { language } = useLanguage();

    // FIX: Type the initialItems object to allow TypeScript to correctly infer the state type for `checklist`. This resolves property access errors on `item`.
    const initialItems: Record<string, ChecklistItem> = {
        pan: { text: { en: 'Have your PAN Card ready.', te: 'మీ పాన్ కార్డు సిద్ధంగా ఉంచుకోండి.' }, checked: true },
        bank: { text: { en: 'Consolidate all your bank account statements.', te: 'మీ అన్ని బ్యాంకు ఖాతా స్టేట్‌మెంట్‌లను ఏకీకృతం చేయండి.' }, checked: false },
        form16: { text: { en: 'Get Form 16 from your employer.', te: 'మీ యజమాని నుండి ఫారం 16 పొందండి.' }, checked: false },
        investments: { text: { en: 'Collect proofs for 80C investments (PPF, ELSS, etc.).', te: '80C పెట్టుబడుల కోసం రుజువులు సేకరించండి (PPF, ELSS, మొదలైనవి).' }, checked: false },
        rent: { text: { en: 'If claiming HRA, get rent receipts from your landlord.', te: 'HRA క్లెయిమ్ చేస్తుంటే, మీ ఇంటి యజమాని నుండి అద్దె రశీదులు పొందండి.' }, checked: false },
    };
    
    const [checklist, setChecklist] = useState(initialItems);

    const handleCheck = (key: keyof typeof initialItems) => {
        setChecklist(prev => ({...prev, [key]: {...prev[key], checked: !prev[key].checked }}));
    };

    const progress = (Object.values(checklist).filter(item => item.checked).length / Object.values(checklist).length) * 100;
    
    const introContent = {
        what: { en: "Filing income tax for the first time can seem daunting. This guide is a simple, interactive checklist of the essential documents and information you need to gather before you start the process.", te: "మొదటిసారి ఆదాయపు పన్ను ఫైల్ చేయడం భయానకంగా అనిపించవచ్చు. ఈ గైడ్ మీరు ప్రక్రియను ప్రారంభించే ముందు సేకరించవలసిన అవసరమైన పత్రాలు మరియు సమాచారం యొక్క ఒక సరళమైన, ఇంటరాక్టివ్ చెక్‌లిస్ట్." },
        why: { en: "Being prepared makes the tax filing process smoother and helps ensure you don't miss any important details or potential deductions. It transforms a complex task into manageable steps.", te: "సిద్ధంగా ఉండటం పన్ను ఫైలింగ్ ప్రక్రియను సులభతరం చేస్తుంది మరియు మీరు ఏ ముఖ్యమైన వివరాలను లేదా సంభావ్య తగ్గింపులను కోల్పోకుండా చూసుకోవడంలో సహాయపడుతుంది. ఇది ఒక సంక్లిష్టమైన పనిని నిర్వహించదగిన దశలుగా మారుస్తుంది." },
        who: { en: "Young professionals, recent graduates, or anyone who is filing their income tax return for the very first time.", te: "యువ నిపుణులు, ఇటీవలి గ్రాడ్యుయేట్లు, లేదా తమ ఆదాయపు పన్ను రిటర్న్‌ను మొదటిసారి ఫైల్ చేస్తున్న ఎవరైనా." },
        how: { en: "This tool provides a step-by-step checklist. As you check off each item you've completed, the progress bar fills up, giving you a sense of accomplishment and a clear view of what's left to do. It gamifies the preparation process.", te: "ఈ సాధనం ఒక దశల వారీ చెక్‌లిస్ట్‌ను అందిస్తుంది. మీరు పూర్తి చేసిన ప్రతి అంశాన్ని చెక్ ఆఫ్ చేస్తున్నప్పుడు, ప్రోగ్రెస్ బార్ నిండుతుంది, ఇది మీకు సాధించిన భావనను మరియు ఇంకా ఏమి చేయాలో స్పష్టమైన వీక్షణను ఇస్తుంది. ఇది తయారీ ప్రక్రియను గేమిఫై చేస్తుంది." }
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
                    {language === 'en' ? 'Interactive Checklist' : 'ఇంటరాక్టివ్ చెక్‌లిస్ట్'}
                </h3>
                <div className="space-y-6">
                    <p className="text-center">{language === 'en' ? 'Follow this checklist to prepare for your first tax filing.' : 'మీ మొదటి పన్ను ఫైలింగ్ కోసం సిద్ధం కావడానికి ఈ చెక్‌లిస్ట్‌ను అనుసరించండి.'}</p>
                    
                    <div role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div className="bg-primary h-2.5 rounded-full" style={{ width: `${progress}%`, transition: 'width 0.3s' }}></div>
                    </div>

                    <div className="space-y-3">
                        {Object.entries(checklist).map(([key, item]) => (
                            <div key={key} className={`p-3 rounded-lg flex items-center transition-colors ${item.checked ? 'bg-green-100 dark:bg-green-900' : 'bg-gray-100 dark:bg-slate-800'}`}>
                                <input type="checkbox" id={`check-${key}`} checked={item.checked} onChange={() => handleCheck(key as keyof typeof initialItems)} className="h-5 w-5 rounded text-primary focus:ring-primary mr-3"/>
                                <label htmlFor={`check-${key}`} className={`flex-grow cursor-pointer ${item.checked ? 'line-through text-gray-500' : ''}`}>{item.text[language]}</label>
                            </div>
                        ))}
                    </div>
                    {progress === 100 && <p className="text-center font-bold text-green-600">{language === 'en' ? "You're all set to file your taxes!" : "మీరు మీ పన్నులను ఫైల్ చేయడానికి సిద్ధంగా ఉన్నారు!"}</p>}
                </div>
            </div>
        </div>
    );
};

export default FirstTimeTaxFilerGuide;