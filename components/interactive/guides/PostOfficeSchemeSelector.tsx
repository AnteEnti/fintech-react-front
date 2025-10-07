import React, { useState } from 'react';
import { useLanguage } from '../../../context/LanguageContext';

const PostOfficeSchemeSelector: React.FC = () => {
    const { language } = useLanguage();
    const [investor, setInvestor] = useState('');
    const [goal, setGoal] = useState('');
    const [result, setResult] = useState('');

    const handleSelect = () => {
        let res = 'nsc'; // Default
        if (investor === 'senior') res = 'scss';
        else if (investor === 'daughter') res = 'ssy';
        else if (goal === 'monthly') res = 'mis';
        else if (goal === 'long_term') res = 'kvp';
        setResult(res);
    };

    const schemes = {
        scss: { name: { en: 'Senior Citizen Savings Scheme (SCSS)', te: 'సీనియర్ సిటిజన్ సేవింగ్స్ స్కీమ్ (SCSS)' }, desc: { en: 'Offers high safety and regular quarterly interest payments for senior citizens.', te: 'సీనియర్ సిటిజన్ల కోసం అధిక భద్రత మరియు క్రమమైన త్రైమాసిక వడ్డీ చెల్లింపులను అందిస్తుంది.'}},
        ssy: { name: { en: 'Sukanya Samriddhi Yojana (SSY)', te: 'సుకన్య సమృద్ధి యోజన (SSY)' }, desc: { en: 'A high-interest, tax-saving scheme for the future of a girl child.', te: 'ఆడపిల్ల భవిష్యత్తు కోసం అధిక-వడ్డీ, పన్ను-ఆదా పథకం.'}},
        mis: { name: { en: 'Monthly Income Scheme (MIS)', te: 'నెలవారీ ఆదాయ పథకం (MIS)' }, desc: { en: 'Provides a fixed monthly income from a one-time lump sum investment.', te: 'ఒకేసారి ఏకమొత్తం పెట్టుబడి నుండి స్థిర నెలవారీ ఆదాయాన్ని అందిస్తుంది.'}},
        kvp: { name: { en: 'Kisan Vikas Patra (KVP)', te: 'కిసాన్ వికాస్ పత్ర (KVP)' }, desc: { en: 'A scheme where the invested money doubles in a predetermined period (currently ~115 months).', te: 'పెట్టుబడి పెట్టిన డబ్బు ముందుగా నిర్ణయించిన కాలంలో (ప్రస్తుతం ~115 నెలలు) రెట్టింపు అయ్యే పథకం.'}},
        nsc: { name: { en: 'National Savings Certificate (NSC)', te: 'నేషనల్ సేవింగ్స్ సర్టిఫికేట్ (NSC)' }, desc: { en: 'A 5-year tax-saving instrument with a fixed interest rate, suitable for general long-term savings.', te: 'స్థిర వడ్డీ రేటుతో 5-సంవత్సరాల పన్ను-ఆదా సాధనం, సాధారణ దీర్ఘకాలిక పొదుపులకు అనువైనది.'}},
    };
    
    const introContent = {
        what: { en: "Post Office schemes are government-backed savings instruments known for their high safety and guaranteed returns. They cater to various needs, from long-term savings to regular income.", te: "పోస్ట్ ఆఫీస్ పథకాలు అధిక భద్రత మరియు హామీతో కూడిన రాబడికి ప్రసిద్ధి చెందిన ప్రభుత్వ-మద్దతుగల పొదుపు సాధనాలు. ఇవి దీర్ఘకాలిక పొదుపుల నుండి క్రమమైన ఆదాయం వరకు వివిధ అవసరాలను తీరుస్తాయి." },
        why: { en: "They are ideal for risk-averse investors who prioritize capital protection over high returns. Many also offer tax benefits, making them a staple in conservative investment portfolios.", te: "అధిక రాబడి కంటే మూలధన రక్షణకు ప్రాధాన్యత ఇచ్చే ప్రమాద-విముఖ పెట్టుబడిదారులకు ఇవి అనువైనవి. చాలా వరకు పన్ను ప్రయోజనాలను కూడా అందిస్తాయి, ఇవి సంప్రదాయవాద పెట్టుబడి పోర్ట్‌ఫోలియోలలో ఒక ప్రధాన అంశంగా ఉంటాయి." },
        who: { en: "Conservative investors, senior citizens looking for regular income, and parents planning for their children's future (especially a girl child).", te: "సంప్రదాయవాద పెట్టుబడిదారులు, క్రమమైన ఆదాయం కోసం చూస్తున్న సీనియర్ సిటిజన్లు, మరియు తమ పిల్లల భవిష్యత్తు (ముఖ్యంగా ఆడపిల్ల) కోసం ప్రణాళిక వేస్తున్న తల్లిదండ్రులు." },
        how: { en: "This tool simplifies the selection process. By asking who the investment is for and what the primary goal is, it quickly filters through the various schemes and recommends the most suitable one for your specific requirement.", te: "ఈ సాధనం ఎంపిక ప్రక్రియను సులభతరం చేస్తుంది. పెట్టుబడి ఎవరి కోసం మరియు ప్రాథమిక లక్ష్యం ఏమిటి అని అడగడం ద్వారా, ఇది వివిధ పథకాలను త్వరగా ఫిల్టర్ చేస్తుంది మరియు మీ నిర్దిష్ట అవసరానికి అత్యంత అనువైనదాన్ని సిఫార్సు చేస్తుంది." }
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
                            <label htmlFor="investor-type" className="block text-sm font-medium mb-1">{language === 'en' ? 'Who are you investing for?' : 'మీరు ఎవరి కోసం పెట్టుబడి పెడుతున్నారు?'}</label>
                            <select id="investor-type" value={investor} onChange={e => setInvestor(e.target.value)} className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-slate-700">
                                <option value="">{language === 'en' ? 'Select...' : 'ఎంచుకోండి...'}</option>
                                <option value="self">{language === 'en' ? 'Myself (General)' : 'నా కోసం (సాధారణ)'}</option>
                                <option value="daughter">{language === 'en' ? 'My Daughter (below 10 yrs)' : 'నా కుమార్తె (10 సం. లోపు)'}</option>
                                <option value="senior">{language === 'en' ? 'Senior Citizen' : 'సీనియర్ సిటిజన్'}</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="primary-goal" className="block text-sm font-medium mb-1">{language === 'en' ? 'What is your primary goal?' : 'మీ ప్రాథమిక లక్ష్యం ఏమిటి?'}</label>
                            <select id="primary-goal" value={goal} onChange={e => setGoal(e.target.value)} className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-slate-700" disabled={investor === 'senior' || investor === 'daughter'}>
                                <option value="">{language === 'en' ? 'Select...' : 'ఎంచుకోండి...'}</option>
                                <option value="tax_saving">{language === 'en' ? 'Tax Saving' : 'పన్ను ఆదా'}</option>
                                <option value="monthly">{language === 'en' ? 'Regular Monthly Income' : 'క్రమమైన నెలవారీ ఆదాయం'}</option>
                                <option value="long_term">{language === 'en' ? 'Long-term Growth' : 'దీర్ఘకాలిక వృద్ధి'}</option>
                            </select>
                        </div>
                    </div>
                    <div className="text-center">
                        <button onClick={handleSelect} disabled={!investor} className="bg-accent text-white px-6 py-2 rounded-lg disabled:opacity-50">{language === 'en' ? 'Find Scheme' : 'పథకాన్ని కనుగొనండి'}</button>
                    </div>
                    {result && (
                        <div className="mt-6 text-center bg-light dark:bg-slate-800 p-6 rounded-lg">
                            <h3 className="text-xl font-semibold mb-2">{language === 'en' ? 'Recommended Scheme:' : 'సిఫార్సు చేయబడిన పథకం:'}</h3>
                            <p className="text-2xl font-bold text-secondary dark:text-blue-400 mb-2">{schemes[result as keyof typeof schemes].name[language]}</p>
                            <p>{schemes[result as keyof typeof schemes].desc[language]}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PostOfficeSchemeSelector;