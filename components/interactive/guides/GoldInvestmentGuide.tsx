import React, { useState } from 'react';
import { useLanguage } from '../../../context/LanguageContext';

const GoldInvestmentGuide: React.FC = () => {
    const { language } = useLanguage();
    const [step, setStep] = useState(0);
    const [purpose, setPurpose] = useState('');
    const [result, setResult] = useState('');

    const handleStart = () => {
        setStep(1);
        setPurpose('');
        setResult('');
    };
    
    const handlePurposeSelect = (value: string) => {
        setPurpose(value);
        let res = '';
        if (value === 'wedding') {
            res = 'physical';
        } else if (value === 'long_term') {
            res = 'sgb';
        } else { // regular_sip
            res = 'etf';
        }
        setResult(res);
        setStep(2);
    };

    const recommendations = {
        physical: {
            title: { en: 'Physical Gold (Jewellery, Coins)', te: 'భౌతిక బంగారం (నగలు, నాణేలు)' },
            desc: { en: 'Best for personal use like weddings or gifting. It offers the satisfaction of ownership but comes with making charges, GST, and storage concerns.', te: 'వివాహాలు లేదా బహుమతులు వంటి వ్యక్తిగత ఉపయోగం కోసం ఉత్తమమైనది. ఇది యాజమాన్య సంతృప్తిని అందిస్తుంది కానీ తయారీ ఛార్జీలు, GST మరియు నిల్వ సమస్యలతో వస్తుంది.' }
        },
        sgb: {
            title: { en: 'Sovereign Gold Bonds (SGBs)', te: 'సావరిన్ గోల్డ్ బాండ్స్ (SGBs)' },
            desc: { en: 'Ideal for long-term investment (5-8 years). It\'s issued by the RBI, tax-efficient (no capital gains on maturity), and even pays 2.5% annual interest.', te: 'దీర్ఘకాలిక పెట్టుబడికి (5-8 సంవత్సరాలు) అనువైనది. దీనిని RBI జారీ చేస్తుంది, పన్ను-సమర్థవంతమైనది (మెచ్యూరిటీపై మూలధన లాభాలు లేవు), మరియు 2.5% వార్షిక వడ్డీని కూడా చెల్లిస్తుంది.' }
        },
        etf: {
            title: { en: 'Gold ETFs or Mutual Funds', te: 'గోల్డ్ ETFలు లేదా మ్యూచువల్ ఫండ్స్' },
            desc: { en: 'Perfect for small, regular investments (like a SIP). It allows you to buy gold in digital form easily through your DEMAT account, with high liquidity.', te: 'చిన్న, క్రమమైన పెట్టుబడులకు (SIP వంటివి) సరైనది. ఇది మీ డీమ్యాట్ ఖాతా ద్వారా డిజిటల్ రూపంలో బంగారాన్ని సులభంగా కొనడానికి అనుమతిస్తుంది, అధిక ద్రవ్యత్వంతో.' }
        }
    };
    
    const introContent = {
        what: { en: "Gold is a popular investment, but it comes in many forms: physical jewellery/coins, Sovereign Gold Bonds (SGBs), and Gold ETFs/Mutual Funds. This guide helps you choose the right one.", te: "బంగారం ఒక ప్రసిద్ధ పెట్టుబడి, కానీ ఇది అనేక రూపాల్లో వస్తుంది: భౌతిక నగలు/నాణేలు, సావరిన్ గోల్డ్ బాండ్స్ (SGBలు), మరియు గోల్డ్ ETFలు/మ్యూచువల్ ఫండ్స్. ఈ గైడ్ మీకు సరైనదాన్ని ఎంచుకోవడంలో సహాయపడుతుంది." },
        why: { en: "Each form of gold has different benefits, costs, and tax implications. Choosing the one that aligns with your goal is crucial for maximizing returns and convenience.", te: "బంగారం యొక్క ప్రతి రూపానికి వేర్వేరు ప్రయోజనాలు, ఖర్చులు మరియు పన్ను చిక్కులు ఉంటాయి. రాబడిని మరియు సౌలభ్యాన్ని పెంచడానికి మీ లక్ష్యానికి అనుగుణంగా ఉన్నదాన్ని ఎంచుకోవడం చాలా ముఖ్యం." },
        who: { en: "Anyone looking to invest in gold, whether for personal use like a wedding, as a long-term safe-haven asset, or as part of a diversified investment portfolio.", te: "వివాహం వంటి వ్యక్తిగత ఉపయోగం కోసం, దీర్ఘకాలిక సురక్షిత-ఆశ్రయం ఆస్తిగా, లేదా వైవిధ్యభరితమైన పెట్టుబడి పోర్ట్‌ఫోలియోలో భాగంగా బంగారంలో పెట్టుబడి పెట్టాలని చూస్తున్న ఎవరైనా." },
        how: { en: "This tool makes the choice simple. By asking about your primary reason for investing in gold, it instantly recommends the most suitable form and clearly explains why it's the best fit for your needs.", te: "ఈ సాధనం ఎంపికను సులభతరం చేస్తుంది. బంగారంలో పెట్టుబడి పెట్టడానికి మీ ప్రాథమిక కారణం గురించి అడగడం ద్వారా, ఇది అత్యంత అనువైన రూపాన్ని తక్షణమే సిఫార్సు చేస్తుంది మరియు మీ అవసరాలకు ఇది ఎందుకు ఉత్తమమైనదో స్పష్టంగా వివరిస్తుంది." }
    };

    const renderTool = () => {
        switch (step) {
            case 0: return <div className="text-center"><button onClick={handleStart} className="bg-accent text-white px-6 py-2 rounded-lg">{language === 'en' ? 'Find Best Option' : 'ఉత్తమ ఎంపికను కనుగొనండి'}</button></div>;
            case 1:
                return (
                    <div>
                        <h3 className="text-xl font-semibold mb-4 text-center">{language === 'en' ? 'What is your primary goal for buying gold?' : 'బంగారం కొనడానికి మీ ప్రాథమిక లక్ష్యం ఏమిటి?'}</h3>
                        <div className="space-y-3">
                            <button onClick={() => handlePurposeSelect('wedding')} className="block w-full text-left p-4 border rounded-lg hover:bg-blue-50 dark:hover:bg-slate-700">{language === 'en' ? 'For a wedding or personal use' : 'వివాహం లేదా వ్యక్తిగత ఉపయోగం కోసం'}</button>
                            <button onClick={() => handlePurposeSelect('long_term')} className="block w-full text-left p-4 border rounded-lg hover:bg-blue-50 dark:hover:bg-slate-700">{language === 'en' ? 'Purely as a long-term investment (5+ years)' : 'కేవలం దీర్ఘకాలిక పెట్టుబడిగా (5+ సంవత్సరాలు)'}</button>
                            <button onClick={() => handlePurposeSelect('regular_sip')} className="block w-full text-left p-4 border rounded-lg hover:bg-blue-50 dark:hover:bg-slate-700">{language === 'en' ? 'To invest small amounts regularly' : 'క్రమం తప్పకుండా చిన్న మొత్తాలను పెట్టుబడి పెట్టడానికి'}</button>
                        </div>
                    </div>
                );
            case 2:
                const rec = recommendations[result as keyof typeof recommendations];
                return (
                    <div className="text-center">
                        <h3 className="text-xl font-semibold mb-2">{language === 'en' ? 'Recommendation:' : 'సిఫార్సు:'}</h3>
                        <p className="text-3xl font-bold text-secondary dark:text-blue-400 mb-4">{rec.title[language]}</p>
                        <p>{rec.desc[language]}</p>
                        <button onClick={handleStart} className="mt-6 text-sm text-primary dark:text-blue-300 hover:underline">{language === 'en' ? 'Start Over' : 'మళ్ళీ ప్రారంభించండి'}</button>
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

export default GoldInvestmentGuide;