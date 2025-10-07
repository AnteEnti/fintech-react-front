import React, { useState, useMemo } from 'react';
import { useLanguage } from '../../../context/LanguageContext';

const Personalized80cGuide: React.FC = () => {
    const { language } = useLanguage();
    const [epf, setEpf] = useState('60000');
    const [risk, setRisk] = useState('');
    const [result, setResult] = useState<string[]>([]);

    const remainingLimit = useMemo(() => {
        return Math.max(0, 150000 - (Number(epf) || 0));
    }, [epf]);

    const findInvestments = () => {
        if (risk === 'low') {
            setResult(['ppf', 'nsc']);
        } else if (risk === 'medium') {
            setResult(['elss', 'ppf']);
        } else {
            setResult(['elss']);
        }
    };
    
    const investments = {
        ppf: { name: { en: 'Public Provident Fund (PPF)', te: 'పబ్లిక్ ప్రావిడెంట్ ఫండ్ (PPF)' }, desc: { en: 'Safe, government-backed, long-term.', te: 'సురక్షితమైన, ప్రభుత్వ-మద్దతుగల, దీర్ఘకాలికం.'}},
        nsc: { name: { en: 'National Savings Certificate (NSC)', te: 'నేషనల్ సేవింగ్స్ సర్టిఫికేట్ (NSC)' }, desc: { en: '5-year fixed income instrument from Post Office.', te: 'పోస్ట్ ఆఫీస్ నుండి 5-సంవత్సరాల స్థిర ఆదాయ సాధనం.'}},
        elss: { name: { en: 'Equity Linked Savings Scheme (ELSS)', te: 'ఈక్విటీ లింక్డ్ సేవింగ్స్ స్కీమ్ (ELSS)' }, desc: { en: 'Tax-saving mutual funds with a 3-year lock-in, market-linked returns.', te: '3-సంవత్సరాల లాక్-ఇన్‌తో పన్ను-ఆదా మ్యూచువల్ ఫండ్స్, మార్కెట్-లింక్డ్ రాబడి.'}},
    };
    
    const introContent = {
        what: { en: "Section 80C of the Income Tax Act allows you to reduce your taxable income by up to ₹1.5 Lakh by investing in specified instruments. This guide helps you choose the right ones for you.", te: "ఆదాయపు పన్ను చట్టంలోని సెక్షన్ 80C, నిర్దిష్ట సాధనాలలో పెట్టుబడి పెట్టడం ద్వారా మీ పన్ను విధించదగిన ఆదాయాన్ని ₹1.5 లక్షల వరకు తగ్గించుకోవడానికి మిమ్మల్ని అనుమతిస్తుంది. ఈ గైడ్ మీకు సరైన వాటిని ఎంచుకోవడంలో సహాయపడుతుంది." },
        why: { en: "Effectively using the 80C limit is one of the easiest ways to save tax. Choosing investments that also align with your risk profile ensures you meet your financial goals while saving tax.", te: "80C పరిమితిని సమర్థవంతంగా ఉపయోగించడం పన్ను ఆదా చేయడానికి సులభమైన మార్గాలలో ఒకటి. మీ ప్రమాద ప్రొఫైల్‌కు అనుగుణంగా ఉండే పెట్టుబడులను ఎంచుకోవడం పన్ను ఆదా చేస్తూ మీ ఆర్థిక లక్ష్యాలను చేరుకునేలా చేస్తుంది." },
        who: { en: "Any taxpayer under the Old Tax Regime who has not yet exhausted their ₹1.5 Lakh limit through mandatory contributions like EPF.", te: "EPF వంటి తప్పనిసరి కంట్రిబ్యూషన్ల ద్వారా తమ ₹1.5 లక్షల పరిమితిని ఇంకా పూర్తి చేయని పాత పన్ను విధానం కింద ఉన్న ఏ పన్ను చెల్లింపుదారుడైనా." },
        how: { en: "This tool first calculates how much of your 80C limit is still available after your EPF contribution. Then, based on your stated risk tolerance, it recommends suitable investment options (like PPF, NSC, or ELSS) to help you fill the gap.", te: "ఈ సాధనం మొదట మీ EPF కంట్రిబ్యూషన్ తర్వాత మీ 80C పరిమితిలో ఇంకా ఎంత అందుబాటులో ఉందో గణిస్తుంది. ఆ తర్వాత, మీ పేర్కొన్న ప్రమాద సహనం ఆధారంగా, అంతరాన్ని పూరించడంలో మీకు సహాయపడటానికి ఇది అనువైన పెట్టుబడి ఎంపికలను (PPF, NSC, లేదా ELSS వంటివి) సిఫార్సు చేస్తుంది." }
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
                    <div>
                        <label htmlFor="epfContribution" className="block text-sm font-medium mb-1">{language==='en'?'Your Annual EPF Contribution':'మీ వార్షిక EPF కంట్రిబ్యూషన్'}</label>
                        <input id="epfContribution" value={epf} onChange={e => setEpf(e.target.value)} type="number" className="w-full p-2 border rounded"/>
                    </div>
                    <p>{language==='en'?'Your remaining 80C limit is:':'మీ మిగిలిన 80C పరిమితి:'} <span className="font-bold">{remainingLimit.toLocaleString('en-IN')}</span></p>

                    {remainingLimit > 0 && (
                        <>
                        <div>
                            <label htmlFor="riskTolerance" className="block text-sm font-medium mb-1">{language==='en'?'Your Risk Tolerance':'మీ రిస్క్ సహనం'}</label>
                            <select id="riskTolerance" value={risk} onChange={e => setRisk(e.target.value)} className="w-full p-2 border rounded">
                                <option value="">{language==='en'?'Select...':'ఎంచుకోండి...'}</option>
                                <option value="low">{language==='en'?'Low':'తక్కువ'}</option>
                                <option value="medium">{language==='en'?'Medium':'మధ్యస్థం'}</option>
                                <option value="high">{language==='en'?'High':'అధికం'}</option>
                            </select>
                        </div>
                        <div className="text-center">
                            <button onClick={findInvestments} disabled={!risk} className="bg-accent text-white px-6 py-2 rounded-lg disabled:opacity-50">{language==='en'?'Find Investments':'పెట్టుబడులను కనుగొనండి'}</button>
                        </div>
                        </>
                    )}

                    {result.length > 0 && (
                        <div className="mt-6 border-t pt-6">
                            <h3 className="text-xl font-semibold mb-4">{language==='en'?'Recommended Options to cover the remaining amount:':'మిగిలిన మొత్తాన్ని కవర్ చేయడానికి సిఫార్సు చేయబడిన ఎంపికలు:'}</h3>
                            <div className="space-y-3">
                                {result.map(key => {
                                    const item = investments[key as keyof typeof investments];
                                    return (
                                        <div key={key} className="p-3 bg-light dark:bg-slate-800 rounded-lg">
                                            <p className="font-bold text-secondary dark:text-blue-400">{item.name[language]}</p>
                                            <p className="text-sm">{item.desc[language]}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Personalized80cGuide;