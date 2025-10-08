import React, { useState } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const AssetAllocationPlanner: React.FC = () => {
    const { language, theme } = useLanguage();
    const [step, setStep] = useState(0);
    const [age, setAge] = useState(30);
    const [riskScore, setRiskScore] = useState(0);
    const [result, setResult] = useState<{ equity: number, debt: number, gold: number } | null>(null);

    const handleQuizSubmit = (score: number) => {
        setRiskScore(score);
        setStep(2);
    };

    const calculateAllocation = () => {
        const baseEquity = Math.max(20, Math.min(80, 100 - age));
        let finalEquity = baseEquity;

        if (riskScore < 4) { // Conservative
            finalEquity = Math.max(20, baseEquity - 20);
        } else if (riskScore > 6) { // Aggressive
            finalEquity = Math.min(90, baseEquity + 10);
        }
        
        const gold = 10;
        const debt = 100 - finalEquity - gold;

        setResult({ equity: finalEquity, debt, gold });
        setStep(3);
    };

    const chartData = {
        labels: [
            `${language === 'en' ? 'Equity' : 'ఈక్విటీ'} (${result?.equity}%)`,
            `${language === 'en' ? 'Debt' : 'డెట్'} (${result?.debt}%)`,
            `${language === 'en' ? 'Gold' : 'బంగారం'} (${result?.gold}%)`
        ],
        datasets: [{
            data: [result?.equity, result?.debt, result?.gold],
            backgroundColor: ['#3b82f6', '#16a34a', '#facc15'],
            borderColor: theme === 'dark' ? '#1e293b' : '#fff',
            borderWidth: 2,
        }]
    };
    const chartOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'top' as const, labels: { color: theme === 'dark' ? '#e2e8f0' : '#374151' } } } };

    const RiskQuiz = ({ onSubmit }: { onSubmit: (score: number) => void }) => {
        const [answers, setAnswers] = useState<Record<number, number>>({});
        const questions = [
            { q: { en: 'Investment experience?', te: 'పెట్టుబడి అనుభవం?'}, a: [{en: '< 1 year', te: '< 1 సం', s: 1}, {en: '1-3 years', te: '1-3 సం', s: 2}, {en: '> 3 years', te: '> 3 సం', s: 3}] },
            { q: { en: 'Reaction to a 20% market drop?', te: '20% మార్కెట్ పతనానికి ప్రతిచర్య?'}, a: [{en: 'Sell all', te: 'అన్నీ అమ్మేయాలి', s: 1}, {en: 'Wait', te: 'వేచి ఉండాలి', s: 2}, {en: 'Buy more', te: 'మరిన్ని కొనాలి', s: 3}] },
            { q: { en: 'Primary goal?', te: 'ప్రధాన లక్ష్యం?'}, a: [{en: 'Capital safety', te: 'మూలధన భద్రత', s: 1}, {en: 'Mix of growth & safety', te: 'వృద్ధి & భద్రత మిశ్రమం', s: 2}, {en: 'High growth', te: 'అధిక వృద్ధి', s: 3}] },
        ];
        // FIX: Explicitly typed the arguments of the reduce function to ensure `totalScore` is a number, fixing the type mismatch for the `onSubmit` callback.
        const totalScore = Object.values(answers).reduce((sum: number, s: number) => sum + s, 0);

        return (
            <div>
                <h3 className="text-xl font-semibold mb-4 text-center">{language === 'en' ? 'Risk Profile Quiz' : 'రిస్క్ ప్రొఫైల్ క్విజ్'}</h3>
                {questions.map((q, i) => (
                    <div key={i} className="mb-4">
                        <p className="font-medium mb-2">{q.q[language]}</p>
                        <div className="flex gap-2">
                            {q.a.map(opt => (
                                <button key={opt.s} onClick={() => setAnswers(p => ({...p, [i]: opt.s}))} className={`flex-1 p-2 border rounded-lg text-sm ${answers[i] === opt.s ? 'bg-blue-100 dark:bg-blue-900 border-primary' : 'bg-gray-50 dark:bg-slate-700'}`}>{opt[language]}</button>
                            ))}
                        </div>
                    </div>
                ))}
                {Object.keys(answers).length === questions.length && (
                    <button onClick={() => onSubmit(totalScore)} className="w-full bg-accent text-white px-6 py-2 rounded-lg mt-4">{language === 'en' ? 'Next' : 'తదుపరి'}</button>
                )}
            </div>
        );
    };
    
    const introContent = {
        what: { en: "Asset allocation is the strategy of dividing your investment portfolio among different asset categories, such as equities (stocks), debt (bonds), and gold. It's the foundation of building a diversified portfolio.", te: "ఆస్తి కేటాయింపు అనేది మీ పెట్టుబడి పోర్ట్‌ఫోలియోను ఈక్విటీలు (స్టాక్స్), డెట్ (బాండ్లు), మరియు బంగారం వంటి వివిధ ఆస్తి వర్గాల మధ్య విభజించే వ్యూహం. ఇది ఒక వైవిధ్యభరితమైన పోర్ట్‌ఫోలియోను నిర్మించడానికి పునాది." },
        why: { en: "Different assets perform differently in various market conditions. Proper allocation helps you balance risk and reward, reducing volatility and maximizing potential returns over the long term.", te: "వివిధ ఆస్తులు వివిధ మార్కెట్ పరిస్థితులలో విభిన్నంగా పనిచేస్తాయి. సరైన కేటాయింపు మీకు ప్రమాదం మరియు రాబడిని సమతుల్యం చేయడానికి సహాయపడుతుంది, అస్థిరతను తగ్గిస్తుంది మరియు దీర్ఘకాలంలో సంభావ్య రాబడిని పెంచుతుంది." },
        who: { en: "Every investor, from beginners to seasoned experts. Your ideal asset allocation will change over time based on your age, financial goals, and risk tolerance.", te: "ప్రారంభకుల నుండి అనుభవజ్ఞులైన నిపుణుల వరకు ప్రతి పెట్టుబడిదారుడు. మీ ఆదర్శ ఆస్తి కేటాయింపు మీ వయస్సు, ఆర్థిక లక్ష్యాలు మరియు ప్రమాద సహనం ఆధారంగా కాలక్రమేణా మారుతుంది." },
        how: { en: "This tool first helps you determine your risk profile with a short quiz. Then, using your age and risk profile, it suggests a personalized asset allocation mix, which is visualized in an easy-to-understand chart.", te: "ఈ సాధనం మొదట ఒక చిన్న క్విజ్‌తో మీ ప్రమాద ప్రొఫైల్‌ను నిర్ధారించడంలో సహాయపడుతుంది. ఆ తర్వాత, మీ వయస్సు మరియు ప్రమాద ప్రొఫైల్‌ను ఉపయోగించి, ఇది ఒక వ్యక్తిగతీకరించిన ఆస్తి కేటాయింపు మిశ్రమాన్ని సూచిస్తుంది, ఇది సులభంగా అర్థం చేసుకోగల చార్ట్‌లో దృశ్యమానం చేయబడుతుంది." }
    };

    const renderTool = () => {
        switch (step) {
            case 0: return <div className="text-center"><button onClick={() => setStep(1)} className="bg-accent text-white px-6 py-2 rounded-lg">{language === 'en' ? 'Start' : 'ప్రారంభించండి'}</button></div>;
            case 1: return <RiskQuiz onSubmit={handleQuizSubmit} />;
            case 2: return (
                <div>
                    <h3 className="text-xl font-semibold mb-4 text-center">{language === 'en' ? 'What is your age?' : 'మీ వయస్సు ఎంత?'}</h3>
                    <label htmlFor="userAge" className="block text-sm font-medium mb-1">{language === 'en' ? 'Your Age' : 'మీ వయస్సు'}</label>
                    <input id="userAge" type="number" value={age} onChange={e => setAge(Number(e.target.value))} className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-slate-700 mb-4"/>
                    <button onClick={calculateAllocation} className="w-full bg-accent text-white px-6 py-2 rounded-lg">{language === 'en' ? 'See Allocation' : 'కేటాయింపు చూడండి'}</button>
                </div>
            );
            case 3: return (
                <div className="text-center">
                    <h3 className="text-xl font-semibold mb-4">{language === 'en' ? 'Your Recommended Asset Allocation' : 'మీకు సిఫార్సు చేయబడిన ఆస్తి కేటాయింపు'}</h3>
                    <div className="h-64 mx-auto" style={{maxWidth: '300px'}}><Doughnut data={chartData} options={chartOptions as any} /></div>
                    <button onClick={() => setStep(0)} className="mt-6 text-sm text-primary dark:text-blue-300 hover:underline">{language === 'en' ? 'Start Over' : 'మళ్ళీ ప్రారంభించండి'}</button>
                </div>
            );
            default: return null;
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

export default AssetAllocationPlanner;