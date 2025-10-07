import React, { useState } from 'react';
import { useLanguage } from '../../../context/LanguageContext';

const InsuranceTypeSelectorGuide: React.FC = () => {
    const { language } = useLanguage();
    const [goal, setGoal] = useState('');
    const [result, setResult] = useState('');

    const handleSelect = (value: string) => {
        setGoal(value);
        setResult(value);
    };

    const results = {
        protection: {
            title: { en: 'Choose a Term Insurance Plan', te: 'టర్మ్ ఇన్సూరెన్స్ ప్లాన్‌ను ఎంచుకోండి' },
            desc: { en: 'For pure life protection, a Term Plan is the most cost-effective and efficient choice. It provides a large cover for a low premium.', te: 'కేవలం జీవిత రక్షణ కోసం, టర్మ్ ప్లాన్ అత్యంత తక్కువ ఖర్చుతో కూడిన మరియు సమర్థవంతమైన ఎంపిక. ఇది తక్కువ ప్రీమియంతో పెద్ద కవర్‌ను అందిస్తుంది.' },
            tip: { en: 'Combine this with a separate Mutual Fund SIP for your investment goals. Never mix insurance and investment!', te: 'మీ పెట్టుబడి లక్ష్యాల కోసం దీనిని ఒక ప్రత్యేక మ్యూచువల్ ఫండ్ SIPతో కలపండి. భీమా మరియు పెట్టుబడిని ఎప్పుడూ కలపవద్దు!' },
        },
        investment: {
            title: { en: 'Separate Insurance & Investment', te: 'భీమా & పెట్టుబడిని వేరు చేయండి' },
            desc: { en: 'ULIPs and Endowment plans often provide low cover and sub-par returns. It is highly recommended to buy a Term Plan for insurance and invest the rest in Mutual Funds for better growth.', te: 'యులిప్‌లు మరియు ఎండోమెంట్ ప్లాన్‌లు తరచుగా తక్కువ కవర్ మరియు తక్కువ రాబడిని అందిస్తాయి. భీమా కోసం ఒక టర్మ్ ప్లాన్‌ను కొనుగోలు చేసి, మిగిలినదాన్ని మంచి వృద్ధి కోసం మ్యూచువల్ ఫండ్స్‌లో పెట్టుబడి పెట్టడం చాలా సిఫార్సు చేయబడింది.' },
            tip: { en: 'A Term Plan + SIP combination almost always outperforms traditional insurance-cum-investment plans.', te: 'ఒక టర్మ్ ప్లాన్ + SIP కలయిక దాదాపు ఎల్లప్పుడూ సాంప్రదాయ భీమా-కమ్-పెట్టుబడి ప్లాన్‌లను మించిపోతుంది.' },
        }
    };
    
    const introContent = {
        what: { en: "This guide clarifies the difference between pure insurance (Term Plans) and insurance-cum-investment products (like ULIPs and Endowment Plans).", te: "ఈ గైడ్ స్వచ్ఛమైన భీమా (టర్మ్ ప్లాన్లు) మరియు భీమా-కమ్-పెట్టుబడి ఉత్పత్తుల (యులిప్‌లు మరియు ఎండోమెంట్ ప్లాన్‌ల వంటివి) మధ్య వ్యత్యాసాన్ని స్పష్టం చేస్తుంది." },
        why: { en: "Mixing insurance and investment is often inefficient. These mixed products can be complex, expensive, and may not provide adequate life cover or good investment returns. Understanding the difference is key to making a smart choice.", te: "భీమా మరియు పెట్టుబడిని కలపడం తరచుగా అసమర్థంగా ఉంటుంది. ఈ మిశ్రమ ఉత్పత్తులు సంక్లిష్టంగా, ఖరీదైనవిగా ఉండవచ్చు మరియు తగినంత జీవిత బీమా లేదా మంచి పెట్టుబడి రాబడిని అందించకపోవచ్చు. వ్యత్యాసాన్ని అర్థం చేసుకోవడం ఒక తెలివైన ఎంపిక చేసుకోవడానికి కీలకం." },
        who: { en: "Anyone looking to buy life insurance and confused by the various products available in the market.", te: "జీవిత బీమా కొనాలని చూస్తున్న మరియు మార్కెట్లో అందుబాటులో ఉన్న వివిధ ఉత్పత్తుల గురించి గందరగోళంలో ఉన్న ఎవరైనా." },
        how: { en: "By asking for your primary goal—pure protection or a mix of both—this tool provides a clear and financially prudent recommendation. It emphasizes the widely accepted financial planning principle of keeping insurance and investment separate.", te: "మీ ప్రాథమిక లక్ష్యం—స్వచ్ఛమైన రక్షణ లేదా రెండింటి మిశ్రమం—అడగడం ద్వారా, ఈ సాధనం స్పష్టమైన మరియు ఆర్థికంగా వివేకవంతమైన సిఫార్సును అందిస్తుంది. ఇది భీమా మరియు పెట్టుబడిని వేరుగా ఉంచే విస్తృతంగా ఆమోదించబడిన ఆర్థిక ప్రణాళిక సూత్రాన్ని నొక్కి చెబుతుంది." }
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
                    <h3 className="text-xl font-semibold mb-4 text-center">{language === 'en' ? 'What is your primary goal?' : 'మీ ప్రాథమిక లక్ష్యం ఏమిటి?'}</h3>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button onClick={() => handleSelect('protection')} className={`flex-1 p-4 border rounded-lg ${goal === 'protection' ? 'bg-blue-100 dark:bg-blue-900 border-primary' : ''}`}>{language === 'en' ? 'Pure Financial Protection for my family' : 'నా కుటుంబానికి కేవలం ఆర్థిక రక్షణ'}</button>
                        <button onClick={() => handleSelect('investment')} className={`flex-1 p-4 border rounded-lg ${goal === 'investment' ? 'bg-blue-100 dark:bg-blue-900 border-primary' : ''}`}>{language === 'en' ? 'Insurance plus Investment Returns' : 'భీమా మరియు పెట్టుబడి రాబడి'}</button>
                    </div>

                    {result && (
                        <div className="mt-6 text-center bg-light dark:bg-slate-800 p-6 rounded-lg">
                            <h3 className="text-2xl font-bold text-secondary dark:text-blue-400 mb-2">{results[result as keyof typeof results].title[language]}</h3>
                            <p>{results[result as keyof typeof results].desc[language]}</p>
                            <p className="font-bold mt-4 p-3 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-md">{results[result as keyof typeof results].tip[language]}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InsuranceTypeSelectorGuide;