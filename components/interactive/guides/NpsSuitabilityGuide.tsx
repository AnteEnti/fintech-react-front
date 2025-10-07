import React, { useState } from 'react';
import { useLanguage } from '../../../context/LanguageContext';

const NpsSuitabilityGuide: React.FC = () => {
    const { language } = useLanguage();
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [result, setResult] = useState('');

    const questions = [
        { q: { en: 'Are you comfortable with your investment being locked in until age 60?', te: 'మీ పెట్టుబడి 60 ఏళ్ళ వయస్సు వరకు లాక్ చేయబడి ఉండటంతో మీరు సౌకర్యవంతంగా ఉన్నారా?'}, a: [{en: 'Yes', te: 'అవును', v: 'yes'}, {en: 'No', te: 'కాదు', v: 'no'}] },
        { q: { en: 'Are you looking for an additional tax-saving option beyond Section 80C?', te: 'మీరు సెక్షన్ 80Cకి మించి అదనపు పన్ను-ఆదా ఎంపిక కోసం చూస్తున్నారా?'}, a: [{en: 'Yes', te: 'అవును', v: 'yes'}, {en: 'No', te: 'కాదు', v: 'no'}] },
    ];

    const handleAnswer = (qIndex: number, value: string) => {
        setAnswers(prev => ({ ...prev, [qIndex]: value }));
        if (qIndex === questions.length - 1) {
            const finalAnswers = {...answers, [qIndex]: value};
            if (finalAnswers[0] === 'no') {
                setResult('not_suitable');
            } else {
                setResult('suitable');
            }
            setStep(step + 1);
        } else {
            setStep(step + 1);
        }
    };
    
    const handleStart = () => {
        setStep(1);
        setAnswers({});
        setResult('');
    };
    
    const introContent = {
        what: { en: "The National Pension System (NPS) is a government-backed, voluntary retirement savings scheme. It allows you to invest in a mix of equity and debt to build a retirement corpus.", te: "నేషనల్ పెన్షన్ సిస్టమ్ (NPS) అనేది ప్రభుత్వం-మద్దతుగల, స్వచ్ఛంద పదవీ విరమణ పొదుపు పథకం. ఇది పదవీ విరమణ కార్పస్‌ను నిర్మించడానికి ఈక్విటీ మరియు డెట్ మిశ్రమంలో పెట్టుబడి పెట్టడానికి మిమ్మల్ని అనుమతిస్తుంది." },
        why: { en: "NPS is one of the lowest-cost retirement products available. It offers exclusive tax benefits under Section 80CCD(1B) up to ₹50,000, over and above the 80C limit, making it an attractive option for tax planners.", te: "NPS అందుబాటులో ఉన్న అత్యల్ప-ఖర్చు పదవీ విరమణ ఉత్పత్తులలో ఒకటి. ఇది సెక్షన్ 80CCD(1B) కింద ₹50,000 వరకు ప్రత్యేక పన్ను ప్రయోజనాలను అందిస్తుంది, ఇది 80C పరిమితికి అదనంగా, పన్ను ప్లానర్లకు ఆకర్షణీయమైన ఎంపికగా చేస్తుంది." },
        who: { en: "Any Indian citizen (resident or non-resident) between 18 - 70 years looking for a disciplined, long-term product for retirement planning and tax saving.", te: "పదవీ విరమణ ప్రణాళిక మరియు పన్ను ఆదా కోసం క్రమశిక్షణతో కూడిన, దీర్ఘకాలిక ఉత్పత్తి కోసం చూస్తున్న 18 - 70 సంవత్సరాల మధ్య ఉన్న ఏ భారతీయ పౌరుడైనా (నివాసి లేదా ప్రవాసి)." },
        how: { en: "This guide helps you decide if NPS fits your financial goals and temperament. By asking crucial questions about the long lock-in period and your tax-saving needs, it provides a clear 'suitable' or 'not suitable' recommendation, along with the key pros and cons to consider.", te: "ఈ గైడ్ NPS మీ ఆర్థిక లక్ష్యాలు మరియు స్వభావానికి సరిపోతుందో లేదో నిర్ణయించడంలో మీకు సహాయపడుతుంది. దీర్ఘ లాక్-ఇన్ పీరియడ్ మరియు మీ పన్ను-ఆదా అవసరాల గురించి కీలకమైన ప్రశ్నలను అడగడం ద్వారా, ఇది స్పష్టమైన 'అనుకూలమైనది' లేదా 'అనుకూలం కాదు' సిఫార్సును అందిస్తుంది, దానితో పాటు పరిగణించవలసిన కీలకమైన ప్రోస్ మరియు కాన్స్‌తో." }
    };

    const renderTool = () => {
        if (step === 0) {
            return (
                <div className="text-center">
                    <button onClick={handleStart} className="bg-accent text-white px-6 py-2 rounded-lg">{language === 'en' ? 'Check NPS Suitability' : 'NPS అనుకూలతను తనిఖీ చేయండి'}</button>
                </div>
            );
        }
        if (step > 0 && step <= questions.length) {
            const qIndex = step - 1;
            const question = questions[qIndex];
            return (
                <div>
                    <h3 className="text-xl font-semibold mb-4 text-center">{question.q[language]}</h3>
                    <div className="flex gap-4 justify-center">
                        {question.a.map(opt => (
                            <button key={opt.v} onClick={() => handleAnswer(qIndex, opt.v)} className="flex-1 max-w-xs p-3 border rounded-lg hover:bg-blue-50 dark:hover:bg-slate-700">{opt[language]}</button>
                        ))}
                    </div>
                </div>
            );
        }
        if (result) {
            const isSuitable = result === 'suitable';
            return (
                <div className="text-center">
                    <h3 className={`text-2xl font-bold mb-4 ${isSuitable ? 'text-green-600' : 'text-red-500'}`}>
                        {isSuitable ? (language === 'en' ? 'NPS seems like a good fit for you.' : 'NPS మీకు మంచి ఎంపికగా కనిపిస్తుంది.') : (language === 'en' ? 'NPS might not be the best choice for you.' : 'NPS మీకు ఉత్తమ ఎంపిక కాకపోవచ్చు.')}
                    </h3>
                    <div className="text-left space-y-2">
                        <p><strong>{language === 'en' ? 'Pros:' : 'ప్రోస్:'}</strong> {language === 'en' ? 'Low-cost retirement product, additional tax benefits under 80CCD(1B), and market-linked returns.' : 'తక్కువ-ఖర్చు పదవీ విరమణ ఉత్పత్తి, 80CCD(1B) కింద అదనపు పన్ను ప్రయోజనాలు, మరియు మార్కెట్-లింక్డ్ రాబడి.'}</p>
                         <p><strong>{language === 'en' ? 'Cons:' : 'కాన్స్:'}</strong> {language === 'en' ? 'Long lock-in period until age 60, mandatory annuity purchase with 40% of the corpus, and annuity income is taxable.' : '60 ఏళ్ళ వయస్సు వరకు దీర్ఘ లాక్-ఇన్ కాలం, 40% కార్పస్‌తో తప్పనిసరి యాన్యుటీ కొనుగోలు, మరియు యాన్యుటీ ఆదాయం పన్ను విధించదగినది.'}</p>
                    </div>
                    { !isSuitable && <p className="mt-4">{language === 'en' ? 'Since you need liquidity before 60, consider more flexible options like ELSS (3-year lock-in) or regular mutual fund SIPs.' : 'మీకు 60 కన్నా ముందు లిక్విడిటీ అవసరం కాబట్టి, ELSS (3-సంవత్సరాల లాక్-ఇన్) లేదా సాధారణ మ్యూచువల్ ఫండ్ SIPల వంటి మరింత సౌకర్యవంతమైన ఎంపికలను పరిగణించండి.'}</p> }
                    <button onClick={handleStart} className="mt-6 text-sm text-primary dark:text-blue-300 hover:underline">{language === 'en' ? 'Start Over' : 'మళ్ళీ ప్రారంభించండి'}</button>
                </div>
            )
        }
        return null;
    }

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

export default NpsSuitabilityGuide;