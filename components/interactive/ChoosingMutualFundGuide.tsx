import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const ChoosingMutualFundGuide: React.FC = () => {
    const { language } = useLanguage();
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [riskProfile, setRiskProfile] = useState('');

    const questions = [
        {
            q: { en: 'If your investment of ₹1 Lakh dropped to ₹80,000 in a month, what would you do?', te: 'మీ ₹1 లక్ష పెట్టుబడి ఒక నెలలో ₹80,000కి పడిపోతే, మీరు ఏమి చేస్తారు?' },
            a: [
                { en: 'Sell immediately to prevent further loss.', te: 'మరింత నష్టాన్ని నివారించడానికి వెంటనే అమ్మేస్తాను.', score: 1 },
                { en: 'Hold and wait for it to recover.', te: 'ఉంచి, అది కోలుకునే వరకు వేచి ఉంటాను.', score: 2 },
                { en: 'Invest more, it\'s a buying opportunity.', te: 'ఇంకా పెట్టుబడి పెడతాను, ఇది కొనడానికి ఒక అవకాశం.', score: 3 },
            ]
        },
        {
            q: { en: 'What is your primary investment goal?', te: 'మీ ప్రాథమిక పెట్టుబడి లక్ష్యం ఏమిటి?' },
            a: [
                { en: 'Capital protection is most important.', te: 'మూలధనాన్ని రక్షించడం చాలా ముఖ్యం.', score: 1 },
                { en: 'A mix of safety and moderate growth.', te: 'భద్రత మరియు మధ్యస్థ వృద్ధి యొక్క మిశ్రమం.', score: 2 },
                { en: 'Maximize long-term growth, willing to take risks.', te: 'దీర్ఘకాలిక వృద్ధిని పెంచుకోవడం, నష్టాలను తీసుకోవడానికి సిద్ధంగా ఉన్నాను.', score: 3 },
            ]
        }
    ];

    const handleAnswer = (qIndex: number, score: number) => {
        setAnswers(prev => ({ ...prev, [qIndex]: score }));
    };

    const calculateProfile = () => {
        const totalScore = Object.values(answers).reduce((sum: number, score: number) => sum + score, 0);
        if (totalScore <= 3) setRiskProfile('Conservative');
        else if (totalScore <= 4) setRiskProfile('Moderate');
        else setRiskProfile('Aggressive');
        setStep(step + 1);
    };

    const renderContent = () => {
        if (step === 0) {
            return (
                <div>
                    <p className="mb-4">{language === 'en' ? 'Welcome! This guide will help you understand which type of mutual fund might be right for you. First, let\'s figure out your risk profile.' : 'స్వాగతం! ఏ రకమైన మ్యూచువల్ ఫండ్ మీకు సరైనదో అర్థం చేసుకోవడానికి ఈ గైడ్ మీకు సహాయపడుతుంది. ముందుగా, మీ రిస్క్ ప్రొఫైల్‌ను కనుగొందాం.'}</p>
                    <button onClick={() => setStep(1)} className="bg-accent text-white px-6 py-2 rounded-lg">{language === 'en' ? 'Start Quiz' : 'క్విజ్ ప్రారంభించండి'}</button>
                </div>
            );
        }
        if (step > 0 && step <= questions.length) {
            const qIndex = step - 1;
            const question = questions[qIndex];
            return (
                <div>
                    <h3 className="text-xl font-semibold mb-4">{question.q[language]}</h3>
                    <div className="space-y-3">
                        {question.a.map((option, aIndex) => (
                            <button key={aIndex} onClick={() => handleAnswer(qIndex, option.score)} className={`block w-full text-left p-3 border rounded-lg ${answers[qIndex] === option.score ? 'bg-blue-100 dark:bg-blue-900 border-primary' : 'bg-gray-50 dark:bg-slate-700'}`}>
                                {option[language]}
                            </button>
                        ))}
                    </div>
                    <div className="mt-6">
                        {answers[qIndex] && (
                            <button onClick={() => (step === questions.length ? calculateProfile() : setStep(step + 1))} className="bg-accent text-white px-6 py-2 rounded-lg">
                                {language === 'en' ? (step === questions.length ? 'See Profile' : 'Next') : (step === questions.length ? 'ప్రొఫైల్ చూడండి' : 'తదుపరి')}
                            </button>
                        )}
                    </div>
                </div>
            )
        }
        if(riskProfile) {
            const profiles = {
                Conservative: {
                    title: { en: 'Your Profile: Conservative', te: 'మీ ప్రొఫైల్: కన్సర్వేటివ్' },
                    text: { en: 'You prioritize protecting your capital. You may be comfortable with low-risk investments that offer steady, but lower, returns. Consider looking into Debt Mutual Funds, like Liquid Funds or Short-Term Debt Funds.', te: 'మీరు మీ మూలధనాన్ని రక్షించడానికి ప్రాధాన్యత ఇస్తారు. మీరు స్థిరమైన, కానీ తక్కువ, రాబడిని అందించే తక్కువ-ప్రమాద పెట్టుబడులతో సౌకర్యవంతంగా ఉండవచ్చు. లిక్విడ్ ఫండ్స్ లేదా షార్ట్-టర్మ్ డెట్ ఫండ్స్ వంటి డెట్ మ్యూచువల్ ఫండ్స్‌ను పరిశీలించండి.' }
                },
                Moderate: {
                    title: { en: 'Your Profile: Moderate', te: 'మీ ప్రొఫైల్: మోడరేట్' },
                    text: { en: 'You seek a balance between growth and safety. You are willing to take some calculated risks for better returns. Consider looking into Hybrid Funds (which invest in both equity and debt) or Large-Cap Equity Funds.', te: 'మీరు వృద్ధి మరియు భద్రత మధ్య సమతుల్యం కోరుకుంటారు. మీరు మంచి రాబడి కోసం కొన్ని లెక్కించిన నష్టాలను తీసుకోవడానికి సిద్ధంగా ఉన్నారు. హైబ్రిడ్ ఫండ్స్ (ఈక్విటీ మరియు డెట్ రెండింటిలోనూ పెట్టుబడి పెట్టేవి) లేదా లార్జ్-క్యాప్ ఈక్విటీ ఫండ్స్‌ను పరిశీలించండి.' }
                },
                Aggressive: {
                    title: { en: 'Your Profile: Aggressive', te: 'మీ ప్రొఫైల్: అగ్రెసివ్' },
                    text: { en: 'Your main goal is long-term wealth creation, and you are comfortable with market volatility for potentially high returns. Consider looking into Flexi-Cap, Mid-Cap, or Small-Cap Equity Funds.', te: 'మీ ప్రధాన లక్ష్యం దీర్ఘకాలిక సంపద సృష్టి, మరియు మీరు అధిక రాబడి కోసం మార్కెట్ అస్థిరతతో సౌకర్యవంతంగా ఉన్నారు. ఫ్లెక్సీ-క్యాప్, మిడ్-క్యాప్, లేదా స్మాల్-క్యాప్ ఈక్విటీ ఫండ్స్‌ను పరిశీలించండి.' }
                }
            };
            const result = profiles[riskProfile as keyof typeof profiles];
            return (
                 <div>
                    <h3 className="text-2xl font-bold mb-4 text-secondary dark:text-blue-400">{result.title[language]}</h3>
                    <p>{result.text[language]}</p>
                    <button onClick={() => { setStep(0); setAnswers({}); setRiskProfile(''); }} className="mt-6 text-sm text-primary dark:text-blue-300 hover:underline">{language === 'en' ? 'Retake Quiz' : 'క్విజ్ మళ్ళీ తీసుకోండి'}</button>
                </div>
            )
        }
        return null;
    }

    return (
        <div className="prose max-w-none text-gray-700 dark:text-gray-300">
           {renderContent()}
        </div>
    );
};

export default ChoosingMutualFundGuide;