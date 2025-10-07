import React, { useState, useMemo } from 'react';
import { useLanguage } from '../../../context/LanguageContext';

const ChildUniversityFundPlanner: React.FC = () => {
    const { language } = useLanguage();
    const [childAge, setChildAge] = useState('5');
    const [goalAge, setGoalAge] = useState('18');
    const [currentCost, setCurrentCost] = useState('1500000');
    const [inflation, setInflation] = useState('8');
    const [expectedReturn, setExpectedReturn] = useState('12');

    const { targetCorpus, requiredSip, yearsToGoal } = useMemo(() => {
        const years = Math.max(0, Number(goalAge) - Number(childAge));
        const futureCost = Number(currentCost) * Math.pow(1 + Number(inflation) / 100, years);

        const i = (Number(expectedReturn) / 100) / 12;
        const n = years * 12;
        
        const sip = (n > 0 && i > 0) ? (futureCost * i) / (Math.pow(1 + i, n) - 1) : 0;
        
        return { targetCorpus: futureCost, requiredSip: sip, yearsToGoal: years };
    }, [childAge, goalAge, currentCost, inflation, expectedReturn]);

    const formatCurrency = (value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
    
    const introContent = {
        what: { en: "This is a goal-based planning tool designed to help parents save for their child's future university education.", te: "ఇది తల్లిదండ్రులు తమ పిల్లల భవిష్యత్ విశ్వవిద్యాలయ విద్య కోసం పొదుపు చేయడానికి సహాయపడటానికి రూపొందించబడిన ఒక లక్ష్య-ఆధారిత ప్రణాళిక సాధనం." },
        why: { en: "The cost of higher education is rising rapidly due to inflation. Planning early and investing systematically is essential to build a sufficient corpus without financial strain later on.", te: "ద్రవ్యోల్బణం కారణంగా ఉన్నత విద్య ఖర్చు వేగంగా పెరుగుతోంది. తరువాత ఆర్థిక ఒత్తిడి లేకుండా తగినంత నిధిని నిర్మించడానికి ముందుగా ప్రణాళిక వేయడం మరియు క్రమపద్ధతిలో పెట్టుబడి పెట్టడం చాలా అవసరం." },
        who: { en: "Parents of young children who want to create a structured investment plan to fund their child's college or university education in the future.", te: "భవిష్యత్తులో తమ పిల్లల కళాశాల లేదా విశ్వవిద్యాలయ విద్యకు నిధులు సమకూర్చడానికి ఒక నిర్మాణాత్మక పెట్టుబడి ప్రణాళికను సృష్టించాలనుకుంటున్న చిన్న పిల్లల తల్లిదండ్రులు." },
        how: { en: "This tool takes your inputs for your child's age and the current cost of education. It first projects the future cost of that education by factoring in inflation. Then, it calculates the monthly Systematic Investment Plan (SIP) amount you need to invest to reach that target corpus, giving you a clear, actionable number to start with.", te: "ఈ సాధనం మీ పిల్లల వయస్సు మరియు విద్య యొక్క ప్రస్తుత ఖర్చు కోసం మీ ఇన్‌పుట్‌లను తీసుకుంటుంది. ఇది మొదట ద్రవ్యోల్బణాన్ని పరిగణనలోకి తీసుకుని ఆ విద్య యొక్క భవిష్యత్ వ్యయాన్ని అంచనా వేస్తుంది. ఆ తర్వాత, ఆ లక్ష్య నిధిని చేరుకోవడానికి మీరు పెట్టుబడి పెట్టవలసిన నెలవారీ సిస్టమాటిక్ ఇన్వెస్ట్‌మెంట్ ప్లాన్ (SIP) మొత్తాన్ని గణిస్తుంది, మీకు ప్రారంభించడానికి స్పష్టమైన, కార్యాచరణ సంఖ్యను ఇస్తుంది." }
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
                        <div><label htmlFor="childAge" className="block text-sm font-medium mb-1">{language === 'en' ? "Child's Age" : 'పిల్లల వయస్సు'}</label><input id="childAge" value={childAge} onChange={e => setChildAge(e.target.value)} type="number" className="p-2 border rounded w-full"/></div>
                        <div><label htmlFor="goalAge" className="block text-sm font-medium mb-1">{language === 'en' ? 'Goal Age' : 'లక్ష్య వయస్సు'}</label><input id="goalAge" value={goalAge} onChange={e => setGoalAge(e.target.value)} type="number" className="p-2 border rounded w-full"/></div>
                        <div><label htmlFor="currentCost" className="block text-sm font-medium mb-1">{language === 'en' ? 'Current Cost' : 'ప్రస్తుత ఖర్చు'}</label><input id="currentCost" value={currentCost} onChange={e => setCurrentCost(e.target.value)} type="number" className="p-2 border rounded w-full"/></div>
                        <div><label htmlFor="inflation" className="block text-sm font-medium mb-1">{language === 'en' ? 'Inflation %' : 'ద్రవ్యోల్బణం %'}</label><input id="inflation" value={inflation} onChange={e => setInflation(e.target.value)} type="number" className="p-2 border rounded w-full"/></div>
                        <div className="md:col-span-2">
                            <label htmlFor="expectedReturn" className="block text-sm font-medium mb-1">{language === 'en' ? 'Expected Return %' : 'రాబడి %'}</label>
                            <input id="expectedReturn" value={expectedReturn} onChange={e => setExpectedReturn(e.target.value)} type="number" className="p-2 border rounded w-full"/>
                        </div>
                    </div>
                    <div className="mt-6 text-center bg-light dark:bg-slate-800 p-6 rounded-lg">
                        <h3 className="text-xl font-semibold mb-2">{language === 'en' ? `Target Corpus in ${yearsToGoal} Years` : `${yearsToGoal} సంవత్సరాలలో లక్ష్య నిధి`}</h3>
                        <p className="text-3xl font-bold text-secondary dark:text-blue-400 mb-4">{formatCurrency(targetCorpus)}</p>
                        <h3 className="text-xl font-semibold mb-2">{language === 'en' ? 'Required Monthly SIP' : 'అవసరమైన నెలవారీ SIP'}</h3>
                        <p className="text-3xl font-bold text-green-600">{formatCurrency(requiredSip)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChildUniversityFundPlanner;