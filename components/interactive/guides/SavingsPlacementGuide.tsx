import React, { useState } from 'react';
import { useLanguage } from '../../../context/LanguageContext';

const SavingsPlacementGuide: React.FC = () => {
    const { language } = useLanguage();
    const [step, setStep] = useState(0);
    const [timeline, setTimeline] = useState('');
    const [liquidity, setLiquidity] = useState('');
    const [result, setResult] = useState('');

    const handleStart = () => {
        setStep(1);
        setTimeline('');
        setLiquidity('');
        setResult('');
    };

    const handleTimelineSelect = (value: string) => {
        setTimeline(value);
        if (value === 'short') {
            setResult('savings_account');
            setStep(3);
        } else {
            setStep(2);
        }
    };
    
    const handleLiquiditySelect = (value: string) => {
        setLiquidity(value);
        let res = '';
        if (timeline === 'short') { // Less than 3 months
             res = 'savings_account'; // Safest for very short term, instant liquidity is key
        } else { // 3 to 12 months
            res = value === 'yes' ? 'liquid_fund' : 'fixed_deposit';
        }
        setResult(res);
        setStep(3);
    };
    
    const recommendations = {
        savings_account: {
            title: { en: 'Savings Account', te: 'పొదుపు ఖాతా' },
            desc: { en: 'Best for extreme safety and instant access, especially for goals within 3 months. The returns are low, but your money is completely safe and available anytime.', te: '3 నెలలలోపు లక్ష్యాల కోసం, అత్యంత భద్రత మరియు తక్షణ ప్రాప్యతకు ఉత్తమమైనది. రాబడి తక్కువగా ఉంటుంది, కానీ మీ డబ్బు పూర్తిగా సురక్షితంగా మరియు ఎప్పుడైనా అందుబాటులో ఉంటుంది.' }
        },
        liquid_fund: {
            title: { en: 'Liquid Mutual Fund', te: 'లిక్విడ్ మ్యూచువల్ ఫండ్' },
            desc: { en: 'Good for slightly better returns than a savings account with high liquidity when you can wait 1-2 days. Ideal for goals from 3-12 months where you might need sudden access. Carries very low market risk.', te: 'మీరు 1-2 రోజులు వేచి ఉండగలిగినప్పుడు అధిక ద్రవ్యత్వంతో పొదుపు ఖాతా కంటే కొంచెం మెరుగైన రాబడి కోసం మంచిది. 3-12 నెలల లక్ష్యాల కోసం అనువైనది, ఇక్కడ మీకు ఆకస్మిక ప్రాప్యత అవసరం కావచ్చు. చాలా తక్కువ మార్కెట్ ప్రమాదాన్ని కలిగి ఉంటుంది.' }
        },
        fixed_deposit: {
            title: { en: 'Fixed Deposit (FD)', te: 'ఫిక్స్‌డ్ డిపాజిట్ (FD)' },
            desc: { en: 'Ideal for guaranteed returns over a fixed period when you are sure you won\'t need the money before maturity. Breaking an FD early can result in a penalty.', te: 'మెచ్యూరిటీకి ముందు మీకు డబ్బు అవసరం లేదని మీరు ఖచ్చితంగా ఉన్నప్పుడు ఒక నిర్దిష్ట కాలానికి హామీ రాబడి కోసం అనువైనది. FDని ముందుగా బ్రేక్ చేస్తే జరిమానా విధించవచ్చు.' }
        }
    };
    
    const introContent = {
        what: { en: "This guide helps you choose the most suitable place to park your short-term savings, comparing options like Savings Accounts, Liquid Funds, and Fixed Deposits.", te: "ఈ గైడ్ మీ స్వల్పకాలిక పొదుపులను ఉంచడానికి అత్యంత అనువైన స్థానాన్ని ఎంచుకోవడంలో సహాయపడుతుంది, పొదుపు ఖాతాలు, లిక్విడ్ ఫండ్స్ మరియు ఫిక్స్‌డ్ డిపాజిట్ల వంటి ఎంపికలను పోలుస్తుంది." },
        why: { en: "Choosing the right instrument ensures your money is not only safe but also earns a decent return without compromising on liquidity (the ability to access your money when you need it).", te: "సరైన సాధనాన్ని ఎంచుకోవడం మీ డబ్బు సురక్షితంగా ఉండటమే కాకుండా, ద్రవ్యత్వాన్ని (మీకు అవసరమైనప్పుడు మీ డబ్బును యాక్సెస్ చేయగల సామర్థ్యం) రాజీ పడకుండా మంచి రాబడిని సంపాదించేలా చేస్తుంది." },
        who: { en: "Anyone building an emergency fund or saving for a short-term goal (within one year), such as a vacation, a down payment for a vehicle, or any planned large purchase.", te: "అత్యవసర నిధిని నిర్మించే లేదా విహారయాత్ర, వాహనం కోసం డౌన్ పేమెంట్ లేదా ఏదైనా ప్రణాళికాబద్ధమైన పెద్ద కొనుగోలు వంటి స్వల్పకాలిక లక్ష్యం (ఒక సంవత్సరంలోపు) కోసం పొదుపు చేసే ఎవరైనా." },
        how: { en: "This interactive tool simplifies the decision-making process. By asking two critical questions about your investment timeline and need for liquidity, it provides a clear, personalized recommendation and explains the reasoning behind it.", te: "ఈ ఇంటరాక్టివ్ సాధనం నిర్ణయం తీసుకునే ప్రక్రియను సులభతరం చేస్తుంది. మీ పెట్టుబడి కాలపరిమితి మరియు ద్రవ్యత్వం యొక్క అవసరం గురించి రెండు క్లిష్టమైన ప్రశ్నలను అడగడం ద్వారా, ఇది స్పష్టమైన, వ్యక్తిగతీకరించిన సిఫార్సును అందిస్తుంది మరియు దాని వెనుక ఉన్న కారణాన్ని వివరిస్తుంది." }
    };

    const renderTool = () => {
        switch (step) {
            case 0:
                return (
                    <div className="text-center">
                        <p className="mb-4">{language === 'en' ? 'Let\'s find the best place for your short-term savings.' : 'మీ స్వల్పకాలిక పొదుపుల కోసం ఉత్తమ స్థానాన్ని కనుగొందాం.'}</p>
                        <button onClick={handleStart} className="bg-accent text-white px-6 py-2 rounded-lg">{language === 'en' ? 'Start' : 'ప్రారంభించండి'}</button>
                    </div>
                );
            case 1:
                return (
                    <div>
                        <h3 className="text-xl font-semibold mb-4 text-center">{language === 'en' ? 'When do you need this money?' : 'మీకు ఈ డబ్బు ఎప్పుడు కావాలి?'}</h3>
                        <div className="space-y-3">
                            <button onClick={() => handleTimelineSelect('short')} className="block w-full text-left p-4 border rounded-lg hover:bg-blue-50 dark:hover:bg-slate-700">{language === 'en' ? 'In less than 3 months' : '3 నెలల కన్నా తక్కువ సమయంలో'}</button>
                            <button onClick={() => handleTimelineSelect('medium')} className="block w-full text-left p-4 border rounded-lg hover:bg-blue-50 dark:hover:bg-slate-700">{language === 'en' ? 'In 3 to 12 months' : '3 నుండి 12 నెలలలో'}</button>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <h3 className="text-xl font-semibold mb-4 text-center">{language === 'en' ? 'Could you potentially need to withdraw this money unexpectedly?' : 'మీరు ఈ డబ్బును అనుకోకుండా ఉపసంహరించుకోవలసిన అవసరం ఉందా?'}</h3>
                        <div className="space-y-3">
                            <button onClick={() => handleLiquiditySelect('yes')} className="block w-full text-left p-4 border rounded-lg hover:bg-blue-50 dark:hover:bg-slate-700">{language === 'en' ? 'Yes, I need instant or very quick access.' : 'అవును, నాకు తక్షణ లేదా చాలా శీఘ్ర ప్రాప్యత అవసరం.'}</button>
                            <button onClick={() => handleLiquiditySelect('no')} className="block w-full text-left p-4 border rounded-lg hover:bg-blue-50 dark:hover:bg-slate-700">{language === 'en' ? 'No, I\'m certain I won\'t need it before the goal date.' : 'లేదు, లక్ష్య తేదీకి ముందు నాకు ఇది అవసరం లేదని నేను ఖచ్చితంగా ఉన్నాను.'}</button>
                        </div>
                    </div>
                );
            case 3:
                const rec = recommendations[result as keyof typeof recommendations];
                return (
                    <div className="text-center">
                        <h3 className="text-xl font-semibold mb-2">{language === 'en' ? 'Our Recommendation:' : 'మా సిఫార్సు:'}</h3>
                        <p className="text-3xl font-bold text-secondary dark:text-blue-400 mb-4">{rec.title[language]}</p>
                        <p>{rec.desc[language]}</p>
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

export default SavingsPlacementGuide;