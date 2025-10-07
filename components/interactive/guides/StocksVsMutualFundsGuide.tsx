import React, { useState } from 'react';
import { useLanguage } from '../../../context/LanguageContext';

const StocksVsMutualFundsGuide: React.FC = () => {
    const { language } = useLanguage();
    const [step, setStep] = useState(0);
    const [time, setTime] = useState('');
    const [knowledge, setKnowledge] = useState('');
    const [result, setResult] = useState('');

    const handleStart = () => {
        setStep(1);
        setTime('');
        setKnowledge('');
        setResult('');
    };

    const handleTimeSelect = (value: string) => {
        setTime(value);
        setStep(2);
    };
    
    const handleKnowledgeSelect = (value: string) => {
        setKnowledge(value);
        if (time === 'low' || value === 'beginner') {
            setResult('mf');
        } else {
            setResult('stocks');
        }
        setStep(3);
    };

    const recommendations = {
        mf: {
            title: { en: 'Recommendation: Start with Mutual Funds', te: 'సిఫార్సు: మ్యూచువల్ ఫండ్స్‌తో ప్రారంభించండి' },
            desc: { en: 'Since you have limited time for research or are new to the market, Mutual Funds are a great starting point. A fund manager handles the research and diversification for you.', te: 'మీకు పరిశోధన కోసం తక్కువ సమయం ఉన్నందున లేదా మార్కెట్‌కు కొత్త అయినందున, మ్యూచువల్ ఫండ్స్ ఒక గొప్ప ప్రారంభ స్థానం. ఒక ఫండ్ మేనేజర్ మీ కోసం పరిశోధన మరియు వైవిధ్యతను నిర్వహిస్తారు.' },
            pros: { en: 'Pros: Diversified, Professionally managed, Less time-consuming.', te: 'ప్రోస్: వైవిధ్యభరితమైనది, వృత్తిపరంగా నిర్వహించబడేది, తక్కువ సమయం తీసుకుంటుంది.' },
            cons: { en: 'Cons: Expense ratio (fees), Less control over individual stocks.', te: 'కాన్స్: వ్యయ నిష్పత్తి (ఫీజులు), వ్యక్తిగత స్టాక్స్‌పై తక్కువ నియంత్రణ.' }
        },
        stocks: {
            title: { en: 'Recommendation: You can explore Direct Stocks', te: 'సిఫార్సు: మీరు డైరెక్ట్ స్టాక్స్‌ను అన్వేషించవచ్చు' },
            desc: { en: 'Since you have the time for research and some market knowledge, you can consider investing in individual stocks. This gives you more control but also requires more effort.', te: 'మీకు పరిశోధన కోసం సమయం మరియు కొంత మార్కెట్ పరిజ్ఞానం ఉన్నందున, మీరు వ్యక్తిగత స్టాక్స్‌లో పెట్టుబడి పెట్టడాన్ని పరిగణించవచ్చు. ఇది మీకు ఎక్కువ నియంత్రణను ఇస్తుంది కానీ ఎక్కువ కృషి కూడా అవసరం.' },
            pros: { en: 'Pros: Full control, No expense ratio, Potential for higher returns.', te: 'ప్రోస్: పూర్తి నియంత్రణ, వ్యయ నిష్పత్తి లేదు, అధిక రాబడికి అవకాశం.' },
            cons: { en: 'Cons: Requires significant research, Higher risk if not diversified.', te: 'కాన్స్: గణనీయమైన పరిశోధన అవసరం, వైవిధ్యభరితంగా లేకపోతే అధిక ప్రమాదం.' }
        }
    };
    
    const introContent = {
        what: { en: "This guide addresses a common dilemma for new investors: whether to start by investing in individual company stocks directly or through mutual funds.", te: "ఈ గైడ్ కొత్త పెట్టుబడిదారులకు ఒక సాధారణ సందిగ్ధతను పరిష్కరిస్తుంది: నేరుగా వ్యక్తిగత కంపెనీ స్టాక్స్‌లో పెట్టుబడి పెట్టడం ప్రారంభించాలా లేదా మ్యూచువల్ ఫండ్స్ ద్వారా ప్రారంభించాలా." },
        why: { en: "The right choice depends heavily on your available time, knowledge, and risk tolerance. Making the wrong choice can lead to poor returns or unnecessary stress.", te: "సరైన ఎంపిక మీ అందుబాటులో ఉన్న సమయం, జ్ఞానం మరియు ప్రమాద సహనంపై ఎక్కువగా ఆధారపడి ఉంటుంది. తప్పు ఎంపిక చేసుకోవడం పేలవమైన రాబడికి లేదా అనవసరమైన ఒత్తిడికి దారితీయవచ్చు." },
        who: { en: "Beginner investors who are ready to start their journey in the equity market but are unsure of the best first step to take.", te: "ఈక్విటీ మార్కెట్లో తమ ప్రయాణాన్ని ప్రారంభించడానికి సిద్ధంగా ఉన్న ప్రారంభ పెట్టుబడిదారులు, కానీ తీసుకోవలసిన ఉత్తమ మొదటి అడుగు గురించి అనిశ్చితంగా ఉన్నారు." },
        how: { en: "This tool acts as a simple decision-maker. By answering two quick questions about your time commitment and knowledge level, it instantly provides a personalized recommendation, complete with the pros and cons for your specific situation.", te: "ఈ సాధనం ఒక సాధారణ నిర్ణయాధికారిగా పనిచేస్తుంది. మీ సమయం నిబద్ధత మరియు జ్ఞాన స్థాయి గురించి రెండు శీఘ్ర ప్రశ్నలకు సమాధానం ఇవ్వడం ద్వారా, ఇది మీ నిర్దిష్ట పరిస్థితికి ప్రోస్ మరియు కాన్స్‌తో పూర్తి, వ్యక్తిగతీకరించిన సిఫార్సును తక్షణమే అందిస్తుంది." }
    };

    const renderTool = () => {
        switch (step) {
            case 0:
                return (
                    <div className="text-center">
                        <button onClick={handleStart} className="bg-accent text-white px-6 py-2 rounded-lg">{language === 'en' ? 'Start Guide' : 'గైడ్ ప్రారంభించండి'}</button>
                    </div>
                );
            case 1:
                return (
                    <div>
                        <h3 className="text-xl font-semibold mb-4 text-center">{language === 'en' ? 'How much time can you dedicate to research each week?' : 'ప్రతి వారం పరిశోధన కోసం మీరు ఎంత సమయం కేటాయించగలరు?'}</h3>
                        <div className="space-y-3">
                            <button onClick={() => handleTimeSelect('low')} className="block w-full text-left p-4 border rounded-lg hover:bg-blue-50 dark:hover:bg-slate-700">{language === 'en' ? 'Less than 2 hours' : '2 గంటల కన్నా తక్కువ'}</button>
                            <button onClick={() => handleTimeSelect('high')} className="block w-full text-left p-4 border rounded-lg hover:bg-blue-50 dark:hover:bg-slate-700">{language === 'en' ? 'More than 2 hours' : '2 గంటల కన్నా ఎక్కువ'}</button>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <h3 className="text-xl font-semibold mb-4 text-center">{language === 'en' ? 'How would you rate your stock market knowledge?' : 'మీ స్టాక్ మార్కెట్ పరిజ్ఞానాన్ని మీరు ఎలా రేట్ చేస్తారు?'}</h3>
                        <div className="space-y-3">
                            <button onClick={() => handleKnowledgeSelect('beginner')} className="block w-full text-left p-4 border rounded-lg hover:bg-blue-50 dark:hover:bg-slate-700">{language === 'en' ? 'Beginner' : 'ప్రారంభకుడు'}</button>
                            <button onClick={() => handleKnowledgeSelect('intermediate')} className="block w-full text-left p-4 border rounded-lg hover:bg-blue-50 dark:hover:bg-slate-700">{language === 'en' ? 'Intermediate / Advanced' : 'మధ్యస్థం / ఉన్నత స్థాయి'}</button>
                        </div>
                    </div>
                );
            case 3:
                const rec = recommendations[result as keyof typeof recommendations];
                return (
                    <div>
                        <h3 className="text-2xl font-bold text-secondary dark:text-blue-400 mb-4">{rec.title[language]}</h3>
                        <p className="mb-4">{rec.desc[language]}</p>
                        <div className="space-y-2">
                            <p className="font-semibold text-green-600">{rec.pros[language]}</p>
                            <p className="font-semibold text-red-500">{rec.cons[language]}</p>
                        </div>
                        <button onClick={handleStart} className="mt-6 text-sm text-primary dark:text-blue-300 hover:underline">{language === 'en' ? 'Start Over' : 'మళ్ళీ ప్రారంభించండి'}</button>
                    </div>
                );
            default:
                return null;
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
                {renderTool()}
            </div>
        </div>
    );
};

export default StocksVsMutualFundsGuide;