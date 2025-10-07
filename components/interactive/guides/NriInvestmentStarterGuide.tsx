import React, { useState } from 'react';
import { useLanguage } from '../../../context/LanguageContext';

const NriInvestmentStarterGuide: React.FC = () => {
    const { language } = useLanguage();
    const [repatriation, setRepatriation] = useState('');
    const [result, setResult] = useState('');

    const handleSelect = () => {
        if (repatriation === 'yes') {
            setResult('nre');
        } else {
            setResult('nro');
        }
    };

    const accounts = {
        nre: {
            title: { en: 'Open an NRE Account', te: 'NRE ఖాతాను తెరవండి' },
            desc: { en: 'Best if you want to send foreign earnings to India and be able to take it back abroad freely. Both the principal and interest are fully repatriable and tax-free in India.', te: 'మీరు విదేశీ సంపాదనను భారతదేశానికి పంపాలనుకుంటే మరియు దానిని స్వేచ్ఛగా విదేశాలకు తిరిగి తీసుకెళ్లాలనుకుంటే ఇది ఉత్తమమైనది. అసలు మరియు వడ్డీ రెండూ పూర్తిగా తిరిగి పంపదగినవి మరియు భారతదేశంలో పన్ను-రహితమైనవి.' }
        },
        nro: {
            title: { en: 'Open an NRO Account', te: 'NRO ఖాతాను తెరవండి' },
            desc: { en: 'Ideal for managing your income earned in India (like rent, dividends). The interest earned is taxable in India, and repatriation has some limits.', te: 'భారతదేశంలో సంపాదించిన మీ ఆదాయాన్ని (అద్దె, డివిడెండ్లు వంటివి) నిర్వహించడానికి అనువైనది. సంపాదించిన వడ్డీ భారతదేశంలో పన్ను విధించదగినది, మరియు తిరిగి పంపడానికి కొన్ని పరిమితులు ఉన్నాయి.' }
        }
    };
    
    const introContent = {
        what: { en: "For Non-Resident Indians (NRIs), the first step to investing in India is choosing the right type of bank account: NRE (Non-Resident External) or NRO (Non-Resident Ordinary). This guide helps you make that choice.", te: "ప్రవాస భారతీయుల (NRIలు) కోసం, భారతదేశంలో పెట్టుబడి పెట్టడానికి మొదటి అడుగు సరైన రకమైన బ్యాంకు ఖాతాను ఎంచుకోవడం: NRE (నాన్-రెసిడెంట్ ఎక్స్‌టర్నల్) లేదా NRO (నాన్-రెసిడెంట్ ఆర్డినరీ). ఈ గైడ్ మీకు ఆ ఎంపిక చేసుకోవడంలో సహాయపడుతుంది." },
        why: { en: "The choice between NRE and NRO accounts has significant implications for taxation and the ability to move money back abroad (repatriation). Selecting the wrong account can lead to tax complications and restrictions.", te: "NRE మరియు NRO ఖాతాల మధ్య ఎంపిక పన్ను మరియు డబ్బును విదేశాలకు తిరిగి తరలించే సామర్థ్యం (రిపాట్రియేషన్)పై గణనీయమైన చిక్కులను కలిగి ఉంటుంది. తప్పు ఖాతాను ఎంచుకోవడం పన్ను సమస్యలకు మరియు పరిమితులకు దారితీయవచ్చు." },
        who: { en: "Any Non-Resident Indian (NRI) who wants to start saving or investing in India, or needs an account to manage their Indian income.", te: "భారతదేశంలో పొదుపు లేదా పెట్టుబడి పెట్టాలనుకుంటున్న లేదా వారి భారతీయ ఆదాయాన్ని నిర్వహించడానికి ఒక ఖాతా అవసరమైన ఏ ప్రవాస భారతీయుడైనా (NRI)." },
        how: { en: "This tool simplifies the decision down to the single most important factor: repatriation. Based on whether you need to freely move your funds back to your country of residence, it provides a clear recommendation for the right account type and explains the key features.", te: "ఈ సాధనం నిర్ణయాన్ని అత్యంత ముఖ్యమైన ఒకే ఒక కారకానికి సులభతరం చేస్తుంది: రిపాట్రియేషన్. మీరు మీ నిధులను మీ నివాస దేశానికి స్వేచ్ఛగా తరలించాల్సిన అవసరం ఉందా లేదా అనే దాని ఆధారంగా, ఇది సరైన ఖాతా రకం కోసం స్పష్టమైన సిఫార్సును అందిస్తుంది మరియు కీలక లక్షణాలను వివరిస్తుంది." }
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
                        <label htmlFor="repatriationNeeds" className="block text-sm font-medium mb-1">{language === 'en' ? 'Do you need to freely take the money back abroad (repatriation)?' : 'మీరు డబ్బును స్వేచ్ఛగా విదేశాలకు తిరిగి తీసుకెళ్లాల్సిన అవసరం ఉందా (రిపాట్రియేషన్)?'}</label>
                        <select id="repatriationNeeds" value={repatriation} onChange={e => setRepatriation(e.target.value)} className="w-full p-2 border rounded">
                            <option value="">{language === 'en' ? 'Select...' : 'ఎంచుకోండి...'}</option>
                            <option value="yes">{language === 'en' ? 'Yes, I need full flexibility' : 'అవును, నాకు పూర్తి సౌలభ్యం కావాలి'}</option>
                            <option value="no">{language === 'en' ? 'No, the money will likely stay in India' : 'లేదు, డబ్బు భారతదేశంలోనే ఉండే అవకాశం ఉంది'}</option>
                        </select>
                    </div>
                    <div className="text-center">
                        <button onClick={handleSelect} disabled={!repatriation} className="bg-accent text-white px-6 py-2 rounded-lg disabled:opacity-50">{language === 'en' ? 'Get Recommendation' : 'సిఫార్సును పొందండి'}</button>
                    </div>
                    {result && (
                        <div className="mt-6 text-center bg-light dark:bg-slate-800 p-6 rounded-lg">
                            <h3 className="text-2xl font-bold text-secondary dark:text-blue-400 mb-2">{accounts[result as keyof typeof accounts].title[language]}</h3>
                            <p>{accounts[result as keyof typeof accounts].desc[language]}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NriInvestmentStarterGuide;